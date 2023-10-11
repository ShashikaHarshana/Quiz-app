import React, { useState, useEffect } from "react";
import { Button, Card, Notification } from "@nextui-org/react";
import axios from "axios";

const AddMcq = ({ isDark }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswers, setCurrentAnswers] = useState(["", "", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(
    "Select Correct Answer"
  );

  //Dropdown
  const [isTestListDisplay, setIsTestListDisplay] = useState(false);

  const testList = [
    { text: "Answer 01", index: 0 },
    { text: "Answer 02", index: 1 },
    { text: "Answer 03", index: 2 },
  ];

  const [inputTestSearch, setInputTestSearch] = useState("");

  const filteredTestList = testList.filter((testItem) =>
    testItem.text.toLowerCase().includes(inputTestSearch.toLowerCase())
  );

  const handleTestSuggestionClick = (selectedAnswerIndex) => {
    setCorrectAnswerIndex(selectedAnswerIndex);
    setIsTestListDisplay(false);
  };

  useEffect(() => {
    // Fetch existing questions from the backend when the component mounts
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/adminApp/quizzes/questions"
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const addQuestion = async () => {
    if (!currentQuestion || currentAnswers.some((answer) => !answer)) {
      alert("Please fill in all fields for the question and answers.");
      return;
    }

    const newQuestion = {
      text: currentQuestion,
      answers: currentAnswers,
      correctAnswerIndex: correctAnswerIndex,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/adminApp/quizzes/questions",
        newQuestion
      );
      setQuestions([...questions, response.data]);
      setCurrentQuestion("");
      setCurrentAnswers(["", "", ""]);
      setCorrectAnswerIndex(""); // Reset to the first answer
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  //Input field functions
  const handleInputFocus = (e) => {
    e.target.parentNode.classList.add("active-label");
  };

  const handleInputBlur = (e) => {
    if (e.target.value === "") {
      e.target.parentNode.classList.remove("active-label");
    }
  };

  const handleAnswerChange = (index, event) => {
    const updatedAnswers = [...currentAnswers];
    updatedAnswers[index] = event.target.value;
    setCurrentAnswers(updatedAnswers);
  };

  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <div>
        <div className="input-container" style={{ marginTop: "0px" }}>
          <input
            className="primary-form-element"
            type="text"
            id="currentQuestion"
            name="currentQuestion"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={currentQuestion}
            onChange={(event) => setCurrentQuestion(event.target.value)}
            required
          />
          <label
            className={`primary-form-element ${isDark ? "dark" : "light"}`}
            htmlFor="currentQuestion"
          >
            Question
          </label>
        </div>
        <br />

        {/* Input fields for three answers */}
        {currentAnswers.map((answer, index) => (
          <div
            className="input-container"
            style={{ marginTop: "0px" }}
            key={index}
          >
            <input
              className="primary-form-element"
              type="text"
              id={`answer${index}`}
              name={`answer${index}`}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              value={answer}
              onChange={(event) => handleAnswerChange(index, event)}
              required
            />
            <label
              className={`primary-form-element ${isDark ? "dark" : "light"}`}
              htmlFor={`answer${index}`}
            >
              Answer {index + 1}
            </label>
          </div>
        ))}
        <br />

        <div
          className="input-container"
          style={{ marginTop: "0px", width: "200px" }}
        >
          <a
            onClick={() => {
              setIsTestListDisplay(!isTestListDisplay);
            }}
          >
            <input
              className="primary-form-element"
              style={{ cursor: "default" }}
              type="text"
              id="correctAnswerIndex"
              name="correctAnswerIndex"
              value={correctAnswerIndex}
              readOnly
              required
            />
            {isTestListDisplay && (
              <span>
                <i class="fa-solid fa-sort-up drop-up"></i>
              </span>
            )}
            {!isTestListDisplay && (
              <span>
                <i class="fa-solid fa-caret-down drop-down"></i>
              </span>
            )}
          </a>
          <label
            className={`active-primary-form-lable ${isDark ? "dark" : "light"}`}
          >
            Correct Answer
          </label>
          {isTestListDisplay && (
            <div
              className={`dropdown-content ${
                isDark ? "dropdown-content-dark" : "dropdown-content-light"
              }`}
            >
              <div className="">
                <input
                  type="text"
                  className="dropdown-content"
                  placeholder="Search..."
                  value={inputTestSearch}
                  onChange={(e) => setInputTestSearch(e.target.value)}
                />
              </div>
              {isTestListDisplay &&
                filteredTestList.map((testItem, index) => (
                  <div
                    className={`dropdown-content-item ${
                      isDark
                        ? "dropdown-content-item-dark"
                        : "dropdown-content-item-light"
                    }`}
                    key={index}
                    onClick={() => handleTestSuggestionClick(testItem.index)}
                  >
                    {testItem.text}
                  </div>
                ))}
            </div>
          )}
        </div>

        <center>
          <Button
            auto
            onPress={addQuestion}
            style={{
              zIndex: "0",
              backgroundColor: "#007BFF",
              color: isDark ? "#ffffff" : "#ffffff",
            }}
          >
            Add Question
          </Button>
        </center>
      </div>
    </Card>
  );
};

export default AddMcq;
