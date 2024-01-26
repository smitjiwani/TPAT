import React from 'react'
import '../styles/Navbar.css'
import GoogleTranslateWidget from './Googletranslate'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        
            <nav className="navbar">
                <a href="#" className="navbar__logo">TPAT</a>
                <ul className="navbar__nav">
                    <li className="nav__item">
                        <a href="#" className="nav__link">About</a>
                    </li>
                    <li className="nav__item">
                        <a href="#" className="nav__link">Contact</a>
                    </li>
                    <Link to="/login"><button className='login__button'>Sign In</button></Link>
                    <li className="google__widget">
                        <GoogleTranslateWidget />
                    </li>
                </ul>
            </nav>
    )
}

export default Navbar