import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom' // ← für GitHub Pages
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
    <Router>
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
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
