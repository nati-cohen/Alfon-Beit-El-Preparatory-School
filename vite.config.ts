import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        // --- שנה כאן את שם האפליקציה שיופיע מתחת לאייקון בטלפון ---
        name: 'אלפון מכינת בית אל',
        short_name: 'אלפון',
        description: 'ספר תלמידים דיגיטלי למכינת בית אל',
        
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        
        // --- כאן הגדרנו את התמונה החדשה ששלחת ---
        icons: [
          {
            src: 'https://i.postimg.cc/6QtbGKVS/lwgw-mkynh.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: 'https://i.postimg.cc/6QtbGKVS/lwgw-mkynh.jpg',
            sizes: '512x512',
            type: 'image/jpeg'
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist',
  }
})