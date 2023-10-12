import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  if (minutes <= 10) {
    minutes = "0" + minutes;
  }
  if (seconds <= 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
};

const ChallengeTimer = ({ duration }) => {
  const [counter, setCounter] = useState(duration);
  const navigate = useNavigate();

  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (counter <= 0) {
      clearInterval(intervalRef.current);
      alert("Your Time is UP");
      navigate("/quiz/results");
    }
  }, [counter]);

  useEffect(() => {}, [counter]);
  return (
    <div>
      <div>{formatTime(counter)}</div>
    </div>
  );
};

export default ChallengeTimer;
