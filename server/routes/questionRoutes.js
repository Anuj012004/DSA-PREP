const express = require('express')
const router = express.Router()
const {getQuestions} = require('../controllers/questionController')

router.post('/questions',getQuestions)

module.exports = router