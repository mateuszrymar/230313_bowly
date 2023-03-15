import { defineConfig } from 'vite'
import { resolve } from 'path'

const __dirname = 'D:/coding/230313_bowly'

export default defineConfig({
  assetsInclude: [
    // '**/*.html',
    // '**/*.ts',
    // '**/*.css',
    '**/*.txt',
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'results.html'),
      },
    },
  },
})