import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Hero.css'
import teacherImage from '../assets/teacherImage.png'

const Hero = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div className="hero">
      <div className="image__section">
        <img src={teacherImage} alt="Hero Image" />
      </div>
      <div className="content__section">
        <h1>Welcome to the Teacher's Performance Assessment Tool</h1>
        <p>Assess your teachers' performance with ease.</p>
        {user ? (
          <>
            {user.role === 'teacher' ? (
              <Link to="/teacherdashboard">
                <button>Get Started</button>
              </Link>
            ) : (
              <Link to="/studentdashboard">
                <button>Get Started</button>
              </Link>
            )}
          </>
        ) : (
          <Link to="/login">
            <button>Get Started</button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Hero
