import React from 'react';
import { Award, Plus, Calendar, ExternalLink, Trash2, Building } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Certifications: React.FC = () => {
  const { data, openEditor, deleteCertification } = usePortfolio();

  return (
    <>
      <hr className="model-divider" />
      <section className="section-wrapper" id="certifications">
        {/* Eyebrow & Title from model */}
        <div className="section-eyebrow">Credentials &amp; Honors</div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 gap-4">
          <h2 className="section-title !mb-0">Certifications &amp; Achievements</h2>

          <button
            onClick={() => openEditor('certifications')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--white)] hover:bg-[var(--accent-light)] text-[var(--text)] hover:text-[var(--accent)] border border-[var(--border)] hover:border-[var(--accent)] text-xs font-semibold transition-all self-start sm:self-auto cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Add Certification</span>
          </button>
        </div>

        {/* Empty State */}
        {data.certifications.length === 0 ? (
          <div className="bg-[var(--white)] border border-[var(--border)] rounded-2xl p-10 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[var(--surface)] text-[var(--accent)] flex items-center justify-center mx-auto mb-4 font-serif-fraunces text-2xl font-bold">
              🏅
            </div>
            <h3 className="font-serif-fraunces text-lg font-bold text-[var(--dark)] mb-1">
              Certifications and Achievements will appear here
            </h3>
            <p className="text-xs text-[var(--muted)] max-w-md mx-auto mb-6 leading-relaxed">
              AI/ML certifications, online course credentials, hackathon honors, and workshop certificates can be added cleanly here.
            </p>
            <button
              onClick={() => openEditor('certifications')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--dark)] text-white hover:bg-[var(--brown)] text-xs font-semibold transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add First Credential</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-[var(--white)] border border-[var(--border)] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-2xl">📜</span>
                    <button
                      onClick={() => deleteCertification(cert.id)}
                      className="p-1 text-[var(--muted)] hover:text-red-500 transition-colors opacity-60 hover:opacity-100"
                      title="Remove certificate"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="font-serif-fraunces text-base font-bold text-[var(--dark)] group-hover:text-[var(--accent)] transition-colors mb-1">
                    {cert.title}
                  </h3>

                  <div className="text-xs text-[var(--muted)] mb-3 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>{cert.organization}</span>
                  </div>

                  {cert.date && (
                    <span className="inline-block bg-[var(--accent-light)] border border-[#e8c49a] text-[var(--accent)] text-[0.72rem] font-semibold px-2.5 py-0.5 rounded-full mb-4">
                      {cert.date}
                    </span>
                  )}
                </div>

                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs">
                  {cert.verificationUrl ? (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[var(--muted)] text-[11px]">
                      Verified Record
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};
