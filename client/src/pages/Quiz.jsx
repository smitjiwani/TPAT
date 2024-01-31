import React, { useState, useEffect } from 'react'
import QuestionCard from '../components/QuestionCard'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

function TakeQuiz() {
  const [quiz, setQuiz] = useState({})
  const [questions, setQuestions] = useState([])
  // const [answers, setAnswers] = useState([])
  const [correctAns, setCorrectAns] = useState([])

  const handleAnswer = (queNum, ans) => {
    answers[queNum] = ans
    console.log(answers)
  }

  let answers = {}
  const { id } = useParams()
  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await fetch(`/api/quiz/${id}`)
        // const res = response.json()
        if (response.status === 200) {
          const data = await response.json()
          console.log(data)
          // Initializing answers with null
          for (let i = 0; i < data.length; i++) {
            answers[i] = null
          }
          setQuiz(data)
          setQuestions(data.questionList)
          setCorrectAns(data.answerList)
        } else {
          console.error('Error:', response.status)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
    getQuiz()
  }, [])

  return (
    <>
      <Navbar />
      <div>
        <h1>Quiz</h1>
        <form action="">
          {questions.map((question) => {
            return (
              <QuestionCard
                key={question._id}
                queNum={question.queNum}
                question={question.question}
                options={question.options}
                handleAnswer={handleAnswer}
              />
            )
          })}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        {/* <QuestionCard /> */}
      </div>
    </>
  )
}

export default TakeQuiz
