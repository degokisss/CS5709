import type { Skill, SkillCategory } from '../types';

export const skills: Skill[] = [
  // Programming Languages
  {
    id: 1,
    name: "Java",
    level: "Expert",
    category: "languages",
    yearsOfExperience: 6
  },
  {
    id: 2,
    name: "TypeScript",
    level: "Intermediate",
    category: "languages",
    yearsOfExperience: 2
  },
  {
    id: 3,
    name: "JavaScript",
    level: "Intermediate",
    category: "languages",
    yearsOfExperience: 3
  },
  {
    id: 4,
    name: "SQL",
    level: "Advanced",
    category: "languages",
    yearsOfExperience: 6
  },
  // Frameworks & Libraries
  {
    id: 5,
    name: "Spring Boot",
    level: "Expert",
    category: "frameworks",
    yearsOfExperience: 6
  },
  {
    id: 6,
    name: "Spring Framework",
    level: "Expert",
    category: "frameworks",
    yearsOfExperience: 6
  },
  {
    id: 7,
    name: "Spring Batch",
    level: "Advanced",
    category: "frameworks",
    yearsOfExperience: 3
  },
  {
    id: 8,
    name: "React",
    level: "Intermediate",
    category: "frameworks",
    yearsOfExperience: 2
  },
  {
    id: 9,
    name: "Angular",
    level: "Intermediate",
    category: "frameworks",
    yearsOfExperience: 2
  },
  // Databases
  {
    id: 10,
    name: "MySQL",
    level: "Advanced",
    category: "databases",
    yearsOfExperience: 6
  },
  {
    id: 11,
    name: "MSSQL",
    level: "Advanced",
    category: "databases",
    yearsOfExperience: 5
  },
  {
    id: 12,
    name: "Oracle",
    level: "Advanced",
    category: "databases",
    yearsOfExperience: 4
  },
  {
    id: 13,
    name: "Redis",
    level: "Advanced",
    category: "databases",
    yearsOfExperience: 3
  },
  // Tools & Technologies
  {
    id: 14,
    name: "Git",
    level: "Advanced",
    category: "tools",
    yearsOfExperience: 6
  },
  {
    id: 15,
    name: "GitLab CI/CD",
    level: "Advanced",
    category: "tools",
    yearsOfExperience: 4
  },
  {
    id: 16,
    name: "Docker",
    level: "Intermediate",
    category: "tools",
    yearsOfExperience: 3
  },
  {
    id: 17,
    name: "Apache POI",
    level: "Advanced",
    category: "tools",
    yearsOfExperience: 3
  },
  {
    id: 18,
    name: "SVN",
    level: "Intermediate",
    category: "tools",
    yearsOfExperience: 2
  },
  // Architecture & Concepts
  {
    id: 19,
    name: "Microservices Architecture",
    level: "Advanced",
    category: "architecture",
    yearsOfExperience: 4
  },
  {
    id: 20,
    name: "RESTful APIs",
    level: "Expert",
    category: "architecture",
    yearsOfExperience: 6
  },
  {
    id: 21,
    name: "SOAP",
    level: "Advanced",
    category: "architecture",
    yearsOfExperience: 3
  },
  {
    id: 22,
    name: "Database Optimization",
    level: "Advanced",
    category: "architecture",
    yearsOfExperience: 5
  }
];

export const skillCategories: SkillCategory[] = [
  { id: 'languages', label: 'Programming Languages' },
  { id: 'frameworks', label: 'Frameworks & Libraries' },
  { id: 'databases', label: 'Databases' },
  { id: 'tools', label: 'Tools & Technologies' },
  { id: 'architecture', label: 'Architecture & Concepts' }
];
