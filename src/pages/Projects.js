import React, { useState, useEffect, useRef } from 'react'
import './Projects.css'
import finishRover from '../assets/finish_rover.jpg'
import plan3d from '../assets/3dplan.jpg'
import blueprint from '../assets/blueprint.jpg'
import gui from '../assets/gui.png'
import distance from '../assets/distance.jpg'
import roverRun from '../assets/rover_run.mp4'
import logo from '../assets/lyn-x_logo.jpg'

export default function Projects() {
  const media = [
    finishRover,
    plan3d,
    blueprint,
    gui,
    distance,
    roverRun,
    logo,
  ]

  const mediaCount = media.length
  const [rotationCount, setRotationCount] = useState(0)
  const currentIndex = rotationCount % mediaCount
  const videoRef = useRef(null)

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const isMobile = windowSize.width < 768
  const isLandscape = windowSize.width > windowSize.height

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getSlideSize = (isActive) => {
    if (isMobile && !isLandscape) {
      const width = isActive ? 220 : 160
      const height = isActive ? 150 : 110
      return { width, height }
    } else if (isMobile && isLandscape) {
      const width = isActive ? 300 : 250
      const height = isActive ? 210 : 170
      return { width, height }
    } else {
      const width = isActive ? 380 : 280
      const height = isActive ? 260 : 200
      return { width, height }
    }
  }

  const getTranslateZ = () => {
    if (isMobile && !isLandscape) {
      return 180
    } else if (isMobile && isLandscape) {
      return 220
    } else {
      return 300
    }
  }

  const rotationY = rotationCount * (360 / mediaCount)

  useEffect(() => {
    let timer
    const isVideo =
      typeof media[currentIndex] === 'string' &&
      media[currentIndex].toLowerCase().endsWith('.mp4')

    if (isVideo) {
      const video = videoRef.current
      if (video) {
        const onEnded = () => setRotationCount((c) => c + 1)
        video.addEventListener('ended', onEnded)
        video.play()
        return () => {
          video.pause()
          video.removeEventListener('ended', onEnded)
        }
      }
    } else {
      timer = setTimeout(() => {
        setRotationCount((c) => c + 1)
      }, 5000)
    }

    return () => clearTimeout(timer)
  }, [currentIndex, media])

  const goToIndex = (index) => {
    const base = Math.floor(rotationCount / mediaCount) * mediaCount
    let newCount = base + index
    if (newCount <= rotationCount) {
      newCount += mediaCount
    }
    setRotationCount(newCount)
  }

  // Swipe Handling
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const deltaX = touchStartX.current - touchEndX.current
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          setRotationCount((c) => c + 1)
        } else {
          setRotationCount((c) => (c > 0 ? c - 1 : c))
        }
      }
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  const getSlideStyle = (index) => {
    const angle = (360 / mediaCount) * index
    const isActive = index === currentIndex
    const translateZ = getTranslateZ()
    const { width, height } = getSlideSize(isActive)

    return {
      transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
      opacity: isActive ? 1 : 0.6,
      filter: isActive ? 'brightness(1)' : 'brightness(0.7)',
      zIndex: isActive ? 10 : 1,
      width: `${width}px`,
      height: `${height}px`,
      transition: 'all 0.5s ease',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: `-${height / 2}px`,
      marginLeft: `-${width / 2}px`,
      borderRadius: '10px',
      boxShadow: isActive
        ? '0 0 20px rgba(0, 204, 255, 1)'
        : '0 0 15px rgba(0, 204, 255, 0.5)',
      cursor: 'pointer',
      objectFit: 'cover',
      userSelect: 'none',
      backgroundColor: '#111',
      pointerEvents: isActive ? 'auto' : 'none',
    }
  }

  return (
    <div className="lynx-container">
      <h1>Project Lyn-X</h1>

      <div
        className="carousel-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel"
          style={{
            transform: `translateZ(-${getTranslateZ() * 0.8}px) rotateY(${-rotationY}deg)`,
          }}
        >
          {media.map((item, i) => {
            const isVideo =
              typeof item === 'string' && item.toLowerCase().endsWith('.mp4')

            return isVideo ? (
              <video
                key={i}
                ref={i === currentIndex ? videoRef : null}
                src={item}
                style={getSlideStyle(i)}
                autoPlay={i === currentIndex}
                muted
                loop={false}
                playsInline
                onClick={() => goToIndex(i)}
              />
            ) : (
              <img
                key={i}
                src={item}
                alt={`Media ${i + 1}`}
                style={getSlideStyle(i)}
                draggable={false}
                onClick={() => goToIndex(i)}
              />
            )
          })}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        {media.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToIndex(idx)}
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              margin: '0 6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor:
                idx === currentIndex ? '#00ccff' : 'rgba(255,255,255,0.3)',
              boxShadow: idx === currentIndex ? '0 0 8px #00ccff' : 'none',
              transition: 'background-color 0.3s ease',
            }}
            aria-label={`Gehe zu Medium ${idx + 1}`}
          />
        ))}
      </div>

      <div className="project-text">
        <br />
        <p>
          Im Rahmen eines innovativen Teams bestehend aus mir, einem weiteren Programmierer ...
        </p>
      </div>
    </div>
  )
}
