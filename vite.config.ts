import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  base: './',
  envPrefix: 'REACT_APP_',
  plugins: [react()],
  resolve: {
    alias: {
      // '@/*': path.resolve(__dirname, './src/*'),
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
