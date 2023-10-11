import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "@nextui-org/react";
import "./Mcq.css";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for the modal

const Mcq = ({ isDark }) => {
  const [questions, setQuestions] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [updatedQuestionText, setUpdatedQuestionText] = useState("");
  const [updatedAnswers, setUpdatedAnswers] = useState([]);

  useEffect(() => {
    // Fetch the list of questions from your backend API when the component mounts
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

  const handleDelete = async (questionId) => {
    try {
      // Send a DELETE request to your API to delete the question
      await axios.delete(
        `http://localhost:5000/adminApp/quizzes/questions/${questionId}`
      );
      // After successfully deleting, fetch the updated list of questions
      fetchQuestions();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleUpdate = (question) => {
    // Open the update modal and set the selected question
    setSelectedQuestion(question);
    setUpdatedQuestionText(question.text);
    setUpdatedAnswers([...question.answers]);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    // Close the update modal
    setIsUpdateModalOpen(false);
  };

  const handleUpdateSubmit = async () => {
    try {
      // Send an update request to your API with the updated question data
      await axios.put(
        `http://localhost:5000/adminApp/quizzes/questions/${selectedQuestion._id}`,
        {
          text: updatedQuestionText,
          answers: updatedAnswers,
        }
      );

      // Close the modal and fetch the updated list of questions
      setIsUpdateModalOpen(false);
      fetchQuestions();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleInputFocus = (e) => {
    e.target.parentNode.classList.add("active-label");
  };

  const handleInputBlur = (e) => {
    if (e.target.value === "") {
      e.target.parentNode.classList.remove("active-label");
    }
  };

  return (
    <div className="question-container">
      <h1>List of Available Questions</h1>
      <div className="start">
        <a href="/quizzes/mcq/AddMcq">
          <Button color="gradient" auto ghost style={{ zIndex: "0" }}>
            Add Questions
          </Button>
        </a>
      </div>
      <div className="question-cards-container">
        {questions.map((question, index) => (
          <Card
            key={index}
            className="question-card"
            shadow="sm"
            radius="lg"
            height={200}
            style={{ width: "70vh", marginRight: "20px" }}
          >
            <h2>Question {index + 1}:</h2>
            <p style={{ fontWeight: "bold", marginRight: "8px" }}>
              {question.text}
            </p>
            <ul className="answers-list">
              {question.answers.map((answer, answerIndex) => (
                <li key={answerIndex}>{answer}</li>
              ))}
            </ul>
            <div className="button-container" style={{ alignItems: "center" }}>
              <Button
                style={{
                  fontWeight: "bold",
                  marginRight: "8px",
                  display: "inline-block",
                }}
                onClick={() => handleDelete(question._id)}
              >
                Delete
              </Button>
              <Button
                style={{ fontWeight: "bold", display: "inline-block" }}
                onClick={() => handleUpdate(question)}
              >
                Update
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Update Modal */}
      <Modal
        className={`popup ${isDark ? "dark-popup" : "light-popup"}`}
        isOpen={isUpdateModalOpen}
        onRequestClose={handleCloseUpdateModal}
        contentLabel="Update Question"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "85vh",
            height: "85vh",
            margin: "auto",
            outline: "none",
            borderRadius: "20px",
            padding: "10px 20px",
            backgroundColor: isDark ? "#1f1f1f" : "#fff",
          },
        }}
      >
        {selectedQuestion && (
          <div
            className="input-container"
            style={{ marginTop: "0px", width: "400px" }}
          >
            <h2>Update Question</h2>
            <form>
              <label>
                <h3>Question p:</h3>
                <input
                  className="primary-form-element"
                  type="text"
                  value={updatedQuestionText}
                  onChange={(e) => setUpdatedQuestionText(e.target.value)}
                />
              </label>
              <h3 marginTop="20px">Answers:</h3>
              {updatedAnswers.map((answer, answerIndex) => (
                <div
                  className="input-container"
                  style={{ marginTop: "0px" }}
                  key={answerIndex}
                >
                  <input
                    className="primary-form-element"
                    type="text"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    value={answer}
                    onChange={(e) => {
                      const newAnswers = [...updatedAnswers];
                      newAnswers[answerIndex] = e.target.value;
                      setUpdatedAnswers(newAnswers);
                    }}
                  />
                </div>
              ))}
              <div className="update-button-container">
                <Button
                  style={{
                    marginTop: "20px",
                    fontWeight: "bold",
                    marginRight: "8px",
                    display: "inline-block",
                  }}
                  onClick={handleUpdateSubmit}
                >
                  Update
                </Button>
                <Button
                  style={{
                    fontWeight: "bold",
                    marginTop: "20px",
                    display: "inline-block",
                  }}
                  onClick={handleCloseUpdateModal}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Mcq;
