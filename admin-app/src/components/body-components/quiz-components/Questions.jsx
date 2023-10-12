import React, { useEffect, useState } from "react";

import {
  Table,
  Row,
  Col,
  Tooltip,
  User,
  Text,
  Button,
  Dropdown,
  Card,
} from "@nextui-org/react";

import { Modal, Input, Checkbox } from "@nextui-org/react";

import { IconButton } from "../quiz-components/Icons/IconButton";

import { EditIcon } from "../quiz-components/Icons/EditIcon";
import { DeleteIcon } from "../quiz-components/Icons/DeleteIcon";

import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

const columns = [
  { name: "QUESTION TITLE", uid: "question" },
  { name: "ANSWERS", uid: "answers" },
  { name: "CORRECT ANSWER", uid: "correctAnswerIndex" },
  { name: "QUESTION TYPE", uid: "type" },
  { name: "DIFFICULTY", uid: "difficulty" },
  { name: "ACTIONS", uid: "actions" },
];

const Questions = () => {
  const [visible, setVisible] = React.useState(false);
  const [visibleConfirmation, setVisibleConfirmation] = React.useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [btnType, setBtnType] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "Tony Reichert",
      answers: ["CEO", "dfsdf", "sdfsdf", "fasdf"],
      correctAnswerIndex: 1,
      type: "mcq",
      difficulty: "beginner",
    },
    {
      id: 12,
      title: "Tony Reichertfasdf",
      answers: ["CEsdfO", "sdf", "sdf", "dsfsdf"],
      correctAnswerIndex: 2,
      type: "sdf",
      difficulty: "sdf",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = React.useState(new Set([""]));
  const [title, setTitle] = useState("");
  const [answers, setAnswers] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const [selectedDifficulty, setSelectedDifficulty] = React.useState(
    new Set([""])
  );

  const [correctAnswerIndex, setCorrectAnswerIndex] = useState("");

  const handleFormSubmit = async () => {
    const postData = {
      id: Date.now(),
      title,
      answers: Object.values(answers),
      correctAnswerIndex: Number(correctAnswerIndex),
      type: Array.from(selectedType).join(", ").replaceAll("_", " "),
      difficulty: Array.from(selectedDifficulty)
        .join(", ")
        .replaceAll("_", " "),
    };
    console.log(postData);
    try {
      if (btnType === "add") {
        const response = await axios.post(
          "http://localhost:5000/adminApp/quizzes/questions/",
          postData
        );
        if (response) {
          fetchQuestions();
          clearFormFields();
          closeHandler();
        }
      } else if (btnType === "edit") {
        const response = await axios.patch(
          `http://localhost:5000/adminApp/quizzes/questions/${currentQuestionId}`,
          postData
        );

        if (response) {
          fetchQuestions();
          clearFormFields();
          closeHandler();
        }
      }
    } catch (error) {
      console.log(error);
    }
    clearFormFields();
  };

  const clearFormFields = () => {
    setTitle("");
    setAnswers({ option1: "", option2: "", option3: "", option4: "" });
    setCorrectAnswerIndex("");
    setSelectedType(new Set([""]));
    setSelectedDifficulty(new Set([""]));
  };

  const selectedTypeValue = React.useMemo(() => {
    const type = Array.from(selectedType).join(", ").replaceAll("_", " ");
    if (type === "") return "Question Type";
    if (type === "mcq") return "Multiple Choice";
    else if (type === "dnd") return "Drag and Drop";
  }, [selectedType]);

  const selectedDifficultyValue = React.useMemo(() => {
    const type = Array.from(selectedDifficulty).join(", ").replaceAll("_", " ");
    if (type === "") {
      return "Difficulty";
    } else {
      return type;
    }
  });

  const handler = () => setVisible(true);
  const confirmationHandler = () => setVisibleConfirmation(true);

  const closeHandler = () => {
    setVisible(false);
    clearFormFields();
    console.log("closed");
  };
  const closeConfirmationHandler = () => {
    setVisibleConfirmation(false);
    console.log("closed");
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const availableQuestions = await axios.get(
        "http://localhost:5000/adminApp/quizzes/questions/",
        {}
      );
      if (availableQuestions.data) {
        // setQuestions(availableQuestions);
        setQuestions(availableQuestions.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (id) => {
    console.log("Edit Question", id);
    setBtnType("edit");
    // setCurrentQuestion(questions.filter((question) => question.id === id)[0]);
    const currQuestion = questions.filter((question) => question.id === id)[0];
    console.log(currQuestion);
    setCurrentQuestionId(id);
    setTitle(currQuestion.title);
    setAnswers({
      option1: currQuestion.answers[0],
      option2: currQuestion.answers[1],
      option3: currQuestion.answers[2],
      option4: currQuestion.answers[3],
    });
    setCorrectAnswerIndex(currQuestion.correctAnswerIndex);
    setSelectedType(new Set([currQuestion.type]));
    setSelectedDifficulty(new Set([currQuestion.difficulty]));

    handler();
  };

  const handleDelete = (id) => {
    setCurrentQuestionId(id);
    confirmationHandler();
  };

  const handleDeleteConfirmation = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/adminApp/quizzes/questions/${currentQuestionId}`
      );
    } catch (error) { }
    closeConfirmationHandler();
    fetchQuestions();
  };

  const handleAddQuestions = () => {
    handler();
    setBtnType("add");
  };

  const renderCell = (questions, columnKey) => {
    const cellValue = questions[columnKey];
    switch (columnKey) {
      case "question":
        return questions.title;
      case "answers":
        return (
          <Row>
            <Col>
              {cellValue.map((value, i) => (
                <div key={i}>
                  <Text key={i} b size={14} css={{ tt: "capitalize" }}>
                    {`${value}`}
                  </Text>
                </div>
              ))}
            </Col>
          </Row>
        );
      case "corectAnswerIndex":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
      case "type":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
      case "difficulty":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit question">
                <IconButton onClick={() => handleEditClick(questions.id)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete Question"
                color="error"
                onClick={() => handleDelete(questions.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  return (
    <div>
      <div>
        <Card className="card available-question-card" isPressable isHoverable variant="bordered">
          <Card.Header className="quiz-container-card-title">
            <Text>Available Questions</Text>
          </Card.Header>
          <Card.Body className="available-question-card-body">
            <Table aria-label="Example table with custom cells" css={{ height: "auto", minWidth: "100%"}} selectionMode="none">
              <Table.Header columns={columns}>
                {(column) => (
                  <Table.Column key={column.uid} hideHeader={column.uid === "actions"} align={column.uid === "actions" ? "center" : "start"} >
                    {column.name}
                  </Table.Column>
                )}
              </Table.Header>
              <Table.Body items={questions}>
                {(item) => (
                  <Table.Row>
                    {(columnKey) => (
                      <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                    )}
                  </Table.Row>
                )}
              </Table.Body>
              <Table.Pagination
                shadow
                noMargin
                align="center"
                rowsPerPage={3}
                onPageChange={(page) => console.log({ page })}
              />
            </Table>
            <div className="btn" style={{display:"flex", justifyContent:"flex-end"}}>
              <Button onPress={handleAddQuestions}>
                Add Questions
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>

      <form>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Question title"
              id="title"
              value={title}
              required
              label="Question Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div style={{display:"flex", flexDirection:"column", gap:"16px"}}>
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Option1"
                required
                label="Answers"
                value={answers["option1"]}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    option1: e.target.value,
                  }))
                }
              />
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Option2"
                required
                value={answers["option2"]}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    option2: e.target.value,
                  }))
                }
              />
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Option 3"
                required
                value={answers["option3"]}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    option3: e.target.value,
                  }))
                }
              />
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Option 4"
                required
                value={answers["option4"]}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    option4: e.target.value,
                  }))
                }
              />
            </div>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Question title"
              id="title"
              value={correctAnswerIndex}
              required
              label="Correct Answer Index"
              onChange={(e) => setCorrectAnswerIndex(e.target.value)}
            />
            <Dropdown>
              <Dropdown.Button
                flat
                css={{ tt: "capitalize" }}
              >
                {selectedTypeValue}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedType}
                onSelectionChange={setSelectedType}
              >
                <Dropdown.Item key="mcq">Multiple Choice</Dropdown.Item>
                <Dropdown.Item key="dnd">Drag and Drop</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Button
                flat
                css={{ tt: "capitalize" }}
              >
                {selectedDifficultyValue}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedDifficulty}
                onSelectionChange={setSelectedDifficulty}
              >
                <Dropdown.Item key="beginner">Beginner</Dropdown.Item>
                <Dropdown.Item key="intermediate">Intermediate</Dropdown.Item>
                <Dropdown.Item key="advanced">Advanced</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Modal.Body>
          <Modal.Footer>
            <Row style={{display:"flex", gap:"16px"}}>
              <Button auto flat color="error" onPress={closeHandler} style={{width:"100%"}}>
                cancel
              </Button>
              <Button auto type="submit" onPress={handleFormSubmit} style={{width:"100%"}}>
                {btnType === "add" ? "Submit" : "Edit"}
              </Button>
            </Row>
          </Modal.Footer>
        </Modal>
      </form>
      <div>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visibleConfirmation}
          onClose={closeConfirmationHandler}
        >
          <Modal.Body>
            <Text>Are you sure you want to delete this Question?</Text>
            <Button auto flat color="error" onPress={handleDeleteConfirmation}>
              Yes
            </Button>
            <Button auto onPress={closeConfirmationHandler}>
              No
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Questions;
