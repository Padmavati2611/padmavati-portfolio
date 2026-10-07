import { PortfolioData } from '../types';

export const PROFILE_IMAGE = '/profile.jpg';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  personalInfo: {
    name: 'Padmavati',
    role: 'AI/ML Engineering Student',
    professionalFocus:
      'Artificial Intelligence, Machine Learning, Computer Vision, Data Science, and AI-powered applications.',
    tagline:
      'Passionate about Artificial Intelligence and Machine Learning, with an interest in building practical, intelligent, and user-focused technology solutions.',
    aboutBio:
      'I am Padmavati, an AI/ML Engineering student passionate about Artificial Intelligence, Machine Learning, Computer Vision, and developing practical technology solutions. I enjoy learning new technologies, working on innovative projects, participating in hackathons and professional opportunities, and continuously improving my technical skills.',
    github: 'https://github.com/Padmavati2611',
    email: 'padmavatibellikoppa@gmail.com',
    phone: '+91 85490 54525',
    linkedin: 'https://www.linkedin.com/in/padmavati-b-aa8314329/',
    profileImage: PROFILE_IMAGE,
    resume: null,
  },
  education: {
    degree: 'B.E. – Artificial Intelligence & Machine Learning',
    collegeName: 'Aditya College of Engineering and Technology, Bangalore',
    university: 'Visvesvaraya Technological University (VTU)',
    location: 'Bengaluru, Karnataka',
    period: '2024 — 2028',
    description:
      'Pursuing Bachelor of Engineering in Artificial Intelligence & Machine Learning, focusing on foundational and applied ML algorithms, neural models, computer vision, data structures, and intelligent software development.',
    history: [
      {
        id: 'edu_be',
        degree: 'B.E. – Artificial Intelligence & Machine Learning',
        collegeName: 'Aditya College of Engineering and Technology, Bangalore',
        university: 'Visvesvaraya Technological University (VTU)',
        location: 'Bengaluru, Karnataka',
        period: '2024 — 2028',
        description:
          'Specializing in Artificial Intelligence and Machine Learning, deep learning, computer vision, data structures, and engineering intelligent software systems.',
      },
      {
        id: 'edu_puc',
        degree: 'PUC – Science',
        collegeName: 'Swami Vivekananda PU Science College, Hulkoti',
        university: 'Department of Pre-University Education, Karnataka',
        location: 'Hulkoti, Karnataka',
        period: 'Completed',
        description:
          'Pre-University Course in Science (PCMB) with strong foundational training in Mathematics, Physics, Chemistry, and analytical problem-solving.',
      },
      {
        id: 'edu_sslc',
        degree: 'SSLC',
        collegeName: 'Bright Horizon English Medium School, Gadag',
        university: 'Karnataka Secondary Education Examination Board (KSEEB)',
        location: 'Gadag, Karnataka',
        period: 'Completed',
        description:
          'Secondary School Leaving Certificate (10th Standard) with strong academic background and fundamental sciences.',
      },
    ],
  },
  skills: {
    programming: ['Python'],
    aiMl: [
      'Artificial Intelligence',
      'Machine Learning',
      'Computer Vision',
      'Data Analysis',
    ],
    webDev: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    tools: [
      'Git',
      'GitHub',
      'VS Code',
      'Google Colab',
      'AI Development Tools',
    ],
  },
  projects: [
    {
      id: 'proj_ai_commerce',
      title: 'AI Commerce Agent',
      shortDescription:
        'An intelligent conversational commerce assistant that interprets customer requirements through natural-language queries, recommending, comparing, and discovering suitable products in real time.',
      problemSolved:
        'Eliminates the time shoppers spend manually browsing hundreds of products and spec sheets by providing an automated conversational recommendation and feature-comparison engine.',
      technologies: ['Python', 'Streamlit', 'Machine Learning', 'NLP', 'Conversational AI'],
      githubUrl: 'https://github.com/Padmavati2611/ai-commerce-agent',
      liveDemoUrl: 'https://ai-commerce-agent-grg8zow28uupageuohaksp.streamlit.app/',
    },
    {
      id: 'proj_sunchill_agritech',
      title: 'SunChill — Solar-Powered Smart Mini Cold Storage',
      shortDescription:
        'A solar-powered smart mini cold storage system designed for fresh vegetable preservation in the North Eastern Region (NER) to curtail post-harvest crop losses and elevate farmer income.',
      problemSolved:
        'Solves the critical post-harvest perishable crop decay crisis in off-grid rural farming communities lacking steady electricity, leveraging clean solar cooling and IoT sensor telemetry.',
      technologies: ['AgriTech', 'Solar Systems', 'IoT & Embedded', 'CleanTech', 'Web Platform'],
      githubUrl: 'https://github.com/Padmavati2611/agriculture-foodtech-rural-development',
      liveDemoUrl: 'https://padmavati2611.github.io/agriculture-foodtech-rural-development/',
    },
  ],
  experiences: [
    {
      id: 'exp_web_dev',
      organization: '',
      role: 'Web Development Intern',
      duration: '',
      category: 'Intern',
      description:
        'Successfully completed a Web Development Internship, gaining practical exposure to web development, technical implementation, and professional communication.',
      skillsLearned: ['Web Development', 'HTML', 'CSS', 'JavaScript', 'Programming'],
      appliedTools: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Git & GitHub'],
      certificateName: 'Web Development Intern Completion Certificate',
      certificateImage: null,
    },
    {
      id: 'exp_ml',
      organization: '',
      role: 'Machine Learning Intern',
      duration: '',
      category: 'Intern',
      description:
        'Completed a Machine Learning Internship with practical exposure to Machine Learning concepts, problem-solving, technical assignments, and developing AI/ML skills.',
      skillsLearned: ['Machine Learning', 'Artificial Intelligence', 'Python', 'Data Analysis'],
      appliedTools: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Model Evaluation'],
      certificateName: 'Machine Learning Intern Completion Certificate',
      certificateImage: null,
    },
    {
      id: 'exp_python_dev',
      organization: '',
      role: 'Python Development Intern',
      duration: '',
      category: 'Intern',
      description:
        'Successfully completed a Python Development Internship, gaining practical experience in Python programming, data handling, file operations, exception handling, modular programming, automation, web scraping, and developing Python-based applications.',
      skillsLearned: ['Python Programming', 'Data Handling', 'Web Development', 'Automation'],
      appliedTools: ['Python 3', 'File I/O', 'Web Scraping', 'Automation Scripts', 'Modular Design'],
      certificateName: 'Python Development Intern Completion Certificate',
      certificateImage: null,
    },
  ],
  certifications: [],
};
