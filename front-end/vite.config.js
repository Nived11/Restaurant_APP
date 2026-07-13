import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const backendTarget = env.VITE_API_URL ? env.VITE_API_URL.replace(/\/api$/, '') : '';

  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        injectRegister: null, 
        registerType: 'autoUpdate',
        manifest: {
          name: 'THE CRUNCH ',
          short_name: 'Crunch', 
          theme_color: '#1b1b1b', 
          background_color: '#ffffff', 
          display: 'standalone',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: '/icon-192.png', 
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/icon-512.png', 
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/icon-512.png', 
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ]
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 20 * 1024 * 1024, 
          globPatterns: ['**/*.{js,css,html,png,svg,mp3}'],
        }
      })
    ],
    server: {
      proxy: {
        '/api': {
          target: backendTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
        },
      },
    },
  };
});