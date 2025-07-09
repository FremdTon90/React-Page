import React from 'react'
import { useParams, Link } from 'react-router-dom'
import projects from './CodingData'

export default function CodingDetail() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)

  if (!project) {
    return (
      <div style={{ padding: 20, color: 'white', textAlign: 'center' }}>
        <h2>Projekt nicht gefunden</h2>
        <p>Das Projekt mit der ID "{id}" existiert nicht.</p>
        <Link to="/coding" style={{ color: '#4ea1d3' }}>
          Zurück zur Übersicht
        </Link>
      </div>
    )
  }

  return (
    <div style={{ padding: 20, color: 'white', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1>{project.title}</h1>

      <div
        style={{
          marginBottom: 20,
          textAlign: 'left',
          maxWidth: 800,
          margin: '0 auto',
          backgroundColor: 'rgba(17, 17, 17, 0.95)',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 8px 12px rgba(0,0,0,0.7)',
          lineHeight: 1.6,
          color: 'white',
        }}
      >
        {project.description}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 15,
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: 620,
          margin: '0 auto',
          marginTop: 10,
        }}
      >
        {project.images.map((src, idx) =>
          src.endsWith('.mp4') ? (
            <video
              key={idx}
              src={src}
              muted
              autoPlay
              loop
              playsInline
              controls
              style={{
                width: '100%',
                maxWidth: 600,
                borderRadius: 8,
                boxShadow: '0 8px 12px rgba(0,0,0,0.7)',
              }}
            />
          ) : (
            <img
              key={idx}
              src={src}
              alt={`${project.title} Bild ${idx + 1}`}
              style={{
                display: 'block',
                width: '100%',
                maxWidth: 600,
                borderRadius: 8,
                boxShadow: '0 8px 12px rgba(0,0,0,0.7)',
              }}
            />
          )
        )}
      </div>

      <Link to="/coding" style={{ color: '#4ea1d3', marginTop: 20, display: 'inline-block' }}>
        Zurück zur Übersicht
      </Link>
    </div>
  )
}
