import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { useDispatch, useSelector } from "react-redux";
import * as ResultAction from "../../../redux/result_reducer";
const DragnDrop = ({ onChecked }) => {
  const [widget, setWidget] = useState(null);
  const { queue, trace } = useSelector((state) => state.questions);

  const dispatch = useDispatch();
  const result = useSelector((state) => state.result.result);

  const handleDrag = (e, index) => {
    e.dataTransfer.setData("widgetIndex", index);
    onChecked(index);
  };

  useEffect(() => {
    console.log(result[trace]);
    setWidget(result[trace] ? result[trace] : null);
  }, [trace]);

  useEffect(() => {
    console.log({ trace, widget });
    dispatch(ResultAction.updateResultAction({ trace, widget }));
  }, [widget]);

  const handleOnDrop = (e) => {
    const widgetIndex = e.dataTransfer.getData("widgetIndex");
    console.log(widgetIndex, "widgetIndex");
    setWidget(Number(widgetIndex));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const question = queue[trace];

  return (
    <>
      <h2>{question.question}</h2>
      <div className="page" onDrop={handleOnDrop} onDragOver={handleDragOver}>
        <div className="dropped-widget">{question.options[widget]}</div>
      </div>
      <div>
        <div className="widgets">
          {question.options.map((option, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => {
                handleDrag(e, index);
              }}
              className="widget"
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DragnDrop;
