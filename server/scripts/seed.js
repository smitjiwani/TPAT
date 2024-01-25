import db from '../db.js'
import { v4 as uuidv4 } from 'uuid'

const teacherID = uuidv4()
const teacherID2 = uuidv4()
const classID = uuidv4()
const classID2 = uuidv4()
const studentID = uuidv4()
const studentID2 = uuidv4()

const seed = async () => {
  try {
    // Insert into teachers table
    await db('teachers').insert({
      teacherID: teacherID,
      name: `teacher1`,
      email: 'teacher1@gmail.com',
      password: 'password1',
      phone: '1234567890',
      score: 0,
    })
    await db('teachers').insert({
      teacherID: teacherID2,
      name: `teacher2`,
      email: 'teacher2@gmail.com',
      password: 'password2',
      phone: '1234567890',
      score: 0,
    })
    console.log('Added sample teachers!')

    // Insert into class table
    await db('classes').insert({
      classID: classID,
      subjectID: 'sample-subject-1',
    })
    await db('classes').insert({
      classID: classID2,
      subjectID: 'sample-subject-2',
    })
    console.log('Added sample class!')

    // Insert into students table
    await db('students').insert({
      studentID: studentID,
      name: `student1`,
      email: 'student1@gmail.com',
      password: 'password1',
      phone: '1234567890',
      subjectID: 'sample-subject-1',
      classID: classID,
    })
    await db('students').insert({
      studentID: studentID2,
      name: `student2`,
      email: 'student2@gmail.com',
      password: 'password2',
      phone: '1234567890',
      subjectID: 'sample-subject-2',
      classID: classID2,
    })
    console.log('Added sample students!')

    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

seed()
