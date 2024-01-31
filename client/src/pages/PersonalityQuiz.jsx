import React, { useEffect, useState } from 'react'
import PersonalityQues from '../components/PersonalityQues'
import Modal from '../components/Modal'

const PersonalityQuiz = () => {
    const [quiz, setQuiz] = useState({})
    const [questions, setQuestions] = useState([])
    // const [answers, setAnswers] = useState([])
    // const [correctAns, setCorrectAns] = useState([])

    const handleAnswer = (qnum, ans) => {
        answers[qnum-1] = ans
    }

    const [mbti, setMbti] = useState("")
    const [personality, setPersonality] = useState("")
    const [showModal, setShowModal] = useState(false)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const authtoken = JSON.parse(localStorage.getItem("user")).authtoken
        const response = await fetch(`http://localhost:5000/api/quizzes/mbti`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': authtoken
            },
            body: JSON.stringify({answers})
        }).then(res => res.json());
        console.log(response)
        setMbti(response.mbtiType)
        setPersonality(response.personality)
        setShowModal(true);
    }

    let answers = []
    useEffect(() => {
        const getQuiz = async () => {
            try {
                const response = await fetch(`/api/quizzes/getpersonalityquiz`)
                // const res = response.json()
                if (response.status === 200) {
                    const data = await response.json()
                    console.log(data)
                    // Initializing answers with null
                    for (let i = 0; i < data.length; i++) {
                        answers.push(null)
                    }
                    setQuiz(data)
                    setQuestions(data)
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
            {/* <Navbar /> */}
            <div>
                {showModal && <Modal showModal={showModal} mbti={mbti} personality={personality} />}
                <h1>Quiz</h1>
                <form action="">
                    {questions.map((question) => {
                        return (
                            <PersonalityQues
                                key={question.qnum}
                                qnum={question.qnum}
                                question={question.question}
                                options={question.options}
                                handleAnswer={handleAnswer}
                            />
                        )
                    })}
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
                {/* <QuestionCard /> */}
            </div>
        </>
    )
}

export default PersonalityQuiz