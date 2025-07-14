import React, { useState } from 'react';
import { Phone, Mail, MapPin, Github, Linkedin, Music } from 'lucide-react';

export default function Contact() {
  const [showMap, setShowMap] = useState(false);
  const [lastNameInput, setLastNameInput] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const encodedSecret = 'Z3Jvw58=';
  const encodedPhone = 'KzQ5IDE1NzUgNDg4MjQxMA==';
  const encodedAddress = 'U3Rvcm1hcm5lciBTdHJhw59lIDM5LCAyMjA0OSBIYW1idXJnLCBEZXV0c2NobGFuZA==';
  const encodedLinkedIn = 'aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2R1c3Rpbi1ncm/Dny0yN2FhMWIzMzMv';

  const decode = (b64) => decodeURIComponent(escape(window.atob(b64)));

  const handleLastNameCheck = (e) => {
    const input = e.target.value;
    setLastNameInput(input);
    const normalizedInput = input.trim().normalize('NFC').toLocaleLowerCase('de-DE');
    const normalizedSecret = decode(encodedSecret).normalize('NFC').toLocaleLowerCase('de-DE');
    setShowDetails(normalizedInput === normalizedSecret);
  };

  return (
    <>
      <style>{`
        @keyframes pulseGrowShrink {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          80% { transform: scale(1.2); }
          100% { transform: scale(1.3); }
        }

        .icon-wrapper {
          display: inline-flex;
          width: 28px;
          height: 28px;
          justify-content: center;
          align-items: center;
          transition: transform 0.3s ease;
        }

        .social-link {
          color: inherit;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: underline;
          user-select: none;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .social-link:hover .icon-wrapper {
          animation: pulseGrowShrink 0.6s forwards;
        }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          color: 'white',
          padding: '1rem',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h1 style={{ marginBottom: 20, position: 'relative', zIndex: 10 }}>Contact</h1>

        <div
          style={{
            maxWidth: 800,
            backgroundColor: 'rgba(17, 17, 17, 0.95)',
            padding: 20,
            borderRadius: 10,
            boxShadow: '0 8px 20px #000000',
            margin: '0 auto 30px',
            textAlign: 'left',
            position: 'relative',
            zIndex: 10,
            fontSize: '1rem',
            lineHeight: 1.6,
          }}
        >
          <p style={{ marginBottom: 20 }}>
            Hier findest du alle Möglichkeiten, mich zu erreichen oder mehr über meine Projekte zu erfahren.
          </p>

          <div style={{ marginBottom: 20 }}>
            <label htmlFor="lastNameCheck" style={{ display: 'block', marginBottom: 8 }}>
              Gib Dustin`s Nachnamen ein, um weitere Kontaktinformationen anzuzeigen:
            </label>
            <input
              id="lastNameCheck"
              type="text"
              value={lastNameInput}
              onChange={handleLastNameCheck}
              placeholder="Dustin`s Nachname"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 6,
                border: '1px solid #444',
                backgroundColor: '#222',
                color: 'white',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: 30 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Mail size={20} color="#60a5fa" />
              <a href="mailto:dustin15366@yahoo.de" style={{ color: 'white', textDecoration: 'underline' }}>
                dustin15366@yahoo.de
              </a>
            </div>

            {showDetails && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Phone size={20} color="#4ade80" />
                  <span>{decode(encodedPhone)}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MapPin size={20} color="#f87171" />
                  <button
                    onClick={() => setShowMap(!showMap)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      margin: 0,
                      color: 'white',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                    }}
                    aria-expanded={showMap}
                    aria-controls="map-iframe"
                  >
                    {decode(encodedAddress)}
                  </button>
                </div>

                {showMap && (
                  <div style={{ marginTop: 20, borderRadius: 10, overflow: 'hidden', height: 300 }}>
                    <iframe
                      id="map-iframe"
                      title="Google Maps Standort"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src="https://maps.google.com/maps?q=Stormarner+Straße+39,+22049+Hamburg,+Deutschland&output=embed"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                )}
              </>
            )}
          </div>

          {showDetails && (
            <div style={{ borderTop: '1px solid #444', paddingTop: 10 }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: 20, textAlign: 'center' }}>
                Socials & Projekte
              </h2>
              <div
                style={{
                  display: 'flex',
                  gap: 20,
                  justifyContent: 'center',
                  width: '100%',
                  textAlign: 'center',
                  marginTop: 10,
                }}
              >
                <a
                  href="https://github.com/FremdTon90"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span className="icon-wrapper">
                    <Github size={20} color="#aaa" />
                  </span>
                  GitHub
                </a>
                <a
                  href="https://soundcloud.com/fremdton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span className="icon-wrapper">
                    <Music size={20} color="#f97316" />
                  </span>
                  SoundCloud
                </a>
                <a
                  href={decode(encodedLinkedIn)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span className="icon-wrapper">
                    <Linkedin size={20} color="#3b82f6" />
                  </span>
                  LinkedIn
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
