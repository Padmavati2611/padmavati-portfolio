import React, { useState } from 'react';
import {
  Menu,
  X,
  Github,
  Sun,
  Moon,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { data, theme, toggleTheme } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Skills & Tools', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/92 backdrop-blur-md border-b border-[var(--border)] transition-colors duration-200">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-18">
          {/* Logo / Brand matching Fraunces serif */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group"
          >
            <span className="font-serif-fraunces text-xl font-bold text-[var(--brown)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
              {data.personalInfo.name}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[0.84rem] font-medium tracking-[0.03em] transition-colors ${
                    isActive
                      ? 'text-[var(--accent)] font-semibold'
                      : 'text-[var(--muted)] hover:text-[var(--accent)]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action buttons (Theme Toggle, GitHub & Personalize) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--surface)] border border-[var(--border)] transition-all"
              title={theme === 'warm' ? 'Switch to Dark Mode' : 'Switch to Warm Editorial Mode'}
              aria-label="Toggle visual theme"
            >
              {theme === 'warm' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            <a
              href={data.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2 rounded-lg text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--surface)] border border-[var(--border)] transition-all"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[var(--border)] bg-[var(--bg)]/98 backdrop-blur-xl px-6 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pb-4 mb-3 border-b border-[var(--border)]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[var(--accent-light)] text-[var(--accent)] font-semibold border border-[#e8c49a]'
                      : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-1">
            <a
              href={data.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-medium text-[var(--muted)] hover:text-[var(--accent)]"
            >
              <Github className="w-4 h-4" />
              <span>github.com/Padmavati2611</span>
            </a>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
              AI/ML Student
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
