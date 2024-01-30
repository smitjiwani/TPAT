import db from '../db.js'

const migrate = async () => {
  try {
    // Drop tables
    await db.raw('DROP TABLE IF EXISTS public.teachers CASCADE')
    await db.raw('DROP TABLE IF EXISTS public.classes CASCADE')
    await db.raw('DROP TABLE IF EXISTS public.students CASCADE')
    await db.raw('DROP TABLE IF EXISTS public.grades CASCADE')
    await db.raw('DROP TABLE IF EXISTS public.reviews CASCADE')
    console.log('Dropped tables!')

    // Create teachers table
    await db.schema.withSchema('public').createTable('teachers', (table) => {
      table.uuid('teacherID').primary().defaultTo(db.fn.uuid())
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('phone')
      table.specificType('classID', 'uuid ARRAY')
      table.float('reviewScore').defaultTo(0)
      table.float('quizScore').defaultTo(0)
      table.float('courseScore').defaultTo(0)
      table.float('totalScore').defaultTo(0)
      table.specificType('prevReviewScore', 'float ARRAY')
      table.specificType('prevQuizScore', 'float ARRAY')
      table.specificType('prevCourseScore', 'float ARRAY')
      table.specificType('prevTotalScore', 'float ARRAY')
    })
    console.log('Created teachers table!')

    // Create class table
    await db.schema.withSchema('public').createTable('classes', (table) => {
      table.uuid('teacherID')
      table.uuid('classID').notNullable().defaultTo(db.fn.uuid()).primary()
      table.string('subjectName').notNullable()
      table.enum('year', ['1', '2', '3', '4'])
      table.enum('semester', ['1', '2'])
      table.enum('course', [
        'AI',
        'CompSci',
        'Electronics',
        'Mechanical',
        'Civil',
        'Chemical',
        'Electrical',
        'IT',
        'Biotech',
        'BioMed',
      ])
    })
    console.log('Created class table!')

    // Create students table
    await db.schema.withSchema('public').createTable('students', (table) => {
      table.uuid('studentID').primary().defaultTo(db.fn.uuid())
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('phone')
      table.string('subjectID')
      table.specificType('classID', 'uuid ARRAY')
    })
    console.log('Created students table!')

    // Create grades table
    await db.schema.withSchema('public').createTable('grades', (table) => {
      table.uuid('teacherID')
      table.uuid('studentID')
      table.uuid('classID').defaultTo(db.fn.uuid())
      table.string('subjectID')
      table.string('grade')
    })
    console.log('Created grades table!')

    // Create reviews table
    await db.schema.withSchema('public').createTable('reviews', (table) => {
      table.uuid('reviewID').primary().defaultTo(db.fn.uuid())
      table.uuid('teacherID')
      table.uuid('studentID')
      table.text('review')
      table.integer('likes').defaultTo(0)
      table.integer('dislikes').defaultTo(0)
      table.string('label')
    })
    console.log('Created reviews table!')

    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

migrate()
