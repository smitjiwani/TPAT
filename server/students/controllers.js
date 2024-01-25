import db from '../db.js'
import * as queries from './queries.js'
import jwt from 'jsonwebtoken'

//controllers for student table

export const getAllStudents = async (req, res) => {
  try {
    const students = await queries.getAllStudents()
    res.status(200).json({ students })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const getStudentById = async (req, res) => {
  const { authtoken } = req.headers
  const data = jwt.verify(authtoken, JWT_SECRET)
  const id = data.user.studentID;
  try {
    const student = await queries.getStudentById(id)
    if (!student) {
      res.sendStatus(404)
    }
    res.sendStatus(200).json({ student })
  } catch (err) {
    res.sendStatus(400).json({ err })
  }
}

export const getStudentByEmail = async (req, res) => {
  const { email } = req.params
  try {
    const student = await queries.getStudentByEmail(email)
    if (!student) {
      res.status(404)
    }
    res.status(200).json({ student })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const createStudent = async (req, res) => {
  const { student } = req.body
  try {
    const newStudent = await queries.createStudent(student)
    res.status(200).json({ newStudent })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const updateStudent = async (req, res) => {
  const { id } = req.params
  const { student } = req.body
  try {
    const updatedStudent = await queries.updateStudent(id, student)
    res.status(200).json({ updatedStudent })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const deleteStudent = async (req, res) => {
  const { id } = req.params
  try {
    const deletedStudent = await queries.deleteStudent(id)
    res.status(200).json({ deletedStudent })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export default {
  getAllStudents,
  getStudentById,
  getStudentByEmail,
  createStudent,
  updateStudent,
  deleteStudent,
}
