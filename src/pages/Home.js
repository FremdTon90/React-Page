import React from 'react'
import { Link } from 'react-router-dom'
import profilbild from '../assets/Profilbild.png'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      color: 'white',
      padding: '1rem 1rem 2rem 1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      <h1 style={{ marginBottom: 20, position: 'relative', zIndex: 10 }}>Home</h1>

      <div style={{
        maxWidth: 300,
        backgroundColor: 'rgba(17, 17, 17, 0.95)',
        padding: 15,
        borderRadius: 10,
        boxShadow: '0 8px 20px #000000',
        margin: '0 auto 20px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <img
          src={profilbild} 
          alt="Profilbild Dustin Groß"
          style={{ width: '100%', borderRadius: 8, display: 'block', margin: '0 auto' }}
        />
      </div>

      <div style={{
        maxWidth: 600,
        backgroundColor: 'rgba(17, 17, 17, 0.95)',
        padding: 20,
        borderRadius: 10,
        boxShadow: '0 8px 20px #000000',
        margin: '0 auto',
        textAlign: 'left',
        position: 'relative',
        zIndex: 10,
        fontSize: '1rem',
        lineHeight: 1.6,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <p>
          Hey! Ich bin <strong>Dustin Groß</strong> – Tech-Tüftler, Klangbastler, Humorliebhaber mit einem klaren Faible für <strong>Learning by Doing</strong>. 
          Wenn mich etwas interessiert, bring ich’s mir bei – egal ob neue Programmiersprachen, Audio-Engines, Frameworks oder obskure Fehlermeldungen.
          Aktuell bin ich in der Umschulung zum <strong>Fachinformatiker für Anwendungsentwicklung</strong>.
        </p>

        <p>
          Ich liebe es, Systeme zu durchdringen, Ideen in Code zu gießen und Projekte wirklich zu bauen – sei es als App, CLI-Tool, 
          VST-Plugin oder digitale Spielwiese. Mein Workflow bewegt sich souverän zwischen <strong>Linux-Terminal, DAW-Setup, 
            CAD-Modellierung</strong> und dem nächsten Bouldergriff.
        </p>

        <p>
          Unter meinem Musik-Alias <strong>FremdTon</strong> produziere ich seit Jahren <strong>Forest-Psytrance</strong> mit eigenen Sounds, 
          modularen Setups und einem feinen Gespür für Atmosphäre – oft auch mit selbstgebauten Tools und Plugins.
        </p>

        <p>
          Ich arbeite mit <strong>Python, Java, HTML/CSS, SQL</strong> und entwickle plattformübergreifend auf <strong>Windows, macOS und Linux</strong>. 
          Ob <strong>React, CustomTkinter</strong> oder eine ChatGPT-API – ich baue gern durchdachte und funktionale Lösungen mit modernem Look.
        </p>

        <p>
          Du suchst jemanden, der neugierig ist, strukturiert denkt und sich mit Begeisterung in neue Tools und Herausforderungen reinkniet? 
          Ich suche ein Praktikum vom <strong>3.11.2025 bis 30.6.2026</strong> – bevorzugt im Raum Hamburg.
          <p><Link to="/contact" style={{ color: '#ffd700', fontWeight: 'bold' }}>Melde dich!</Link></p>
        </p>
      </div>
    </div>
  )
}
