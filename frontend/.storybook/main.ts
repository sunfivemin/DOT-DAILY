import path from 'path';
import { fileURLToPath } from 'url';
import type { StorybookConfig } from '@storybook/nextjs-vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  viteFinal: async config => {
    return {
      ...config,
      resolve: {
        alias: {
          react: path.resolve(__dirname, '../node_modules/react'),
          'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
          '@': path.resolve(__dirname, '../src'),
        },
      },
      optimizeDeps: {
        include: ['react', 'react-dom'],
      },
    };
  },
};

export default config;
