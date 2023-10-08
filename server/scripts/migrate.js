import db from '../db.js';

;(async () => {
  try {
    await db.schema.dropTableIfExists('teachers')
    await db.schema.withSchema('public').createTable('teachers', (table) => {
      table.increments('id')
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.string('name').notNullable()
      table.string('contact').notNullable()
    })
    console.log('Created teachers table!')
    await db.schema.dropTableIfExists('students')
    await db.schema.withSchema('public').createTable('students', (table) => {
      table.increments('id')
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.string('name').notNullable()
      table.string('contact').notNullable()
    })
    console.log('Created students table!')
    await db.schema.dropTableIfExists('classes')
    await db.schema.withSchema('public').createTable('classes', (table) => {
      table.increments('id')
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.string('name').notNullable()
      table.string('contact').notNullable()
    })
    console.log('Created classes table!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()
