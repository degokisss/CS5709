/**
 * Dock Navigation Component
 *
 * A macOS-style dock navigation bar that sits at the bottom of the viewport.
 * Provides quick access to all main sections of the portfolio with emoji icons
 * and smooth scroll navigation.
 *
 * Features:
 * - Fixed position at bottom of screen
 * - Six navigation items with emoji icons
 * - Hover effects (scale up)
 * - Tap effects (scale down)
 * - Smooth scroll to sections
 * - Entrance animation (slides up from bottom)
 * - Optional custom children to override default items
 *
 * @module components/dock
 */

import { motion } from 'framer-motion'
import type {ReactNode} from 'react'
import './Dock.css'

/**
 * Props for the Dock component
 */
interface DockProps {
  /**
   * Optional custom dock items to display instead of default navigation
   * If not provided, default navigation buttons will be shown
   * @default Default navigation items
   */
  children?: ReactNode
}

/**
 * Dock Component
 *
 * Renders a bottom-fixed navigation dock with animated buttons for each
 * portfolio section. The dock appears with a slide-up animation and provides
 * smooth scrolling navigation to page sections.
 *
 * The component uses emoji icons for visual simplicity and modern appeal.
 * Each button has hover and tap animations for tactile feedback.
 *
 * @param props - Component properties
 * @param props.children - Optional custom dock items (defaults to navigation buttons)
 *
 * @returns Fixed bottom dock with navigation buttons
 *
 * @example
 * ```tsx
 * // Default usage with built-in navigation
 * <Dock />
 *
 * // Custom dock items
 * <Dock>
 *   <button className="dock-item">Custom</button>
 * </Dock>
 * ```
 */
export default function Dock({ children }: DockProps) {
  /**
   * Default navigation items for the dock
   *
   * Six buttons that navigate to main portfolio sections:
   * 1. Home - Scrolls to top of page
   * 2. About - Scrolls to about section
   * 3. Education - Scrolls to education section
   * 4. Projects - Scrolls to projects section
   * 5. Gallery - Scrolls to gallery section
   * 6. Contact - Scrolls to contact section
   *
   * Each button has:
   * - Hover animation (scale: 1.1)
   * - Tap animation (scale: 0.95)
   * - Smooth scroll behavior
   * - Descriptive tooltip (title attribute)
   * - Emoji icon for visual appeal
   */
  const defaultItems = (
    <>
      {/* Home button - Scrolls to top */}
      <motion.button
        className="dock-item"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Home"
      >
        🏠
      </motion.button>

      {/* About button - Scrolls to about section */}
      <motion.button
        className="dock-item"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        title="About"
      >
        👨‍💻
      </motion.button>

      {/* Education button - Scrolls to education section */}
      <motion.button
        className="dock-item"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })}
        title="Education"
      >
        🎓
      </motion.button>

      {/* Projects button - Scrolls to projects section */}
      <motion.button
        className="dock-item"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        title="Projects"
      >
        💼
      </motion.button>

      {/* Gallery button - Scrolls to gallery section */}
      <motion.button
        className="dock-item"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
        title="Gallery"
      >
        📸
      </motion.button>

      {/* Contact button - Scrolls to contact section */}
      <motion.button
        className="dock-item"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        title="Contact"
      >
        📧
      </motion.button>
    </>
  );

  return (
    <motion.div
      className="dock-container"
      // Initial state: Below viewport and invisible
      initial={{ y: 100, opacity: 0 }}
      // Animated state: Slide up into view and fade in
      animate={{ y: 0, opacity: 1 }}
      // Smooth 0.5s animation
      transition={{ duration: 0.5 }}
    >
      <div className="dock-items">
        {/* Use custom children if provided, otherwise show default navigation */}
        {children || defaultItems}
      </div>
    </motion.div>
  )
}