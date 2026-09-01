import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Default Vite + React config. No path aliases or custom plugins needed yet.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
