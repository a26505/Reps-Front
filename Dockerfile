# Dockerfile para frontend Vite + Node - CORREGIDO para producción
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar archivos de package
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .
RUN npm run build

# Imagen final con nginx para servir en producción
FROM nginx:alpine AS production
# Copiar build de Vite a nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

