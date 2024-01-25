import db from '../db.js'

export const getAllTeachers = () => db('teachers').select('*')

export const getTeacherById = (teacherID) =>
  db('teachers').where({ teacherID }).select('*')

export const getTeacherByEmail = (email) =>
  db('teachers').where({ email }).select('*')

export const createTeacher = (teacher) =>
  db('teachers').insert(teacher).returning('*')

export const updateTeacher = (teacherID, teacher) =>
  db('teachers').where({ teacherID }).update(teacher).returning('*')

export const deleteTeacher = (teacherID) =>
  db('teachers').where({ teacherID }).del().returning('*')

export const getScoreById = (teacherID) =>
  db('teachers')
    .where({ teacherID })
    .select('score')
    .first()
    .then((result) => result.score)

export const updateScoreById = (teacherID, newScore) => {
  const score = parseInt(newScore)
  return db('teachers')
    .where({ teacherID })
    .update({ score })
    .returning('score')
}
