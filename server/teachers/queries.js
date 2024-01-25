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


