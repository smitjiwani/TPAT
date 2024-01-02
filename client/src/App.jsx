import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {
        user.role === 'teacher' && <TeacherDashboard />
      }

      {
        user.role === 'student' && <StudentDashboard />
      }

      {
        !user.loggedIn && <LoginPrompt />
      }

    </>
  )
}

export default App
