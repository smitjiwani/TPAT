import db from '../db.js'
import * as queries from './queries.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET = '31b1e3f4bf16aab56c07a77e79866aec92514dc4300115d8e5a1300711e86842'

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await queries.getAllTeachers()
    res.status(200).json({ teachers })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export const getTeacherById = async (req, res) => {
  const id = req.user.teacherID
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

export const getLeaderboard = async (req, res) => {
  try {
    const LeaderBoard = await queries.getLeaderboard()
    res.status(200).json({ LeaderBoard })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: err.message })
  }
}

export const getStudentGrades = async (req, res) => {
  try {
    const scores = await queries.getStudentGrades(req.params.teacherID)
    let s = []
    for (let score of scores) {
      s.push({
        subjectID: score.subjectID,
        classID: score.classID,
        studentID: score.studentID,
        grade: score.grade,
      })
    }
    res.status(200).json({ teacherID: req.params.teacherID, subjects: s })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const updateExamScoreById = async (req, res) => {
  try {
    const teacherID = req.user.id;
    const grades = await queries.getOnlyGrades(teacherID);

    const gradeMap = {
      'O': 3,
      'D+': 2,
      'D': 1,
      'A+': -1,
      'A': -2,
      'B': -3,
      'C': -4,
      'U': -5,
    };

    let totalScore = 0;
    for (let grade of grades) {
      totalScore += gradeMap[score] || 0;
    }

    totalScore = Math.max(Math.min(totalScore, 20), -20);

    // Update exam score for the teacher in the database
    await queries.updateExamScoreById(teacherID, totalScore);
    res.status(200).json({ teacherID, examScore: totalScore });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const getMyClasses = async (req, res) => {
  const id = req.user.teacherID
  try{
    const classes = await queries.getMyClasses(id)
    res.status(200).json({classes: classes})
  }
  catch(err){
    console.error(err);
    res.status(500).json({error: err.message});
  }
}

export const getReviews = async (req, res) => {
  try {
    const teacherID = req.user.id
    const reviews = await queries.getRewviews(teacherID)
    res.status(200).json({ reviews })
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
