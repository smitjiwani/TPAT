import React from 'react'
import '../styles/Navbar.css'
import GoogleTranslateWidget from './GoogleTranslate'
import { Link } from 'react-router-dom'

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'))

  const handleClick = () => {
    localStorage.removeItem('user')
    window.location.reload()
  }

  return (
    <nav className="navbar">
      <a href="/" className="navbar__logo">
        TPAT
      </a>
      <ul className="navbar__nav">
        {user ? (
          <>
            <button className="login__button" onClick={handleClick}>
              Log out
            </button>
            {user.role === 'student' &&
            window.location.pathname !== '/studentdashboard' ? (
              <Link to="/studentdashboard">
                <button className="dashboard__button">Go to dashboard</button>
              </Link>
            ) : user.role === 'teacher' &&
              window.location.pathname !== '/teacherdashboard' ? (
              <Link to="/teacherdashboard">
                <button className="dashboard__button">Go to dashboard</button>
              </Link>
            ) : null}
          </>
        ) : (
          <Link to="/login">
            <button className="login__button">Log In</button>
          </Link>
        )}
        <li className="google__widget">
          <GoogleTranslateWidget />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
