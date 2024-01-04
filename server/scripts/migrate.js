import db from '../db.js'
import { v4 as uuidv4 } from 'uuid'

;(async () => {
  try {
    await db.schema.dropTableIfExists('teachers')
    await db.schema.withSchema('public').createTable('teachers', (table) => {
      table.uuid('teacherID').primary().defaultTo(uuidv4())
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('phone')
      table.integer('score').notNullable()
    })
    console.log('Created teachers table!')
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
      table.string('subjectID') 
      table.string('classID') 

      table.foreign('subjectID').references('studDashboard.subjectID')
      table.foreign('classID').references('studDashboard.classID')
    })
    console.log('Created students table!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()

;(async () => {
  try {
    await db.schema.dropTableIfExists('studDashboard')
    await db.schema.withSchema('public').createTable('studDashboard', (table) => {
      table.uuid('teacherID').defaultTo(uuidv4())
      table.string('classID').notNullable().unique()
      table.string('subjectID').notNullable().unique()
      table.primary(['classID', 'subjectID']);
    })
    console.log('Created stud_dashboard table!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()

