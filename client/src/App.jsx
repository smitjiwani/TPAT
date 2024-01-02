import { useState } from 'react'
import './App.css'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentDashboard from './pages/StudentDashboard'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  // Created this temporarily for dev purposes
  const user = {
    role : 'teacher',
    loggedIn: true
  }

  return (
    <>
      {
        user.role === 'teacher' && <TeacherDashboard />
      }

      {
        user.role === 'student' && <StudentDashboard />
      }

      {
        !user.loggedIn && <Login />
      }

    </>
  )
}

export default App
