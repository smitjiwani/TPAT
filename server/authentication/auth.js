const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    let user;
    if (role === 'student') {
      user = await db.getStudentByUsernameAndPassword(username, password);
    } else if (role === 'teacher') {
      user = await db.getTeacherByUsernameAndPassword(username, password);
    }

    if (user) {
      res.json({
        id: user.id,
        username: user.username,
        role: user.role,
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
