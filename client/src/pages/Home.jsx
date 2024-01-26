import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import '../styles/Home.css'

function Home() {
  return (
    <div id='home'>
        <Navbar />
        <Hero />
    </div>
  )
}

export default Home