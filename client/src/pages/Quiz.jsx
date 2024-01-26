import React, { useState, useEffect } from 'react'
import { QuestionCard } from '../components/QuestionCard.jsx'

function TakeQuiz() {
  const [quiz, setQuiz] = useState({})
  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await fetch('/api/quiz/65b3bd091e4d32c28b00d064')
        const res = response.json()
        if (response.status === 200) {
          const data = await response.json()
          console.log(data)
          setQuiz(data)
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
        <QuestionCard questionList={quiz.questionList} />
      </div>
    </>
  )
}

export default TakeQuiz
