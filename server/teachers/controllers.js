import db from '../db.js'
import * as queries from './queries.js'

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await queries.getAllTeachers
    res.status(200).json({ teachers })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const getTeacherById = async (req, res) => {
  const { id } = req.params
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
  const { id } = req.params
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

export const updateScore = async (req, res) => {
  const { id, score } = req.params
  try {
    const currentScore = await queries.getScoreById(id)
    if (score == 5) {
      score = 200
    } else if (score == 4) {
      score = 100
    } else if (score == 3) {
      score = 0
    } else if (score == 2) {
      score = -100
    } else if (score == 1) {
      score = -200
    }
    score = currentScore + score
    const changedScore = await queries.updateScoreById(id, score)
    res.status(200).json({ changedScore })
  } catch (err) {
    res.status(400).json({ err })
  }
}
