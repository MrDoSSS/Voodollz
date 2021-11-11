import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src'),
      '~': resolve(__dirname),
    },
  },
  define: {
    'process.env': {},
    global: {},
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/global';`,
      },
    },
  },
})
