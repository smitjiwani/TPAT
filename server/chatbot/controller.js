import db from '../db.js'
import { Router } from 'express'
import { spawn } from 'child_process'

const router = Router()

export const getReply = async (req, res) => {
  const { query } = req.body
  try {
    const bot = spawn('python3', ['./run.py', `"${query}"`])

    let out
    bot.stdout.on('data', (data) => {
      out = data.toString().split('\n')[1]
      console.log(out)
      console.log(data.toString())
    })
    console.log(out)
    console.log(JSON.parse(out))
    res.status(200).json(JSON.parse(out))
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
    console.error('Login error:', error)
  }
}
