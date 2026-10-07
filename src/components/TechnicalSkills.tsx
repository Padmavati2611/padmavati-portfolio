import React from 'react';
import { Edit2, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const TechnicalSkills: React.FC = () => {
  const { data, openEditor } = usePortfolio();

  // Tools & Technologies array matching abhishekbellikoppa.netlify.app model
  const tools = [
    { emoji: '🐍', name: 'Python', cat: 'Core Programming & ML' },
    { emoji: '🧠', name: 'Artificial Intelligence', cat: 'Foundations & Agents' },
    { emoji: '📊', name: 'Machine Learning', cat: 'Predictive Modeling' },
    { emoji: '👁️', name: 'Computer Vision', cat: 'Image Processing & CNNs' },
    { emoji: '📈', name: 'Data Analysis', cat: 'Data Science & Insights' },
    { emoji: '⚙️', name: 'C/C++', cat: 'Data Structures & Systems' },
    { emoji: '👑', name: 'Streamlit', cat: 'AI Web Apps & Dashboards' },
    { emoji: '⚛️', name: 'React', cat: 'Frontend Engineering' },
    { emoji: '🟢', name: 'Node.js', cat: 'Backend & APIs' },
    { emoji: '🌐', name: 'JavaScript / HTML / CSS', cat: 'Web Technologies' },
    { emoji: '💻', name: 'Git & GitHub', cat: 'Version Control' },
    { emoji: '⚡', name: 'Google Colab', cat: 'Cloud GPU Computing' },
    { emoji: '🛠️', name: 'VS Code', cat: 'Development IDE' },
    { emoji: '🤖', name: 'AI Development Tools', cat: 'ML Workflows & SDKs' },
  ];

  return (
    <>
      <hr className="model-divider" />
      <section className="section-wrapper" id="skills">
        {/* Eyebrow & Title from abhishekbellikoppa model */}
        <div className="section-eyebrow">Arsenal</div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 gap-4">
          <h2 className="section-title !mb-0">Tools &amp; Technology</h2>

          <button
            onClick={() => openEditor('skills')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--white)] hover:bg-[var(--accent-light)] text-[var(--text)] hover:text-[var(--accent)] border border-[var(--border)] hover:border-[var(--accent)] text-xs font-semibold transition-all self-start sm:self-auto cursor-pointer shadow-sm"
          >
            <Edit2 className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Manage Skills</span>
          </button>
        </div>

        {/* Tools Grid exactly matching tool-card from abhishekbellikoppa.netlify.app */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {tools.map((item, idx) => (
            <div
              key={idx}
              className="bg-[var(--white)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:-translate-y-0.5 transition-all duration-200 cursor-default shadow-xs"
            >
              <div className="text-2xl mb-2.5">{item.emoji}</div>
              <div className="font-semibold text-[0.95rem] text-[var(--dark)] mb-0.5 leading-snug">
                {item.name}
              </div>
              <div className="text-[0.72rem] text-[var(--muted)] font-medium uppercase tracking-[0.08em]">
                {item.cat}
              </div>
            </div>
          ))}
        </div>

        {/* Categorized Skills Breakdown as requested in prompt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[var(--white)] border border-[var(--border)] rounded-2xl p-6 sm:p-8">
          {/* Programming */}
          <div>
            <div className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[var(--accent)] mb-3">
              Programming
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.programming.map((p, i) => (
                <span key={i} className="tag font-mono text-xs">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* AI & ML */}
          <div>
            <div className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[var(--accent)] mb-3">
              Artificial Intelligence & Machine Learning
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.aiMl.map((m, i) => (
                <span key={i} className="tag text-xs">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Web Development */}
          <div>
            <div className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[var(--accent)] mb-3">
              Web Development
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.webDev.map((w, i) => (
                <span key={i} className="tag font-mono text-xs">
                  {w}
                </span>
              ))}
            </div>
          </div>

          {/* Tools & Platforms */}
          <div>
            <div className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[var(--accent)] mb-3">
              Tools & Platforms
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.tools.map((t, i) => (
                <span key={i} className="tag font-mono text-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
