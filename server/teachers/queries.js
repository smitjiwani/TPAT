import db from '../db.js'

export const getAllTeachers = () => db('teachers').select('*')

export const getTeacherById = (teacherID) =>
  db('teachers').where({ teacherID }).select('*')

export const getTeacherByEmail = (email) =>
  db('teachers').where({ email }).select('*')

export const createTeacher = (teacher) =>
  db('teachers').insert(teacher).returning('*')

export const updateTeacher = (teacherID, name, email, phone) =>
  db('teachers').where({ teacherID }).update({name: name, email:email, phone:phone}).returning('*')

export const deleteTeacher = (teacherID) =>
  db('teachers').where({ teacherID }).del().returning('*')

export const getReviewScoreById = (teacherID) =>
  db('teachers')
    .where({ teacherID })
    .select('reviewScore')
    .first()
    .then((result) => result.reviewScore)

export const getQuizScoreById = (teacherID) =>
  db('teachers')
    .where({ teacherID })
    .select('quizScore')
    .first()
    .then((result) => result.quizScore)

export const getCourseScoreById = (teacherID) =>
  db('teachers')
    .where({ teacherID })
    .select('courseScore')
    .first()
    .then((result) => result.courseScore)

export const getTotalScoreById = (teacherID) =>
  db('teachers')
    .where({ teacherID })
    .select('totalScore')
    .first()
    .then((result) => result.totalScore)

export const updateReviewScoreById = (teacherID, newScore) => {
  const score = parseFloat(newScore)
  return db('teachers')
    .where({ teacherID })
    .update({ reviewScore: score })
    .returning('reviewScore')
}

export const updateQuizScoreById = (teacherID, newScore) => {
  const score = parseFloat(newScore)
  return db('teachers')
    .where({ teacherID })
    .update({ quizScore: score })
    .returning('quizScore')
}

export const updateExamScoreById = (teacherID, newScore) => {
  const score = parseFloat(newScore)
  return db('teachers')
    .where({ teacherID })
    .update({ courseScore: score })
    .returning('courseScore')
}

export const updateTotalScoreById = (teacherID, newScore) => {
  const score = parseFloat(newScore)
  return db('teachers')
    .where({ teacherID })
    .update({ totalScore: score })
    .returning('totalScore')
}

export const getLeaderboard = () => {
  return db('teachers').orderBy('totalScore', 'desc', 'last')
}

export const getStudentGrades = (teacherID) =>
  db('grades').where({ teacherID }).select('*')

export const getOnlyGrades = (teacherID) =>
  db('grades').where({ teacherID }).select('grade')

export const getMyClasses = (teacherID) => {
  return db('classes')
    .where({ teacherID })
    .select('*');
}

export const getReviews = (teacherID) =>
  db('reviews')
    .where({ teacherID })
    .select('*')

  
export const getAllReviews = () =>
  db('reviews')
    .select('*')

export const updatembtiteacher = (teacherID, mbti) =>
 db('teachers')
  .where({ teacherID })
  .update({ mbti })
  .returning('*')