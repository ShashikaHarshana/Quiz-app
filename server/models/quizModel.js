// models/Question.js
const mongoose = require('mongoose');

const mcqQuestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    answers: {
        type: [String],
        required: true,
    },
    correctAnswerIndex: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('mcqQuiz', mcqQuestionSchema)
