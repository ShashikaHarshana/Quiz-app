import React from "react";
import "./Quiz.css";
import {
  Card,
  CardBody,
  Text,
  Col,
  StyledCardBody,
  Button,
} from "@nextui-org/react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Actions from "../../../redux/common_reducer";

export default function QuizHome({ isDark }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnpress = (quizType, difficulty) => {
    if (quizType) {
      dispatch(Actions.setQuizType(quizType));
    }
    navigate("/quiz/instructions");
  };

  const cardList = [
    {
      title: "Multiple Choice Questions",
      btns: ["beginner", "intermediate", "advanced"],
      type: "mcq",
    },
    {
      title: "Drag and Drop Questions",
      btns: ["beginner", "intermediate", "advanced"],
      type: "dnd",
    },
    {
      title: "Weekly Challenge",
      btns: ["beginner", "intermediate", "advanced"],
      type: "wlc",
    },
  ];

  return (
    <div className="quiz-container">
      <section>
        <Text>Quiz Management System</Text>
      </section>
      <div className="quiz-type-container">
        {cardList.map((card) => (
          <Card className="card" isPressable isHoverable variant="bordered">
            <Card.Header>
              <Text>{card.title}</Text>
            </Card.Header>
            <Card.Body>
              <div className="btn-container">
                {card.btns.map((btn) => (
                  <Button onPress={() => handleOnpress(card.type, btn)}>
                    {btn}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
