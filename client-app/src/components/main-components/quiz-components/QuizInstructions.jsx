import "./Quiz.css";
import { Card, Text, Button } from "@nextui-org/react";
import { Modal, Input, Row, Checkbox } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Questions from "./Questions";
import QuestionPage from "./QuestionPage";

export default function QuizInstructions() {
  const { selectedQuizType } = useSelector((state) => state.common);
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    // setVisible(false);
    console.log("closed");
  };

  const handlerBack = () => {
    navigate("/quiz/home");
  };

  return (
    <section className="quiz-guidelines-card-container">
      <Card className="card quiz-guidelines-card">
        <Card.Header className="quiz-container-card-title">
              <Text>{selectedQuizType === "mcq"
            ? "Multiple Choice Quiz Guidelines"
            : selectedQuizType === "dnd"
            ? "Drag and Drop Quiz Guidelines"
            : selectedQuizType === "wlc"
            ? "Weekly challenge Guidelines"
            : null}</Text>
          </Card.Header>
        <ul>
          <li>1. You will be asked 05 Questions.</li>
          <li>2. 10 points for each correct answer.</li>
          <li>
            3. Each question has 3 options. You can select only one option.
          </li>
          <li>4. Back Navigation is available.</li>
          <li>5. Results will be declared at the end of the quiz.</li>
        </ul>
        <div className="card-btn-container">
          <Button onPress={handlerBack} color="gradient" auto ghost>
            Goback
          </Button>

          <Button onPress={handler} color="gradient" auto ghost>
            Start Quiz
          </Button>
        </div>
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
            <QuestionPage></QuestionPage>
          </Modal.Body>
        </Modal>
      </div>
    </section>
  );
}
