/**
 * Hero Section Component
 *
 * The landing/intro section displayed at the top of the portfolio.
 * Features animated text, visual elements, and call-to-action buttons.
 *
 * Features:
 * - Animated entrance with staggered children
 * - Gradient text for name/title
 * - Animated visual decorative element
 * - Two CTA buttons (View Projects, Get In Touch)
 * - Smooth scroll to target sections
 * - Fully responsive layout
 *
 * @module components/layout/hero
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import AnimatedVisual from '../../ui/animated-visual/AnimatedVisual';
import Button from '../../ui/button/Button';
import { fadeInUp, fadeInLeft, staggerContainer } from '../../../utils/animations';
import './Hero.css';

/**
 * Hero Component
 *
 * Displays the main hero/landing section with animated introduction,
 * decorative visual, and navigation buttons.
 *
 * @returns Hero section element
 */
const Hero: React.FC = () => {
    /**
     * Scrolls smoothly to the projects section
     */
    const scrollToProjects = () => {
        const element = document.getElementById('projects');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    /**
     * Scrolls smoothly to the contact section
     */
    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero-section">
            <div className="hero-container">
                <motion.div
                    className="hero-grid"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Left Content */}
                    <motion.div className="hero-content" variants={fadeInLeft}>
                        <motion.h1
                            className="hero-title"
                            variants={fadeInUp}
                        >
                            Hi, I'm{' '}
                            <span className="hero-name">Le Nguyen Thanh Tan</span>
                        </motion.h1>

                        <motion.div
                            className="hero-subtitle-container"
                            variants={fadeInUp}
                        >
                            <div className="hero-subtitle-animation">
                                <motion.div
                                    animate={{
                                        y: [0, -40, -80, -40, 0],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <div className="hero-subtitle-text">Java Developer</div>
                                    <div className="hero-subtitle-text">Backend Developer</div>
                                    <div className="hero-subtitle-text">Spring Developer</div>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.p
                            className="hero-description"
                            variants={fadeInUp}
                        >
                            Experienced Java Developer with 6+ years of hands-on experience in designing and implementing
                            robust APIs. Proficient in SQL database operations and data structures, with a proven track
                            record in Spring Boot, microservices, and backend optimization.
                        </motion.p>

                        <motion.div
                            className="hero-actions"
                            variants={fadeInUp}
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={scrollToProjects}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View My Work
                            </Button>
                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={scrollToContact}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact Me
                            </Button>
                        </motion.div>

                        {/* Scroll Indicator */}
                        <motion.div
                            className="hero-scroll-indicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                        >
                            <span>Scroll to explore</span>
                            <motion.div
                                animate={{ y: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ArrowDownIcon className="hero-scroll-icon" />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Animated Visual */}
                    <motion.div
                        className="hero-visual"
                        variants={fadeInUp}
                        transition={{ delay: 0.3 }}
                    >
                        <AnimatedVisual />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;