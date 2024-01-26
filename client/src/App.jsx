import { useState } from 'react'
import './App.css'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentDashboard from './pages/StudentDashboard'
import Login from './pages/Login'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import TakeQuiz from './pages/Quiz'
import Leaderboard from './pages/Leaderboard'

function App() {
  const [count, setCount] = useState(0)

  // Created this temporarily for dev purposes
  // const user = {
  //   role: 'student',
  //   loggedIn: false
  // }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route path="/quiz" element={<TakeQuiz />} />
        </Routes>
      </BrowserRouter>

      {/* {
        user.loggedIn && user.role === 'teacher' && <TeacherDashboard />
      }

      {
        user.loggedIn && user.role === 'student' && <StudentDashboard />
      }

      {
        !user.loggedIn && <Login /> */}
    </>
  )
}

export default App
