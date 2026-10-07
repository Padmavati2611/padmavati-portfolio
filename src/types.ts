export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  problemSolved?: string;
  technologies: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  videoUrl?: string;
  imageUrl?: string;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  duration: string;
  description: string;
  skillsLearned: string[];
  appliedTools?: string[];
  category?: 'Intern' | 'Internship' | 'Workshop' | 'Hackathon' | 'Training' | 'Other';
  certificateImage?: string | null;
  certificateName?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  certificateUrl?: string;
  verificationUrl?: string;
}

export interface EducationEntry {
  id?: string;
  degree: string;
  collegeName: string;
  university?: string;
  location?: string;
  period?: string;
  description?: string;
}

export interface EducationData extends EducationEntry {
  history?: EducationEntry[];
}

export interface PersonalInfo {
  name: string;
  role: string;
  professionalFocus: string;
  tagline: string;
  aboutBio: string;
  github: string;
  email: string;
  phone: string;
  linkedin: string;
  profileImage: string | null;
  resume: {
    fileName: string;
    fileData?: string;
    fileUrl?: string;
    uploadedAt?: string;
  } | null;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  education: EducationData;
  skills: {
    programming: string[];
    aiMl: string[];
    webDev: string[];
    tools: string[];
  };
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  certifications: CertificationItem[];
}
