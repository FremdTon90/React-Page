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
      const width = isActive ? 220 : 120
      const height = isActive ? 150 : 110
      return { width, height }
    } else if (isMobile && isLandscape) {
      const width = isActive ? 300 : 160
      const height = isActive ? 210 : 170
      return { width, height }
    } else {
      const width = isActive ? 380 : 200
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
          Im Rahmen eines innovativen Teams bestehend aus mir, einem weiteren Programmierer und vier <strong>Systemintegratoren</strong>,
          haben wir einen hochentwickelten <strong>Rover</strong> entwickelt. Das Ziel dieses Projekts war es, ein Fahrzeug zu bauen,
          das in gefährlichen Situationen den Menschen ersetzen kann – sei es zur Unterstützung bei Einsätzen in unzugänglichen Gebieten oder in Szenarien,
          bei denen der Mensch durch die Gefahr unnötigen Risiken ausgesetzt wird.
        </p>
        <br />
        <h4>1. Planung und Design</h4>
        <p>
          Die Vorplanung des Rovers wurde von mir mit <strong>Shapr3D</strong> auf dem iPad durchgeführt. Hierbei habe ich das 3D-Modell des Fahrzeugs erstellt und
          zusätzlich eine <strong>Blueprint-Dokumentation</strong> für die präzisen Maße und Bauteile des Rovers angefertigt. Die Fähigkeit, das Fahrzeug sowohl visuell als auch maßstabgetreu zu planen,
          war entscheidend für den erfolgreichen Bau und die funktionale Umsetzung. Als <strong>Karosserie- und Fahrzeugbauer</strong> konnte ich zudem wertvolle Kenntnisse
          in die Gestaltung des Gehäuses einfließen lassen, wodurch der Rover robust und funktional gestaltet wurde.
        </p>
        <br />
        <h4>2. Funktionen und Technologien</h4>
        <p>Der Rover wurde mit modernster Sensorik und Technologien ausgestattet, um in Gefahrensituationen optimal arbeiten zu können:</p>
        <ul>
          <li><strong>Nachtsichtkamera:</strong> Der Rover kann mit einer eingebauten Nachtsichtkamera operieren, die es ihm ermöglicht,
            auch bei Dunkelheit oder schlechten Sichtverhältnissen zu navigieren und Objekte zu erkennen.</li><br />
          <li><strong>Ultraschallsensor:</strong> Ein Ultraschallsensor misst die Distanz zu Objekten, was dem Rover hilft,
            Hindernisse in seiner Umgebung zu erkennen und darauf zu reagieren. Diese Funktion ist besonders in komplexen oder engen Umgebungen nützlich.</li><br />
          <li><strong>Umweltsensoren:</strong> Der Rover ist mit Sensoren ausgestattet, die es ihm ermöglichen, <strong>Temperatur</strong>,
            <strong> Luftfeuchtigkeit</strong> und <strong>Gase</strong> zu messen. Diese Daten werden live auf einer benutzerfreundlichen
            <strong>GUI (Grafische Benutzeroberfläche)</strong> angezeigt und bieten wertvolle Informationen für den Einsatz in kritischen Szenarien.</li><br />
          <li><strong>Feuersensor:</strong> Ein Sensor zur Branddetektion ermöglicht es dem Rover, Feuer frühzeitig zu erkennen. Dies ist besonders wertvoll für Rettungs-
            und Brandbekämpfungsoperationen.</li><br />
          <li><strong>Volle Steuerbarkeit und Beweglichkeit:</strong> Der Rover ist vollständig steuerbar, kann sich auf der Stelle drehen und bewegt sich flexibel in alle Richtungen.
            Besonders bemerkenswert ist der <strong>180° schwenkbare Kamera-Kopf</strong>, der dem Rover eine nahezu unbegrenzte Sicht ermöglicht.</li>
        </ul>
        <br />
        <h4>3. Entwicklung und Programmierung</h4>
        <p>
          Die Programmierung des Systems war ein zentraler Bestandteil des Projekts. Als Hauptentwickler habe ich sowohl das
          <strong>Frontend</strong> als auch Teile des <strong>Backends</strong> entwickelt, wobei <strong>Python</strong> als Hauptsprache zum Einsatz kam.
          Das Frontend umfasst eine intuitive Benutzeroberfläche, auf der alle relevanten Informationen von den Sensoren in Echtzeit angezeigt werden.
        </p>
        <p>
          Das Backend sorgt dafür, dass alle Sensoren korrekt miteinander kommunizieren, die Daten zuverlässig verarbeitet werden und die Steuerung des Rovers reibungslos funktioniert.
          Durch die Integration von Echtzeitdaten und der Steuerung des Fahrzeugs haben wir eine vollständig funktionsfähige Lösung für den Rover geschaffen.
        </p>
        <br />
        <h4>4. Erfolge und Auszeichnung</h4>
        <p>
          Das Projekt wurde im Rahmen einer von Damago durchgeführten Wettbewerbsausstellung präsentiert, bei der unser Team als eines von nur drei Teams den <strong>ersten Platz</strong> gewann.
          Diese Auszeichnung unterstreicht den <strong>innovativen Charakter</strong> und die <strong>technische Exzellenz</strong> unseres Rovers, der in der Lage ist, eine Vielzahl von Gefahren und Herausforderungen zu bewältigen.
        </p>
      </div>
    </div>
  )
}
