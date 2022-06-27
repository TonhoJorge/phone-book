import { fileURLToPath, URL } from 'url'
import path from 'path';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

function resolve(dir) {
  return path.join(__dirname, '..', '..', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'balm-ui-plus': 'balm-ui/dist/balm-ui-plus.esm.js',
      'balm-ui-css': 'balm-ui/dist/balm-ui.css',
      'balm-ui-source': resolve('src/scripts'),
      'balm-ui-plus-source': resolve('src/scripts/plus.js')
    }
  }
})
