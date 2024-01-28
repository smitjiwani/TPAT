import db from '../db.js';
import { Router } from 'express';
import { spawn } from 'child_process';
import { promisify } from 'util';

const router = Router();
const spawnAsync = promisify(spawn);

export const getReply = async (req, res) => {
  const { query } = req.body;

  try {
    const bot = await spawnAsync('python3', ['./run.py', `"${query}"`], { shell: true });

    let out = '';

    bot.stdout.on('data', (data) => {
      out = data.toString().split('\n')[1];
      console.log(out);
      console.log(data.toString());
    });

    bot.on('close', (code) => {
      console.log(`Child process exited with code ${code}`);

      try {
        const parsedOutput = JSON.parse(out);
        res.status(200).json(parsedOutput);
      } catch (error) {
        res.status(500).json({ error: 'Error parsing output' });
        console.error('Error parsing output:', error);
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    console.error('Error spawning child process:', error);
  }
};

