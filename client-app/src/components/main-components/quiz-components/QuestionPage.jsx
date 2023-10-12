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
  const { queue, trace, selectedQuizType, selectedDifficulty } = useSelector(
    (state) => state.questions
  );
  const dispatch = useDispatch();

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
      // dispatch(Action.resetAllAction());
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
      <p>
        {selectedQuizType === "mcq"
          ? "Multiple Choice Questions"
          : selectedQuizType === "dnd"
          ? "Drag and Drop Questions"
          : null}
      </p>

      <p>
        Question {trace + 1} of {queue && queue.length}
      </p>

      <p>Difficulty: {queue[trace] && queue[trace].difficulty}</p>

      {/*Questions*/}

      {selectedQuizType === "mcq" ? (
        <Questions onChecked={onChecked}></Questions>
      ) : selectedQuizType === "dnd" ? (
        <DragnDrop onChecked={onChecked}></DragnDrop>
      ) : selectedQuizType === "wlc" ? (
        <WeeklyChallenges></WeeklyChallenges>
      ) : null}

      <div>
        {selectedQuizType === "mcq" && (
          <Button disabled={trace === 0} onPress={onPrev}>
            Previous
          </Button>
        )}

        <Button onPress={onNext}>
          {trace < queue.length - 1 ? "Next" : "Finish"}
        </Button>
      </div>
    </div>
  );
}
