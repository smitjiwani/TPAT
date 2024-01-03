import { Router } from 'express';
const router = Router();
import db from '../db.js';

router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    let user;
    if (role === 'student') {
        user = await db('students').where({emal: username}).first();
    } else if (role === 'teacher') {
      user = await db('teachers').where({email: username}).first();
    }
    console.log(user)

    if (user && user.password === password) {
        res.json({
          id: user.id,
          username: user.email, 
          role: role,
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
