import { Router } from 'express'
import * as controller from './controllers.js'

const router = Router()

router.get('/', controller.getQuiz)
router.post('/', controller.createQuiz)
router.get('/quiz/:quizID', controller.getQuizById)
router.put('/quiz/:quizID', controller.updateQuiz)
router.delete('/quiz/:quizID', controller.deleteQuiz)
// router.get('/mbti', controller.getAllMbtiQuestions)
router.post('/mbti', controller.submitMbtiAnswers)

// Publish quiz for students to take
router.patch('/quiz/:quizID/publish', controller.publishQuiz)
router.get('/quiz/:quizID/published/', controller.getPublishedQuiz)

router.get('/getpersonalityquiz', controller.getPersonalityQuiz)

export default router
