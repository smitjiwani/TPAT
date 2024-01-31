import React, { useEffect, useState } from 'react'
import '../styles/StudentDashboard.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import RateYourTeachers from '../components/RateYourTeachers'
import MyStudentClasses from '../components/MyStudentClasses.jsx'
import MyStudentDashboard from '../components/MyStudentDashboard.jsx'

function StudentDashboard() {
  const [student, setStudent] = useState({})
  const [active, setActive] = useState('')

  const options = [
    {
      onclick: () => setActive('Dashboard'),
      label: 'Dashboard',
      active: false,
    },
    {
      onclick: () => setActive('My Classes'),
      label: 'My Classes',
      active: true,
    },
    {
      onclick: () => setActive('My Teachers'),
      label: 'My Teachers',
      active: false,
    },
    {
      onclick: () => setActive('My Grades'),
      label: 'My Grades',
      active: false,
    },
    {
      onclick: () => setActive('Profile'),
      label: 'Profile',
      active: false,
    },

  ]


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

  const renderRightContent = () => {
    switch (active) {
      case 'Dashboard':
        return <MyStudentDashboard />
      case 'My Classes':
        return <MyStudentClasses />
      case 'My Teachers':
        return <RateYourTeachers />
      case 'My Grades':
        return <h1>My Grades Content</h1>
      case 'Profile':
        return <h1>Profile Content</h1>
      default:
        return <MyStudentDashboard />
    }
  }


  return (
    <div className="student__dashboard">
      <Navbar />
      <div className="student__dashboard__main">
        <div className="student__dashboard__left">
          <Sidebar
            avatar="S"
            userName={student.name}
            userEmail={student.email}
            options={options}
          />
        </div>
        <div className="student__dashboard__right">
          {renderRightContent()}
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
