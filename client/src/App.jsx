import React from 'react'
import './App.css'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentDashboard from './pages/StudentDashboard'
import Login from './pages/Login'
import Home from './pages/Home'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import TakeQuiz from './pages/Quiz'
import Leaderboard from './pages/Leaderboard'

function App() {

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { loggedIn: false, role: '' }

  return (
    <>

      <BrowserRouter >
        <Routes >
          {user.role ? (
            <>
              {user.role === 'teacher' ? (
                <Route path='/' element={<Navigate to='/teacherdashboard' />} />
              ) : (
                <Route path='/' element={<Navigate to='/studentdashboard' />} />
              )}
            </>
          ) : (
            <Route path='/' element={<Home />} />
          )}
          <Route path='/signin' element={<Signin />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/studentdashboard' element={<StudentDashboard />} />
          <Route path='/teacherdashboard' element={<TeacherDashboard />} />
          <Route path='/Leaderboard' element={<Leaderboard />} />
          <Route path="/quiz" element={<TakeQuiz />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
