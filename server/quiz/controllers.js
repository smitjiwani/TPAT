import Quiz from '../scripts/quizSchema.cjs'
import fs from 'fs'
import jsonFile from "../16mbti.json" assert { type: "json" };

export const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body)
    const result = await quiz.save()
    res.status(200).send(result)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
    console.log(quizzes)
    res.status(200).send(quizzes)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getPublishedQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ isPublished: true })
    res.status(200).send(quizzes)
  } catch (err) {
    res.status(400).json({ error: err.message })
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
    res.status(400).json({ error: err.message })
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
    res.status(400).json({ error: err.message })
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
    res.status(400).json({ error: err.message })
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
    res.status(400).json({ error: err.message })
  }
}

// export const getAllMbtiQuestions = async (req, res) => {
//   try {
//     const { questionList } = await Quiz.findOne({ name: 'Personality finder' }); 
//     res.status(200).json(questionList);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

export const submitMbtiAnswers = async (req, res) => {
  try {
    const answers = req.body.answers

    let I = 0, E = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0;

    for (const answer of answers) {
      switch (answer) {
        case 'I':
          I++;
          break;
        case 'E':
          E++;
          break;
        case 'S':
          S++;
          break;
        case 'N':
          N++;
          break;
        case 'T':
          T++;
          break;
        case 'F':
          F++;
          break;
        case 'J':
          J++;
          break;
        case 'P':
          P++;
          break;
        default:
          break;
      }
    }

    const mbtiType = `${E > I ? 'E' : 'I'}${S > N ? 'S' : 'N'}${T > F ? 'T' : 'F'}${J > P ? 'J' : 'P'}`;

    console.log(mbtiType)
    res.status(200).json({ mbtiType });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getPersonalityQuiz = async (req, res) => {
  try {
    // fs.readFile("../16mbti.json", (err, data) => {
    //   if (!err) {
    //     const jsonFile = JSON.parse(data)
    //   }
    // })

    console.log(jsonFile);
    res.status(200).json(jsonFile);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
}