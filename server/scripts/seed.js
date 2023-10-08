import db from '../db.js';

;(async () => {
  try {
    await db('teachers').insert({
      email: `teacher1@example.com`,
      password: `qwertyui`,
      name: "teacher1",
      contact: "9876543210",
    })
    await db('teachers').insert({
      email: `teacher2@example.com`,
      password: `qwertyui`,
      name: "teacher2",
      contact: "9876543210",
    })

    await db('students').insert({
      email: `student1@example.com`,
      password: `qwertyui`,
      name: "student1",
      contact: "9876543210",
    })
    await db('students').insert({
      email: `student2@example.com`,
      password: `qwertyui`,
      name: "student2",
      contact: "9876543210",
    })

    await db('classes').insert({
      email: `class1@example.com`,
      password: `qwertyui`,
      name: "class1",
      contact: "9876543210",
    })
    await db('classes').insert({
      email: `class2@example.com`,
      password: `qwertyui`,
      name: "class2",
      contact: "9876543210",
    })

    console.log('Added sample descriptions!')
    process.exit(0)
  } catch (err) {
    console.log(1)
    process.exit(1)
  }
})()
