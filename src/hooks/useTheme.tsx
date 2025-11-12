/**
 * Theme Management Hook and Provider
 *
 * This module provides a React Context-based theme system for the application.
 * It handles light/dark mode switching with persistence to localStorage and
 * respects the user's system preferences.
 *
 * Features:
 * - Light/Dark theme toggle
 * - Persists theme preference to localStorage
 * - Respects system color scheme preference (prefers-color-scheme)
 * - Applies theme by adding/removing 'dark' class to document root
 *
 * @module hooks/useTheme
 */

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type {ThemeContextType} from '../types';

/**
 * React Context for theme management
 * Provides theme state and toggle function to all child components
 * Initialized as undefined to enforce usage within ThemeProvider
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Props for ThemeProvider component
 */
interface ThemeProviderProps {
    /** Child components that will have access to theme context */
    children: ReactNode;
}

/**
 * Theme Provider Component
 *
 * Wraps the application to provide theme management capabilities.
 * Must be placed at the root of the component tree.
 *
 * Theme Initialization Priority:
 * 1. localStorage saved theme (user's previous choice)
 * 2. System preference (prefers-color-scheme media query)
 * 3. Default to 'light' mode
 *
 * @param props - Component props
 * @param props.children - Child components to wrap
 *
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Initialize theme state (default to 'light', will be overridden by saved/system preference)
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    /**
     * Effect: Initialize theme on mount
     *
     * Runs once when component mounts to determine initial theme.
     * Checks localStorage first (user's previous choice), then system preference,
     * otherwise keeps default 'light' mode.
     */
    useEffect(() => {
        // Try to get saved theme from localStorage
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;

        // Check system color scheme preference using media query
        // This respects the user's OS-level dark mode setting
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            // Priority 1: Use saved theme if it exists
            setTheme(savedTheme);
        } else if (prefersDark) {
            // Priority 2: Use system preference if no saved theme
            setTheme('dark');
        }
        // Priority 3: Keep default 'light' theme (already set in useState)
    }, []); // Empty dependency array = run only once on mount

    /**
     * Effect: Apply theme changes to DOM and persist to localStorage
     *
     * Runs whenever theme state changes. Updates the document root class
     * and saves the new theme to localStorage for future visits.
     *
     * The 'dark' class on document root enables Tailwind's dark mode classes.
     */
    useEffect(() => {
        const root = document.documentElement; // <html> element

        if (theme === 'dark') {
            // Add 'dark' class to enable dark mode styles
            root.classList.add('dark');
        } else {
            // Remove 'dark' class to use light mode styles
            root.classList.remove('dark');
        }

        // Persist theme choice to localStorage for next visit
        localStorage.setItem('theme', theme);
    }, [theme]); // Run whenever theme changes

    /**
     * Toggle Theme Function
     *
     * Switches between light and dark modes.
     * Uses functional setState to ensure we're toggling based on current state.
     */
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * useTheme Hook
 *
 * Custom hook to access theme context in any component.
 * Provides current theme and toggle function.
 *
 * @throws {Error} If used outside of ThemeProvider
 * @returns Theme context containing current theme and toggle function
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, toggleTheme } = useTheme();
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current theme: {theme}
 *     </button>
 *   );
 * }
 * ```
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);

    // Enforce that hook is used within ThemeProvider
    // This prevents runtime errors from accessing undefined context
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};