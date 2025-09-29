import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedVisual.css';

interface AnimatedVisualProps {
  className?: string;
}

const AnimatedVisual: React.FC<AnimatedVisualProps> = ({ className = '' }) => {
  return (
    <motion.div
      className={`animated-visual ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Floating shapes */}
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>

      {/* Center content */}
      <div className="center-content">
        <div className="center-icon">
          💻
        </div>
        <div className="center-text">
          Java Developer
        </div>
        <div className="center-subtext">
          Building Robust Solutions
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedVisual;