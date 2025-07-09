import React from 'react'
import { Link } from 'react-router-dom'
import projects from './CodingData'

export default function CodingOverview() {
  return (
    <>
      <div style={{ minHeight: '100vh', color: 'white', padding: '1rem 1rem 2rem 1rem' }}>
        <h1>Meine Coding Projekte</h1>
        {projects.map((project, index) => {
          const isImageLeft = index % 2 === 0

          return (
            <Link
              to={`/coding/${project.id}`}
              key={project.id}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: isImageLeft ? 'row' : 'row-reverse',
                alignItems: 'center',
                gap: 40,
                marginBottom: 60,
                flexWrap: 'wrap'
              }}
            >
              <div style={{ flex: '1 1 400px' }}>
                {project.images[0]?.endsWith('.mp4') ? (
                  <video
                    src={project.images[0]}
                    muted
                    autoPlay
                    loop
                    playsInline
                    style={{ width: '100%', borderRadius: 12, boxShadow: '0 8px 20px #000' }}
                  />
                ) : (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    style={{ width: '100%', borderRadius: 12, boxShadow: '0 8px 20px #000' }}
                  />
                )}
              </div>

              <div
                style={{
                  flex: '1 1 400px',
                  backgroundColor: 'rgba(17, 17, 17, 0.95)',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 8px 20px #000000',
                  color: 'white',
                }}
              >
                <h2 style={{ marginBottom: 10 }}>{project.title}</h2>
                <p style={{ fontSize: 16, lineHeight: 1.6 }}>{project.shortDescription}</p>
                <p style={{ marginTop: 15, color: '#4ea1d3' }}>gesamtes Projekt sehen →</p>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
