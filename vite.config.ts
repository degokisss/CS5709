/**
 * Vite Configuration File
 *
 * This file configures the Vite build tool for the portfolio application.
 * Vite is a modern frontend build tool that provides fast development server
 * and optimized production builds.
 *
 * @see https://vite.dev/config/
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  /**
   * Vite plugins to use during build and development
   * - react: Enables React Fast Refresh and JSX transformation
   */
  plugins: [react()],

  /**
   * Base public path for the application
   * Set to '/CS5709/' to match the GitHub Pages repository name
   * This ensures all assets are loaded from the correct path when deployed
   */
  base: '/CS5709/',

  /**
   * Build configuration options
   */
  build: {
    /**
     * Output directory for production build
     * Set to 'docs' instead of default 'dist' because GitHub Pages
     * serves from either root or docs folder
     */
    outDir: 'docs',
  },
})
