import React, { useState } from 'react';
import {
  FolderGit2,
  Github,
  Video,
  Lightbulb,
  ArrowUpRight,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Projects: React.FC = () => {
  const { data } = usePortfolio();
  const [expandedProblemId, setExpandedProblemId] = useState<string | null>(null);

  const toggleProblem = (id: string) => {
    setExpandedProblemId(expandedProblemId === id ? null : id);
  };

  return (
    <>
      <hr className="model-divider" />
      <section className="section-wrapper" id="projects">
        {/* Eyebrow & Title */}
        <div className="section-eyebrow">Engineering Work</div>
        <h2 className="section-title mb-10">My Projects</h2>

        {/* Empty state per prompt:
           "Initially display: My Projects - 'Projects will be added here.'"
           "Do not create fake project names, links, statistics, or achievements."
        */}
        {data.projects.length === 0 ? (
          <div className="bg-[var(--white)] border border-[var(--border)] rounded-2xl p-10 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center mx-auto mb-4 font-serif-fraunces text-2xl font-bold">
              💻
            </div>
            <h3 className="font-serif-fraunces text-lg font-bold text-[var(--dark)] mb-1">
              Projects will be added here.
            </h3>
            <p className="text-xs text-[var(--muted)] max-w-md mx-auto leading-relaxed">
              AI/ML models, computer vision systems, and intelligent applications will be showcased here as they are developed.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects.map((project) => {
              const isProblemOpen = expandedProblemId === project.id;
              return (
                <div
                  key={project.id}
                  className="bg-[var(--white)] border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {project.imageUrl ? (
                      <div className="w-full h-44 overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-20 bg-[var(--surface)] border-b border-[var(--border)] p-4 flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] bg-[var(--accent-light)] border border-[#e8c49a] px-2.5 py-0.5 rounded-full font-semibold">
                          AI/ML Project
                        </span>
                        <span className="text-lg">🤖</span>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="mb-2">
                        <h3 className="font-serif-fraunces text-lg font-bold text-[var(--dark)] group-hover:text-[var(--accent)] transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-xs text-[var(--muted)] leading-relaxed mb-4">
                        {project.shortDescription}
                      </p>

                      {project.problemSolved && (
                        <div className="mb-4">
                          <button
                            onClick={() => toggleProblem(project.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--accent)] hover:underline cursor-pointer"
                          >
                            <Lightbulb className="w-3 h-3" />
                            <span>
                              {isProblemOpen ? 'Hide Problem Solved' : 'Problem Solved'}
                            </span>
                          </button>
                          {isProblemOpen && (
                            <div className="mt-2 p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text)]">
                              {project.problemSolved}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Technologies tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] text-[11px] font-mono px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 pt-0 mt-4 border-t border-[var(--border)] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 pt-4 w-full">
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--surface)] hover:bg-[var(--accent-light)] text-xs font-semibold text-[var(--text)] hover:text-[var(--accent)] border border-[var(--border)] hover:border-[var(--accent)] transition-all"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>
                      ) : (
                        <span className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--surface)] text-xs font-mono text-[var(--muted)] border border-[var(--border)] opacity-60">
                          GitHub (TBA)
                        </span>
                      )}

                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--dark)] hover:bg-[var(--brown)] text-xs font-semibold text-white transition-all shadow-xs group/btn"
                          title={`Open Live App: ${project.liveDemoUrl}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>{project.liveDemoUrl.includes('streamlit.app') ? 'Streamlit App' : 'Live Demo'}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};
