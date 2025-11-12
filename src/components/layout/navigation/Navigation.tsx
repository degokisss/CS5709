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
 * - Active section detection via scroll position
 * - Smooth scroll to sections on click
 * - Prevents active section flicker during programmatic scrolling
 * - Theme toggle button (light/dark mode)
 * - Responsive design (collapsible on mobile)
 * - Animated underline for active section
 * - Slide-down entrance animation
 *
 * Scroll Detection Algorithm:
 * 1. Checks if user is at bottom of page → sets 'contact' as active
 * 2. Otherwise, finds section whose top is above viewport top (≤100px) and
 *    bottom is below viewport top (≥100px)
 * 3. Temporarily disables detection during programmatic scrolling (1s timeout)
 *
 * @module components/layout/navigation
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../../hooks/useTheme';
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
 *
 * @returns Navigation bar with active section highlighting and theme toggle
 */
const Navigation: React.FC = () => {
    /**
     * State: Whether user has scrolled past threshold (50px)
     * Controls glass morphism effect appearance
     */
    const [scrolled, setScrolled] = useState(false);

    /**
     * State: Currently active section ID
     * Updated by scroll detection or user click
     * @default 'home'
     */
    const [activeSection, setActiveSection] = useState('home');

    /**
     * State: Whether a programmatic scroll is in progress
     * Used to prevent active section flickering during smooth scroll
     * When true, scroll detection is temporarily disabled
     */
    const [isScrolling, setIsScrolling] = useState(false);

    /**
     * Ref: Timeout ID for re-enabling scroll detection
     * Stored in ref to persist across renders and allow cancellation
     */
    const scrollTimeoutRef = React.useRef<number | null>(null);

    // Access theme context for dark mode toggle
    const { theme, toggleTheme } = useTheme();

    /**
     * Effect: Scroll event listener for active section detection
     *
     * This effect handles two main responsibilities:
     * 1. Apply glass morphism effect when scrolled past 50px
     * 2. Detect which section is currently in view
     *
     * The scroll detection logic is complex to handle edge cases:
     * - Prevents flickering during programmatic scrolling (nav clicks)
     * - Handles bottom of page (always activates 'contact')
     * - Uses viewport position to determine visible section
     */
    useEffect(() => {
        const handleScroll = () => {
            // Update scrolled state for visual effects
            // 50px threshold prevents effect from appearing too early
            setScrolled(window.scrollY > 50);

            // IMPORTANT: Don't update active section if user just clicked a nav item
            // This prevents the active indicator from flickering during smooth scroll
            // The isScrolling flag is set when user clicks and cleared after 1 second
            if (isScrolling)
                return;

            /**
             * Edge Case: Bottom of Page Detection
             *
             * When user reaches the bottom, the last section (contact) might not
             * technically be "in view" per the standard detection logic below.
             * This explicitly sets 'contact' as active when at page bottom.
             *
             * Calculation breakdown:
             * - window.innerHeight: Height of visible viewport
             * - window.scrollY: Current vertical scroll position
             * - document.documentElement.scrollHeight: Total page height
             * - Subtracting 10px adds small tolerance for rounding errors
             */
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
            if (isAtBottom) {
                setActiveSection('contact');
                return;
            }

            /**
             * Standard Scroll Detection Algorithm
             *
             * Determines active section based on scroll position.
             * A section is considered "active" when its content overlaps
             * with a detection zone 100px from the top of the viewport.
             *
             * This 100px offset accounts for the fixed navigation bar height.
             */
            const sections = navItems.map(item => item.id);

            // Find the first section that intersects with our detection zone
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (!element)
                    return false;
                const rect = element.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            });

            // Update active section if a match was found
            if (current)
                setActiveSection(current);
        };

        // Register scroll listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup: Remove listener when component unmounts
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolling]); // Re-run effect when isScrolling changes

    /**
     * Scroll to Section Handler
     *
     * Handles navigation item clicks. Performs smooth scroll to target
     * section and temporarily disables automatic active section detection
     * to prevent flickering during the animation.
     *
     * Flow:
     * 1. Immediately set active section (for instant visual feedback)
     * 2. Set isScrolling flag (disables auto-detection)
     * 3. Perform smooth scroll
     * 4. After 1 second, clear isScrolling flag (re-enable auto-detection)
     *
     * @param id - Section ID to scroll to
     */
    const scrollToSection = (id: string) => {
        // Immediately update active section for instant visual feedback
        setActiveSection(id);

        // Flag that we're programmatically scrolling
        // This tells the scroll listener to ignore scroll events temporarily
        setIsScrolling(true);

        // Clear any existing timeout from previous clicks
        // This prevents race conditions if user clicks multiple items quickly
        if (scrollTimeoutRef.current)
            clearTimeout(scrollTimeoutRef.current);

        // Find target element and scroll to it smoothly
        const element = document.getElementById(id);
        if (element)
            element.scrollIntoView({ behavior: 'smooth' });

        /**
         * Re-enable automatic scroll detection after animation completes
         *
         * 1000ms timeout accounts for:
         * - CSS smooth scroll duration (~700-800ms)
         * - Small buffer to ensure scroll has fully completed
         *
         * This prevents the active indicator from jumping around during
         * the smooth scroll animation, which would look glitchy.
         */
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 1000); // 1 second timeout
    };

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