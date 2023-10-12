import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./main-components/LandingPage";
import "./Main.css";
import TextEditor from "./main-components/text-editor-components/TextEditor";
import TutorialHome from "./main-components/tutorial-components/TutorialHome";
import Error404Page from "./main-components/Error404Page";
import QuizHome from "./main-components/quiz-components/QuizHome";
import McqInstructions from "./main-components/quiz-components/QuizInstructions";
import McqPage from "./main-components/quiz-components/QuestionPage";
import McqResult from "./main-components/quiz-components/QuizResult";
import DragnDrop from "./main-components/quiz-components/DragnDrop";
import QuizInstructions from "./main-components/quiz-components/QuizInstructions";
import WeeklyChallenges from "./main-components/quiz-components/WeeklyChallenges";

export default function Main({ isDark }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className={`main scrollable-container ${
        isDark ? "scrollable-container-dark" : "scrollable-container-light"
      }`}
    >
      {isLogin && (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/textEditor" element={<TextEditor />} />

          <Route
            path="/tutorial/home"
            element={<TutorialHome isDark={isDark} />}
          />

          <Route path="/:name" element={<Error404Page />} />
          <Route path="/:name/:name" element={<Error404Page />} />

          <Route path="/quiz/home" element={<QuizHome isDark={isDark} />} />
          <Route
            path="/quiz/instructions"
            element={<QuizInstructions isDark={isDark} />}
          />
          <Route path="/quiz/mcq" element={<McqPage isDark={isDark} />} />
          <Route path="/quiz/results" element={<McqResult isDark={isDark} />} />
          <Route
            path="/quiz/dragndrop"
            element={<DragnDrop isDark={isDark} />}
          />
          <Route
            path="/quiz/weeklychallenge"
            element={<WeeklyChallenges isDark={isDark} />}
          />
        </Routes>
      )}
      {!isLogin && <Routes></Routes>}
    </div>
  );
}
