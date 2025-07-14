import React, { useEffect, useState, useRef } from 'react'
import FractalVisualizer from './FractalVisualizer'

export default function Music() {
  const audioRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const [audioAnalyser, setAudioAnalyser] = useState(null)

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    analyserRef.current = audioContextRef.current.createAnalyser()
    analyserRef.current.fftSize = 128

    if (audioRef.current) {
      const source = audioContextRef.current.createMediaElementSource(audioRef.current)
      source.connect(analyserRef.current)
      analyserRef.current.connect(audioContextRef.current.destination)
      setAudioAnalyser(analyserRef.current)
    }

    return () => {
      analyserRef.current?.disconnect()
      audioContextRef.current?.close()
    }
  }, [])

  const handlePlay = () => {
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
        .then(() => console.log('AudioContext resumed'))
        .catch(err => console.error('AudioContext resume failed', err))
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        color: 'white',
        padding: '1rem 1rem 2rem 1rem',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#111111',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 30, position: 'relative', zIndex: 10 }}>Music</h1>

      <div
        style={{
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
        }}
      >
        <h3 style={{ marginBottom: 15, fontWeight: 'bold' }}>Über den Interpreten</h3>

        <p>
          Seit <strong>2001</strong> kredenze ich Musik – erst mit klassischen <strong>Hip-Hop-Beats</strong>, aber schnell ging’s ab in die elektronische Ecke:{' '}
          <strong>Techno</strong>. Dann tauchte ich tief rein in die hypnotischen Sounds vom <strong>Psytrance</strong>.
        </p>

        <p>
          Der Name <strong>„FremdTon“</strong> steht für genau diese Reise. Musik, die von „<strong>fremden Tönen</strong>“ lebt – experimentell, eigen, immer anders als der Mainstream.
        </p>

        <p>
          Neben dem Produzieren bin ich auch <strong>DJ</strong> und hatte das Glück, auf großen Festivals mit <strong>1.000 bis 2.000 Leuten</strong> aufzulegen. Nichts geht über den Vibe, wenn alle zusammen auf dem Klangteppich tanzen.
        </p>

        <p>
          Aber ich mach nicht nur Musik – ich bau auch meine eigenen <strong>VST-Plugins</strong>, designe abgefahrene <strong>Soundwelten</strong> und tüftle an Tools. Digital? Klar. Aber auch analog geht bei mir viel: Synthesizer-Modding und ähnliches.
        </p>

        <p>
          Zum Beispiel hab ich den <strong>Korg MS-20</strong> aufgebohrt – mehr Inputs, fancy Filter und richtig viel kreativen Freiraum. So entstehen Sounds, die kein Preset und kein anderer MS-20 liefern kann.
        </p>

        <p>
          Zusätzlich bring ich Klang auch ins Bild: Ich erstelle <strong>Audiovisualisierungen</strong> mit <strong>Cinema 4D</strong> – perfekt synchronisierte Welten aus Ton und 3D-Animation. So wird Musik nicht nur hörbar, sondern auch sichtbar.
        </p>

        <p>
          Für mich gehören <strong>Musik und Code</strong> zusammen. Coden ist wie Musikmachen, nur mit Variablen statt Noten. Hauptsache, es ist einzigartig.
        </p>

        <p style={{ fontStyle: 'italic', marginTop: 20, textAlign: 'center' }}>
          <strong>Kreativität ist kein Genre, sondern ein Zustand.</strong>
        </p>

        <div style={{ marginTop: 30, textAlign: 'center' }}>
          <h3>Mein Track:</h3>
          <audio
            ref={audioRef}
            controls
            preload="auto"
            src={process.env.PUBLIC_URL + "/audio/fremdton-track.mp3"}
            onPlay={handlePlay}
            style={{ width: '100%', borderRadius: 8, marginTop: 10 }}
          >
            Your browser does not support the audio element.
          </audio>
        </div>

        <div style={{ marginTop: 40 }}>
          <h3>Visualizer:</h3>
          <FractalVisualizer audioAnalyser={audioAnalyser} />
        </div>
      </div>
    </div>
  )
}




// Dynamischer Farbwechsel (z. B. je nach Frequenzband)