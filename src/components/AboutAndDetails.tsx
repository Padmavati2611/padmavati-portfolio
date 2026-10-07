import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const AboutAndDetails: React.FC = () => {
  const { data } = usePortfolio();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <>
      <hr className="model-divider !my-0" />
      <section className="section-wrapper !pt-8 sm:!pt-10 !pb-10" id="about">
        {/* Section Eyebrow & Title from abhishekbellikoppa model */}
        <div className="section-eyebrow">Profile</div>
        <h2 className="section-title">About Me</h2>

        <div className="about-grid grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative with .about-highlight banner */}
          <div className="lg:col-span-7 space-y-4">
            <div className="about-text text-[1rem] text-[var(--muted)] leading-[1.85] space-y-4">
              <p>
                Hi, I'm <strong className="text-[var(--dark)] font-semibold">{data.personalInfo.name}</strong> — an aspiring <strong className="text-[var(--dark)] font-semibold">{data.personalInfo.role}</strong> passionate about Artificial Intelligence, Machine Learning, Computer Vision, and developing practical technology solutions.
              </p>

              <p>
                {data.personalInfo.aboutBio}
              </p>

              {/* The iconic .about-highlight callout banner from abhishekbellikoppa.netlify.app */}
              <div className="about-highlight">
                Quick learner, detail-oriented, and eager to gain real-world AI/ML experience while solving meaningful technological challenges.
              </div>

              <p>
                I have hands-on knowledge of Python, algorithmic problem solving, machine learning architectures, computer vision frameworks, data analysis, and modern web application development.
              </p>
            </div>
          </div>

          {/* Right Column: Skills Blocks with .tag-cloud & .tag badges */}
          <div className="lg:col-span-5 space-y-6">
            {/* AI & ML Skills Block */}
            <div className="skills-block">
              <div className="skills-block-label text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[var(--muted)] mb-2.5">
                AI & Machine Learning Focus
              </div>
              <div className="tag-cloud flex flex-wrap gap-2">
                {data.skills.aiMl.map((skill, idx) => (
                  <span key={idx} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Programming & Web Skills Block */}
            <div className="skills-block">
              <div className="skills-block-label text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[var(--muted)] mb-2.5">
                Languages & Development
              </div>
              <div className="tag-cloud flex flex-wrap gap-2">
                {data.skills.programming.map((lang, idx) => (
                  <span key={idx} className="tag font-mono">
                    {lang}
                  </span>
                ))}
                {data.skills.webDev.map((item, idx) => (
                  <span key={'web-' + idx} className="tag font-mono">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Personal Details Card */}
            <div className="skills-block pt-2">
              <div className="skills-block-label text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[var(--muted)] mb-2.5">
                Personal & Contact Credentials
              </div>

              <div className="bg-[var(--white)] border border-[var(--border)] rounded-xl p-4 space-y-2.5 text-xs shadow-sm">
                <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                  <span className="text-[var(--muted)] font-mono">Name</span>
                  <span className="font-semibold text-[var(--dark)]">{data.personalInfo.name}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                  <span className="text-[var(--muted)] font-mono">Role</span>
                  <span className="text-[var(--accent)] font-medium">{data.personalInfo.role}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                  <span className="text-[var(--muted)] font-mono">Email</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(data.personalInfo.email, 'email')}
                      className="text-[var(--accent)] hover:underline font-mono text-left cursor-pointer"
                      title="Click to copy email address"
                    >
                      {copiedKey === 'email' ? 'Copied to clipboard!' : data.personalInfo.email}
                    </button>
                    <button
                      onClick={() => copyToClipboard(data.personalInfo.email, 'email')}
                      className="p-1 rounded text-[var(--muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                      title="Copy email to clipboard"
                    >
                      {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                  <span className="text-[var(--muted)] font-mono">Phone</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(data.personalInfo.phone, 'phone')}
                      className="text-[var(--accent)] hover:underline font-mono text-left cursor-pointer"
                      title="Click to copy phone number"
                    >
                      {copiedKey === 'phone' ? 'Copied to clipboard!' : data.personalInfo.phone}
                    </button>
                    <button
                      onClick={() => copyToClipboard(data.personalInfo.phone, 'phone')}
                      className="p-1 rounded text-[var(--muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                      title="Copy phone number to clipboard"
                    >
                      {copiedKey === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                  <span className="text-[var(--muted)] font-mono">LinkedIn</span>
                  <a
                    href={data.personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 font-mono"
                  >
                    <span>padmavati-b-aa8314329</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-[var(--muted)] font-mono">GitHub</span>
                  <a
                    href={data.personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>github.com/Padmavati2611</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
