import * as controller from './controller.js'
import { Router } from 'express'

const router = Router()

router.post('/', controller.getReply)

export default router
