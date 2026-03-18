const Groq = require('groq-sdk')

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

const generateQuestions = async (topic, difficulty, date) => {

  const template = process.env.QuestionFormat
    .replace('{topic}', topic)
    .replace('{difficulty}', difficulty)
    .replace('{date}', date)

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: template }],
    temperature: 0.7
  })

  const text = response.choices[0].message.content

  const cleaned = text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim()

  const questions = JSON.parse(cleaned)

  if (!Array.isArray(questions)) {
    throw new Error('Groq did not return a valid array')
  }

  return questions
}

module.exports = { generateQuestions }
