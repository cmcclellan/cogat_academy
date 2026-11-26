import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative asset paths so it works perfectly on GitHub Pages (e.g. <user>.github.io/<repo>/)
  server: {
    port: 5173,
    open: false
  }
});
