# Architecture Apimef

## Structure du Projet

```
apimef/
├── backend/              # API Node.js/Express
│   ├── controllers/      # Contrôleurs métier
│   ├── database/         # Connexion et schéma BD
│   ├── models/           # Modèles (Product)
│   ├── routes/           # Routes API
│   ├── authMiddleware.js # Middleware d'authentification JWT
│   ├── server.js         # Point d'entrée serveur
│   ├── .env              # Variables d'environnement (ne pas commiter)
│   ├── .env.example      # Modèle d'env
│   └── package.json
│
├── frontend/             # Application Vue 3
│   ├── src/
│   │   ├── pages/        # Pages Vue (HomePage, BoutiquePage, etc.)
│   │   ├── components/   # Composants Vue (Navbar)
│   │   ├── JavaScript/   # Helpers et utilitaires JS
│   │   ├── css/          # Styles globaux
│   │   ├── App.vue       # Composant racine
│   │   ├── main.js       # Point d'entrée + router
│   │   └── config.js     # Configuration (API_BASE)
│   ├── public/           # Assets statiques
│   ├── .env.example      # Modèle d'env
│   └── package.json
│
├── .env.example          # Variables globales d'exemple
├── Dockerfile            # Image Docker pour production
├── README.md             # Documentation utilisateur
└── ARCHITECTURE.md       # Ce fichier

```

## Stack Technique

- **Backend**: Node.js + Express.js + MySQL
- **Frontend**: Vue 3 + Vue Router + Axios
- **Auth**: JWT (JSON Web Tokens)
- **Paiement**: Stripe (mode mock pour développement)
- **Sécurité**: Helmet, CORS, bcryptjs

## Démarrage Local

### Prérequis
- Node.js >= 14
- MySQL >= 8.0
- npm ou yarn

### 1. Initialiser la base de données

```bash
mysql -u root -p
mysql> CREATE DATABASE apimef;
mysql> USE apimef;
mysql> source backend/database/schema.sql;

# Ajouter des données de test:
mysql> INSERT INTO produits (nom, description, prix, stock) VALUES
('Miel de tilleul', 'Miel artisanal', 12.00, 50),
('Miel de printemps', 'Miel floral', 10.00, 30);
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# Éditer .env avec vos variables (DB_HOST, DB_USER, DB_PASSWORD, JWT_SECRET)
npm install
STRIPE_MOCK=true npm run server  # ou: node server.js
```

Backend écoute sur `http://localhost:3000`

### 3. Frontend

```bash
cd frontend
npm install
npm run serve
```

Frontend écoute sur `http://localhost:8080`

### 4. Accéder à l'application

Ouvrir http://localhost:8080 dans un navigateur.

## API Endpoints

### Public
- `GET /api/products` - Liste des produits
- `POST /api/register` - Inscription
- `POST /api/login` - Connexion

### Protégés (JWT required)
- `POST /create-checkout-session` - Créer session de paiement

## Variables d'Environnement

### Backend
```
DB_HOST=localhost
DB_USER=apimef
DB_PASSWORD=...
DB_NAME=apimef
JWT_SECRET=...
STRIPE_SECRET_KEY=sk_... (optionnel)
STRIPE_MOCK=true        (mode développement)
PORT=3000
FRONTEND_URL=...        (optionnel - CORS)
```

### Frontend
```
VUE_APP_API_BASE_URL=http://localhost:3000
```

## Features

- ✅ Authentification JWT
- ✅ Gestion d'utilisateurs (inscription/connexion)
- ✅ Catalogue de produits
- ✅ Panier persistant (localStorage)
- ✅ Checkout mock Stripe (pour dev)
- ✅ Responsive design
- ✅ Interface multilingue (FR)

## Mode Mock Stripe

En développement, le backend fonctionne en mode mock :
- `STRIPE_MOCK=true` : APIs Stripe sont simulées
- Paiements de test sans clés Stripe réelles
- Routes `/mock-checkout`, `/success`, `/cancel` disponibles

Pour utiliser Stripe réel :
```bash
STRIPE_MOCK=false STRIPE_SECRET_KEY=sk_... node server.js
```

## Nettoyage & Maintenance

### Supprimer les archives de build
```bash
rm -rf frontend/dist backend/build
```

### Réinstaller dépendances
```bash
rm -rf backend/node_modules frontend/node_modules
npm install --prefix backend
npm install --prefix frontend
```

### Tests
```bash
# Backend lint
cd backend && npm run lint

# Frontend build
cd frontend && npm run build
```

## Problèmes Courants

### Port déjà utilisé
```bash
lsof -i :3000   # Vérifier qui utilise le port
lsof -i :8080
```

### Erreurs de BD
```bash
# Vérifier la connexion MySQL
mysql -u root -p apimef -e "SELECT 1;"

# Réinitialiser le schéma
mysql -u root -p apimef < backend/database/schema.sql
```

### Frontend ne charge pas l'API
Vérifier que `VUE_APP_API_BASE_URL` pointe vers le bon serveur backend.

## Production

### Docker
```bash
docker build -t apimef .
docker run -p 3000:3000 -p 8080:8080 -e DB_HOST=... apimef
```

### Considérations sécurité
- Utiliser HTTPS/SSL en production
- Vérifier les headers de sécurité (Helmet)
- Valider toutes les entrées utilisateur
- Utiliser des secrets Stripe réels sécurisés
- Configurer CORS correctement (FRONTEND_URL)

