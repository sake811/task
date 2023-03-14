import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // resolve: {
  //   alias: [
  //     { find: '@', replacement: path.resolve(__dirname, 'src') },
  //   ],
  // },
  server: {
    proxy: {
      '^/getVillage/.*': {
        target: 'http://widget-server.m2lab.ru/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/getVillage2/, '')
      }
    }
  }
})
