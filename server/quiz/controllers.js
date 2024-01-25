import Quiz from './model.js'

export const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body)
    const result = await quiz.save()
    res.status(200).send(result)
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const getQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
    res.status(200).send(quizzes)
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizID, {
      name: 1,
      questionList: 1,
      answerList: 1,
    })

    if (!quiz) {
      throw new Error('Quiz Not Found')
    }
    // if req.userID != quiz.createdBy, unauthorized access

    res.status(200).send(quiz)
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizID)

    if (!quiz) {
      throw new Error('Quiz Not Found')
    }
    if (quiz.isPublished) {
      throw new Error('Can not update a published quiz!')
    }

    quiz.name = req.body.name
    quiz.questionList = req.body.questionList
    quiz.answerList = req.body.answerList
    await quiz.save()

    res.status(200).send(quiz)
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizID)
    if (quiz.isPublished) {
      throw new Error('Can not delete a published quiz!')
    }
    await Quiz.deleteOne({ _id: req.params.quizID })
    res.status(200).send('Quiz Deleted Successfully')
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const publishQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizID)

    if (!quiz) {
      throw new Error('Quiz Not Found')
    }

    quiz.isPublished = true
    await quiz.save()

    res.status(200).send(quiz)
  } catch (err) {
    res.status(400).json({ err })
  }
}
