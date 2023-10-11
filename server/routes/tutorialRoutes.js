const express = require('express')
const tutorialControllers = require('../controllers/tutorialControllers')

const router = express.Router()

router.post('/addNewTutorial', tutorialControllers.addNewTutorial)

router.post('/getTutorial', tutorialControllers.getTutorial)

module.exports = router;