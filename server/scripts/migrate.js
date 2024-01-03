import db from '../db.js'

;(async () => {
  try {
    await db.schema.dropTableIfExists('teachers')
    await db.schema.withSchema('public').createTable('teachers', (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('phone')
      table.numeric('score').notNullable()
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
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('phone')
    })
    console.log('Created students table!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()
