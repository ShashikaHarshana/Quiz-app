import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as Action from "../../../redux/question_reducer";
import * as ResultAction from "../../../redux/result_reducer";

import data from "./data-base";
import Questions from "./Questions";
import DragnDrop from "./DragnDrop";
import { Button, Divider, Text } from "@nextui-org/react";
import ChallengeTimer from "./ChallengeTimer";

const WeeklyChallenges = () => {
  const result = useSelector((state) => state.result.result);
  const { queue, trace, selectedQuizType } = useSelector(
    (state) => state.questions
  );
  const dispatch = useDispatch();
  const [check, setChecked] = useState(undefined);
  const navigate = useNavigate();

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
    }
  }

  function onChecked(check) {
    console.log(check);
    setChecked(check);
  }

  return (
    <div className="container">
      <Text>Time Remaining</Text>
      <ChallengeTimer duration={900}></ChallengeTimer>
      <p>
        {queue[trace].type === "mcq"
          ? "Multiple Choice Questions"
          : queue[trace].type === "dnd"
          ? "Drag and Drop Questions"
          : null}
      </p>

      <p>
        Question {trace + 1} of {queue.length}
      </p>

      <p>Difficulty: {queue[trace] && queue[trace].difficulty}</p>
      <Divider />
      {queue[trace].type === "mcq" ? (
        <Questions onChecked={onChecked}></Questions>
      ) : queue[trace].type === "dnd" ? (
        <DragnDrop onChecked={onChecked}></DragnDrop>
      ) : null}
      <Divider />

      <div>
        <Button onPress={onNext}>
          {trace < queue.length - 1 ? "Next" : "Finish"}
        </Button>
      </div>
    </div>
  );
};

export default WeeklyChallenges;
