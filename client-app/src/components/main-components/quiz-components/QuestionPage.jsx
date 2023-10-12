import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { Card, p, Col, Grid, Button } from "@nextui-org/react";
import Questions from "./Questions";
import data from "./data-base";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Action from "../../../redux/question_reducer";
import * as ResultAction from "../../../redux/result_reducer";
import axios from "axios";
import DragnDrop from "./DragnDrop";
import WeeklyChallenges from "./WeeklyChallenges";

export default function QuestionPage() {
  const [check, setChecked] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const result = useSelector((state) => state.result.result);
  const common = useSelector((state) => state.common);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch MCQ questions from the server when the component mounts
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      // const response = await axios.get(
      //   "http://localhost:5000/adminApp/questions/getAll"
      // );

      // if (response.data) {
      //   dispatch(Action.startExamAction(data));
      //   setIsLoading(false);
      // } else {
      //   throw new Error();
      // }

      dispatch(Action.startExamAction(data));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  function onNext() {
    if (trace < queue.length) {
      dispatch(Action.moveNextAction());

      // insert new result
      if (result.length === 0 || result.length < trace + 1) {
        dispatch(ResultAction.pushResultAction(check));
      }
    }
    //reset value
    setChecked(undefined);
    if (trace === queue.length - 1) {
      navigate("/quiz/results");
      dispatch(Action.resetAllAction());
    }
  }

  function onPrev() {
    if (trace > 0) {
      dispatch(Action.movePrevAction());
    }
  }

  function onChecked(check) {
    console.log(check);
    setChecked(check);
  }

  return (
    <div className="container">
      <p className="quiz-container-card-title">
        {common.selectedQuizType === "mcq"
          ? "Multiple Choice Questions"
          : common.selectedQuizType === "dnd"
          ? "Drag and Drop Questions"
          : null}
      </p>

    <div style={{display:"flex", justifyContent:"space-between"}}>
        <p>
          Question {trace + 1} of {queue.length}
        </p>

        <p>Difficulty: {queue[trace] && queue[trace].difficulty}</p>
    </div>

      {/*Questions*/}
      {isLoading && <p>Loading....</p>}

      {!isLoading &&
        (common.selectedQuizType === "mcq" ? (
          <Questions onChecked={onChecked}></Questions>
        ) : common.selectedQuizType === "dnd" ? (
          <DragnDrop onChecked={onChecked}></DragnDrop>
        ) : common.selectedQuizType === "wlc" ? (
          <WeeklyChallenges></WeeklyChallenges>
        ) : null)}

      <div className="card-btn-container next-prev-btn-container">
        <Button disabled={trace === 0} onPress={onPrev}>
          Previous
        </Button>

        <Button onPress={onNext}>
          {trace < queue.length - 1 ? "Next" : "Finish"}
        </Button>
      </div>
    </div>
  );
}
