import { Router } from 'express'
import * as controller from './controllers.js'
import fetchuser from '../middleware/fetchuser.js'

const router = Router()
// const auth = require('../authentication/auth.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated unique ID of the teacher.
 *         name:
 *           type: string
 *           description: The name of the teacher.
 *         email:
 *           type: string
 *           description: The email address of the teacher.
 *         password:
 *           type: string
 *           description: The password of the teacher.
 *         phone:
 *           type: string
 *           description: The phone number of the teacher.
 *         score:
 *          type: numeric
 *          description: The elo score give of the teacher
 *       example:
 *         id: 5
 *         name: teacher1
 *         email: teacher1@gmail.com
 *         password: password1
 *         phone: 1234567890
 *         score: 300
 */

/**
 * @swagger
 * tags:
 *  name: Teachers
 *  description: The teacher managing API
 */

/**
 * @swagger

 * /api/teachers:
 *  get:
 *    summary: Returns the list of teachers.
 *    tags: [Teachers]
 *    responses:
 *      200:
 *        description: The list of teachers.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Teacher'
 *      400:
 *        description: Bad Request
 */
router.get('/', controller.getAllTeachers)

/**
 * @swagger
 * /api/teachers/{id}:
 *  get:
 *    summary: Get teachers by their ID.
 *    tags: [Teachers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Teacher ID
 *    responses:
 *      200:
 *        description: The teacher by it's ID
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Teacher'
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Teacher not found.
 */
router.get('/getteacherbyid', fetchuser, controller.getTeacherById)

/**
 * @swagger
 * /api/teachers/email/{email}:
 *  get:
 *    summary: Get teachers by their email.
 *    tags: [Teachers]
 *    parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *        required: true
 *        description: The Teacher email
 *    responses:
 *      200:
 *        description: The teacher by it's email
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Teacher'
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Teacher not found.
 */
router.get('/email/:email', controller.getTeacherByEmail)

/**
 * @swagger
 * /api/teachers:
 *  post:
 *    summary: Create new teacher entry.
 *    tags: [Teachers]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Teacher'
 *    responses:
 *      200:
 *        description: The teacher was successfully added.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Teacher'
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Teacher not found.
 */
router.post('/', controller.createTeacher)

/**
 * @swagger
 * /api/teachers/{id}:
 *  put:
 *    summary: Update teacher by their ID.
 *    tags: [Teachers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The teacher ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Teacher'
 *    responses:
 *      200:
 *        description: The teacher was successfully added.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Teacher'
 *      400:
 *        description: Bad Request
 */
router.put('/:id', fetchuser, controller.updateTeacher)

/**
 * @swagger
 * /api/teachers/{id}:
 *  delete:
 *    summary: Remove teachers by their ID.
 *    tags: [Teachers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Teacher ID
 *    responses:
 *      200:
 *        description: The teacher was successfully deleted.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Teacher'
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Teacher not found.
 */
router.delete('/:id', controller.deleteTeacher)

/**
 * @swagger
 * /api/teachers/{id}:
 *  patch:
 *    summary: Update teacher's score by their ID.
 *    tags: [Teachers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The teacher ID and score
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Teacher'
 *    responses:
 *      200:
 *        description: The teacher's score was successfully added.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Teacher'
 *      400:
 *        description: Bad Request
 */
router.get('/getscore/review', fetchuser, controller.getReviewScoreById)
router.get('/getscore/quiz', fetchuser, controller.getQuizScoreById)
router.get('/getscore/course', fetchuser, controller.getCourseScoreById)
router.get('/getscore/total', fetchuser, controller.getTotalScoreById)
router.patch('/updatescore/review/:id', controller.updateReviewScoreById)

router.get('/leaderboard', controller.getLeaderboard)

// router.use('/auth', auth);

export default router
