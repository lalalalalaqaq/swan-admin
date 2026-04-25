import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // 本地开发时，前端请求 /api 会被代理到本地后端，避免 CORS
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/market-api': {
        target: 'http://43.167.207.108:19090',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/market-api/, ''),
      },
    },
  },
})
