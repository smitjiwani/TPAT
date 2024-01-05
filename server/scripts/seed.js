import db from '../db.js'
import { v4 as uuidv4 } from 'uuid'

const seed = async () => {
  try {
    // Insert into teachers table
    await db('teachers').insert({
      teacherID: uuidv4(),
      name: `teacher1`,
      email: 'teacher1@gmail.com',
      password: 'password1',
      phone: '1234567890',
      score: 0,
    })
    await db('teachers').insert({
      teacherID: uuidv4(),
      name: `teacher2`,
      email: 'teacher2@gmail.com',
      password: 'password2',
      phone: '1234567890',
      score: 0,
    })
    console.log('Added sample teachers!')

    // Insert into class table
    await db('class').insert({
      classID: 'sample-class-1',
      subjectID: 'sample-subject-1',
    })
    await db('class').insert({
      classID: 'sample-class-2',
      subjectID: 'sample-subject-2',
    })
    console.log('Added sample class!')

    // Insert into students table
    await db('students').insert({
      studentID: uuidv4(),
      name: `student1`,
      email: 'student1@gmail.com',
      password: 'password1',
      phone: '1234567890',
      subjectID: 'sample-subject-1',
      classID: 'sample-class-1',
    })
    await db('students').insert({
      studentID: uuidv4(),
      name: `student2`,
      email: 'student2@gmail.com',
      password: 'password2',
      phone: '1234567890',
      subjectID: 'sample-subject-2',
      classID: 'sample-class-2',
    })
    console.log('Added sample students!')

    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

seed()
