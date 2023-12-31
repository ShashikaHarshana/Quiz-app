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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import * as Action from "../../../redux/question_reducer";

export default function QuizHome({ isDark }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wclAttempts } = useSelector((state) => state.result);

  const handleOnpress = (quizType, difficulty) => {
    if (quizType) {
      dispatch(
        Action.setQuestionTypeAndDifficulty({ type: quizType, difficulty })
      );
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
      type: "wlc",
    },
  ];

  useEffect(() => {
    // Fetch MCQ questions from the server when the component mounts
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:5000/adminApp/quizzes/questions/",
        {}
      );
      if (response.data) {
        dispatch(Action.storeQuestions(response.data));
        setIsLoading(false);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleCardPress = (type, difficulty) => {
    if (type === "wlc") {
      dispatch(Action.setQuestionTypeAndDifficulty({ type, difficulty }));
      if (wclAttempts !== 3) {
        navigate("/quiz/instructions");
      }
    }
  };

  return (
    <div className="quiz-container">
      <section>
        <h3 className="quiz-management-header">Quiz Management System</h3>
      </section>
      <div className="quiz-type-container">
        {cardList.map((card, index) => (
          <Card
            className="card"
            isPressable
            isHoverable
            variant="bordered"
            key={index}
            onPress={() => handleCardPress(card.type, "advanced")}
          >
            <Card.Header>
              <Text>{card.title}</Text>
            </Card.Header>
            <Card.Body>
              <div className="btn-container">
                {card.title === "Weekly Challenge" && (
                  <div>
                    <Text>
                      {wclAttempts === 3
                        ? "No more attempts left for this week challenge"
                        : `Are you ready for this week's challenge? You have ${
                            3 - wclAttempts
                          } more attempts left...`}
                    </Text>
                  </div>
                )}
                {card.btns &&
                  card.btns.map((btn, i) => (
                    <Button
                      key={i}
                      onPress={() => handleOnpress(card.type, btn)}
                    >
                      {btn.toLocaleUpperCase()}
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
