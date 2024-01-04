import db from '../db.js'

// for teacher table
;(async () => {
  try {
    await db('teachers').insert({
      name: `teacher1`,
      email: 'teacher1@gmail.com',
      password: 'password1',
      phone: '1234567890',
      score: 0,
    })
    await db('teachers').insert({
      name: `teacher2`,
      email: 'teacher2@gmail.com',
      password: 'password2',
      phone: '1234567890',
      score: 0,
    })
    console.log('Added sample teachers!')
    process.exit(0)
  } catch (err) {
    console.log(1)
    process.exit(1)
  }
})()

// for student table
;(async () => {
  try {
    await db('students').insert({
      name: `student1`,
      email: 'student1@gmail.com',
      password: 'password1',
      phone: '1234567890',
      subjectID: 'sample-subject-1',
      classID: 'sample-class-1',
    })
    await db('students').insert({
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
    console.log(1)
    process.exit(1)
  }
})()

// for class table
;(async () => {
  try {
    await db('class').insert({
      teacherID: 'sample-uuid-1',
      classID: 'sample-class-1',
      subjectID: 'sample-subject-1',
    })
    await db('class').insert({
      teacherID: 'sample-uuid-2',
      classID: 'sample-class-2',
      subjectID: 'sample-subject-2',
    })
    console.log('Added sample class!')
    process.exit(0)
  } catch (err) {
    console.log(1)
    process.exit(1)
  }
})()
