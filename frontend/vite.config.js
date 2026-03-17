import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // 프론트엔드에서 /api로 시작하는 요청을 백엔드로 전달
      '/api': {
        target: 'http://backend:8080',
        changeOrigin: true,
      }
    }
  },
  build: {
    // 빌드 결과물이 저장될 폴더 (Dockerfile의 경로와 일치해야 함)
    outDir: 'dist',
  }
})