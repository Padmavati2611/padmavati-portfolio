import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_PORTFOLIO_DATA, PROFILE_IMAGE } from '../data/initialData';
import {
  CertificationItem,
  EducationData,
  ExperienceItem,
  PersonalInfo,
  PortfolioData,
  ProjectItem,
} from '../types';

interface PortfolioContextType {
  data: PortfolioData;
  theme: 'warm' | 'dark';
  toggleTheme: () => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  setResume: (resume: PersonalInfo['resume']) => void;
  updateEducation: (edu: Partial<EducationData>) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  editProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => void;
  editExperience: (id: string, exp: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  addCertification: (cert: Omit<CertificationItem, 'id'>) => void;
  editCertification: (id: string, cert: Partial<CertificationItem>) => void;
  deleteCertification: (id: string) => void;
  updateSkillCategory: (category: keyof PortfolioData['skills'], skills: string[]) => void;
  resetToDefaults: () => void;
  isEditorOpen: boolean;
  openEditor: (tab?: string) => void;
  closeEditor: () => void;
  editorActiveTab: string;
  setEditorActiveTab: (tab: string) => void;
}

const STORAGE_KEY = 'padmavati_portfolio_data_v1';
const THEME_KEY = 'padmavati_portfolio_theme_v1';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'warm' | 'dark'>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'dark' || savedTheme === 'warm') return savedTheme;
    } catch (e) {}
    // Default to the exact warm aesthetic from abhishekbellikoppa.netlify.app
    return 'warm';
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'warm' ? 'dark' : 'warm';
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {}
      return next;
    });
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const savedPersonal = parsed.personalInfo || {};

        // Auto-upgrade placeholder contact info to real contact details
        const email =
          !savedPersonal.email || savedPersonal.email === '[MY EMAIL]'
            ? INITIAL_PORTFOLIO_DATA.personalInfo.email
            : savedPersonal.email;
        const phone =
          !savedPersonal.phone || savedPersonal.phone === '[MY PHONE NUMBER]'
            ? INITIAL_PORTFOLIO_DATA.personalInfo.phone
            : savedPersonal.phone;
        const linkedin =
          !savedPersonal.linkedin ||
          savedPersonal.linkedin === '[MY LINKEDIN URL]' ||
          !savedPersonal.linkedin.includes('linkedin.com/in/')
            ? INITIAL_PORTFOLIO_DATA.personalInfo.linkedin
            : savedPersonal.linkedin;

        // Auto-upgrade education if placeholder or missing complete history
        const education =
          !parsed.education ||
          !parsed.education.history ||
          parsed.education.history.length < 3 ||
          parsed.education.collegeName.includes('[')
            ? INITIAL_PORTFOLIO_DATA.education
            : parsed.education;

        // Keep only active core projects with verified live demo URLs
        const projects = INITIAL_PORTFOLIO_DATA.projects.map((p) => {
          if (p.id === 'proj_ai_commerce') {
            return {
              ...p,
              liveDemoUrl: 'https://ai-commerce-agent-grg8zow28uupageuohaksp.streamlit.app/',
              githubUrl: 'https://github.com/Padmavati2611/ai-commerce-agent',
            };
          }
          if (p.id === 'proj_sunchill_agritech') {
            return {
              ...p,
              liveDemoUrl: 'https://padmavati2611.github.io/agriculture-foodtech-rural-development/',
              githubUrl: 'https://github.com/Padmavati2611/agriculture-foodtech-rural-development',
            };
          }
          return p;
        });

        // Auto-upgrade experiences to current clean format (which internship only, no company name)
        const experiences = INITIAL_PORTFOLIO_DATA.experiences;

        // Remove Java and C/C++ from programming skills
        const savedSkills = parsed.skills || INITIAL_PORTFOLIO_DATA.skills;
        const programming = (savedSkills.programming || ['Python']).filter(
          (s: string) =>
            !['java', 'c/c++', 'c++', 'c'].includes(s.trim().toLowerCase())
        );

        return {
          ...INITIAL_PORTFOLIO_DATA,
          ...parsed,
          personalInfo: {
            ...INITIAL_PORTFOLIO_DATA.personalInfo,
            ...savedPersonal,
            email,
            phone,
            linkedin,
            // Profile photo is a fixed site asset — never overridden by stored data
            profileImage: PROFILE_IMAGE,
          },
          education,
          skills: {
            ...savedSkills,
            programming,
          },
          projects,
          experiences,
          certifications: [],
        };
      }
    } catch (e) {
      console.error('Failed to load portfolio data from storage:', e);
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorActiveTab, setEditorActiveTab] = useState('general');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed (possibly quota exceeded):', e);
    }
  }, [data]);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const setResume = (resume: PersonalInfo['resume']) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, resume },
    }));
  };

  const updateEducation = (edu: Partial<EducationData>) => {
    setData((prev) => ({
      ...prev,
      education: { ...prev.education, ...edu },
    }));
  };

  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    const newProj: ProjectItem = {
      ...project,
      id: 'proj_' + Date.now(),
    };
    setData((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }));
  };

  const editProject = (id: string, updated: Partial<ProjectItem>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addExperience = (exp: Omit<ExperienceItem, 'id'>) => {
    const newExp: ExperienceItem = {
      ...exp,
      id: 'exp_' + Date.now(),
    };
    setData((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences],
    }));
  };

  const editExperience = (id: string, updated: Partial<ExperienceItem>) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => (e.id === id ? { ...e, ...updated } : e)),
    }));
  };

  const deleteExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  const addCertification = (cert: Omit<CertificationItem, 'id'>) => {
    const newCert: CertificationItem = {
      ...cert,
      id: 'cert_' + Date.now(),
    };
    setData((prev) => ({
      ...prev,
      certifications: [newCert, ...prev.certifications],
    }));
  };

  const editCertification = (id: string, updated: Partial<CertificationItem>) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) => (c.id === id ? { ...c, ...updated } : c)),
    }));
  };

  const deleteCertification = (id: string) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  const updateSkillCategory = (category: keyof PortfolioData['skills'], skills: string[]) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: skills,
      },
    }));
  };

  const resetToDefaults = () => {
    setData(INITIAL_PORTFOLIO_DATA);
    localStorage.removeItem(STORAGE_KEY);
  };

  const openEditor = (tab = 'general') => {
    setEditorActiveTab(tab);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        theme,
        toggleTheme,
        updatePersonalInfo,
        setResume,
        updateEducation,
        addProject,
        editProject,
        deleteProject,
        addExperience,
        editExperience,
        deleteExperience,
        addCertification,
        editCertification,
        deleteCertification,
        updateSkillCategory,
        resetToDefaults,
        isEditorOpen,
        openEditor,
        closeEditor,
        editorActiveTab,
        setEditorActiveTab,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
