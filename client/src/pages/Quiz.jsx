import React, { useState, useEffect } from 'react'
import QuestionCard from '../components/QuestionCard'
import { useParams } from 'react-router-dom'

function TakeQuiz() {

  const [quiz, setQuiz] = useState({})
  const [questions, setQuestions] = useState([])
  // const [answers, setAnswers] = useState([])
  const [correctAns, setCorrectAns] = useState([])

  const handleAnswer = (queNum, ans) => {
    answers[queNum] = ans;
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
            answers[i] = null;
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
      <div>
        <h1>Quiz</h1>
        {
          questions.map((question) => {

            return (
              <QuestionCard key={question._id} queNum={question.queNum} question={question.question} options={question.options} handleAnswer={handleAnswer} />
              )
            })
        }
        {/* <QuestionCard /> */}
      </div>
    </>
  )
}

export default TakeQuiz
