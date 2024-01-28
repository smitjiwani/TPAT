import React, { useEffect, useState } from 'react'
import '../styles/StudentDashboard.css'
import TeacherCard from '../components/TeacherCard'
import Navbar from '../components/Navbar'

function StudentDashboard() {
  const [teachers, setTeachers] = useState([])
  const [student, setStudent] = useState({})

  if (!localStorage.getItem('user')) {
    window.location.replace('/login')
  }

  if (JSON.parse(localStorage.getItem('user')).role !== 'student') {
    window.location.replace('/')
  }



  const getStudentInfo = async () => {
    try {
      const authtoken = JSON.parse(localStorage.getItem('user')).authtoken
      const response = await fetch('/api/students/getstudentbyid', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          authtoken: authtoken,
        },
      })

      if (response.status === 200) {
        const data = await response.json()
        setStudent(data.student[0])
      } else {
        console.error('Error:', response.status)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

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
    getStudentInfo()
  }, [])

  return (
    <>
      <Navbar />
      <div>
        <h1>Student Dashboard</h1>
        <h2>{student.name}</h2>
        <p>{student.email}</p>
        <p>{student.phone}</p>
        <p>Rate Your Teachers</p>
        {teachers.map((teacher) => {
          return (
            <TeacherCard
              key={teacher.teacherID}
              id={teacher.teacherID}
              name={teacher.name}
              email={teacher.email}
              phone={teacher.phone}
              score={teacher.reviewScore}
            />
          )
        })}
      </div>
    </>
  )
}

export default StudentDashboard
