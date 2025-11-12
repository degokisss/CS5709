# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Framer Motion.

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Heroicons** - Icons
- **EmailJS** - Contact form email delivery

## Features

- Single-page application with smooth scroll navigation
- Responsive design for all devices
- Dark/light theme toggle
- Animated UI components
- Interactive project gallery
- Contact form with EmailJS integration for real email delivery

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

### EmailJS Configuration

The contact form uses EmailJS to send emails. To set it up:

1. Create a free account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these template variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content
   - `{{to_name}}` - Your name (optional)
4. Get your credentials from the EmailJS dashboard
5. Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
6. Update the `.env` file with your EmailJS credentials:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

**Note:** The `.env` file is gitignored to protect your credentials.

## Routing

This project uses hash-based routing with smooth scrolling between sections. Navigation is handled by detecting scroll position and updating the active section indicator.