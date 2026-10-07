import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Copy,
  Check,
  Mail,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    showToast(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="flex items-center pt-24 pb-8 sm:pb-10 lg:pt-28 lg:pb-12">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
        {/* Toast alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[var(--dark)] text-white px-4 py-3 rounded-xl shadow-2xl border border-[var(--accent)] animate-in fade-in slide-in-from-bottom duration-200">
            <CheckCircle className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1">
            {/* Pulsing Eyebrow badge matching abhishekbellikoppa model */}
            <div className="inline-flex items-center gap-2 bg-[var(--accent-light)] border border-[#e8c49a] text-[var(--accent)] text-[0.75rem] font-semibold tracking-[0.1em] uppercase px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
              <span>Available for Internship Opportunities</span>
            </div>

            {/* Headline with Fraunces serif */}
            <h1 className="font-serif-fraunces text-[clamp(2.9rem,5.6vw,4.8rem)] font-black leading-[1.02] tracking-[-0.03em] text-[var(--dark)] mb-3">
              Padmavati
              <span className="text-[var(--accent)] block text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold mt-1 tracking-normal">
                AI/ML Engineering Student
              </span>
            </h1>

            {/* Role subtitle */}
            <div className="text-[0.95rem] font-medium text-[var(--muted)] tracking-[0.05em] uppercase mb-5">
              Artificial Intelligence • Machine Learning • Computer Vision
            </div>

            {/* Description quote */}
            <p className="text-[1.05rem] text-[var(--muted)] leading-[1.8] max-w-[500px] mb-8 font-normal">
              "{data.personalInfo.tagline}"
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-8">
              {/* 1. View Projects */}
              <button
                onClick={() => scrollTo('#projects')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--dark)] text-white hover:bg-[var(--brown)] text-[0.88rem] font-semibold tracking-[0.02em] transition-all shadow-md active:translate-y-0.5 cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* 2. Contact Me */}
              <button
                onClick={() => scrollTo('#contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--white)] text-[var(--text)] hover:text-[var(--accent)] border border-[var(--border)] hover:border-[var(--accent)] text-[0.88rem] font-semibold tracking-[0.02em] transition-all cursor-pointer shadow-xs"
              >
                <Mail className="w-4 h-4 text-[var(--accent)]" />
                <span>Contact Me</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Photo Card from abhishekbellikoppa.netlify.app model */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="photo-card">
              {/* Main Photo Wrap */}
              <div className="photo-wrap">
                {data.personalInfo.profileImage ? (
                  /* Fixed site photograph, rendered exactly as provided */
                  <div className="relative">
                    <img
                      src={data.personalInfo.profileImage}
                      alt="Padmavati — AI/ML Engineering Student"
                      className="photo-img"
                    />
                  </div>
                ) : (
                  /* Fallback if the bundled photograph is unavailable */
                  <div className="w-full aspect-[4/4.5] flex flex-col items-center justify-center bg-[var(--surface)] p-6 text-center text-[var(--muted)]">
                    <div className="w-20 h-20 rounded-full bg-[var(--border)] flex items-center justify-center font-serif-fraunces text-3xl font-black text-[var(--brown)] mb-3 shadow-inner">
                      P
                    </div>
                    <div className="font-serif-fraunces text-base font-bold text-[var(--dark)] mb-1">
                      Padmavati
                    </div>
                    <p className="text-xs text-[var(--muted)] max-w-[200px]">
                      AI/ML Engineering Student
                    </p>
                  </div>
                )}

                {/* Photo Info Banner */}
                <div className="photo-info">
                  <div>
                    <div className="photo-info-name">Padmavati</div>
                    <div className="photo-info-role">AI/ML Engineering Student</div>
                  </div>
                  <div className="available-badge">Available for Internships</div>
                </div>
              </div>

              {/* Contact chips matching abhishekbellikoppa.netlify.app model */}
              <div className="contact-chips">
                {/* Email Chip with Copy Button */}
                <div className="chip flex items-center justify-between gap-1 group">
                  <button
                    onClick={() => copyToClipboard(data.personalInfo.email, 'Email')}
                    className="flex items-center gap-1.5 flex-1 min-w-0 text-left cursor-pointer hover:text-[var(--accent)]"
                    title="Click to copy email address"
                  >
                    <span className="chip-icon">✉</span>
                    <span className="truncate">
                      {copiedKey === 'Email' ? 'Copied!' : data.personalInfo.email}
                    </span>
                  </button>
                  <button
                    onClick={() => copyToClipboard(data.personalInfo.email, 'Email')}
                    className="p-1 rounded text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--surface)] transition-colors shrink-0 cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copiedKey === 'Email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* LinkedIn */}
                <a
                  href={data.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip"
                  title="LinkedIn Profile"
                >
                  <span className="chip-icon">🔗</span>
                  <span>LinkedIn</span>
                </a>

                {/* GitHub */}
                <a
                  href={data.personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip"
                  title="GitHub Profile"
                >
                  <span className="chip-icon">💻</span>
                  <span>GitHub</span>
                </a>

                {/* Phone Chip with Copy Button */}
                <div className="chip flex items-center justify-between gap-1 group">
                  <button
                    onClick={() => copyToClipboard(data.personalInfo.phone, 'Phone number')}
                    className="flex items-center gap-1.5 flex-1 min-w-0 text-left cursor-pointer hover:text-[var(--accent)]"
                    title="Click to copy phone number"
                  >
                    <span className="chip-icon">📞</span>
                    <span className="truncate">
                      {copiedKey === 'Phone number' ? 'Copied!' : data.personalInfo.phone}
                    </span>
                  </button>
                  <button
                    onClick={() => copyToClipboard(data.personalInfo.phone, 'Phone number')}
                    className="p-1 rounded text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--surface)] transition-colors shrink-0 cursor-pointer"
                    title="Copy phone number to clipboard"
                  >
                    {copiedKey === 'Phone number' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
