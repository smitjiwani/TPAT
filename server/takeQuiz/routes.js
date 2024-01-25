import { Router } from 'express'
import * as controller from './controllers.js'

const router = Router()

router.get('/:quizID', controller.startQuiz)
router.post('/:quizID', controller.submitQuiz)

export default router
