// controllers/questionController.js
const Question = require('../models/quizModel');

// Create a new question
const createQuestion = async (req, res) => {
    try {
        const { text, answers, correctAnswerIndex } = req.body;
        const question = new Question({ text, answers, correctAnswerIndex });
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all questions
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        console.error('Error getting questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a question by ID
const updateQuestion = async (req, res) => {
    try {
        const { text, answers, correctAnswerIndex } = req.body;
        const questionId = req.params.id;

        const updatedQuestion = await Question.findByIdAndUpdate(
            questionId,
            { text, answers, correctAnswerIndex },
            { new: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.json(updatedQuestion);
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a question by ID
const deleteQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;

        const deletedQuestion = await Question.findByIdAndRemove(questionId);

        if (!deletedQuestion) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.json({ message: 'Question deleted' });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createQuestion,
    getAllQuestions,
    updateQuestion,
    deleteQuestion,
};
