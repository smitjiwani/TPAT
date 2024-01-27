const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

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

quizSchema.plugin(AutoIncrement, { inc_field: 'queNum' })

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz
