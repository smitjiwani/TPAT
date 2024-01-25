import { Router } from 'express'
import * as controller from './controllers.js'

const router = Router()


router.get('/', controller.getAllScores)
router.get('/getscore/review/:id', controller.getReviewScoreById)
router.get('/getscore/quiz/:id', controller.getQuizScoreById)
router.get('/getscore/course/:id', controller.getCourseScoreById)
router.get('/getscore/total/:id', controller.getTotalScoreById)
router.patch('/updatescore/review/:id', controller.updateReviewScoreById)

export default router