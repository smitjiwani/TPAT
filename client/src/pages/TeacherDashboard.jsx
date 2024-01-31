import React, { Profiler, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import GoogleTranslateWidget from '../components/GoogleTranslate'
import '../styles/TeacherDashboard.css'
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard'
import MyTeacherClasses from '../components/MyTeacherClasses'
import MyReviews from '../components/MyReviews'
import TeacherProfile from '../components/TeacherProfile'
import { Link } from 'react-router-dom'

function TeacherDashboard() {
  const [teachers, setTeachers] = useState([])
  const [active, setActive] = useState('')

  const options = [
    {
      label: teachers.mbti,
    },
    {
      onclick: () => setActive('Dashboard'),
      label: 'Dashboard',
    },
    {
      onclick: () => setActive('My Classes'),
      label: 'My Classes',
    },
    {
      onclick: () => setActive('My Reviews'),
      label: 'My Reviews',
    },
    {
      onclick: () => setActive('Profile'),
      label: 'Profile',
    },
  ]

  if (!localStorage.getItem('user')) {
    window.location.replace('/login')
  }

  if (JSON.parse(localStorage.getItem('user')).role !== 'teacher') {
    window.location.replace('/')
  }

  const getTeacherInfo = async () => {
    try {
      const authtoken = JSON.parse(localStorage.getItem('user')).authtoken
      const response = await fetch('/api/teachers/getteacherbyid', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          authtoken: authtoken,
        },
      })

      if (response.status === 200) {
        const data = await response.json()
        setTeachers(data.teacher[0])
        console.log(data.teacher[0])
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

  const renderActive = () => {
    switch (active) {
      case 'Dashboard':
        return <Dashboard />
      case 'My Classes':
        return <MyTeacherClasses />
      case 'My Reviews':
        return <MyReviews />
      case 'Profile':
        return <TeacherProfile />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className='teacher__dashboard'>
      <Navbar />
      <Link to='/personalityquiz'><button className='mbtibutton'>Take test now!!</button></Link>
      <div className="teacher__dashboard__main">
        <div className='teacher__dashboard__left'>
          <Sidebar
            avatar="T"
            userName={teachers.name}
            userEmail={teachers.email}
            userScore={teachers.reviewScore}
            options={options}
          />
        </div>
        <div className='teacher__dashboard__right'>
          
          {renderActive()}
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard
