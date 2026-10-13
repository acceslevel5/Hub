import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' — ფარდობითი გზები, რომ GitHub Pages-ზე ნებისმიერი რეპოს სახელით იმუშაოს
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { host: true },
})
