import React from 'react'
import '../styles/MyStudentDashboard.css'
import { Link } from 'react-router-dom'

function MyStudentDashboard() {
  return (
    <div>
        <h1>Student Dashboard</h1>
        <Link to='/personalityquiz'><button className='mbtibutton'>Take Test Now!</button></Link>
    </div>
  )
}

export default MyStudentDashboard