import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
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
        allowedHosts: [
            'ac7bf30a489c44f90a400d466a7e0def-1826813329.us-east-1.elb.amazonaws.com'
        ],
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:5148',
                changeOrigin: true,
                secure: false,
            }
        }
    }
})