/**
 * ESLint Configuration File
 *
 * This file configures ESLint, a static code analysis tool for identifying
 * problematic patterns in JavaScript/TypeScript code. It helps maintain
 * code quality and consistency throughout the project.
 *
 * The configuration uses the flat config format (ESLint 9+) with TypeScript
 * and React-specific rules.
 *
 * @see https://eslint.org/docs/latest/
 */

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  /**
   * Global ignore patterns
   * Tells ESLint to skip these directories when linting
   * - dist: Production build output directory
   */
  globalIgnores(['dist']),

  {
    /**
     * File patterns to apply these rules to
     * Only TypeScript and TSX (TypeScript + JSX) files
     */
    files: ['**/*.{ts,tsx}'],

    /**
     * Configuration presets to extend from
     * - js.configs.recommended: Basic JavaScript best practices
     * - tseslint.configs.recommended: TypeScript-specific rules
     * - reactHooks.configs['recommended-latest']: React Hooks rules (proper usage, dependencies)
     * - reactRefresh.configs.vite: Fast Refresh compatibility rules for Vite
     */
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],

    /**
     * Language-specific options
     */
    languageOptions: {
      /**
       * ECMAScript version to parse
       * 2020 includes features like optional chaining, nullish coalescing
       */
      ecmaVersion: 2020,

      /**
       * Global variables that are predefined
       * Includes browser APIs like window, document, console, etc.
       */
      globals: globals.browser,
    },
  },
])
