import db from '../db.js'
import * as queries from './queries.js'

export const getReviewScoreById = async (req, res) => {
    const { id } = req.params
    try {
      const score = await queries.getReviewScoreById(id)
      res.status(200).json({ score })
    } catch (err) {
      res.status(400).json({ err })
    }
  }

export const getQuizScoreById = async (req, res) => {
    const { id } = req.params
    try {
      const score = await queries.getQuizScoreById(id)
      res.status(200).json({ score })
    } catch (err) {
      res.status(400).json({ err })
    }
  }

export const getCourseScoreById = async (req, res) => {
    const { id } = req.params
    try {
      const score = await queries.getCourseScoreById(id)
      res.status(200).json({ score })
    } catch (err) {
      res.status(400).json({ err })
    }
  }
  
export const getTotalScoreById = async (req, res) => {
    const { id } = req.params
    try {
      const score = await queries.getTotalScoreById(id)
      res.status(200).json({ score })
    } catch (err) {
      res.status(400).json({ err })
    }
  }

export const updateReviewScoreById = async (req, res) => {
    const { id } = req.params
    const { score } = req.body
    try {
      const prevScore = await queries.getReviewScoreById(id)
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
  