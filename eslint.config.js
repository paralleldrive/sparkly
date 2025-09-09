import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import playwright from 'eslint-plugin-playwright';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

// --- Setup for file paths and FlatCompat ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// --- Main ESLint Configuration ---
export default tseslint.config(
  // 1. Start with global ignores from .gitignore
  includeIgnoreFile(gitignorePath),

  // 2. Basic ESLint recommended rules
  eslint.configs.recommended,

  // 3. Next.js recommended configurations (core, and TypeScript)
  // This is the key change: It correctly sets up TypeScript-ESLint for a Next.js context.
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // 4. Add other plugins' recommended configs
  eslintPluginUnicorn.configs['flat/recommended'],

  // 5. TypeScript files with type-aware linting
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        // This enables type-aware linting rules
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // --- Your Custom TypeScript Rules ---
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/only-throw-error': [
        'error',
        {
          allow: [{ from: 'lib', name: 'Response' }],
        },
      ],

      // --- Your Custom Simple Import Sort Rules ---
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // --- Your Custom Unicorn Rules ---
      'unicorn/better-regex': 'warn',
      'unicorn/no-process-exit': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          replacements: {
            args: false,
            params: false,
            props: false,
            utils: false,
          },
        },
      ],
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: [
            /.*\._index\.(tsx|ts)$/,
            /.*\$[A-Za-z]+Slug(\.[A-Za-z]+)*\.(tsx|ts)$/,
            /.*_\.[A-Za-z]+\.(tsx|ts)$/,
          ],
        },
      ],
    },
  },

  // 6. JavaScript/JSX files without type-aware linting
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // --- Your Custom Simple Import Sort Rules ---
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // --- Your Custom Unicorn Rules ---
      'unicorn/better-regex': 'warn',
      'unicorn/no-process-exit': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          replacements: {
            args: false,
            params: false,
            props: false,
            utils: false,
          },
        },
      ],
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: [
            /.*\._index\.(tsx|ts)$/,
            /.*\$[A-Za-z]+Slug(\.[A-Za-z]+)*\.(tsx|ts)$/,
            /.*_\.[A-Za-z]+\.(tsx|ts)$/,
          ],
        },
      ],
    },
  },

  // 7. Vitest configuration for test files
  {
    files: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    ...vitest.configs.recommended,
    rules: {
      ...vitest.configs.recommended.rules,
      'unicorn/no-null': 'off',
    },
  },

  // 8. Playwright configuration for E2E test files
  {
    files: ['playwright/**/*.e2e.ts'],
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/require-top-level-describe': 'error',
      'playwright/no-conditional-expect': 'off',
      'unicorn/prevent-abbreviations': ['error', { checkFilenames: false }],
    },
  },

  // 9. Prettier config must be last to override other formatting rules
  eslintPluginPrettierRecommended,
);
