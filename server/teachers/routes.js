import { Router } from 'express'
import * as controller from './controllers.js'

const router = Router()

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
 *           description: The auto-generated unique ID of the student.
 *         name:
 *           type: string
 *           description: The name of the student.
 *         email:
 *           type: string
 *           description: The email address of the student.
 *         phone:
 *           type: string
 *           description: The phone number of the student.
 *       example:
 *         id: 5
 *         name: teacher1
 *         email: teacher1@gmail.com
 *         password: password1
 *         phone: 1234567890
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
router.get('/:id', controller.getTeacherById)

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
router.put('/:id', controller.updateTeacher)

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

export default router
