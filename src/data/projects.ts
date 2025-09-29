import type {Project} from '../types';

export const projects: Project[] = [
    {
        id: 1,
        title: "Workforce Optimizer Application",
        description: "Enhanced system performance by 20% through optimization of RESTful APIs for workforce analytics, scheduling, and time management solutions for hospitals in Singapore. Built with microservices architecture using Spring Boot and Spring Batch.",
        image: "https://picsum.photos/400/300?random=1",
        tags: ["Java", "Spring Boot", "Spring Batch", "RESTful API", "Microservices", "GitLab CI/CD"],
        featured: true,
    },
    {
        id: 2,
        title: "ViNang E-commerce Platform",
        description: "Led development and optimization of backend APIs using Spring Boot for ViNang's e-commerce platform focused on bathroom product sales. Integrated Redis caching and optimized database queries, improving system performance and response time by 30%.",
        image: "https://picsum.photos/400/300?random=2",
        tags: ["Java", "Spring Boot", "Redis", "SQL", "React", "CI/CD"],
        featured: true,
    },
    {
        id: 3,
        title: "Edigi Banking System",
        description: "Implemented secure transactions using Apache POI and SOAP for Eximbank payment systems. Developed banking APIs ensuring secure financial transactions with robust security measures.",
        image: "https://picsum.photos/400/300?random=3",
        tags: ["Java", "Apache POI", "SOAP", "Banking APIs", "Security"],
        featured: true,
    },
    {
        id: 4,
        title: "Swiss Government Web Apps",
        description: "Designed and developed web applications for Swiss Government using modern web technologies including HTML, CSS, Bootstrap, and Angular for enhanced user experience.",
        image: "https://picsum.photos/400/300?random=4",
        tags: ["HTML", "CSS", "Bootstrap", "Angular", "Government Solutions"],
    },
    {
        id: 5,
        title: "Product Management System",
        description: "Assisted in API and web app development for Product Management System using ReactJS and RESTful APIs. Implemented version control with SVN for collaborative development.",
        image: "https://picsum.photos/400/300?random=5",
        tags: ["ReactJS", "RESTful APIs", "SVN", "Product Management"],
    },
    {
        id: 6,
        title: "Portfolio Website",
        description: "This portfolio website built with React, TypeScript, Three.js, and Framer Motion. Features 3D animations, responsive design, and modern UI/UX principles.",
        image: "https://picsum.photos/400/300?random=6",
        tags: ["React", "TypeScript", "Three.js", "Framer Motion", "Tailwind"],
        githubUrl: "https://github.com/example",
    }
    ];