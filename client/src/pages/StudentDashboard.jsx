import React, { useEffect, useState } from 'react'
import '../styles/StudentDashboard.css'
import Navbar from '../components/Navbar'
import RateYourTeachers from '../components/RateYourTeachers'
import Sidebar from '../components/sidebar'

function StudentDashboard() {
  const options = [
    {
      path: '/',
      label: 'My classes',
    },
    {
      path: '/',
      label: 'My teachers',
    },
    {
      path: '/',
      label: 'My grades',
    },
    {
      path: '/',
      label: 'Profile',
    },
    {
      path: '/settings',
      label: 'Settings',
    },
  ]

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

  useEffect(() => {
    getStudentInfo()
  }, [])

  return (
    <div className="student__dashboard">
      <Navbar />
      <div className="dashboard__main">
        <div className="dashboard__main__left">
          <Sidebar
            avatar="S"
            userName={student.name}
            userEmail={student.email}
            options={options}
          />
        </div>
        <div className="dashboard__main__right">
          <h1>Student Dashboard</h1>
          <RateYourTeachers />
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
