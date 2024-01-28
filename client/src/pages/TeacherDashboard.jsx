import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import GoogleTranslateWidget from '../components/GoogleTranslate'
import '../styles/TeacherDashboard.css'

function TeacherDashboard() {
  const [teachers, setTeachers] = useState([])


    if (!localStorage.getItem('user')) {
      window.location.replace('/login')
    }
    
    if (JSON.parse(localStorage.getItem('user')).role !== 'teacher') {
      window.location.replace('/')
    }
  

 
  const getTeacherInfo = async () => {
    try {
      const authtoken = JSON.parse(localStorage.getItem('user')).authtoken
      const response = await fetch('/api/teachers/getteacherbyid',{
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            authtoken: authtoken,
          },
      })

      if (response.status === 200) {
        const data = await response.json()
        setTeachers(data.teacher[0])
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
    <>
      <Navbar />
      <div>
        <GoogleTranslateWidget />
        <h1>Teacher Dashboard</h1>          
            <div className="profile" key={teachers.id}>
              <h2>{teachers.name}</h2>
              <p>{teachers.email}</p>
              <p>{teachers.phone}</p>
              <p>{teachers.score}/5</p>
            </div>
      </div>
    </>
  )
}

export default TeacherDashboard
