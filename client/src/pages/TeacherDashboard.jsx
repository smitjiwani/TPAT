import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import GoogleTranslateWidget from '../components/GoogleTranslate'
import '../styles/TeacherDashboard.css'
import Sidebar from '../components/Sidebar'

function TeacherDashboard() {
  const [teachers, setTeachers] = useState([])
  const [active, setActive] = useState('')

  const options = [
    {
      onclick: () => setActive('My Classes'),
      label: 'My Classes',
      active: true,
    },
    {
      onclick: () => setActive('My Reviews'),
      label: 'My Reviews',
      active: false,
    },
    {
      onclick: () => setActive('Profile'),
      label: 'Profile',
      active: false,
    },
    {
      onclick: () => setActive('Settings'),
      label: 'Settings',
      active: false,
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
      case 'My Classes':
        return <h1>My Classes</h1>
      case 'My Reviews':
        return <h1>My Reviews</h1>
      case 'Profile':
        return <h1>Profile</h1>
      case 'Settings':
        return <h1>Settings</h1>
      default:
        return <h1>My Classes</h1>
    }
  }

  return (
    <div className='teacher__dashboard'>
      <Navbar />
      <div className="teacher__dashboard__main">
        <div className='teacher__dashboard__left'>
          <Sidebar
            avatar="T"
            userName={teachers.name}
            userEmail={teachers.email}
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
