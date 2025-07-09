// Imports der Bilder und Videos am Anfang der Datei
import BitwiserApp from '../../assets/Bitwiser_App.png';
import StuddyBuddyMain from '../../assets/StuddyBuddyMain.png';
import StuddyBuddyTest from '../../assets/StuddyBuddyTest.png';
import ImageSearchVideo from '../../assets/image-search.mp4';

const projects = [
  {
    id: 'bitwiser',
    title: "Bitwiser Operator",
    shortDescription: "Lern-App für Umwandlung von Dezimal, Hexadezimal und Binär.",
    description: (
      <>
        <p>Der <strong>Bitwiser Operator</strong> ist eine von mir eigenständig programmierte Lern-App, die speziell für 
          <strong> Schüler</strong> entwickelt wurde, um das Verständnis und die Umrechnung zwischen <strong>hexadezimalen</strong>, 
          <strong> dezimalen</strong> und <strong>binären Zahlensystemen</strong> zu erleichtern. Neben den grundlegenden 
          Rechenoperationen wie <strong>AND</strong>, <strong>OR</strong> und <strong>XOR</strong> bietet die Anwendung eine 
          intuitive und übersichtliche Benutzeroberfläche, die das Lernen vereinfacht und effizient gestaltet.</p>

        <p>Ein besonderes Merkmal der App sind die komplett <strong>selbstgezeichneten Schalter und Buttons</strong>, 
          die im charakteristischen <strong>Bit-Look</strong> gestaltet sind. Diese individuell erstellten UI-Elemente 
          verleihen der App nicht nur eine einzigartige, persönliche Note, sondern unterstützen auch das technische Thema der Anwendung visuell auf ansprechende Weise.</p>

        <p>Die gesamte Software wurde in <strong>Python</strong> entwickelt und kombiniert technische Präzision mit 
          einem ansprechenden Design, das Spaß macht und den Lernprozess optimal unterstützt. 
          Der <strong>Bitwiser Operator</strong> ist damit ein praktisches und liebevoll gestaltetes Werkzeug für alle, 
          die sich mit den Grundlagen der Informatik beschäftigen möchten.</p>
      </>
    ),
    media: [BitwiserApp],
  },
  {
    id: 'studdybuddy',
    title: "Studdy Buddy",
    shortDescription: "Lernkarten-App mit Testfunktion und Fortschritts-Tracking.",
    description: (
      <>
        <p><strong>StuddyBuddy</strong> ist eine vielseitige <strong>Lernkarten-App</strong>, die das Lernen <strong>effektiv</strong> und <strong>individuell</strong> gestaltet. 
          Die Anwendung ermöglicht es, <strong>Lernkarten</strong> in verschiedenen <strong>Kategorien</strong> anzulegen, zu bearbeiten und bei Bedarf zu löschen. 
          Mit der integrierten <strong>Testfunktion</strong> können gezielt Prüfungen zu ausgewählten Themenbereichen gestartet werden, um den <strong>Lernfortschritt</strong> aktiv zu überprüfen.</p>

        <p>Der <strong>Fortschritt</strong> wird kontinuierlich erfasst und in separaten <strong>JSON-Dateien</strong> gespeichert, sodass die App den Nutzerinnen und Nutzern 
          jederzeit ein <strong>individuelles Feedback</strong> zu ihren <strong>Stärken</strong> und <strong>Schwächen</strong> geben kann. Dadurch wird ein <strong>personalisiertes Lernen </strong> 
          unterstützt, das sich an den tatsächlichen <strong>Lernbedarf</strong> anpasst.</p>

        <p><strong>StuddyBuddy</strong> kombiniert <strong>einfache Bedienung</strong> mit <strong>intelligentem Datenmanagement</strong> und ist ein idealer Begleiter 
          für alle, die ihre Lerninhalte <strong>strukturiert</strong> und <strong>nachhaltig</strong> festigen möchten.</p>
      </>
    ),
    media: [StuddyBuddyMain, StuddyBuddyTest],
  },
  {
    id: 'imagesearchapp',
    title: "ImageSearchApp",
    shortDescription: "Such-App für UI/UX-Elemente mit smarter Filterung.",
    description: (
      <>
        <p>Die <strong>ImageSearchApp</strong> ist eine leistungsstarke <strong>Such- und Verwaltungs-App</strong> für <strong>UI- und UX-Elemente</strong>, 
          die speziell für Designer, Entwickler und kreative Profis konzipiert wurde. 
          Die Anwendung ermöglicht das gezielte <strong>Filtern</strong> und <strong>Suchen</strong> nach Designkomponenten anhand von <strong>Auflösung</strong>, 
          <strong> Seitenverhältnis (Aspect Ratio)</strong> oder <strong>Dateinamen</strong> – 
          auch bei unscharfer Eingabe wie „tog gre“ für „GreenToggle.png“.</p>

        <p>Ein besonderes Feature ist die Möglichkeit, den <strong>Hintergrund der App</strong> durch die Eingabe eines <strong>Hex-Farbwerts</strong> flexibel anzupassen. 
          So kann direkt getestet werden, wie UI-Elemente auf unterschiedlichen Farbflächen wirken. Alternativ sollen sich in Zukunft auch <strong>Hintergrundbilder</strong> einfügen lassen, 
          wenn die geplante Benutzeroberfläche nicht auf einfache Farben, sondern auf komplexere Layouts basiert.</p>

        <p>Die App bietet eine praktische <strong>Vorschauansicht</strong> für jedes Element sowie die Option, <strong>eigene Ordnerstrukturen</strong> zur besseren Organisation zu integrieren. 
          Mit einem <strong>Rechtsklick</strong> auf eine Datei können komfortabel <strong>Eigenschaften</strong> eingesehen, 
          der <strong>relative Pfad</strong> sowie der <strong>absolute Pfad</strong> kopiert oder die Datei direkt <strong>in die Zwischenablage</strong> gelegt werden.</p>

        <p>Für bestimmte <strong>Frameworks</strong> ist geplant, eine <strong>intelligente Kopierfunktion</strong> einzuführen: 
          Diese fügt beim Kopieren automatisch den <strong>richtigen Syntax</strong> des jeweiligen Frameworks hinzu – um <strong>Entwicklungszeit</strong> zu sparen und die <strong>Effizienz</strong> zu steigern.</p>

        <p>Die <strong>ImageSearchApp</strong> wird kontinuierlich weiterentwickelt und gemeinsam mit Personen getestet, die professionell mit Design- und UI-Elementen arbeiten – 
          um eine maximal <strong>praxisnahe</strong>, <strong>benutzerfreundliche</strong> und <strong>erweiterbare</strong> Lösung zu bieten.</p>
      </>
    ),
    media: [ImageSearchVideo],
  }
]

export default projects;
