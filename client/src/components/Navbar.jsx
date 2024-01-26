import React from 'react'
import '../styles/Navbar.css'

function Navbar() {
    return (
        <div>
            <nav className="navbar">
                <a href="#" className="navbar__logo">TPAT</a>
                <ul className="navbar__nav">
                    <li className="nav__item">
                        <a href="#" className="nav__link">Home</a>
                    </li>
                    <li className="nav__item">
                        <a href="#" className="nav__link">About</a>
                    </li>
                    <li className="nav__item">
                        <a href="#" className="nav__link">Contact</a>
                    </li>
                    <button className='login__button'>Sign In</button>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar