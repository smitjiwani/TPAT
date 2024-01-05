import db from '../db.js'

const migrate = async () => {
  try {
    // Drop tables
    await db.schema.withSchema('public').dropTableIfExists('students')
    await db.schema.withSchema('public').dropTableIfExists('class')
    await db.schema.withSchema('public').dropTableIfExists('teachers')
    console.log('Dropped tables!')

    // Create teachers table
    await db.schema.withSchema('public').createTable('teachers', (table) => {
      table.uuid('teacherID').primary()
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('phone')
      table.integer('score').notNullable().defaultTo(0)
    })
    console.log('Created teachers table!')

    // Create class table
    await db.schema.withSchema('public').createTable('class', (table) => {
      table.uuid('teacherID')
      table.string('classID').notNullable().unique()
      table.string('subjectID').notNullable().unique()
      table.primary(['classID', 'subjectID'])
      table.foreign('teacherID').references('teachers.teacherID')
    })
    console.log('Created class table!')

    // Create students table
    await db.schema.withSchema('public').createTable('students', (table) => {
      table.uuid('studentID').primary()
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
}

migrate()
