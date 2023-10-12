import React, { useEffect } from "react";
import "./Quiz.css";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Button } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { resetAllAction } from "../../../redux/question_reducer";
import { resetResultAction } from "../../../redux/result_reducer";
import * as ResultAction from "../../../redux/result_reducer";
import * as Action from "../../../redux/question_reducer";
import {
  attempts_Number,
  earnedPoints,
  flagResult,
} from "../../../helper/Helper";
import "../quiz-components/Quiz.css";

export default function QuizResult({ isDark }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { queue } = useSelector((state) => state.questions);
  const { result } = useSelector((state) => state.result);

  useEffect(() => {});

  const answers = queue.map((element) => {
    if (element.correctAnswerIndex) {
      return element.correctAnswerIndex;
    }
  });
  console.log(answers, "answers");
  console.log(queue, "queue");

  const totalPoints = queue.length * 10;
  // const attempts = attempts_Number(result);
  const earnPoints = earnedPoints(answers, result, 10);

  function onRestart() {
    // dispatch(resetAllAction());
    // dispatch(resetResultAction());
  }
  return (
    <div className="container">
      <center>
        <h1 className="title text-light">Results</h1>
      </center>

      <div
        className={`card ${isDark ? "card-dark" : "card-light"}`}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
        }}
      >
        {/* <div className='flex'>
                    <span style={{ fontSize: '20px'}}>Username</span>
                    <span className='bold'>{userId}</span>
                </div> */}
        <div className="flex">
          <span style={{ fontSize: "18px", textAlign: "center" }}>
            Total Quiz Points :{" "}
          </span>
          <span className="bold">{totalPoints || 0}</span>
        </div>
        <div className="flex">
          <span style={{ fontSize: "18px", textAlign: "center" }}>
            Total Questions :{" "}
          </span>
          <span className="bold">{queue.length || 0}</span>
        </div>
        <div className="flex">
          <span style={{ fontSize: "18px", textAlign: "center" }}>
            Total Attempts :{" "}
          </span>
          <span className="bold">{0}</span>
        </div>
        <div className="flex">
          <span style={{ fontSize: "18px", textAlign: "center" }}>
            Total Points Earned :{" "}
          </span>
          <span className="bold">{earnPoints || 0}</span>
        </div>
        <div className="flex">
          <span style={{ fontSize: "18px", textAlign: "center" }}>
            Quiz Result{" "}
          </span>
          <span className="bold"></span>
        </div>
      </div>

      <Button
        color="gradient"
        auto
        ghost
        onClick={() => {
          navigate("/quiz/home");
          dispatch(ResultAction.resetResultAction());
          dispatch(Action.resetAllAction());
        }}
      >
        Back to Quiz page
      </Button>
    </div>
  );
}
