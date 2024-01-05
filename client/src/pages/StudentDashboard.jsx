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
      console.log(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getTeachers()
    console.log(teachers)
  }, [])

  return (
    <div>
      <h1>Student Dashboard</h1>
      <p>Rate Your Teachers</p>
      {
        teachers.map(teacher => {
          console.log(teacher.teacherID)
          return (
            <TeacherCard
              key={teacher.teacherID}
              id={teacher.teacherID}
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