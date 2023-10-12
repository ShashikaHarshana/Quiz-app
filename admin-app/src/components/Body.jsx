import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./body-components/Dashboard";
import Tutorials from "./body-components/tutorial-components/Tutorials";
import Error404Page from "./body-components/Error404Page";
import FormElements from "./test-components/FormElements";
import AddTutorial from "./body-components/tutorial-components/AddTutorial";
import Quiz from "./body-components/quiz-components/Quiz";
import Mcq from "./body-components/quiz-components/Mcq";
import AddMcq from "./body-components/quiz-components/AddMcq";
import Questions from "./body-components/quiz-components/Questions";

export default function Body({ isDark }) {
  return (
    <div
      className={`scrollable-container ${
        isDark
          ? "scrollable-container-dark"
          : "scrollable-container-light light"
      }`}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tutorials" element={<Tutorials isDark={isDark} />} />
        <Route
          path="/tutorials/add-new"
          element={<AddTutorial isDark={isDark} />}
        />
        <Route path="/:name" element={<Error404Page />} />
        <Route
          path="/formElements"
          element={<FormElements isDark={isDark} />}
        />
        <Route path="/quizzes" element={<Questions isDark={isDark} />} />
        <Route
          path="/quizzes/mcq/AddMcq"
          element={<AddMcq isDark={isDark} />}
        />
      </Routes>
    </div>
  );
}
