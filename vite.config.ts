import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import { EXAM_CONFIG } from './src/config/exam.ts'

// Estrategia de versionado del banco de preguntas:
// el service worker se identifica con el bankVersion. Cuando el banco
// cambie (bump de EXAM_CONFIG.bankVersion), el build genera un service
// worker nuevo con hashes de precache nuevos, lo que invalida la caché
// vieja y provoca el aviso de "actualización disponible".
const BANK_VERSION = EXAM_CONFIG.bankVersion

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.svg', 'icons/*.png'],
      manifest: {
        name: 'DGT Test Simulator — Permiso B',
        short_name: 'DGT Test Sim',
        description:
          'Simulacro del examen teórico del permiso B: 30 preguntas, 30 minutos, máximo 3 errores. Proyecto educativo independiente.',
        lang: 'es',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#0A1F3C',
        background_color: '#FFFFFF',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // La app shell + el banco de preguntas (empaquetado en el bundle)
        // quedan precacheados: la app funciona 100 % offline.
        cacheId: `dgt-test-sim-v${BANK_VERSION}`,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,json}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})
