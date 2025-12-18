# Architecture du Projet

## Vue d'ensemble

Ce projet est une application web full-stack composée de :
- Un backend API REST en Node.js/Express
- Un frontend SPA en Vue.js 3
- Une base de données MySQL
- Authentification JWT
- Intégration paiement externe

## Structure Générale

```
projet/
├── backend/              # Serveur API
├── frontend/             # Application client
├── database/             # Schéma BD
├── docs/                 # Documentation
└── config/               # Configuration
```

## Technologies Principales

- **Backend**: Node.js, Express.js, MySQL
- **Frontend**: Vue 3, Vue Router, Axios
- **Sécurité**: JWT, hashage mots de passe, HTTPS
- **Déploiement**: Docker

## Démarrage Rapide

### Prérequis
- Node.js >= 14
- MySQL >= 8.0

### Installation
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### Configuration
- Copier `.env.example` vers `.env`
- Configurer les variables d'environnement (voir .env.example)
- Initialiser la base de données avec le schéma fourni

### Lancement
```bash
# Backend
cd backend && npm start

# Frontend
cd frontend && npm run serve
```

## Sécurité

⚠️ **Important** : Ne jamais commiter de fichiers `.env` contenant des secrets réels.

- Utiliser des variables d'environnement pour tous les secrets
- Valider et sanitizer toutes les entrées utilisateur
- Implémenter HTTPS en production
- Configurer CORS correctement
- Utiliser des tokens JWT avec expiration courte

## Production

- Utiliser Docker pour le déploiement
- Configurer un reverse proxy (nginx)
- Mettre en place des logs et monitoring
- Sauvegarder régulièrement la base de données
