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
    logo
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const videoRef = useRef(null)

  const isVideo = media[currentIndex].toLowerCase().endsWith('.mp4')

  const nextMedia = () => {
    setFade(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % media.length)
      setFade(true)
    }, 500)
  }

  const prevMedia = () => {
    setFade(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + media.length) % media.length)
      setFade(true)
    }, 500)
  }

  useEffect(() => {
    if (isVideo) {
      const videoElement = videoRef.current
      if (videoElement) {
        const handleEnded = () => {
          nextMedia()
        }
        videoElement.addEventListener('ended', handleEnded)
        videoElement.play().catch(() => {
        })
        return () => {
          videoElement.removeEventListener('ended', handleEnded)
        }
      }
    } else {
      const timer = setTimeout(() => {
        nextMedia()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, isVideo])

  return (
    <div className="lynx-container" style={{ minHeight: '100vh', color: 'white', padding: '1rem 1rem 2rem 1rem' }}>
      <h1>Project Lyn-X</h1>

      <div
        style={{
          width: '92vw',
          maxWidth: '1200px',
          height: '400px',
          margin: '0 auto 2rem auto',
          backgroundColor: 'rgba(17, 17, 17, 0.95)',
          borderRadius: '10px',
          boxShadow: '0 8px 20px #000000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {isVideo ? (
          <video
            ref={videoRef}
            src={media[currentIndex]}
            controls
            autoPlay
            muted
            style={{
              maxWidth: '100%',
              maxHeight: 'calc(100% - 10%)',
              borderRadius: '10px',
              opacity: fade ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              position: 'absolute',
            }}
          />
        ) : (
          <img
            src={media[currentIndex]}
            alt={`Media ${currentIndex + 1}`}
            style={{
              maxWidth: '100%',
              maxHeight: 'calc(100% - 10%)',
              borderRadius: '10px',
              opacity: fade ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              position: 'absolute',
            }}
            key={media[currentIndex]}
          />
        )}

        {media.length > 1 && (
          <>
            <button
              onClick={prevMedia}
              className="nav-arrow prev-arrow"
              aria-label="Vorheriges Medium"
              style={{ zIndex: 20 }}
            >
              ‹
            </button>
            <button
              onClick={nextMedia}
              className="nav-arrow next-arrow"
              aria-label="Nächstes Medium"
              style={{ zIndex: 20 }}
            >
              ›
            </button>
          </>
        )}
      </div>

      <div
        style={{
          width: '90vw',
          maxWidth: '1200px',
          margin: '1rem auto 3rem auto',
          backgroundColor: 'rgba(17, 17, 17, 0.95)',
          padding: '1rem',
          borderRadius: '10px',
          boxShadow: '0 8px 20px #000000',
          lineHeight: '1.6',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2>Das Projekt Lyn-X</h2>
        <p>
          Im Rahmen eines innovativen Teams bestehend aus mir, einem weiteren Programmierer und vier Systemintegratoren,
          haben wir einen hochentwickelten Rover entwickelt. Das Ziel dieses Projekts war es, ein Fahrzeug zu bauen,
          das in gefährlichen Situationen den Menschen ersetzen kann – sei es zur Unterstützung bei Einsätzen in unzugänglichen Gebieten oder in Szenarien,
          bei denen der Mensch durch die Gefahr unnötigen Risiken ausgesetzt wäre.
        </p>

        <h4>1. Planung und Design</h4>
        <p>
          Die Vorplanung des Rovers wurde von mir mit <strong>Shapr3D</strong> auf dem iPad durchgeführt.
          Hierbei habe ich das 3D-Modell des Fahrzeugs erstellt und zusätzlich eine <strong>Blueprint-Dokumentation</strong> für die präzisen Maße und Bauteile des Rovers angefertigt.
          Als <strong>Karosserie- und Fahrzeugbauer</strong> konnte ich zudem wertvolle Kenntnisse in die Gestaltung des Gehäuses einfließen lassen.
        </p>

        <h4>2. Funktionen und Technologien</h4>
        <ul>
          <li><strong>Nachtsichtkamera:</strong> Für Betrieb bei Dunkelheit</li>
          <li><strong>Ultraschallsensor:</strong> Hinderniserkennung</li>
          <li><strong>Umweltsensoren:</strong> Temperatur, Feuchtigkeit & Gase</li>
          <li><strong>Feuersensor:</strong> Frühzeitige Branddetektion</li>
          <li><strong>180° Kamera-Kopf & Beweglichkeit:</strong> Volle Kontrolle</li>
        </ul>

        <h4>3. Entwicklung und Programmierung</h4>
        <p>
          Ich habe Frontend & Backend mit <strong>Python</strong> entwickelt. GUI zeigt Live-Sensordaten,
          Backend verarbeitet & steuert alles in Echtzeit.
        </p>

        <h4>4. Erfolge und Auszeichnung</h4>
        <p>
          Präsentiert bei <strong>Damago</strong>, mit <strong>1. Platz</strong> ausgezeichnet – Innovation, Funktion & Technik überzeugten die Jury.
        </p>
      </div>
    </div>
  )
}
