import { Router } from 'express'
import * as controller from './controllers.js'
import fetchuser from '../middleware/fetchuser.js'

const router = Router()

router.get('/:quizID', controller.startQuiz)
router.post('/:quizID', fetchuser, controller.submitQuiz)

export default router
