import "./Quiz.css";
import { Card, Text, Button } from "@nextui-org/react";
import { Modal, Input, Row, Checkbox } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Questions from "./Questions";
import QuestionPage from "./QuestionPage";
import * as Actions from "../../../redux/question_reducer";
import * as ResultAction from "../../../redux/result_reducer";
import { useEffect } from "react";
import WeeklyChallenges from "./WeeklyChallenges";

const instructions = [
  {
    type: "mcq",
    header: "Multiple Choice Questions",
    guideLines: [
      "You will be asked 10 Questions.",
      "10 points for each correct answer.",
      "Each question has 4 options. You can select only one option.",
      "Back Navigation is available.",
      "Results will be declared at the end of the quiz.",
    ],
    btn: "Start Quiz",
  },
  {
    type: "dnd",
    header: "Drag and Drop Questions",
    guideLines: [
      "This quiz consists of 10 drag and drop questions.",
      "10 points for each correct answer.",
      "To select an answer, click and hold your mouse button (or tap and hold if on a touch device) on the answer choice you want to use. Drag it to the appropriate question box and release the mouse button (or lift your finger) to drop it.",
      "You can change your answers by simply dragging an answer choice to a different question box.",
      "There is no time limit, so you can complete the quiz at your own pace.",
      "Once all questions are answered, click 'Finish' to see your final score.",
    ],
    btn: "Start Quiz",
  },
  {
    type: "wlc",
    header: "Weekly Challenge",
    guideLines: [
      "The weekly challenge consists of 10 questions, including both MCQ’s and Drag and drop questions.",
      "Read each question and the answer choices carefully. Results will be displayed once you submit.",
      "Each question has 4 options. You can select only one option.",
      "Back Navigation is disabled.",
      "You will have a specific time limit to complete the quiz. Be mindful of the timer in the top right corner.",
      "Results will be shown at the end of the Challenge",
    ],
    btn: "Start Challenge",
  },
];

export default function QuizInstructions() {
  const { selectedQuizType } = useSelector((state) => state.questions);
  const [instruction, setInstruction] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const handler = () => {
    if (selectedQuizType === "wlc") {
      dispatch(Actions.startWeeklyChallenge());
    } else {
      dispatch(Actions.startExamAction());
    }
    setVisible(true);
  };
  const closeHandler = () => {
    setVisible(false);
    dispatch(Actions.resetAllAction());
    dispatch(ResultAction.resetResultAction());
    navigate("/quiz/home");
  };

  const handlerBack = () => {
    navigate("/quiz/home");
  };

  useEffect(() => {
    const filteredInstruction = instructions.filter((element) => {
      if (element.type === selectedQuizType) {
        return element;
      }
    })[0];
    setInstruction(filteredInstruction);
  }, []);

  return (
    <section className="quiz-guidelines-card-container">
      <Card className="card quiz-guidelines-card">
        <Card.Header className="quiz-container-card-title">
          <Text>
            {selectedQuizType === "mcq"
              ? "Multiple Choice Quiz Guidelines"
              : selectedQuizType === "dnd"
              ? "Drag and Drop Quiz Guidelines"
              : selectedQuizType === "wlc"
              ? "Weekly challenge Guidelines"
              : null}
          </Text>
          <ol>
            {instruction &&
              instruction.guideLines &&
              instruction.guideLines.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
          </ol>

          <Button onPress={handlerBack} color="gradient" auto ghost>
            Go Back
          </Button>

          <Button onPress={handler} color="gradient" auto ghost>
            {instruction.btn}
          </Button>
        </Card.Header>
      </Card>
      <div>
        <Modal
          closeButton
          preventClose
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Body>
            {selectedQuizType === "wlc" ? (
              <WeeklyChallenges></WeeklyChallenges>
            ) : (
              <QuestionPage></QuestionPage>
            )}{" "}
          </Modal.Body>
        </Modal>
      </div>
    </section>
  );
}
