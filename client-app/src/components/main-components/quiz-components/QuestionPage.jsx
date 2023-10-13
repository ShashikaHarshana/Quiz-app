import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { Card, p, Col, Grid, Button, Divider } from "@nextui-org/react";
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
      <h3>
        {selectedQuizType === "mcq"
          ? "Multiple Choice Questions"
          : selectedQuizType === "dnd"
          ? "Drag and Drop Questions"
          : null}
      </h3>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom:"8px" }}>
        <p>
          Question {trace + 1} of {queue.length}
        </p>

        <p>Difficulty: {queue[trace] && queue[trace].difficulty}</p>
      </div>

      <Divider />

      {selectedQuizType === "mcq" ? (
        <Questions onChecked={onChecked}></Questions>
      ) : selectedQuizType === "dnd" ? (
        <DragnDrop onChecked={onChecked}></DragnDrop>
      ) : selectedQuizType === "wlc" ? (
        <WeeklyChallenges></WeeklyChallenges>
      ) : null}

      <div style={{ display: "flex", justifyContent: "end", gap:"8px" }}>
        {selectedQuizType === "mcq" && (
          <Button disabled={trace === 0} onPress={onPrev} style={{minWidth:"inherit", width: "100%"}}>
            Previous
          </Button>
        )}
        <Button style={{minWidth:"inherit", width: "100%"}} onPress={onNext}>
          {trace < queue.length - 1 ? "Next" : "Finish"}
        </Button>
      </div>
    </div>
  );
}
