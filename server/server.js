const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config({ path: '.env' })

const connectDB = require('./config/database')
const questionRoutes = require('./routes/questionRoutes')
const errorHandler = require('./middleware/errorHandler')

const PORT = process.env.PORT || 2121

// Connect to MongoDB
connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', questionRoutes)

// Base route
app.get('/', (req, res) => {
  res.send('DSA Quiz API is running')
})

// Error handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})