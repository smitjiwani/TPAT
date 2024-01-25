import db from '../db.js'

// queries for student table

export const getAllStudents = () => db('students').select('*')
// export const getAllStudent = (studentID) =>
//   db('students')
//     .join('class', function () {
//       this.on('students.classID', '=', 'class.classID').andOn(
//         'students.subjectID',
//         '=',
//         'class.subjectID',
//       )
//     })
//     .join('teachers', 'class.teacherID', '=', 'teachers.teacherID')
//     .select('students.*', 'teachers.* as teacher')

export const getStudentById = (studentID) =>
  db('students').where({ studentID }).select('*')
// export const getStudentById = (studentID) =>
//   db('students')
//     .join('class', function () {
//       this.on('students.classID', '=', 'class.classID').andOn(
//         'students.subjectID',
//         '=',
//         'class.subjectID',
//       )
//     })
//     .join('teachers', 'class.teacherID', '=', 'teachers.teacherID')
//     .select('students.*', 'teachers.* as teacher')
//     .where({
//       'students.studentID': studentID,
//     })
//     .first()

export const getStudentByEmail = (email) =>
  db('students').where({ email }).select('*')
// export const getStudentByEmail = (email) =>
//   db('students')
//     .join('class', function () {
//       this.on('students.classID', '=', 'class.classID').andOn(
//         'students.subjectID',
//         '=',
//         'class.subjectID',
//       )
//     })
//     .join('teachers', 'class.teacherID', '=', 'teachers.teacherID')
//     .select('students.*', 'teachers.* as teacher')
//     .where({
//       'students.email': email,
//     })
//     .first()

export const createStudent = (student) =>
  db('students').insert(student).returning('*')

export const updateStudent = (studentID, student) =>
  db('students').where({ studentID }).update(student).returning('*')

export const deleteStudent = (studentID) =>
  db('students').where({ studentID }).del().returning('*')
