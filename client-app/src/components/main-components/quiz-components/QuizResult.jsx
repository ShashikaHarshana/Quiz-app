import React, { useEffect } from "react";
import "./Quiz.css";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Text } from "@nextui-org/react";
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
import { useState } from "react";
import html2canvs from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

export default function QuizResult({ isDark }) {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pdfRef = useRef();

  const { queue, selectedQuizType } = useSelector((state) => state.questions);
  const { result } = useSelector((state) => state.result);

  useEffect(() => {});

  const answers = queue.map((element) => {
    return element.correctAnswerIndex;
  });
  console.log(answers, "answers");
  console.log(queue, "queue");

  const totalPoints = queue.length * 10;
  // const attempts = attempts_Number(result);
  const earnPoints = earnedPoints(answers, result, 10);
  // const flagResult = flagResult(totalPoints, earnPoints);

  function onRestart() {
    // dispatch(resetAllAction());
    // dispatch(resetResultAction());
  }

  const handleDownload = () => {
    setLoader(true);
    const input = pdfRef.current;
    html2canvs(input).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("quiz-resutl.pdf");
      setLoader(false);
    });
  };

  return (
    <div className="container">
      <div ref={pdfRef}>
        <center>
          <h1 className="title text-light"></h1>
        </center>
        <Card className="card">
          <Card.Header className="quiz-container-card-title">
            <Text>Results</Text>
          </Card.Header>
          <Card.Body>
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
                Total Points Earned :{" "}
              </span>
              <span className="bold">{earnPoints || 0}</span>
            </div>

            <div className="flex">
              <span style={{ fontSize: "18px", textAlign: "center" }}>
                Quiz Result{" "}
              </span>
              <span
                style={{
                  color: `${
                    flagResult(totalPoints, earnPoints) ? "#2aff95" : "#ff2a66"
                  }`,
                }}
                className="bold"
              >
                {flagResult(totalPoints, earnPoints) ? "Passed" : "Failed"}
              </span>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div style={{display:"flex", gap:"16px"}}>
        <Button
          style={{ marginTop: "24px" ,width:"100%" }}
          auto
          ghost
          onClick={() => {
            navigate("/quiz/home");
            dispatch(ResultAction.resetResultAction());
          }}
        >
          Back to Quiz page
        </Button>

        <Button style={{ marginTop: "24px" ,width:"100%" }} auto ghost onPress={handleDownload}>
          Download Pdf
        </Button>
      </div>

    </div>
  );
}
