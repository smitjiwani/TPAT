import { Router } from 'express'
import * as controller from './controllers.js'

const router = Router()

router.post('/', controller.createQuiz)
router.get('/:quizID', controller.getQuiz)
router.put('/', controller.updateQuiz)
router.delete('/:quizID', controller.deleteQuiz)

// Publish quiz for students to take
router.patch('/:quizID', controller.publishQuiz)

export default router
