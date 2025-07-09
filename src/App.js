// App.js
import React from 'react'
import { Routes, Route } from 'react-router-dom' // ⬅️ Router hier raus!
import VideoBackground from './components/VideoBackground'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'

import './App.css'

import Home from './pages/Home'
import Projects from './pages/Projects'
import Coding from './pages/Coding'
import About from './pages/About'
import Contact from './pages/Contact'
import Music from './pages/Music'

function App() {
  return (
    <>
      <ScrollToTop />
      <VideoBackground />
      <Navbar />
      <div style={{ paddingTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/coding/*" element={<Coding />} />
          <Route path="/music/*" element={<Music />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} /> {/* Catch-All Route */}
        </Routes>
      </div>
    </>
  )
}

export default App
