import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevtools from 'vite-plugin-vue-devtools'

export default defineConfig({
	plugins: [
		vue(),
		vueDevtools(),
	]
})
