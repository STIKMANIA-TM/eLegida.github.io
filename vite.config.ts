import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'ELEGIDA Habana - Moda Exclusiva',
        short_name: 'ELEGIDA',
        description: 'Tienda de moda exclusiva en La Habana',
        theme_color: '#E91E63',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/elegida-habana/',
        start_url: '/elegida-habana/',
        icons: [
          { src: '/elegida-habana/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/elegida-habana/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/v1\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
            },
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/storage\/v1\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'supabase-images-cache',
              expiration: { maxEntries: 200, maxAgeSeconds: 2592000 },
            },
          },
        ],
      },
    }),
  ],
  base: '/elegida-habana/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})