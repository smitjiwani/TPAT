import db from '../db.js'
import * as queries from './queries.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET = "31b1e3f4bf16aab56c07a77e79866aec92514dc4300115d8e5a1300711e86842"

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await queries.getAllTeachers()
    res.status(200).json({ teachers })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const getTeacherById = async (req, res) => {
  const id = req.user.teacherID;
  try {
    const teacher = await queries.getTeacherById(id)
    res.status(200).json({ teacher })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const getTeacherByEmail = async (req, res) => {
  const { email } = req.params
  try {
    const teacher = await queries.getTeacherByEmail(email)
    res.status(200).json({ teacher })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const createTeacher = async (req, res) => {
  const { teacher } = req.body
  try {
    const newTeacher = await queries.createTeacher(teacher)
    res.status(200).json({ newTeacher })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const updateTeacher = async (req, res) => {
  const { id } = req.user.id
  const { teacher } = req.body
  try {
    const updatedTeacher = await queries.updateTeacher(id, teacher)
    res.status(200).json({ updatedTeacher })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const deleteTeacher = async (req, res) => {
  const { id } = req.params
  try {
    const deletedTeacher = await queries.deleteTeacher(id)
    res.status(200).json({ deletedTeacher })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const getReviewScoreById = async (req, res) => {
  const { id } = req.user.teacherID
  try {
    const score = await queries.getReviewScoreById(id)
    res.status(200).json({ score })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const getQuizScoreById = async (req, res) => {
  const { id } = req.user.teacherID
  try {
    const score = await queries.getQuizScoreById(id)
    res.status(200).json({ score })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const getCourseScoreById = async (req, res) => {
  const { id } = req.user.teacherID
  try {
    const score = await queries.getCourseScoreById(id)
    res.status(200).json({ score })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const getTotalScoreById = async (req, res) => {
  const { id } = req.user.teacherID
  try {
    const score = await queries.getTotalScoreById(id)
    res.status(200).json({ score })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const updateReviewScoreById = async (req, res) => {
  try {
    const { id } = req.params
    const { score } = req.body
    const prevScore = await queries.getReviewScoreById(id)
    console.log(prevScore)
    console.log(score)
    const updatedScore = ((prevScore + parseFloat(score)) / 2).toFixed(2)
    console.log(updatedScore)
    await queries.updateReviewScoreById(id, updatedScore)
    res.status(200).json({ updatedScore })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: err.message })
  }
}