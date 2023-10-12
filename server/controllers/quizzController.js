// controllers/questionController.js
const Questions = require("../models/quizModel");
// Create a new question
const createQuestion = async (req, res) => {
  try {
    const { id, title, answers, correctAnswerIndex, type, difficulty } =
      req.body;
    Questions.create({
      id,
      title,
      answers,
      correctAnswerIndex,
      type,
      difficulty,
    })
      .then((questions) => {
        res.status(200).json("question saved to db");
      })
      .catch(function (err) {
        res.status(500).json({ msg: err });
      });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Questions.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error getting questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a question by ID
const updateQuestion = async (req, res) => {
  try {
    const { id, title, answers, correctAnswerIndex, type, difficulty } =
      req.body;
    const questionId = Number(req.params.id);

    const updatedQuestion = await Questions.updateOne(
      { id: questionId },
      { id, title, answers, correctAnswerIndex, type, difficulty }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ error: "Questions not found" });
    }
    res
      .status(200)
      .json({ msg: `questions id ${questionId} updated successfully` });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a question by ID
const deleteQuestion = async (req, res) => {
  try {
    const questionId = Number(req.params.id);

    const deletedQuestion = await Questions.deleteOne({ id: questionId });

    if (!deletedQuestion) {
      return res.status(404).json({ error: "Questions not found" });
    }

    res.json({ message: "Question deleted" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
};
