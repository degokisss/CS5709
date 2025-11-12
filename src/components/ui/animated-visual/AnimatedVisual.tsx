/**
 * Animated Visual Component
 *
 * An eye-catching hero section visual element that displays floating
 * decorative shapes around centered developer information. The component
 * features a fade-in and scale-up entrance animation.
 *
 * Features:
 * - Five floating shapes with CSS animations (defined in AnimatedVisual.css)
 * - Centered content with icon, title, and subtitle
 * - Entrance animation (fade in + scale up)
 * - Fully responsive design
 *
 * Used in: Hero section to add visual interest alongside hero text
 *
 * @module components/ui/animated-visual
 */

import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedVisual.css';

/**
 * Props for the AnimatedVisual component
 */
interface AnimatedVisualProps {
  /**
   * Additional CSS classes to apply to the root element
   * Useful for layout positioning or custom styling
   * @default ''
   */
  className?: string;
}

/**
 * Animated Visual Component
 *
 * Renders an animated decorative element with floating shapes and
 * centered developer branding. The component animates in on mount
 * and includes continuously floating shape animations via CSS.
 *
 * The floating shapes are pure decorative elements styled entirely in CSS
 * with keyframe animations for continuous movement. The center content
 * displays static developer information (icon, title, subtitle).
 *
 * @param props - Component properties
 * @param props.className - Additional CSS classes for custom styling
 *
 * @returns An animated visual element with floating shapes and centered content
 *
 * @example
 * ```tsx
 * // Basic usage in hero section
 * <AnimatedVisual />
 *
 * // With custom positioning
 * <AnimatedVisual className="absolute top-0 right-0" />
 * ```
 */
const AnimatedVisual: React.FC<AnimatedVisualProps> = ({ className = '' }) => {
  return (
    <motion.div
      className={`animated-visual ${className}`}
      // Initial state: Slightly transparent and scaled down
      initial={{ opacity: 0, scale: 0.9 }}
      // Animated state: Fully visible and normal size
      animate={{ opacity: 1, scale: 1 }}
      // Transition configuration: Smooth 0.8s animation with easeOut timing
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Floating shapes container
          Contains 5 decorative shapes that float around continuously
          Animations are defined in AnimatedVisual.css using keyframes */}
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>

      {/* Center content
          Displays static developer information in the middle of the visual
          Includes icon (emoji), title, and descriptive subtitle */}
      <div className="center-content">
        {/* Developer icon (laptop emoji) */}
        <div className="center-icon">
          💻
        </div>

        {/* Main title/role */}
        <div className="center-text">
          Java Developer
        </div>

        {/* Subtitle/tagline */}
        <div className="center-subtext">
          Building Robust Solutions
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedVisual;