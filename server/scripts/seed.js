import db from '../db.js'
import { v4 as uuidv4 } from 'uuid'

const teacherID = uuidv4()
const teacherID2 = uuidv4()
const classID = uuidv4()
const classID2 = uuidv4()
const studentID = uuidv4()
const studentID2 = uuidv4()
const scoreID = uuidv4()

const seed = async () => {
  try {
    // Insert into teachers table
    await db('teachers').insert({
      teacherID: teacherID,
      name: `teacher1`,
      email: 'teacher1@gmail.com',
      password: 'password1',
      phone: '1234567890',
      reviewScore: 4,
      quizScore: 8,
      courseScore: 17,
      totalScore: 29,
    })
    await db('teachers').insert({
      teacherID: teacherID2,
      name: `teacher2`,
      email: 'teacher2@gmail.com',
      password: 'password2',
      phone: '1234567890',
      reviewScore: 5,
      quizScore: 10,
      courseScore: 15,
      totalScore: 30,
    })
    console.log('Added sample teachers!')

    // Insert into class table
    await db('classes').insert({
      classID: classID,
      subjectName: 'Sample Subject 1',
      year: '1',
      semester: '1',
      course: 'AI',
    })
    await db('classes').insert({
      classID: classID2,
      subjectName: 'Sample Subject 2',
      year: '2',
      semester: '2',
      course: 'CompSci',
    })
    console.log('Added sample classes!')

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
