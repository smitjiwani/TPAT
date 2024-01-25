import db from '../db.js'
import * as queries from './queries.js'

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await queries.getAllTeachers()
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
  const { id } = req.params
  const { score } = req.body
  try {
    const prevScore = await queries.getScoreById(id)
    console.log(prevScore)
    console.log(score)
    const updatedScore = (prevScore + parseInt(score)) / 2
    console.log(updatedScore)
    await queries.updateScoreById(id, updatedScore)
    res.status(200).json({ updatedScore })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: err.message })
  }
}
