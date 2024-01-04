import mongoose from 'mongoose'

const resultSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    quizID: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamnp: true },
)

const Result = mongoose.model('Quiz', resultSchema)

export default Result
