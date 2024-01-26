import React, { useEffect, useState } from 'react'

import GoogleTranslateWidget from '../components/Googletranslate'
import "../styles/TeacherDashboard.css"


function TeacherDashboard() {
  const [teachers, setTeachers] = useState([])

  const getTeacherInfo = async () => {
    try {
      const authtoken = JSON.parse(localStorage.getItem('user')).authtoken
      const response = await fetch(
        'http://localhost:5000/api/teachers/getteacherbyid',
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            authtoken: authtoken,
          },
        },
      ).then((res) => res.json())

      if (response.status === 200) {
        const data = await response.json()
        setTeachers(data)
      } else {
        console.error('Error:', response.status)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    getTeacherInfo()
  }, [])

  return (
    <div>
      <GoogleTranslateWidget />
      <h1>Teacher Dashboard</h1>
      {teachers.map((teacher) => {
        return (
          <div className="profile" key={teacher.id}>
            <h2>{teacher.name}</h2>
            <p>{teacher.email}</p>
            <p>{teacher.phone}</p>
            <p>{teacher.score}/5</p>
          </div>
        )
      })}
    </div>
  )
}

export default TeacherDashboard
