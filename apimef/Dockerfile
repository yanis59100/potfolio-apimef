# Multi-stage build pour optimiser l'image finale
# Stage 1: Build frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build

# Stage 2: Build backend + Runtime
FROM node:18-alpine

WORKDIR /app

# Installer dumb-init pour gérer les signaux correctement
RUN apk add --no-cache dumb-init

# Variables d'environnement par défaut (peuvent être overridées)
ENV NODE_ENV=production \
    PORT=3000 \
    STRIPE_MOCK=true

# Copier les fichiers backend
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install --only=production

# Revenir à /app et copier tout le code backend
WORKDIR /app
COPY backend/ ./backend/

# Copier les assets générés du frontend (pour les fichiers statiques)
COPY --from=frontend-build /app/frontend/dist ./frontend/dist
COPY --from=frontend-build /app/frontend/public ./frontend/public

# Port d'exposition
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/products', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Utiliser dumb-init si disponible (utilise le binaire dans PATH sur Alpine)
ENTRYPOINT ["dumb-init", "--"]

# Lancer le serveur backend
CMD ["node", "backend/server.js"]
