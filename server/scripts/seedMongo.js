import Quiz from './quizSchema.cjs'
import Result from './resultSchema.js'

const seedMongo = async () => {
  try {
    const quiz1 = new Quiz({
      name: 'Brain check',
      questionList: [
        {
          queNum: 1,
          question: "Which animal is known as the 'Ship of the Desert'?",
          options: {
            1: 'Camel',
            2: 'Dolphin',
            3: 'Turtle',
            4: 'Dawg',
          },
        },
        {
          queNum: 2,
          question: 'How many days are there in a week?',
          options: {
            1: '69',
            2: '420',
            3: '7',
            4: '24',
          },
        },
      ],
      answerList: {
        1: 1,
        2: 3,
      },
      isPublished: true,
    })

    const quiz2 = new Quiz({
      name: 'Natural Language Processing',
      questionList: [
        {
          queNum: 1,
          question: 'How many letters are there in the English alphabet?',
          options: {
            1: '26',
            2: '24',
            3: '27',
            4: '7',
          },
        },
        {
          queNum: 2,
          question: 'How many consonants are there in the English alphabet?',
          options: {
            1: '5',
            2: '21',
            3: '24',
            4: '26',
          },
        },
      ],
      answerList: {
        1: 1,
        2: 2,
      },
    })

    await Quiz.collection.drop()
    await Result.collection.drop()
    await quiz1.save()
    await quiz2.save()
    console.log('Added sample Quizzes!')

    // process.exit(0)
  } catch (err) {
    console.log(err)
    // process.exit(1)
  }
}

// seedMongo()
export default seedMongo
