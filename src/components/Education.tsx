import React from 'react';
import { GraduationCap, Building, Calendar, MapPin, BookOpen } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Education: React.FC = () => {
  const { data, openEditor } = usePortfolio();
  const eduHistory = data.education.history || [
    {
      id: 'edu_be',
      degree: 'B.E. – Artificial Intelligence & Machine Learning',
      collegeName: 'Aditya College of Engineering and Technology, Bangalore',
      university: 'Visvesvaraya Technological University (VTU)',
      period: '2024 — 2028',
      description:
        'Focusing on artificial intelligence, neural networks, machine learning algorithms, computer vision, data structures, and intelligent software engineering.',
    },
    {
      id: 'edu_puc',
      degree: 'PUC – Science',
      collegeName: 'Swami Vivekananda PU Science College, Hulkoti',
      period: 'Pre-University Course',
      description:
        'Science stream (PCMB) with rigorous foundation in Higher Mathematics, Physics, Chemistry, and analytical problem solving.',
    },
    {
      id: 'edu_sslc',
      degree: 'SSLC',
      collegeName: 'Bright Horizon English Medium School, Gadag',
      period: 'Secondary Education (10th Standard)',
      description:
        'Secondary School Leaving Certificate with strong academic foundation in science, mathematics, and communication.',
    },
  ];

  return (
    <>
      <hr className="model-divider" />
      <section className="section-wrapper" id="education">
        {/* Eyebrow & Title */}
        <div className="section-eyebrow">Academic Background</div>
        <h2 className="section-title mb-10">Education</h2>

        {/* 3 Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eduHistory.map((item, index) => {
            const watermarks = ['B.E.', 'PUC', 'SSLC'];
            const icons = ['🎓', '🔬', '📚'];
            const watermark = watermarks[index] || 'EDU';
            const icon = icons[index] || '🎓';

            return (
              <div
                key={item.id || index}
                className="relative bg-[var(--white)] border border-[var(--border)] rounded-2xl p-7 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Giant watermark */}
                <div className="font-serif-fraunces text-6xl font-black text-[var(--surface)] absolute top-3 right-4 leading-none select-none pointer-events-none group-hover:text-[var(--accent-light)] transition-colors">
                  {watermark}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{icon}</span>
                    <span className="inline-block bg-[var(--accent-light)] border border-[#e8c49a] text-[var(--accent)] text-[0.7rem] font-semibold px-2.5 py-0.5 rounded-full tracking-[0.05em]">
                      {item.period || 'Completed'}
                    </span>
                  </div>

                  <h3 className="font-serif-fraunces text-lg font-bold text-[var(--dark)] mb-2 leading-snug">
                    {item.degree}
                  </h3>

                  <div className="text-xs text-[var(--accent)] font-medium mb-3 flex items-start gap-1.5 leading-relaxed">
                    <Building className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>{item.collegeName}</span>
                  </div>

                  {item.description && (
                    <p className="text-xs text-[var(--muted)] leading-relaxed mt-2">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-[var(--border)] text-[11px] font-mono text-[var(--muted)] flex items-center justify-between">
                  <span>Level {index + 1} Qualification</span>
                  <span className="text-[var(--accent)] font-semibold">Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
