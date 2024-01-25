import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    questionList: [
      {
        queNum: {
          type: Number,
          required: true,
        },
        question: {
          type: String,
          required: true,
        },
        options: {
          // key value pairs of
          // optNum: option
        },
      },
    ],
    answerList: {},
    // createdBy: {
    //   type: mongoose.Types.ObjectId
    // }
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamnp: true },
)

const Quiz = mongoose.model('Quiz', quizSchema)

export default Quiz
