import React from 'react';
import '../styles/Hero.css';
import teacherImage from '../assets/teacherImage.png';

const Hero = () => {
    return (
        <div className="hero">
            <div className="image__section">
                <img src={teacherImage} alt="Hero Image" />
            </div>
            <div className="content__section">
                <h1>Welcome to the Teacher's Performance Assessment Tool</h1>
                <p>Assess your teachers' performance with ease.</p>
                <button>Get Started</button>
            </div>
        </div>
    );
};

export default Hero;
