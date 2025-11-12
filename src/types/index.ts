export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    liveUrl?: string;
    githubUrl?: string;
    featured?: boolean;
}

export interface GalleryImage {
    id: number;
    src: string;
    title: string;
    description: string;
    category: string;
}

export interface GalleryCategory {
    id: string;
    label: string;
}

export interface Skill {
    id: number;
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    category: string;
    yearsOfExperience?: number;
}

export interface SkillCategory {
    id: string;
    label: string;
}

export interface DockItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
    id: string;
}

export interface ContactForm {
    name: string;
    email: string;
    message: string;
}

export interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}