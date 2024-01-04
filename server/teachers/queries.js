import db from '../db.js'

export const getAllTeachers = db('teachers').select('*')

export const getTeacherById = (id) => db('teachers').where({ id }).select('*')

export const getTeacherByEmail = (email) =>
  db('teachers').where({ email }).select('*')

export const createTeacher = (teacher) =>
  db('teachers').insert(teacher).returning('*')

export const updateTeacher = (id, teacher) =>
  db('teachers').where({ id }).update(teacher).returning('*')

export const deleteTeacher = (id) =>
  db('teachers').where({ id }).del().returning('*')

export const getScoreById = (id) => db('teachers').where({ id }).select('score')

export const updateScoreById = (id, score) =>
  db('teachers').where({ id }).update(score).returning('score')
