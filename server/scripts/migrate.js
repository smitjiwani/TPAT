import db from '../db.js'

const migrate = async () => {
  try {
    // Drop tables
    await db.raw('DROP TABLE IF EXISTS public.teachers CASCADE');
    await db.raw('DROP TABLE IF EXISTS public.classes CASCADE');
    await db.schema.withSchema('public').dropTableIfExists('classes')
    await db.schema.withSchema('public').dropTableIfExists('students')
    await db.schema.withSchema('public').dropTableIfExists('teachers')
    console.log('Dropped tables!')

    // Create teachers table
    await db.schema.withSchema('public').createTable('teachers', (table) => {
      table.uuid('teacherID').primary().defaultTo(db.fn.uuid())
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('phone')
      table.float('reviewScore').defaultTo(0)
      table.float('quizScore').defaultTo(0)
      table.float('courseScore').defaultTo(0)
      table.float('totalScore').defaultTo(0)
    })
    console.log('Created teachers table!')

    // Create class table
    await db.schema.withSchema('public').createTable('classes', (table) => {
      table.uuid('teacherID')
      table.uuid('classID').notNullable().defaultTo(db.fn.uuid()).primary()
      table.string('subjectName').notNullable()
      table.enum('year', ['1', '2', '3', '4'])
      table.enum('semester', ['1', '2'])
      table.enum('course', ['AI', 'CompSci', 'Electronics', 'Mechanical', 'Civil', 'Chemical', 'Electrical', 'IT', 'Biotech', 'BioMed'])
      table.foreign('teacherID').references('teachers.teacherID')
    })
    console.log('Created class table!')


    await db.schema.withSchema('public').createTable('students', (table) => {
      table.uuid('studentID').primary().defaultTo(db.fn.uuid())
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('phone')
      table.string('subjectID').unique()
      table.uuid('classID').unique()
      table.foreign('classID').references('classes.classID')
    })
    console.log('Created students table!')

    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

migrate()
