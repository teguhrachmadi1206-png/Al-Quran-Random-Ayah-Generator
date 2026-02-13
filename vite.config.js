import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/teguhrachmadi1206-png/Al-Quran-Random-Ayah-Generator-v1.3'
})
