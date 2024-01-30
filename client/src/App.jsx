import React from 'react'
import './App.css'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentDashboard from './pages/StudentDashboard'
import Login from './pages/Login'
import Home from './pages/Home'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from './pages/Signup'

import TakeQuiz from './pages/Quiz'
import Leaderboard from './pages/Leaderboard'
import AllQuiz from './pages/AllQuiz'
import PersonalityQuiz from './pages/PersonalityQuiz'

function App() {

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { loggedIn: false, role: '' }

  return (
    <>

      <BrowserRouter >
        <Routes >

          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/studentdashboard' element={<StudentDashboard />} />
          <Route path='/teacherdashboard' element={<TeacherDashboard />} />
          <Route path='/Leaderboard' element={<Leaderboard />} />
          <Route path="/allquiz/:id" element={<TakeQuiz />} />
          <Route path="/allquiz" element={<AllQuiz />} />
          <Route path="/personalityquiz" element={<PersonalityQuiz />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
