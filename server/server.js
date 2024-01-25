import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

import teacherRoutes from './teachers/routes.js'
import studentRoutes from './students/routes.js'
import classRoutes from './classes/routes.js'
import quizRoutes from './quiz/routes.js'

import takingQuizRoutes from './takeQuiz/routes.js'

import scoreRoutes from './score/routes.js'


import auth from './authentication/auth.js'
import seedMongo from './scripts/seedMongo.js'

const PORT = process.env.PORT || 5000
const PASS = process.env.PASS || 'password'

const conStr = `mongodb://admin:${PASS}@mongodb:27017/Quiz?authSource=admin`
mongoose
  .connect(conStr)
  .then(() => {
    console.log('Connected to MongoDB')
    seedMongo()
  })
  .catch((err) => {
    console.log(err)
  })

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API stuff',
      version: '1.0.0',
      description: 'API stuff for TPAT',
    },
    servers: [
      {
        url: `https://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./students/routes.js', './teachers/routes.js'],
}

const specs = swaggerJSDoc(options)

const app = express()
app.use(cors())

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

app.use('/api/teachers', teacherRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/classes', classRoutes)
app.use('/api/quiz', quizRoutes)

app.use('/api/takeQuiz', takingQuizRoutes)
app.use('/api/scores', scoreRoutes)


app.use('/api/auth', auth)

app.get('/', (req, res) => {
  res.send('Hello from homepage')
})
