import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const ChallengeTimer = ({ duration }) => {
  const [counter, setCounter] = useState(0);

  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {}, [counter]);
  return (
    <div>
      <div>{counter}</div>
    </div>
  );
};

export default ChallengeTimer;
