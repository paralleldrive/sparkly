import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const rootConfig = defineConfig({
  plugins: [tailwindcss(), react(), tsconfigPaths()],
});

const testConfig = defineConfig({
  test: {
    workspace: [
      {
        ...rootConfig,
        test: { include: ['src/**/*.test.{js,ts}'], name: 'unit-tests' },
      },
      {
        ...rootConfig,
        test: {
          include: ['src/**/*.spec.{js,ts}'],
          name: 'integration-tests',
        },
      },
      {
        ...rootConfig,
        test: {
          environment: 'happy-dom',
          include: ['src/**/*.test.{jsx,tsx}'],
          name: 'react-happy-dom-tests',
        },
      },
    ],
  },
});

export default defineConfig({ ...rootConfig, ...testConfig });
