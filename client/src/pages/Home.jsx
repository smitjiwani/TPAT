import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import '../styles/Home.css'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
        <Navbar />
        <Hero />
        <Footer />
    </div>
  )
}

export default Home