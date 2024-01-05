import db from '../db.js'
import { v4 as uuidv4 } from 'uuid'

// for teacher table
;(async () => {
  try {
    await db.schema.dropTableIfExists('teachers')
    await db.schema.withSchema('public').createTable('teachers', (table) => {
      table.uuid('teacherID').defaultTo(uuidv4()).primary()
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('phone')
      table.integer('score').notNullable().defaultTo(0)
    })
    console.log('Created teachers table!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()

// for class table
;(async () => {
  try {
    await db.schema.dropTableIfExists('class')
    await db.schema
      .withSchema('public')
      .createTable('class', (table) => {
        table.uuid('teacherID').defaultTo(uuidv4())
        table.string('classID').notNullable().unique()
        table.string('subjectID').notNullable().unique()
        table.primary(['classID', 'subjectID'])
        table.foreign('teacherID').references('teachers.teacherID')
      })
    console.log('Created class table!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()


// for student table
;(async () => {
  try {
    await db.schema.dropTableIfExists('students')
    await db.schema.withSchema('public').createTable('students', (table) => {
      table.uuid('studentID').primary().defaultTo(uuidv4())
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('phone')
      table.string('subjectID').unique()
      table.string('classID').unique()

      table.foreign('subjectID').references('class.subjectID')
      table.foreign('classID').references('class.classID')
    })
    console.log('Created students table!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()

