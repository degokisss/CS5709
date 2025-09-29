import { motion } from 'framer-motion'
import type {ReactNode} from 'react'
import './Dock.css'

interface DockProps {
  children?: ReactNode
}

export default function Dock({ children }: DockProps) {
  const defaultItems = (
    <>
      <motion.button
        className="dock-item"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Home"
      >
        🏠
      </motion.button>
      <motion.button
        className="dock-item"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        title="About"
      >
        👨‍💻
      </motion.button>
      <motion.button
        className="dock-item"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })}
        title="Education"
      >
        🎓
      </motion.button>
      <motion.button
        className="dock-item"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        title="Projects"
      >
        💼
      </motion.button>
      <motion.button
        className="dock-item"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
        title="Gallery"
      >
        📸
      </motion.button>
    </>
  );

  return (
    <motion.div
      className="dock-container"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dock-items">
        {children || defaultItems}
      </div>
    </motion.div>
  )
}