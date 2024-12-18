import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // Add paths to global CSS files here
    preprocessorOptions: {
      css: {
        additionalData: `@import './src/index.css;`,
      },
    },
  },
});
