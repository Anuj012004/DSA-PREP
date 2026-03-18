const Question = require('../models/questions')
const { getTodayDate } = require('../utils/dateHelper')
const { generateQuestions } = require('../services/service')

const getQuestions = async (req, res, next) => {
  try {
    const { topic, difficulty } = req.body

    // Validate input
    if (!topic || !difficulty) {
      return res.status(400).json({ 
        message: 'topic and difficulty are required' 
      })
    }

    // Get today's date
    const today = getTodayDate()

    // Check DB cache
    const existing = await Question.findOne({ topic, difficulty, date: today })

    if (existing) {
      return res.status(200).json({
        source: 'cache',
        topic,
        difficulty,
        date: today,
        questions: existing.questions
      })
    }

    //Cache miss ,call Gemini
    const generatedQuestions = await generateQuestions(topic, difficulty)

    // store to DB
    const newEntry = await Question.create({
      topic,
      difficulty,
      date: today,
      questions: generatedQuestions
    })

    //Return response
    return res.status(201).json({
      source: 'ai',
      topic,
      difficulty,
      date: today,
      questions: newEntry.questions
    })

  } catch (error) {
    next(error)
  }
}

module.exports = { getQuestions }
