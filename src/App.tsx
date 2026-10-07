import React, { useEffect, useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutAndDetails } from './components/AboutAndDetails';
import { TechnicalSkills } from './components/TechnicalSkills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { EditorModal } from './components/EditorModal';
import { Edit3, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { openEditor } = usePortfolio();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'about',
        'skills',
        'projects',
        'experience',
        'education',
        'contact',
      ];

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] relative flex flex-col font-sans-dm transition-colors duration-200">
      {/* Sticky Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero />
        <AboutAndDetails />
        <Experience />
        <Education />
        <TechnicalSkills />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Personalize/Edit Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => openEditor('general')}
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[var(--white)] hover:bg-[var(--accent-light)] text-[var(--text)] hover:text-[var(--accent)] border border-[var(--border)] hover:border-[var(--accent)] shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer"
          title="Customize & Personalize Portfolio Profile"
        >
          <div className="w-6 h-6 rounded-full bg-[var(--accent-light)] border border-[#e8c49a] flex items-center justify-center text-[var(--accent)] group-hover:rotate-12 transition-transform">
            <Edit3 className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold tracking-wide pr-1">
            Personalize Details
          </span>
        </button>
      </div>

      {/* Editor Modal */}
      <EditorModal />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <MainContent />
    </PortfolioProvider>
  );
}
