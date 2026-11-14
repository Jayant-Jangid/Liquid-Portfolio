export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'fullstack' | 'webgl' | 'distributed' | 'design-eng';
  categoryLabel: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  architecture: string[];
  challenges: string;
  solution: string;
  featured: boolean;
  year: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    level: number; // 1-100
    experience: string;
    highlight?: boolean;
  }[];
}

export interface TimelineMilestone {
  year: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface CoreMetric {
  value: string;
  label: string;
  description: string;
}
