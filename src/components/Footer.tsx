import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--border)] py-8 px-6 sm:px-12 max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[var(--muted)]">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
        <p className="font-semibold text-[var(--dark)]">
          © {new Date().getFullYear()} {data.personalInfo.name}
        </p>
        <span className="hidden sm:inline text-[var(--border)]">•</span>
        <p>AI/ML Engineering Student</p>
      </div>

      <div className="flex items-center gap-4">
        <a
          href={data.personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--accent)] transition-colors"
          title="GitHub"
        >
          GitHub
        </a>

        {data.personalInfo.linkedin.includes('http') && (
          <a
            href={data.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-colors"
            title="LinkedIn"
          >
            LinkedIn
          </a>
        )}

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1 hover:text-[var(--accent)] transition-colors cursor-pointer ml-2"
          title="Back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
