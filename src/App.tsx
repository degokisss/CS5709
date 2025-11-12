/**
 * Main Application Component
 *
 * Root component that assembles all sections of the portfolio website.
 * Provides the overall layout structure with navigation, content sections,
 * and decorative background elements.
 *
 * Layout Structure:
 * - Fixed Navigation Bar (top)
 * - Main Content Sections (scrollable):
 *   1. Hero (landing/intro)
 *   2. About (biography)
 *   3. Education (academic background)
 *   4. Projects (work showcase)
 *   5. Gallery (image gallery)
 *   6. Contact (contact form)
 * - Fixed Dock Navigation (bottom)
 * - Animated Background Gradients (decorative)
 *
 * Features:
 * - Single-page application (SPA) layout
 * - Smooth scroll navigation between sections
 * - Dark mode support (via theme provider in main.tsx)
 * - Responsive design (mobile-first approach)
 * - Animated gradient background effects
 *
 * @module App
 */

import React from 'react'
import Navigation from './components/layout/navigation/Navigation'
import Hero from './components/layout/hero/Hero'
import About from './components/layout/about/About'
import Education from './components/layout/education/Education'
import Projects from './components/layout/projects/Projects'
import Gallery from './components/layout/gallery/Gallery'
import Contact from './components/layout/contact/Contact'
import Dock from './components/dock/Dock'

/**
 * App Component
 *
 * Main application container that renders the complete portfolio website.
 * Wraps all sections in a responsive layout with gradient background and
 * decorative elements.
 *
 * The component structure:
 * - Root div: Full viewport height with gradient background
 * - Navigation: Fixed top navigation with scroll detection
 * - Main: Content sections stacked vertically
 * - Dock: Fixed bottom navigation
 * - Background: Decorative animated gradient circles
 *
 * @returns Complete portfolio application structure
 */
const App: React.FC = () => {
    return (
        // Root container with full viewport height and gradient background
        // Gradient changes based on theme (light/dark)
        // Smooth 300ms transition between theme changes
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
            {/* Fixed top navigation with scroll-aware active section */}
            <Navigation />

            {/* Main content area containing all portfolio sections */}
            <main className="relative">
                <Hero />       {/* Landing/intro section with CTA buttons */}
                <About />      {/* Biography and experience summary */}
                <Education />  {/* Academic credentials and degrees */}
                <Projects />   {/* Professional projects and tech stack */}
                <Gallery />    {/* Image gallery with filtering */}
                <Contact />    {/* Contact form with EmailJS integration */}
            </main>

            {/* Fixed bottom navigation dock (macOS-style) */}
            <Dock />

            {/* Decorative Background Elements
                Fixed position behind all content (z-index: -10)
                Animated gradient circles for visual interest
                No interaction (pointer-events-none)

                Three pulsing circles:
                1. Blue gradient (top-left quadrant)
                2. Purple gradient (bottom-right quadrant)
                3. Pink gradient (bottom-center)
            */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                {/* Blue gradient circle - top left */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 bg-opacity-10 rounded-full blur-3xl animate-pulse" />
                {/* Purple gradient circle - bottom right */}
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 bg-opacity-10 rounded-full blur-3xl animate-pulse" />
                {/* Pink gradient circle - bottom center */}
                <div className="absolute top-3/4 left-1/2 w-72 h-72 bg-pink-500 bg-opacity-10 rounded-full blur-3xl animate-pulse" />
            </div>
        </div>
    )
}

export default App