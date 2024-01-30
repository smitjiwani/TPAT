import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import '../styles/Home.css'
import Footer from '../components/Footer'
import Chatbot from '../components/chatbot'


function Home() {
  return (
    <div>
        <Navbar />
        <Hero />
        <Chatbot />
        <Footer />
    </div>
  )
}

export default Home
