/**
 * useScrollSpy Hook
 *
 * A reusable hook for detecting scroll position and tracking which section
 * is currently in view. Provides intelligent scroll detection with configurable
 * thresholds and prevents flickering during programmatic scrolling.
 *
 * Features:
 * - Detects when user scrolls past a threshold
 * - Tracks which section is currently active based on scroll position
 * - Handles bottom-of-page edge case
 * - Prevents active section flickering during smooth scroll
 * - Fully customizable section selectors and thresholds
 *
 * @module hooks/useScrollSpy
 */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Configuration options for the useScrollSpy hook
 */
export interface UseScrollSpyOptions {
    /**
     * Array of section IDs to track
     * These should match the HTML element IDs in your page
     * @default []
     */
    sectionIds: string[];

    /**
     * Scroll distance (in pixels) from top before triggering "scrolled" state
     * Used for visual effects like glass morphism on navigation
     * @default 50
     */
    scrollThreshold?: number;

    /**
     * Offset (in pixels) from top of viewport for section detection
     * A section is active when it crosses this threshold
     * Should account for fixed header height
     * @default 100
     */
    offsetThreshold?: number;

    /**
     * Duration (in milliseconds) to disable scroll detection after programmatic scroll
     * Prevents flickering during smooth scroll animations
     * @default 1000
     */
    scrollTimeout?: number;

    /**
     * Tolerance (in pixels) for bottom-of-page detection
     * Accounts for rounding errors in scroll calculations
     * @default 10
     */
    bottomTolerance?: number;

    /**
     * Initial active section ID
     * @default First section in sectionIds array
     */
    initialSection?: string;
}

/**
 * Return value from useScrollSpy hook
 */
export interface UseScrollSpyReturn {
    /**
     * Whether user has scrolled past the scroll threshold
     * Useful for applying visual effects to navigation
     */
    scrolled: boolean;

    /**
     * ID of the currently active section
     */
    activeSection: string;

    /**
     * Function to programmatically scroll to a section
     * Handles active section updates and prevents detection flickering
     * @param sectionId - ID of section to scroll to
     */
    scrollToSection: (sectionId: string) => void;
}

/**
 * useScrollSpy Hook
 *
 * Tracks scroll position and determines which section is currently in view.
 * Provides smooth scroll functionality with intelligent active section detection.
 *
 * @param options - Configuration options for scroll detection behavior
 * @returns Object containing scroll state, active section, and scroll function
 *
 * @example
 * ```tsx
 * const { scrolled, activeSection, scrollToSection } = useScrollSpy({
 *   sectionIds: ['home', 'about', 'projects', 'contact'],
 *   scrollThreshold: 50,
 *   offsetThreshold: 100,
 *   scrollTimeout: 1000
 * });
 * ```
 */
export const useScrollSpy = (options: UseScrollSpyOptions): UseScrollSpyReturn => {
    const {
        sectionIds,
        scrollThreshold = 50,
        offsetThreshold = 100,
        scrollTimeout = 1000,
        bottomTolerance = 10,
        initialSection = sectionIds[0] || ''
    } = options;

    /**
     * State: Whether user has scrolled past threshold
     * Controls visual effects like glass morphism
     */
    const [scrolled, setScrolled] = useState(false);

    /**
     * State: Currently active section ID
     * Updated by scroll detection or user click
     */
    const [activeSection, setActiveSection] = useState(initialSection);

    /**
     * State: Whether a programmatic scroll is in progress
     * Used to prevent active section flickering during smooth scroll
     */
    const [isScrolling, setIsScrolling] = useState(false);

    /**
     * Ref: Timeout ID for re-enabling scroll detection
     * Stored in ref to persist across renders and allow cancellation
     */
    const scrollTimeoutRef = useRef<number | null>(null);

    /**
     * Effect: Scroll event listener for active section detection
     *
     * Handles two main responsibilities:
     * 1. Apply scrolled state when scrolled past threshold
     * 2. Detect which section is currently in view
     */
    useEffect(() => {
        const handleScroll = () => {
            // Update scrolled state for visual effects
            setScrolled(window.scrollY > scrollThreshold);

            // Don't update active section if programmatic scroll is in progress
            // This prevents flickering during smooth scroll animations
            if (isScrolling) return;

            /**
             * Edge Case: Bottom of Page Detection
             *
             * When user reaches the bottom, the last section might not
             * technically be "in view" per the standard detection logic.
             * This explicitly sets the last section as active when at page bottom.
             */
            const isAtBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - bottomTolerance;

            if (isAtBottom && sectionIds.length > 0) {
                setActiveSection(sectionIds[sectionIds.length - 1]);
                return;
            }

            /**
             * Standard Scroll Detection Algorithm
             *
             * Determines active section based on scroll position.
             * A section is considered "active" when its content overlaps
             * with the detection zone at offsetThreshold from the top.
             */
            const current = sectionIds.find(sectionId => {
                const element = document.getElementById(sectionId);
                if (!element) return false;

                const rect = element.getBoundingClientRect();
                return rect.top <= offsetThreshold && rect.bottom >= offsetThreshold;
            });

            // Update active section if a match was found
            if (current) {
                setActiveSection(current);
            }
        };

        // Register scroll listener
        window.addEventListener('scroll', handleScroll);

        // Run once on mount to set initial state
        handleScroll();

        // Cleanup: Remove listener when component unmounts
        return () => window.removeEventListener('scroll', handleScroll);
    }, [
        sectionIds,
        scrollThreshold,
        offsetThreshold,
        bottomTolerance,
        isScrolling
    ]);

    /**
     * Scroll to Section Handler
     *
     * Handles navigation clicks. Performs smooth scroll to target section
     * and temporarily disables automatic active section detection to prevent
     * flickering during the animation.
     *
     * @param sectionId - Section ID to scroll to
     */
    const scrollToSection = useCallback(
        (sectionId: string) => {
            // Immediately update active section for instant visual feedback
            setActiveSection(sectionId);

            // Flag that we're programmatically scrolling
            setIsScrolling(true);

            // Clear any existing timeout from previous clicks
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            // Find target element and scroll to it smoothly
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }

            /**
             * Re-enable automatic scroll detection after animation completes
             * Timeout accounts for smooth scroll duration plus a small buffer
             */
            scrollTimeoutRef.current = window.setTimeout(() => {
                setIsScrolling(false);
            }, scrollTimeout);
        },
        [scrollTimeout]
    );

    return {
        scrolled,
        activeSection,
        scrollToSection
    };
};
