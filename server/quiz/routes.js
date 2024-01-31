import { Router } from 'express'
import * as controller from './controllers.js'
import fetchuser from '../middleware/fetchuser.js'
import jsonFile from "../16mbti.json" assert { type: "json" };

const router = Router()

router.get('/', controller.getQuiz)
router.post('/', controller.createQuiz)
router.get('/quiz/:quizID', controller.getQuizById)
router.put('/quiz/:quizID', controller.updateQuiz)
router.delete('/quiz/:quizID', controller.deleteQuiz)
// router.get('/mbti', controller.getAllMbtiQuestions)

router.post('/mbti',fetchuser, controller.submitMbtiAnswers)

router.post('/eq', controller.SubmitEQAnswers)

// Publish quiz for students to take
router.patch('/quiz/:quizID/publish', controller.publishQuiz)
router.get('/quiz/:quizID/published/', controller.getPublishedQuiz)

router.get('/getpersonalityquiz', controller.getPersonalityQuiz)
router.get('/getemoquiz', controller.getEmoQuiz)

export default router