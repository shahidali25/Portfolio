import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [resumeOpen, setResumeOpen] = useState(false);

  // Scrollspy logic to automatically highlight active navigation anchors
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience'];
      // Offset added so activation happens slightly before the section fully hits the viewport top
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1128] text-[#f8f8f6] font-sans selection:bg-[#38bdf8] selection:text-black">
      {/* Navigation Header */}
      <Header 
        onResumeClick={() => setResumeOpen(true)}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />

      {/* Main Layout Sections */}
      <main>
        {/* Home Splash Hero */}
        <Hero 
          onViewResume={() => setResumeOpen(true)}
          onNavigate={handleNavClick}
        />

        {/* About Bio & Graduate credentials */}
        <About />

        {/* Technical Competency Matrix */}
        <Skills />

        {/* Dynamic Project Dashboard Playgrounds */}
        <Projects />

        {/* Internship, BCA details, and verified certificates */}
        <Experience />
      </main>

      {/* Footer Acknowledgement */}
      <Footer />

      {/* Printer-Friendly PDF Resume Portal */}
      <ResumeModal 
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}

