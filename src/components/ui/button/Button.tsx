/**
 * Button Component
 *
 * A reusable, animated button component with multiple variants and sizes.
 * Built on top of Framer Motion for smooth hover and tap animations.
 *
 * Features:
 * - Three visual variants (primary, secondary, outline)
 * - Three sizes (small, medium, large)
 * - Hover effect (scales up slightly)
 * - Tap/press effect (scales down slightly)
 * - Supports all standard HTML button attributes
 * - Supports Framer Motion animation props
 *
 * @module components/ui/button
 */

import React, {type ButtonHTMLAttributes } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import './Button.css';

/**
 * Props for the Button component
 *
 * Extends standard HTML button attributes and Framer Motion props
 * for maximum flexibility.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Visual style variant of the button
     * - primary: Solid blue background (main call-to-action)
     * - secondary: Muted gray background (less emphasis)
     * - outline: Transparent with border (subtle actions)
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary' | 'outline';

    /**
     * Size of the button
     * - sm: Small button (compact spacing)
     * - md: Medium button (default)
     * - lg: Large button (prominent actions)
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';

    /** Content to display inside the button (text, icons, etc.) */
    children: React.ReactNode;
}

/**
 * Button Component
 *
 * An interactive button with built-in animations and multiple styling options.
 * Combines standard HTML button functionality with Framer Motion animations
 * and flexible styling through variants and sizes.
 *
 * @param props - Button properties
 * @param props.variant - Visual style variant (default: 'primary')
 * @param props.size - Button size (default: 'md')
 * @param props.children - Button content
 * @param props.className - Additional CSS classes to apply
 * @param props - All other standard button and Framer Motion props
 *
 * @returns Animated button element
 *
 * @example
 * ```tsx
 * // Primary button (default)
 * <Button onClick={handleClick}>
 *   Click Me
 * </Button>
 *
 * // Large outline button
 * <Button variant="outline" size="lg">
 *   Learn More
 * </Button>
 *
 * // Button with custom animation
 * <Button
 *   variant="secondary"
 *   initial={{ opacity: 0 }}
 *   animate={{ opacity: 1 }}
 * >
 *   Animated Button
 * </Button>
 * ```
 */
const Button: React.FC<ButtonProps & MotionProps> = ({
                                                         variant = 'primary',
                                                         size = 'md',
                                                         children,
                                                         className,
                                                         ...props
                                                     }) => {
    return (
        <motion.button
            // Combine base class, variant class, size class, and any custom classes
            className={clsx(
                'btn',                    // Base button styles
                `btn-${variant}`,         // Variant-specific styles (btn-primary, btn-secondary, btn-outline)
                `btn-${size}`,           // Size-specific styles (btn-sm, btn-md, btn-lg)
                className                 // Additional custom classes
            )}
            // Hover animation: Slightly enlarge button on mouse over
            whileHover={{ scale: 1.02 }}
            // Tap animation: Slightly shrink button when pressed
            whileTap={{ scale: 0.98 }}
            // Spread remaining props (onClick, disabled, type, motion props, etc.)
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;