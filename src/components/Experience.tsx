import React from 'react';
import {
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ExperienceItem } from '../types';

export const Experience: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <>
      <hr className="model-divider" />
      <section className="section-wrapper" id="experience">
        {/* Title */}
        <h2 className="section-title mb-10">Experience &amp; Internships</h2>

        {/* List of Internships - ONLY which internship, NO company name, NO date, NO delete icon, NO upload button */}
        <div className="space-y-8">
          {data.experiences.map((exp: ExperienceItem) => (
            <div
              key={exp.id}
              className="bg-[var(--white)] border border-[var(--border)] rounded-2xl p-6 sm:p-10 transition-shadow duration-300 hover:shadow-lg relative group"
            >
              {/* Header: Role / Internship Title and Category Tag */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-serif-fraunces text-xl sm:text-2xl font-bold text-[var(--dark)]">
                    {exp.role.replace(/Internship/i, 'Intern')}
                  </h3>
                </div>

                <div>
                  <span className="bg-[var(--accent-light)] border border-[#e8c49a] text-[var(--accent)] text-[0.72rem] font-semibold px-3 py-1 rounded-full tracking-[0.06em] uppercase whitespace-nowrap">
                    Intern
                  </span>
                </div>
              </div>

              {/* Metrics Box: Skills & Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-4 sm:p-5">
                  <div className="font-serif-fraunces text-base font-bold text-[var(--accent)] mb-2.5">
                    Skills Developed
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skillsLearned.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-[var(--white)] border border-[var(--border)] text-[var(--text)] text-[11px] font-medium px-2.5 py-1 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-4 sm:p-5">
                  <div className="font-serif-fraunces text-base font-bold text-[var(--accent)] mb-2.5">
                    Applied Tools &amp; Technologies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(exp.appliedTools || ['Python', 'Git', 'Development Tools']).map((tool, idx) => (
                      <span
                        key={idx}
                        className="bg-[var(--white)] border border-[var(--border)] text-[var(--text)] text-[11px] font-mono px-2.5 py-1 rounded-md"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="text-[0.95rem] text-[var(--muted)] leading-[1.8] mb-5">
                {exp.description}
              </div>

              {/* Clean Verified Completion Badge */}
              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--muted)]">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Intern Certified &amp; Completed</span>
                </div>
                <span className="font-mono text-[11px] bg-[var(--surface)] border border-[var(--border)] px-2 py-0.5 rounded text-[var(--muted)]">
                  Intern
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
