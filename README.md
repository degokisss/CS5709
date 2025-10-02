# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Framer Motion.

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Heroicons** - Icons

## Features

- Single-page application with smooth scroll navigation
- Responsive design for all devices
- Dark/light theme toggle
- Animated UI components
- Interactive project gallery
- Contact form with HTML5 validation

## Project Structure

```
src/
├── components/
│   ├── layout/        # Page sections (Hero, About, Education, etc.)
│   ├── ui/            # Reusable UI components (Button, AnimatedVisual)
│   └── dock/          # Bottom navigation dock
├── hooks/             # Custom React hooks (useTheme)
├── data/              # Static data (projects)
├── utils/             # Utility functions (animations)
└── types/             # TypeScript type definitions
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Routing

This project uses hash-based routing with smooth scrolling between sections. Navigation is handled by detecting scroll position and updating the active section indicator.