import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/fact': {
        target: 'https://catfact.ninja',
        changeOrigin: true,
      },
      '/age-by-name': {
        target: 'https://api.agify.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/age-by-name/, ''),
      },
    },
    host: '0.0.0.0',
    port: 3000,
    open: true,
  },
});
