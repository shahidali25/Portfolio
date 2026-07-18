export interface Skill {
  name: string;
  category: 'programming' | 'web_dev' | 'analytics' | 'database' | 'tools';
  rating?: number; // visual mastery indicator
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'web' | 'analytics' | 'python' | 'sql';
  technologies: string[];
  features: string[];
  description: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  gpa: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}
