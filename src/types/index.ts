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