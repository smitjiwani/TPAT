// const db = require('../db')
import db from '../db.js';

// ;(async () => {
//   try {
//     await db('todos').insert({description: `Add names in 'Collaborators' section in README.md`})
//     await db('todos').insert({description: 'Setup Docker'})
//     console.log('Added sample descriptions!')
//     process.exit(0)
//   } catch (err) {
//     console.log(1)
//     process.exit(1)
//   }
// })()



;(async () => {
  try {
    await db('teachers').insert({
      name: `teacher1`,
      email: 'teacher1@gmail.com',
      password: 'password1',
      phone: '1234567890'
    })
    await db('teachers').insert({
        name: `teacher2`,
        email: 'teacher2@gmail.com',
        password: 'password2',
        phone: '1234567890'
      })
    console.log('Added sample teachers!')
    process.exit(0)
  } catch (err) {
    console.log(1)
    process.exit(1)
  }
}
)();

// for student table

; (async () => {
  try {
    await db('students').insert({
        name: `student1`,
        email: 'student1@gmail.com',
        password: 'password1',
        phone: '1234567890'
      })
    await db('students').insert({
        name: `student2`,
        email: 'student2@gmail.com',
        password: 'password2',
        phone: '1234567890'
      })
    console.log('Added sample students!')
    process.exit(0)
  } catch (err) {
    console.log(1)
    process.exit(1)
  }
})();

