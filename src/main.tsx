/**
 * Application Entry Point
 *
 * This is the main entry file that bootstraps the React application.
 * It handles:
 * - React root element mounting
 * - Strict mode wrapper (development checks)
 * - Theme provider initialization (dark/light mode)
 * - Global CSS imports
 *
 * React 18+ API:
 * Uses createRoot() instead of legacy ReactDOM.render()
 * for concurrent features and better performance.
 *
 * Render Tree:
 * StrictMode → ThemeProvider → App → [All Components]
 *
 * @module main
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import {ThemeProvider} from "./hooks/useTheme.tsx";

/**
 * Application Bootstrap
 *
 * Finds the root DOM element and renders the React application tree.
 *
 * Rendering layers (outer to inner):
 * 1. StrictMode: React development mode checks
 *    - Detects unsafe lifecycles
 *    - Warns about deprecated APIs
 *    - Identifies side effects
 *    - Double-invokes functions in dev to catch issues
 *
 * 2. ThemeProvider: Dark/light mode context provider
 *    - Manages theme state (light/dark)
 *    - Provides toggleTheme function
 *    - Persists preference to localStorage
 *    - Respects system preferences
 *
 * 3. App: Main application component
 *    - All portfolio sections
 *    - Navigation and routing
 *    - Layout structure
 *
 * The '!' operator asserts that getElementById won't return null
 * (safe because index.html always has a #root element)
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
          <App/>
      </ThemeProvider>
  </StrictMode>,
)
