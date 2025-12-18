# Apimef - Plateforme E-commerce Apicole

<img title="Apimef Logo" alt="Apimef" src="./frontend/public/images/apimef.jpg" width="300">

Apimef est une plateforme e-commerce moderne dédiée à la vente de produits apicoles (miel, pollen, cire, etc.). 
Développée avec **Vue.js 3** (frontend) et **Node.js/Express** (backend), elle offre une expérience utilisateur fluide et sécurisée.

## 🚀 Démarrage Rapide

### Prérequis
- Node.js >= 14
- MySQL >= 8.0
- npm

### Installation locale en 3 étapes

```bash
# 1. Cloner et entrer dans le répertoire
git clone https://github.com/yanis59100/potfolio-apimef.git
cd potfolio-apimef/apimef

# 2. Initialiser la base de données
mysql -u root -p < backend/database/schema.sql

# 3. Démarrer backend + frontend
npm install --prefix backend
npm install --prefix frontend
node backend/server.js &  # Terminal 1
npm run serve             # Terminal 2
```

L'application sera accessible à **http://localhost:8080**

---

## ✨ Fonctionnalités

- ✅ **Catalogue de produits** : Navigation fluide avec recherche
- ✅ **Panier persistant** : Stockage local des articles
- ✅ **Authentification JWT** : Inscription et connexion sécurisées
- ✅ **Profil utilisateur** : Gestion des données personnelles
- ✅ **Paiement intégré** : Mode mock Stripe pour développement
- ✅ **Design responsive** : Mobile-friendly et optimisé
- ✅ **Galerie d'images** : Présentation visuelle des produits
- ✅ **Contact** : Formulaire de communication

---

## 🛠️ Stack Technique

### Frontend
- Vue 3
- Vue Router 4
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MySQL
- JWT
- Bcryptjs

### Paiement
- **Dev** : Mock Stripe
- **Prod** : Stripe réel

---

## 📁 Architecture

Voir [ARCHITECTURE.md](./ARCHITECTURE.md) pour la documentation détaillée.

---

## 🔧 Configuration

**Backend .env** :
```
DB_HOST=localhost
DB_USER=apimef
DB_PASSWORD=votre_mot_de_passe
DB_NAME=apimef
JWT_SECRET=votre_clé_secrète
STRIPE_MOCK=true
PORT=3000
```

**Frontend .env** :
```
VUE_APP_API_BASE_URL=http://localhost:3000
```

---

## 📖 Utilisation

### Utilisateurs
1. Ouvrir http://localhost:8080
2. Parcourir la boutique
3. S'inscrire ou se connecter
4. Ajouter des produits au panier
5. Passer commande

### Développeurs
```bash
npm run dev              # Démarrer backend + frontend
node backend/server.js   # Backend seulement
npm run serve            # Frontend seulement
npm run build            # Build production
```

---

## 🗄️ Base de Données

```bash
# Créer la base de données
mysql -u root -p
mysql> CREATE DATABASE apimef;
mysql> USE apimef;
mysql> source backend/database/schema.sql;
```

---

## 🧪 Tests

Pour lancer les tests (backend seulement) :
```bash
cd backend
npm test
```

Tests unitaires pour les fonctions clés (auth, hash).

---

- ✅ Mots de passe hachés (bcryptjs)
- ✅ JWT avec expiration
- ✅ CORS configuré
- ✅ Validation des entrées

---

## 📜 Licence

MIT - Voir [LICENSE](./LICENSE)

---

## 👤 Auteur

Yanis Meftouh - [meftouh.yanis@hotmail.com](meftouh.yanis@hotmail.com)

**Dernière mise à jour** : 2025-12-10
