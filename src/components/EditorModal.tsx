import React, { useRef, useState } from 'react';
import {
  X,
  User,
  Image as ImageIcon,
  FileText,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Award,
  Cpu,
  Save,
  Plus,
  Trash2,
  Upload,
  Download,
  RotateCcw,
  Check,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const EditorModal: React.FC = () => {
  const {
    data,
    isEditorOpen,
    closeEditor,
    editorActiveTab,
    setEditorActiveTab,
    updatePersonalInfo,
    setResume,
    updateEducation,
    addProject,
    deleteProject,
    addExperience,
    deleteExperience,
    addCertification,
    deleteCertification,
    updateSkillCategory,
    resetToDefaults,
  } = usePortfolio();

  const resumeInputRef = useRef<HTMLInputElement>(null);
  const backupImportRef = useRef<HTMLInputElement>(null);

  const [notification, setNotification] = useState<string | null>(null);

  // New Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    shortDescription: '',
    problemSolved: '',
    technologies: '',
    githubUrl: '',
    liveDemoUrl: '',
    videoUrl: '',
    imageUrl: '',
  });

  // New Experience Form State
  const [newExp, setNewExp] = useState({
    role: '',
    organization: '',
    duration: '',
    category: 'Internship' as const,
    description: '',
    skillsLearned: '',
  });

  // New Certification Form State
  const [newCert, setNewCert] = useState({
    title: '',
    organization: '',
    date: '',
    verificationUrl: '',
    certificateUrl: '',
  });

  // New Skill Input state
  const [newSkillText, setNewSkillText] = useState('');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<
    keyof typeof data.skills
  >('aiMl');

  const flashNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  if (!isEditorOpen) return null;

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      alert('Please select a PDF file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result as string;
      const today = new Date().toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
      setResume({
        fileName: file.name,
        fileData: base64Data,
        uploadedAt: today,
      });
      flashNotification('Resume PDF uploaded.');
    };
    reader.readAsDataURL(file);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    const techs = newProject.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addProject({
      title: newProject.title,
      shortDescription: newProject.shortDescription,
      problemSolved: newProject.problemSolved || undefined,
      technologies: techs.length > 0 ? techs : ['Python', 'AI/ML'],
      githubUrl: newProject.githubUrl || undefined,
      liveDemoUrl: newProject.liveDemoUrl || undefined,
      videoUrl: newProject.videoUrl || undefined,
      imageUrl: newProject.imageUrl || undefined,
    });

    setNewProject({
      title: '',
      shortDescription: '',
      problemSolved: '',
      technologies: '',
      githubUrl: '',
      liveDemoUrl: '',
      videoUrl: '',
      imageUrl: '',
    });
    flashNotification('Project added successfully.');
  };

  const handleCreateExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.role.trim() || !newExp.organization.trim()) return;

    const skills = newExp.skillsLearned
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    addExperience({
      role: newExp.role,
      organization: newExp.organization,
      duration: newExp.duration || '2024 - Present',
      category: newExp.category,
      description: newExp.description,
      skillsLearned: skills,
    });

    setNewExp({
      role: '',
      organization: '',
      duration: '',
      category: 'Internship',
      description: '',
      skillsLearned: '',
    });
    flashNotification('Experience added.');
  };

  const handleCreateCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title.trim() || !newCert.organization.trim()) return;

    addCertification({
      title: newCert.title,
      organization: newCert.organization,
      date: newCert.date || '2024',
      verificationUrl: newCert.verificationUrl || undefined,
      certificateUrl: newCert.certificateUrl || undefined,
    });

    setNewCert({
      title: '',
      organization: '',
      date: '',
      verificationUrl: '',
      certificateUrl: '',
    });
    flashNotification('Certification added.');
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillText.trim()) return;

    const currentSkills = data.skills[selectedSkillCategory] || [];
    if (!currentSkills.includes(newSkillText.trim())) {
      updateSkillCategory(selectedSkillCategory, [
        ...currentSkills,
        newSkillText.trim(),
      ]);
      flashNotification(`Added "${newSkillText.trim()}" to ${selectedSkillCategory}`);
      setNewSkillText('');
    }
  };

  const handleRemoveSkill = (
    category: keyof typeof data.skills,
    skillToRemove: string
  ) => {
    const updated = data.skills[category].filter((s) => s !== skillToRemove);
    updateSkillCategory(category, updated);
  };

  const exportBackupJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Padmavati_Portfolio_Data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported && imported.personalInfo) {
          localStorage.setItem('padmavati_portfolio_data_v1', JSON.stringify(imported));
          window.location.reload();
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const tabs = [
    { id: 'general', label: 'Personal & Contact', icon: User },
    { id: 'photo', label: 'Profile Photo', icon: ImageIcon },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'projects', label: `Projects (${data.projects.length})`, icon: FolderGit2 },
    { id: 'experience', label: `Experience (${data.experiences.length})`, icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'data', label: 'Backup & Reset', icon: RotateCcw },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[var(--white)] border border-[var(--border)] text-[var(--text)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] border border-[#e8c49a] flex items-center justify-center text-[var(--accent)]">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-fraunces text-base font-bold text-[var(--dark)]">
                Customize Portfolio
              </h2>
              <p className="text-xs text-[var(--muted)]">
                Update placeholders with your real credentials, projects & resume
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {notification && (
              <span className="text-xs font-mono text-[var(--accent)] bg-[var(--accent-light)] px-2.5 py-1 rounded-md border border-[#e8c49a] animate-in fade-in">
                {notification}
              </span>
            )}
            <button
              onClick={closeEditor}
              className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--dark)] bg-[var(--white)] hover:bg-[var(--surface)] border border-[var(--border)] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[var(--bg)] border-b border-[var(--border)] overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = editorActiveTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setEditorActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--dark)] text-white font-semibold shadow-sm'
                    : 'text-[var(--muted)] hover:text-[var(--dark)] hover:bg-[var(--surface)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: GENERAL & CONTACT */}
          {editorActiveTab === 'general' || editorActiveTab === 'contact' ? (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-300">
                Replace placeholders (e.g. [MY EMAIL], [MY PHONE NUMBER], [MY LINKEDIN URL]) with your real details. All changes save directly in your browser.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={data.personalInfo.name}
                    onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Role Title
                  </label>
                  <input
                    type="text"
                    value={data.personalInfo.role}
                    onChange={(e) => updatePersonalInfo({ role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="text"
                    value={data.personalInfo.email}
                    onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                    placeholder="e.g. padmavati@example.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={data.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                    placeholder="e.g. +91 9876543210"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="text"
                    value={data.personalInfo.linkedin}
                    onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={data.personalInfo.github}
                    onChange={(e) => updatePersonalInfo({ github: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Professional Focus
                </label>
                <input
                  type="text"
                  value={data.personalInfo.professionalFocus}
                  onChange={(e) =>
                    updatePersonalInfo({ professionalFocus: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Hero Tagline / Introduction Quote
                </label>
                <textarea
                  rows={2}
                  value={data.personalInfo.tagline}
                  onChange={(e) => updatePersonalInfo({ tagline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  About Me Narrative
                </label>
                <textarea
                  rows={3}
                  value={data.personalInfo.aboutBio}
                  onChange={(e) => updatePersonalInfo({ aboutBio: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          ) : null}

          {/* TAB 2: PROFILE PHOTO */}
          {editorActiveTab === 'photo' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-300 space-y-1">
                <p className="font-semibold text-cyan-200">Fixed Profile Photograph:</p>
                <p className="text-slate-300">
                  The profile photo is a permanent part of this portfolio site. It is displayed
                  exactly as provided and cannot be changed or removed from here.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-slate-950/60 border border-white/[0.08]">
                <div className="relative w-44 h-44 rounded-2xl overflow-hidden bg-slate-900 border border-white/15 shadow-xl shrink-0">
                  {data.personalInfo.profileImage ? (
                    <img
                      src={data.personalInfo.profileImage}
                      alt="Current profile"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 p-4 text-center">
                      <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                      <span className="text-xs">Photograph unavailable</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4 text-left">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Profile Photograph
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm">
                      Displays on the top-right side on desktop, and centered on mobile devices.
                    </p>
                  </div>

                  <p className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-400">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Image is locked — upload controls are disabled</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RESUME */}
          {editorActiveTab === 'resume' && (
            <div className="space-y-6">
              <input
                type="file"
                ref={resumeInputRef}
                onChange={handleResumeUpload}
                accept="application/pdf"
                className="hidden"
              />

              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.08]">
                <h3 className="text-sm font-semibold text-white mb-2">
                  Upload PDF Resume
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Recruiters will be able to download your resume with a single click from the Hero and Resume sections.
                </p>

                {data.personalInfo.resume ? (
                  <div className="flex items-center justify-between p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 mb-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-cyan-400" />
                      <div>
                        <p className="text-xs font-semibold text-white">
                          {data.personalInfo.resume.fileName}
                        </p>
                        <p className="text-[10px] font-mono text-slate-400">
                          Uploaded: {data.personalInfo.resume.uploadedAt || 'Ready for download'}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setResume(null)}
                      className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete resume"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs mb-4">
                    Current status: "Resume coming soon" badge is active.
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => resumeInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Resume (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EDUCATION */}
          {editorActiveTab === 'education' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-300">
                Update academic placeholders with your real college and university details.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={data.education.degree}
                    onChange={(e) => updateEducation({ degree: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    College Name
                  </label>
                  <input
                    type="text"
                    value={data.education.collegeName}
                    onChange={(e) =>
                      updateEducation({ collegeName: e.target.value })
                    }
                    placeholder="e.g. National Institute of Technology"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    University / Board
                  </label>
                  <input
                    type="text"
                    value={data.education.university}
                    onChange={(e) =>
                      updateEducation({ university: e.target.value })
                    }
                    placeholder="e.g. VTU / State Technical University"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={data.education.location}
                    onChange={(e) => updateEducation({ location: e.target.value })}
                    placeholder="e.g. Karnataka, India"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Education Period
                  </label>
                  <input
                    type="text"
                    value={data.education.period}
                    onChange={(e) => updateEducation({ period: e.target.value })}
                    placeholder="e.g. 2022 - 2026"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Curriculum Summary / Description
                  </label>
                  <textarea
                    rows={2}
                    value={data.education.description}
                    onChange={(e) =>
                      updateEducation({ description: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROJECTS */}
          {editorActiveTab === 'projects' && (
            <div className="space-y-6">
              {/* Add Project Form */}
              <form
                onSubmit={handleCreateProject}
                className="p-5 rounded-2xl bg-slate-950/60 border border-white/[0.08] space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-semibold text-white">
                    Add New Project
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProject.title}
                      onChange={(e) =>
                        setNewProject({ ...newProject, title: e.target.value })
                      }
                      placeholder="e.g. Real-Time Vision Classifier"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Technologies (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newProject.technologies}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          technologies: e.target.value,
                        })
                      }
                      placeholder="Python, PyTorch, OpenCV, Flask"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Short Description *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={newProject.shortDescription}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        shortDescription: e.target.value,
                      })
                    }
                    placeholder="Brief description of project capabilities and architecture..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Problem Solved
                  </label>
                  <input
                    type="text"
                    value={newProject.problemSolved}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        problemSolved: e.target.value,
                      })
                    }
                    placeholder="How this system solves specific latency, detection, or data challenge..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      GitHub Repo URL
                    </label>
                    <input
                      type="text"
                      value={newProject.githubUrl}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          githubUrl: e.target.value,
                        })
                      }
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Live Demo URL
                    </label>
                    <input
                      type="text"
                      value={newProject.liveDemoUrl}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          liveDemoUrl: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Project Video URL
                    </label>
                    <input
                      type="text"
                      value={newProject.videoUrl}
                      onChange={(e) =>
                        setNewProject({ ...newProject, videoUrl: e.target.value })
                      }
                      placeholder="YouTube / Loom / Drive link"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Project</span>
                </button>
              </form>

              {/* Current Projects List */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Existing Projects ({data.projects.length})
                </h4>
                {data.projects.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">
                    No projects yet. "Projects will be added here" is currently displayed on the portfolio.
                  </p>
                ) : (
                  data.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-white/[0.06]"
                    >
                      <div>
                        <p className="text-xs font-semibold text-white">
                          {proj.title}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate max-w-md">
                          {proj.shortDescription}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteProject(proj.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 6: EXPERIENCE */}
          {editorActiveTab === 'experience' && (
            <div className="space-y-6">
              <form
                onSubmit={handleCreateExperience}
                className="p-5 rounded-2xl bg-slate-950/60 border border-white/[0.08] space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-semibold text-white">
                    Add Experience Entry
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Role *
                    </label>
                    <input
                      type="text"
                      required
                      value={newExp.role}
                      onChange={(e) =>
                        setNewExp({ ...newExp, role: e.target.value })
                      }
                      placeholder="e.g. AI/ML Research Intern"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={newExp.organization}
                      onChange={(e) =>
                        setNewExp({ ...newExp, organization: e.target.value })
                      }
                      placeholder="e.g. Internship Studio / Company Name"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={newExp.duration}
                      onChange={(e) =>
                        setNewExp({ ...newExp, duration: e.target.value })
                      }
                      placeholder="e.g. June 2024 - August 2024"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Category
                    </label>
                    <select
                      value={newExp.category}
                      onChange={(e) =>
                        setNewExp({
                          ...newExp,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Internship">Internship</option>
                      <option value="Hackathon">Hackathon</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Training">Training</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={newExp.description}
                    onChange={(e) =>
                      setNewExp({ ...newExp, description: e.target.value })
                    }
                    placeholder="Responsibilities, models built, datasets handled..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Skills Learned (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newExp.skillsLearned}
                    onChange={(e) =>
                      setNewExp({ ...newExp, skillsLearned: e.target.value })
                    }
                    placeholder="Python, TensorFlow, Data Preprocessing, Teamwork"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Experience</span>
                </button>
              </form>

              {/* Existing Experiences */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Existing Experiences ({data.experiences.length})
                </h4>
                {data.experiences.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">
                    No experiences added yet.
                  </p>
                ) : (
                  data.experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-white/[0.06]"
                    >
                      <div>
                        <p className="text-xs font-semibold text-white">
                          {exp.role} • {exp.organization}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {exp.duration}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteExperience(exp.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                        title="Delete experience"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 7: CERTIFICATIONS */}
          {editorActiveTab === 'certifications' && (
            <div className="space-y-6">
              <form
                onSubmit={handleCreateCertification}
                className="p-5 rounded-2xl bg-slate-950/60 border border-white/[0.08] space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-semibold text-white">
                    Add Certificate / Achievement
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Certificate / Award Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newCert.title}
                      onChange={(e) =>
                        setNewCert({ ...newCert, title: e.target.value })
                      }
                      placeholder="e.g. Deep Learning Specialization"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Issuing Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={newCert.organization}
                      onChange={(e) =>
                        setNewCert({ ...newCert, organization: e.target.value })
                      }
                      placeholder="e.g. Coursera / DeepLearning.AI / Google"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Date Issued
                    </label>
                    <input
                      type="text"
                      value={newCert.date}
                      onChange={(e) =>
                        setNewCert({ ...newCert, date: e.target.value })
                      }
                      placeholder="e.g. 2024"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Verification Link (optional)
                    </label>
                    <input
                      type="text"
                      value={newCert.verificationUrl}
                      onChange={(e) =>
                        setNewCert({
                          ...newCert,
                          verificationUrl: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Certification</span>
                </button>
              </form>

              {/* Current Certifications */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Existing Certifications ({data.certifications.length})
                </h4>
                {data.certifications.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">
                    No certificates added yet.
                  </p>
                ) : (
                  data.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-white/[0.06]"
                    >
                      <div>
                        <p className="text-xs font-semibold text-white">
                          {cert.title} • {cert.organization}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {cert.date}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteCertification(cert.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                        title="Delete certification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 8: SKILLS */}
          {editorActiveTab === 'skills' && (
            <div className="space-y-6">
              <form
                onSubmit={handleAddSkill}
                className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.08] flex flex-col sm:flex-row gap-3 items-end"
              >
                <div className="flex-1 w-full">
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Select Skill Category
                  </label>
                  <select
                    value={selectedSkillCategory}
                    onChange={(e) =>
                      setSelectedSkillCategory(e.target.value as any)
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="programming">Programming</option>
                    <option value="aiMl">Artificial Intelligence & ML</option>
                    <option value="webDev">Web Development</option>
                    <option value="tools">Tools & Platforms</option>
                  </select>
                </div>

                <div className="flex-1 w-full">
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={newSkillText}
                    onChange={(e) => setNewSkillText(e.target.value)}
                    placeholder="e.g. Scikit-Learn, PyTorch"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all w-full sm:w-auto"
                >
                  Add Skill
                </button>
              </form>

              {/* Skills display by category */}
              {(
                [
                  { key: 'programming', label: 'Programming' },
                  { key: 'aiMl', label: 'Artificial Intelligence & Machine Learning' },
                  { key: 'webDev', label: 'Web Development' },
                  { key: 'tools', label: 'Tools & Platforms' },
                ] as const
              ).map((cat) => (
                <div
                  key={cat.key}
                  className="p-4 rounded-xl bg-slate-950/40 border border-white/[0.06]"
                >
                  <h4 className="text-xs font-semibold text-white mb-2">
                    {cat.label}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.skills[cat.key].map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] text-xs font-mono text-slate-300 border border-white/10"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => handleRemoveSkill(cat.key, skill)}
                          className="hover:text-red-400 text-slate-500 transition-colors"
                          title="Remove skill"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 9: BACKUP & RESET */}
          {editorActiveTab === 'data' && (
            <div className="space-y-6">
              <input
                type="file"
                ref={backupImportRef}
                onChange={handleImportBackup}
                accept="application/json"
                className="hidden"
              />

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/[0.08] space-y-3">
                <h3 className="text-sm font-semibold text-white">
                  Export & Import Data
                </h3>
                <p className="text-xs text-slate-400">
                  Export your customized portfolio data as a JSON file to keep an offline backup or transfer between computers.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={exportBackupJSON}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-medium border border-white/10 transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Export Data (JSON)</span>
                  </button>

                  <button
                    onClick={() => backupImportRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-medium border border-white/10 transition-all"
                  >
                    <Upload className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Import Data (JSON)</span>
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-3">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                  <h3 className="text-sm font-semibold">
                    Reset to Default Placeholders
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  This will restore the original placeholder state (resets email to [MY EMAIL], projects to empty, etc.).
                </p>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to reset all portfolio changes back to the initial default placeholders?'
                      )
                    ) {
                      resetToDefaults();
                      closeEditor();
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-semibold transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Data</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950/80 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">
            Changes auto-save immediately to localStorage
          </span>
          <button
            onClick={closeEditor}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all shadow-md"
          >
            Done & Return to Site
          </button>
        </div>
      </div>
    </div>
  );
};
