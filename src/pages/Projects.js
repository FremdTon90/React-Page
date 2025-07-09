import React, { useState, useEffect, useRef } from 'react'
import './Projects.css'

export default function Projects() {
  const media = [
    'images/finish_rover.jpg',
    'images/3dplan.jpg',
    'images/blueprint.jpg',
    'images/gui.png',
    'images/distance.jpg',
    'images/rover_run.mp4',
    'images/lyn-x_logo.jpg'
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const videoRef = useRef(null)

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

  const isVideo = media[currentIndex].toLowerCase().endsWith('.mp4')

  useEffect(() => {
    if (isVideo) {
      const videoElement = videoRef.current
      if (videoElement) {
        const handleEnded = () => {
          nextMedia()
        }
        videoElement.addEventListener('ended', handleEnded)
        videoElement.play()
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
      <h1>
        Project Lyn-X
      </h1>

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
            >
              ‹
            </button>
            <button
              onClick={nextMedia}
              className="nav-arrow next-arrow"
              aria-label="Nächstes Medium"
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
          Die Fähigkeit, das Fahrzeug sowohl visuell als auch maßstabgetreu zu planen, war entscheidend für den erfolgreichen Bau und die funktionale Umsetzung.
          Als <strong>Karosserie- und Fahrzeugbauer</strong> konnte ich zudem wertvolle Kenntnisse in die Gestaltung des Gehäuses einfließen lassen, wodurch der Rover robust und funktional gestaltet wurde.
        </p>

        <h4>2. Funktionen und Technologien</h4>
        <p>Der Rover wurde mit modernster Sensorik und Technologien ausgestattet, um in Gefahrensituationen optimal arbeiten zu können:</p>
        <ul>
          <li><strong>Nachtsichtkamera:</strong> Der Rover kann mit einer eingebauten Nachtsichtkamera operieren, die es ihm ermöglicht,
            auch bei Dunkelheit oder schlechten Sichtverhältnissen zu navigieren und Objekte zu erkennen.</li>
          <li><strong>Ultraschallsensor:</strong> Ein Ultraschallsensor misst die Distanz zu Objekten, was dem Rover hilft,
            Hindernisse in seiner Umgebung zu erkennen und darauf zu reagieren. Diese Funktion ist besonders in komplexen oder engen Umgebungen nützlich.</li>
          <li><strong>Umweltsensoren:</strong> Der Rover ist mit Sensoren ausgestattet, die es ihm ermöglichen, Temperatur,
            Luftfeuchtigkeit und Gase zu messen. Diese Daten werden live auf einer benutzerfreundlichen GUI (Grafische Benutzeroberfläche)
            angezeigt und bieten wertvolle Informationen für den Einsatz in kritischen Szenarien.</li>
          <li><strong>Feuersensor:</strong> Ein Sensor zur Branddetektion ermöglicht es dem Rover, Feuer frühzeitig zu erkennen.
            Dies ist besonders wertvoll für Rettungs- und Brandbekämpfungsoperationen.</li>
          <li><strong>Volle Steuerbarkeit und Beweglichkeit:</strong> Der Rover ist vollständig steuerbar,
            kann sich auf der Stelle drehen und bewegt sich flexibel in alle Richtungen.
            Besonders bemerkenswert ist der <strong>180° schwenkbare Kamera-Kopf</strong>, der dem Rover eine nahezu unbegrenzte Sicht ermöglicht.</li>
        </ul>

        <h4>3. Entwicklung und Programmierung</h4>
        <p>
          Die Programmierung des Systems war ein zentraler Bestandteil des Projekts.
          Als Hauptentwickler habe ich sowohl das <strong>Frontend</strong> als auch Teile des <strong>Backends</strong> entwickelt,
          wobei <strong>Python</strong> als Hauptsprache zum Einsatz kam. Das Frontend umfasst eine intuitive Benutzeroberfläche,
          auf der alle relevanten Informationen von den Sensoren in Echtzeit angezeigt werden.
        </p>
        <p>
          Das Backend sorgt dafür, dass alle Sensoren korrekt miteinander kommunizieren,
          die Daten zuverlässig verarbeitet werden und die Steuerung des Rovers reibungslos funktioniert.
          Durch die Integration von Echtzeitdaten und der Steuerung des Fahrzeugs haben wir eine vollständig funktionsfähige Lösung für den Rover geschaffen.
        </p>

        <h4>4. Erfolge und Auszeichnung</h4>
        <p>
          Das Projekt wurde im Rahmen einer von <strong>Damago</strong> durchgeführten Wettbewerbsausstellung präsentiert,
          bei der unser Team den ersten Platz gewann.
          Diese Auszeichnung unterstreicht den innovativen Charakter und die technische Exzellenz unseres Rovers,
          der in der Lage ist, eine Vielzahl von Gefahren und Herausforderungen zu bewältigen.
        </p>
      </div>
    </div>
  )
}
