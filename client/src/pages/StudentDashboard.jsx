import React, { useEffect, useState } from 'react'
import "../styles/StudentDashboard.css"
import TeacherCard from '../components/TeacherCard'


function StudentDashboard() {

  const [teachers, setTeachers] = useState([])

  const getTeachers = async () => {
    try {
      const response = await fetch('/api/teachers')
      const jsonData = await response.json()
      setTeachers(jsonData.teachers)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getTeachers()
  }, [])

  return (
    <div>
      <h1>Student Dashboard</h1>
      <p>Rate Your Teachers</p>
      {
        teachers.map(teacher => {
          return (
            <TeacherCard
              key={teacher.id}
              name={teacher.name}
              email={teacher.email}
              phone={teacher.phone}
              score={teacher.score}
            />
          )
        })
      }
    </div>
  )
}

export default StudentDashboard