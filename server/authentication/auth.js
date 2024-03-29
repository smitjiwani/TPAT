import { Router } from 'express';
import db from '../db.js'
import jwt from 'jsonwebtoken';
const router = Router();

const JWT_SECRET = "31b1e3f4bf16aab56c07a77e79866aec92514dc4300115d8e5a1300711e86842"

router.get('/login', (req, res) => {
  res.send('Hello from auth');
});

router.post('/register', async (req, res) => {

  const { username, email, password, role, phone } = req.body;
  console.log(process.env.JWT_SECRET)

  
  try {
    let user;
    if (role === 'student') {
      user = await db('students').insert({ name: username, email: email, password: password, phone: phone }).returning('*');
    } else if (role === 'teacher') {
      user = await db('teachers').insert({ name: username, email: email, password: password, phone: phone }).returning('*');
    }

    console.log(user)
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;
    if (role === 'student') {
      user = await db('students').where({ email: email }).first();
    } else if (role === 'teacher') {
      user = await db('teachers').where({ email: email }).first();
    }
    console.log(user)

    const authtoken = jwt.sign({user: user}, JWT_SECRET)
    if (user && user.password === password) {
      res.status(200).json({
        authtoken: authtoken,
        status: 'success'
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    console.error('Login error:', error);
  }
});

export default router;
