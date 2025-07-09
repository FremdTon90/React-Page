import React from 'react'

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        color: 'white',
        padding: '1rem 1rem 2rem 1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <h1 style={{ marginBottom: 20, position: 'relative', zIndex: 10 }}>About me</h1>

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
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <p>
          Moin! Ich bin <strong>Dustin Groß</strong> – passionierter Quereinsteiger auf dem Weg zum <strong>Fachinformatiker für Anwendungsentwicklung</strong>.
          Aktuell bin ich in der Umschulung bei <strong>Damago</strong> und suche ab dem <strong>3.11.2025</strong> einen Praktikumsplatz (bis zum <strong>30.6.2026</strong>) – 
          am liebsten im Raum <strong>Hamburg</strong> oder remote mit Tech-Vibes.
        </p>

        <p>
          Ursprünglich komme ich aus <strong>Berlin</strong>, lebe aber seit 2020 mit meiner Familie in <strong>Hamburg</strong>. 
          Neben dem Coding liebe ich alles, was mit Kreativität und Technik zu tun hat: 
          <strong> Audio-Plugins programmieren</strong>, <strong>Psytrance im Forest-Style produzieren</strong> oder <strong>3D-Modelling</strong> in CAD-Tools – das ist meine Welt.
        </p>

        <p>
          Beruflich bringe ich echte Hands-on-Erfahrung mit: als <strong>Mechatroniker</strong>, <strong>Fahrzeugbauer</strong> und sogar <strong>Sachverständiger für Kanalinspektionen </strong> 
          habe ich schon ordentlich geschraubt, geprüft und organisiert. 
          Jetzt will ich mein Skillset in die digitale Welt bringen – mit sauberem Code, klaren Interfaces und cleveren Lösungen.
        </p>

        <p>
          Ich freue mich darauf, im Team zu arbeiten, neue Technologien zu entdecken und mit erfahrenen Entwicklern gemeinsam zu wachsen. 
          Gern überzeuge ich dich in einem Gespräch oder bei einem Probearbeiten – Debugging inklusive 😉
        </p>

        <p>
          Ob kreative Softwareprojekte, komplexe Logik oder einfach gute Zusammenarbeit – ich bring Energie, Neugier und jede Menge Leidenschaft mit.  
          Lass uns gemeinsam was Cooles bauen!
        </p>
      </div>

      <div
        style={{
          padding: 20,
          lineHeight: 1.6,
          backgroundColor: 'rgba(17, 17, 17, 0.95)',
          borderRadius: 10,
          boxShadow: '0 8px 20px #000000',
          maxWidth: 800,
          margin: '0 auto',
          textAlign: 'left',
          position: 'relative',
          zIndex: 10,
          color: 'white',
          fontSize: '1rem',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h3>Knowledge</h3>
        <br />
        <p>Ich verfüge über fundierte Kenntnisse in verschiedenen IT- und Design-Bereichen:</p>

        <h4>IT-Kenntnisse:</h4>
        <ul>
          <li><strong>Azure AZ-900 Zertifikat</strong></li>
          <li><strong>Python PCAP Zertifikat</strong> ist in Bearbeitung</li>
          <li><strong>Microsoft Office</strong></li>
          <li><strong>Microsoft Teams</strong></li>
          <li><strong>Microsoft Server</strong></li>
        </ul>

        <h4>Programmiersprachen:</h4>
        <ul>
          <li><strong>Python</strong></li>
          <li><strong>Java</strong></li>
          <li><strong>HTML, CSS</strong></li>
          <li><strong>JavaScript</strong></li>
          <li><strong>React</strong></li>
          <li><strong>SQL</strong></li>
        </ul>

        <h4>Kreativtechnische Kenntnisse:</h4>
        <ul>
          <li><strong>Musikproduktion</strong> mit allen gängigen DAWs</li>
          <li><strong>3D Design</strong> mit Shapr3D, Cinema 4D und Onshape</li>
          <li><strong>Grafikdesign</strong> & Zeichnen mit Procreate, Adobe Illustrator, Photoshop, InDesign und Affinity Designer</li>
          <li><strong>Videobearbeitung</strong> mit DaVinci Resolve, Adobe Premiere etc.</li>
          <li><strong>UI/UX Design</strong> mit Bootstrap, Figma & handgezeichneten Komponenten</li>
        </ul>
      </div>
    </div>
  )
}
