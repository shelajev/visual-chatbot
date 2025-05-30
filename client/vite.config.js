import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    supported: {
      "top-level-await": true
    }
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://api:3000',
      "/socket.io": "http://api:3000"
    }
  }
})
