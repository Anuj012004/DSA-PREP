const mongoose = require("mongoose");

const SingleQuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  exampleInput: {
    type: String
  },
  exampleOutput: {
    type: String
  },
  constraints: {
    type: String
  },
  hint: {
    type: String
  }
});

const QuestionSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true
    },

    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"]
    },

    date: {
      type: String,
      required: true
    },

    questions: [SingleQuestionSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);