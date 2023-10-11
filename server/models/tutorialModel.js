const mongoose = require('mongoose')

const tutorials_schema = new mongoose.Schema({

    tutorial_id: {
        type: String,
        required: true
    },
    tutorial_title: {
        type: String,
        required: true
    },
    tutorial_category: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('tutorials', tutorials_schema)