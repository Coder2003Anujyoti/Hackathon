import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
    base:'',
     build: {
    sourcemap: false // disable source maps to reduce file count
  },
  plugins: [react(),tailwindcss()],
})
