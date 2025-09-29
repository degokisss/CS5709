import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../../hooks/useTheme';
import Button from '../../ui/button/Button';
import { clsx } from 'clsx';

interface NavItem {
    label: string;
    href: string;
    id: string;
}

const navItems: NavItem[] = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
];

const Navigation: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = navItems.map(item => item.id);
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
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