/**
 * Navigation Component
 *
 * A fixed top navigation bar with scroll-aware active section highlighting
 * and theme toggle functionality. The navigation automatically detects which
 * section is currently in view and highlights the corresponding nav item.
 *
 * Features:
 * - Fixed position at top of viewport
 * - Glass morphism effect when scrolled
 * - Active section detection via scroll position (using useScrollSpy hook)
 * - Smooth scroll to sections on click
 * - Prevents active section flicker during programmatic scrolling
 * - Theme toggle button (light/dark mode)
 * - Responsive design (collapsible on mobile)
 * - Animated underline for active section
 * - Slide-down entrance animation
 *
 * @module components/layout/navigation
 */

import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../../hooks/useTheme';
import { useScrollSpy } from '../../../hooks/useScrollSpy';
import Button from '../../ui/button/Button';
import { clsx } from 'clsx';

/**
 * Navigation item structure
 */
interface NavItem {
    /** Display text for the navigation link */
    label: string;
    /** Hash href (for semantic purposes, not used for navigation) */
    href: string;
    /** Section ID to scroll to (matches HTML element id) */
    id: string;
}

/**
 * Navigation items configuration
 *
 * Defines all main sections of the portfolio.
 * Order determines display order in navigation bar.
 */
const navItems: NavItem[] = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Contact', href: '#contact', id: 'contact' },
];

/**
 * Navigation Component
 *
 * Main navigation bar for the portfolio with intelligent scroll tracking.
 * Uses the useScrollSpy hook for scroll detection and active section tracking.
 *
 * @returns Navigation bar with active section highlighting and theme toggle
 */
const Navigation: React.FC = () => {
    // Access theme context for dark mode toggle
    const { theme, toggleTheme } = useTheme();

    // Use the scroll spy hook for scroll detection and active section tracking
    const { scrolled, activeSection, scrollToSection } = useScrollSpy({
        sectionIds: navItems.map(item => item.id),
        scrollThreshold: 50,      // Glass morphism effect threshold
        offsetThreshold: 100,     // Active section detection offset
        scrollTimeout: 1000,      // Delay before re-enabling scroll detection
        bottomTolerance: 10,      // Tolerance for bottom-of-page detection
        initialSection: 'home'    // Initial active section
    });

    return (
        <motion.nav
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? 'glass-effect py-2' : 'bg-transparent py-4'
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.button
                        onClick={() => scrollToSection('home')}
                        className="text-lg sm:text-xl font-bold gradient-text cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="hidden sm:inline">Le Nguyen Thanh Tan</span>
                        <span className="sm:hidden">LNTT</span>
                    </motion.button>

                    {/* Navigation - Always visible but responsive */}
                    <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
                        {navItems.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={clsx(
                                    "text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative px-1 sm:px-2 py-1",
                                    activeSection === item.id && "text-blue-600 dark:text-blue-400"
                                )}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.label}
                                {activeSection === item.id && (
                                    <motion.div
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                                        layoutId="activeSection"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </motion.button>
                        ))}

                        {/* Theme Toggle */}
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={toggleTheme}
                            className="p-1.5 sm:p-2 rounded-full ml-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {theme === 'dark' ? (
                                <SunIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                                <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navigation;