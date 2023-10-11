// routes/quizRoutes.js
const express = require("express");
const router = express.Router();
const questionController = require("../controllers/quizzController");

// Create a new question
router.post("/questions", questionController.createQuestion);

// Get all questions
router.get("/questions", questionController.getAllQuestions);

// Update a question by ID
router.patch("/questions/:id", questionController.updateQuestion);

// Delete a question by ID
router.delete("/questions/:id", questionController.deleteQuestion);

module.exports = router;
