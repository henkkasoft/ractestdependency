import { UserConfig, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    maxConcurrency: 1,
    environment: 'jsdom',
    setupFiles: './src/setupTests.tsx',
    mockReset: true
  },
} as UserConfig)
