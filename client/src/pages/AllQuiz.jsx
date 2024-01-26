import React, { useEffect, useState } from 'react'
import QuizCard from '../components/QuizCard'

const AllQuiz = () => {

    const [quizzes, setQuizzes] = useState([])
    useEffect(() => {
        const getQuiz = async () => {
            try {
                const response = await fetch('/api/quiz')
                // const res = response.json()
                if (response.status === 200) {
                    const data = await response.json()
                    console.log(data)
                    setQuizzes(data)
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
        <div>
            {quizzes.map(quiz => {
                return (
                    <QuizCard key={quiz._id} id={quiz._id} quizName={quiz.name} />
                )
            })}
        </div>
    )
}

export default AllQuiz