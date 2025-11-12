import type { GalleryImage, GalleryCategory } from '../types';

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://picsum.photos/400/300?random=11",
    title: "Java Development Workspace",
    description: "My development environment setup for Java projects with Spring Boot",
    category: "workspace"
  },
  {
    id: 2,
    src: "https://picsum.photos/400/300?random=12",
    title: "Team Collaboration",
    description: "Working with the development team at ViNang Company",
    category: "team"
  },
  {
    id: 3,
    src: "https://picsum.photos/400/300?random=13",
    title: "Conference Presentation",
    description: "Presenting microservices architecture at tech meetup",
    category: "events"
  },
  {
    id: 4,
    src: "https://picsum.photos/400/300?random=14",
    title: "Code Review Session",
    description: "Collaborative code review with team members",
    category: "team"
  },
  {
    id: 5,
    src: "https://picsum.photos/400/300?random=15",
    title: "Database Design",
    description: "Designing database architecture for e-commerce platform",
    category: "workspace"
  },
  {
    id: 7,
    src: "https://picsum.photos/400/300?random=17",
    title: "Graduation Day",
    description: "Graduating from Nguyen Tat Thanh University with IT degree",
    category: "personal"
  },
  {
    id: 6,
    src: "https://picsum.photos/400/300?random=19",
    title: "Office in Limerick",
    description: "Current workspace in Limerick, Ireland",
    category: "workspace"
  }
];

export const galleryCategories: GalleryCategory[] = [
  { id: 'all', label: 'All' },
  { id: 'workspace', label: 'Workspace' },
  { id: 'team', label: 'Team' },
  { id: 'events', label: 'Events' },
  { id: 'personal', label: 'Personal' }
];
