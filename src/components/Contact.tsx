import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Copy,
  Check,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Contact: React.FC = () => {
  const { data } = usePortfolio();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <>
      <hr className="model-divider" />
      <section className="py-12 sm:py-16 px-6 max-w-[1200px] mx-auto text-center" id="contact">
        <h2 className="font-serif-fraunces text-2xl sm:text-3xl font-bold text-[var(--dark)] mb-6">
          Get In Touch
        </h2>

        {/* All in one line only details */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-6 py-4 rounded-2xl bg-[var(--white)] border border-[var(--border)] shadow-xs text-xs sm:text-sm text-[var(--muted)]">
          {/* Email */}
          <button
            onClick={() => copyToClipboard(data.personalInfo.email, 'email')}
            className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors cursor-pointer group"
            title="Click to copy email"
          >
            <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span className="text-[var(--dark)] font-medium group-hover:text-[var(--accent)] transition-colors">
              {data.personalInfo.email}
            </span>
            {copiedKey === 'email' ? (
              <span className="text-emerald-600 text-xs font-semibold flex items-center gap-0.5">
                <Check className="w-3 h-3 text-emerald-600" />
                Copied!
              </span>
            ) : (
              <Copy className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
            )}
          </button>

          <span className="text-[var(--border)] hidden sm:inline">•</span>

          {/* Phone */}
          <button
            onClick={() => copyToClipboard(data.personalInfo.phone, 'phone')}
            className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors cursor-pointer group"
            title="Click to copy phone"
          >
            <Phone className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span className="text-[var(--dark)] font-medium group-hover:text-[var(--accent)] transition-colors">
              {data.personalInfo.phone}
            </span>
            {copiedKey === 'phone' ? (
              <span className="text-emerald-600 text-xs font-semibold flex items-center gap-0.5">
                <Check className="w-3 h-3 text-emerald-600" />
                Copied!
              </span>
            ) : (
              <Copy className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
            )}
          </button>

          <span className="text-[var(--border)] hidden sm:inline">•</span>

          {/* LinkedIn */}
          <a
            href={data.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] text-[var(--dark)] font-medium transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span>LinkedIn</span>
          </a>

          <span className="text-[var(--border)] hidden sm:inline">•</span>

          {/* GitHub */}
          <a
            href={data.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] text-[var(--dark)] font-medium transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span>GitHub</span>
          </a>
        </div>
      </section>
    </>
  );
};
