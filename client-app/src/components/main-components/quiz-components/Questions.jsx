import React, { useEffect, useState } from "react";
import data from "./data-base.js";

import { useSelector } from "react-redux/es/hooks/useSelector";

//custom hook
import { useFetchQuestion } from "../../../hooks/FetchQuestion";
import { useDispatch } from "react-redux";
import { updateResult } from "../../../hooks/SetResults";
import * as ResultAction from "../../../redux/result_reducer.js";

export default function Questions({ onChecked }) {
  const [checked, setChecked] = useState(undefined);

  const { queue, trace } = useSelector((state) => state.questions);
  const question = queue[trace];

  const result = useSelector((state) => state.result.result);
  //   const [{ isLoading, apiData, serverError }] = useFetchQuestion();
  //   useSelector((state) => console.log(state));
  //   const questions = useSelector(
  //     (state) => state.questions.queue[state.questions.trace]
  //   );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log({ trace, checked });
    dispatch(ResultAction.updateResultAction({ trace, checked }));
  }, [checked]);

  function onSelect(index) {
    onChecked(index);
    setChecked(index);
    console.log(index);
    //   dispatch(updateResult({ trace, checked }));
  }

  //   if (isLoading) return <h3 className="text-light">isLoading</h3>;
  //   if (serverError)
  //     return <h3 className="text-light">{serverError || "Unknown Error"}</h3>;

  return (
    <div className="questions">
      <h2 className="text-light">
        {trace + 1} . {question && question.title}
      </h2>
      <ul key={question && question.id}>
        {question &&
          question.answers.map((question, index) => {
            return (
              <li
                key={index}
                className={`check ${result[trace] === index ? "checked" : ""}`}
              >
                <input
                  type="radio"
                  value={checked}
                  name="options"
                  id={`q${index}-options`}
                  onChange={() => onSelect(index)}
                />
                <label htmlFor={`q${index}-options`}>{question}</label>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
