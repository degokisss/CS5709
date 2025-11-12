/**
 * Animation Utilities
 *
 * This module provides reusable Framer Motion animation variants for consistent
 * animations throughout the application. These variants define how elements
 * transition between different states (hidden/visible).
 *
 * @module utils/animations
 */

import type { Variants } from "framer-motion";

/**
 * Fade In Up Animation
 *
 * Creates an animation where elements fade in while moving upward.
 * Commonly used for cards, sections, and content blocks that should
 * appear to rise into view.
 *
 * States:
 * - hidden: Element is invisible (opacity: 0) and positioned 20px below its final position
 * - visible: Element fades to full opacity and moves to its natural position
 *
 * Timing:
 * - Duration: 0.6 seconds
 * - Easing: easeOut (starts fast, ends slow for smooth deceleration)
 *
 * @example
 * ```tsx
 * <motion.div
 *   variants={fadeInUp}
 *   initial="hidden"
 *   animate="visible"
 * >
 *   Content appears here
 * </motion.div>
 * ```
 */
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

/**
 * Fade In Left Animation
 *
 * Creates an animation where elements fade in while moving from left to right.
 * Useful for horizontal reveals, side panel transitions, or directional emphasis.
 *
 * States:
 * - hidden: Element is invisible (opacity: 0) and positioned 20px to the left
 * - visible: Element fades in and slides to its natural position
 *
 * Timing:
 * - Duration: 0.6 seconds
 * - Easing: easeOut (smooth deceleration at the end)
 *
 * @example
 * ```tsx
 * <motion.div
 *   variants={fadeInLeft}
 *   initial="hidden"
 *   whileInView="visible"
 *   viewport={{ once: true }}
 * >
 *   Content slides in from left
 * </motion.div>
 * ```
 */
export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

/**
 * Stagger Container Animation
 *
 * A parent animation variant that coordinates sequential animations for its children.
 * Each child element will animate in sequence with a small delay between them,
 * creating a cascading/staggered effect.
 *
 * This variant doesn't animate the container itself (both states are empty),
 * it only controls the timing of child animations.
 *
 * Timing:
 * - staggerChildren: 0.1 seconds delay between each child starting its animation
 * - delayChildren: 0.2 seconds delay before the first child starts
 *
 * Use this with child variants like fadeInUp or fadeInLeft to create
 * sequential reveal effects for lists, grids, or groups of elements.
 *
 * @example
 * ```tsx
 * <motion.div
 *   variants={staggerContainer}
 *   initial="hidden"
 *   animate="visible"
 * >
 *   <motion.div variants={fadeInUp}>Item 1</motion.div>
 *   <motion.div variants={fadeInUp}>Item 2</motion.div>
 *   <motion.div variants={fadeInUp}>Item 3</motion.div>
 * </motion.div>
 * ```
 * Result: Items animate in sequence with 0.1s delay between each,
 *         starting 0.2s after the container becomes visible
 */
export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,  // Delay between each child animation start
            delayChildren: 0.2     // Initial delay before first child starts
        }
    }
};