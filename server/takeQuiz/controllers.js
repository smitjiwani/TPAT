import Quiz from '../scripts/quizSchema.cjs'
import Result from '../scripts/resultSchema.js'
import { updateQuizScoreById } from '../teachers/queries.js'
import { getQuizScoreById } from '../teachers/queries.js'


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
    if (!quiz.isPublished) {
      throw new Error('Can not take unpublished quizzes!')
    }

    res.status(200).send(quiz)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const submitQuiz = async (req, res) => {
  try {
    const quizID = req.params.quizID
    // const userID = req.params.userID // get this from the auth
    const attemptedQues = req.body.attemptedQues
    const quiz = await Quiz.findById(quizID, { answerList: 1 })
    const answers = quiz.answerList

    const allQues = Object.keys(answers)
    const total = allQues.length

    let score = 0
    for (let i = 0; i < total; i++) {
      let quesNum = allQues[i]
      if (
        !!attemptedQues[quesNum] &&
        attemptedQues[quesNum] == answers[quesNum]
      ) {
        score = score + 1
      }
    }

    const existingScore = await getQuizScoreById(userID)

    const quizScore = parseFloat(score);
    const oldAverage = parseFloat(existingScore);
    const newTotal = parseFloat(total);
    const newAverage = ((oldAverage * newTotal) + quizScore) / (newTotal + 1)

    await updateQuizScoreById(userID, newAverage.toFixed(2))
    const result = new Result({ userID, quizID, score, total })
    const data = await result.save()

    res.status(200).send({ score, total, resultID: data._id })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message })
  }
}
