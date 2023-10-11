const tutorialModel = require('../models/tutorialModel')

exports.addNewTutorial = (req, res) => {
    let newTutorial = new tutorialModel(req.body)

    newTutorial.save().then(() => {
        return res.status(200).json({
            success: 'Tutorial is created successfully'
        })
    }).catch((err) => {
        return res.status(400).json({
            error: err
        })
    })
}

exports.getTutorial = (req, res) => {

}