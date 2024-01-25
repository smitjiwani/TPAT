import Quiz from '../quiz/quizSchema.js'
import Result from './quiz/resultSchema.js'

export const startQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizID, {
      name: 1,
      questionList: 1,
      isPublished: 1,
    })

    if (!quiz) {
      throw new Error('Quiz Not Found')
    }
    if (quiz.isPublished) {
      throw new Error('Can not take unpublished quizzes!')
    }

    res.status(200).send(quiz)
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const submitQuiz = async (req, res) => {
  try {
    const quizID = req.params.quizID
    const userID = req.params.userID
    const quiz = await Quiz.findById(quizID, { answerList: 1 })
    const attemptedQues = req.body.attemptedQues

    allQues = Object.keys(attemptedQues)
    const total = allQues.length

    let score = 0
    for (let i = 0; i < total; i++) {
      let quesNum = allQues[i]
      if (
        !!attemptedQues[quesNum] &&
        attemptedQues[quesNum] == attemptedQues[quesNum]
      ) {
        score = score + 1
      }
    }

    const result = new Result({ userID, quizID, score, total })
    const data = await result.save()

    res.status(200).send({ score, total, resultID: data._id })
  } catch (err) {
    res.status(400).json({ err })
  }
}
