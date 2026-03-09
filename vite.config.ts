import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

//https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vuetify({ autoImport: true }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 5173,
        host: true,
        allowedHosts: ['.amazonaws.com'], 
        proxy: {
            '/api': {
<<<<<<< HEAD
                target: 'http://10.100.194.25:80', 
=======
               target: 'http://reps-backend-service:5000',
>>>>>>> main-new
                changeOrigin: true,
                secure: false,
            }
        }
    }
})
