import { Router } from 'express'
import * as controller from './controllers.js'

const router = Router()

router.get('/', controller.getQuiz)
router.post('/', controller.createQuiz)
router.get('/:quizID', controller.getQuizById)
router.put('/:quizID', controller.updateQuiz)
router.delete('/:quizID', controller.deleteQuiz)

// Publish quiz for students to take
router.patch('/:quizID/publish', controller.publishQuiz)
router.get('/published/', controller.getPublishedQuiz)

export default router
