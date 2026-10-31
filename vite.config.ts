import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// User site (<user>.github.io) is served from the domain root, so base is '/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
