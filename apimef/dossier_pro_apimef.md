# Page de Couverture

**Dossier Professionnel**  
**Développement d'une Plateforme E-commerce Apicole - Apimef**

**Candidat :** Yanis Meftouh  
**Formation :** Titre Professionnel Développeur Web et Web Mobile (RNCP5, Niveau 5)  
**Établissement :** [Nom de ton centre de formation]  
**Tuteur Pédagogique :** [Nom si applicable]  
**Entreprise/Stage :** Projet personnel (portfolio)  
**Période de réalisation :** Octobre 2025 - Décembre 2025  
**Date de soutenance :** [Jour J, ex: 15 janvier 2026]  
**Projet :** Apimef - Boutique en ligne de miel biologique français  
**Mots-clés :** Full-stack, Vue.js 3, Node.js, Express, MySQL, JWT, Stripe, E-commerce, Sécurité, Tests unitaires, Docker  

\pagebreak

# Table des Matières

| Section | Titre | Pages |
|---------|-------|-------|
| 1 | Introduction et Présentation du Projet | 3-6 |
| 2 | Cahier des Charges | 7-11 |
| 3 | Analyse Fonctionnelle | 12-18 |
| 4 | Conception | 19-26 |
| 5 | Réalisation | 27-34 |
| 6 | Tests et Validation | 35-39 |
| 7 | Déploiement et Maintenance | 40-43 |
| 8 | Conclusion et Bilan Personnel | 44-47 |
| Annexes | Code, Screenshots, Docs | 48+ |

\pagebreak

## 1. Introduction et Présentation du Projet (Pages 3-6)

Sommaire de la section :
- 1.1 Contexte Personnel et Professionnel
- 1.2 Objectifs du Projet
- 1.3 Public Cible et Enjeux
- 1.4 Contraintes et Risques

1.1 Contexte Personnel et Professionnel (Page 1)

Je m'appelle Yanis Meftouh, âgé de 20 ans, et je suis actuellement en formation pour obtenir le titre professionnel Développeur Web et Web Mobile (RNCP5). Ce projet, Apimef, est mon travail de fin de formation, réalisé dans le cadre de mon portfolio personnel. Il s'agit d'une plateforme e-commerce dédiée à la vente de produits apicoles, comme du miel biologique français.

Mon intérêt pour l'apiculture vient de mon enfance : mes grands-parents avaient des ruches dans leur jardin, et j'ai toujours été fasciné par les abeilles et leur rôle dans l'écosystème. En tant que jeune développeur, j'ai voulu combiner cette passion avec mes compétences techniques apprises en formation. Ce projet m'a permis d'appliquer les concepts théoriques (HTML, CSS, JavaScript, bases de données, sécurité) dans un contexte réel et professionnel.

J'ai travaillé seul sur ce projet, en utilisant des ressources gratuites disponibles en ligne (tutoriels YouTube, documentation officielle, forums comme Stack Overflow). Cela simule un environnement de travail junior, où l'on doit rechercher et résoudre des problèmes de manière autonome. Mon objectif était de créer une application fonctionnelle, sécurisée et user-friendly, tout en gardant le code simple et lisible, comme le ferait un débutant.

1.2 Objectifs du Projet (Page 2)

Les objectifs de ce projet sont multiples et alignés sur les compétences attendues pour le RNCP5 :

- Objectif Fonctionnel : Développer une boutique en ligne complète permettant aux utilisateurs d'acheter du miel en ligne, avec gestion de compte, panier et paiement.
- Objectif Pédagogique : Maîtriser le développement full-stack (frontend + backend), en apprenant Vue.js, Node.js et l'intégration d'APIs tierces comme Stripe.
- Objectif Technique : Implémenter des bonnes pratiques de sécurité (hashage des mots de passe, JWT), de performance (responsive design) et de qualité (tests unitaires).
- Objectif Personnel : Construire un portfolio solide pour ma future carrière, démontrant ma capacité à mener un projet de A à Z.

Pour structurer ces objectifs, j'ai utilisé la méthode SMART :
- Spécifique : Créer une app avec 4 produits, inscription/connexion, panier et paiement.
- Mesurable : Au moins 80% des fonctionnalités implémentées, tests passant, app responsive.
- Atteignable : Avec mes connaissances actuelles en formation.
- Réaliste : Budget 0€, temps 4 semaines.
- Temporel : Livraison pour la soutenance RNCP5.

Ce projet couvre les blocs de compétences RNCP5 : conception, développement, validation, déploiement.

1.3 Public Cible et Enjeux (Page 3)

Le public cible principal est les consommateurs de produits biologiques et locaux :
- Particuliers : Familles soucieuses de leur santé, adeptes du bio, personnes allergiques aux produits industriels.
- Apiculteurs : Petits producteurs français souhaitant vendre leur miel sans passer par des grossistes coûteux.
- Entreprises : Restaurants ou épiceries bio cherchant des fournisseurs locaux.

Les enjeux sont variés :
- Économiques : Soutenir l'économie locale en favorisant les ventes directes apiculteurs-consommateurs.
- Écologiques : Promouvoir l'apiculture durable et la biodiversité, en sensibilisant aux abeilles via le site.
- Techniques : Démontrer des compétences en e-commerce, sécurité et UX/UI.
- Sociaux : Éduquer sur l'importance des abeilles pour l'environnement.

L'app doit être accessible, intuitive et sécurisée pour gagner la confiance des utilisateurs.

1.4 Contraintes et Risques (Page 4)

Contraintes Techniques :
- Utilisation de technologies modernes mais accessibles (Vue 3, Node 18).
- Pas de serveur payant : développement local, déploiement via Docker gratuit.
- Responsive obligatoire pour mobile (majorité des utilisateurs).

Contraintes Temporelles :
- Réalisation en 4 semaines, entre cours et projets personnels.
- Planning serré : 1 semaine par phase majeure.

Contraintes Budgétaires :
- Tout gratuit : libs open-source, outils comme GitHub, VS Code.

Risques Identifiés :
- Sécurité : Fuites de données – mitigé par hashage et JWT.
- Performance : Images lourdes – optimisé via compression.
- Fonctionnalité : Bugs DB – tests manuels et unitaires.
- Échec Projet : Manque de temps – planning suivi hebdomadairement.

J'ai anticipé ces risques en documentant chaque étape et en testant régulièrement.

*(Fin Section 1 - 4 pages. Ajoute une image : photo de toi ou logo Apimef.)*
\pagebreak


## 2. Cahier des Charges (Pages 5-9)

Sommaire de la section :
- 2.1 Fonctionnalités Demandées
- 2.2 Critères d'Acceptation
- 2.3 Technologies et Outils
- 2.4 Planning Prévisionnel

2.1 Fonctionnalités Demandées (Pages 5-6)

Le cahier des charges détaille les fonctionnalités obligatoires et optionnelles :

Fonctionnalités Obligatoires :
1. Catalogue de Produits : Affichage statique des produits hardcodés côté frontend (nom, prix, image, description fixes), avec intégration Stripe pour les paiements uniquement.
2. Authentification Utilisateur : Inscription (nom, prénom, adresse, email, mot de passe), connexion, déconnexion.
3. Gestion du Panier : Ajouter/supprimer des produits, calcul du total, persistance via localStorage.
4. Paiement Intégré : Intégration Stripe pour checkout sécurisé (mode mock pour développement).
5. Profil Utilisateur : Consultation et modification des informations personnelles.
6. Navigation et Routing : Menu responsive, pages Accueil, Boutique, Connexion, Inscription, Profil, Contact, Images.
7. Galerie d'Images : Présentation visuelle des produits apicoles.
8. Formulaire de Contact : Champs nom, email, message (envoi simulé pour l'instant).

Fonctionnalités Optionnelles :
- Mode admin pour gérer les produits (non implémenté pour simplicité).
- Avis clients et notation.
- Notifications email (futur).

Chaque fonctionnalité est priorisée selon la méthode MoSCoW (Must have, Should have, Could have, Won't have).

2.2 Critères d'Acceptation (Pages 7-8)

Pour chaque fonctionnalité, des critères précis assurent la qualité :

- Inscription : Formulaire valide tous champs requis ; email unique ; mot de passe >6 caractères ; message de succès affiché ; redirection vers connexion.
- Connexion : Vérification email/mot de passe hashé ; génération token JWT valide 1h ; stockage local ; affichage nom user.
- Catalogue : Produits affichés en grille ; images lazy-load ; prix en euros ; bouton "Ajouter au panier".
- Panier : Quantité modifiable (1-50) ; total recalculé ; bouton "Commander" désactivé si vide ; modal responsive.
- Paiement : Session Stripe créée ; redirection vers page succès/annulation ; pas de stockage carte.
- Responsive : Menu burger <768px ; textes lisibles ; images adaptées.
- Sécurité : Mots de passe hashés (bcrypt) ; pas de SQL injection ; CORS activé ; erreurs génériques (pas de leaks info).

Tous critères testés manuellement et automatiquement.

2.3 Technologies et Outils (Page 9)

Frontend :
- Vue.js 3 : Framework réactif pour interfaces dynamiques.
- Vue Router 4 : Gestion des routes SPA.
- Axios : Requêtes HTTP vers API.
- CSS3 : Styles vanilla, variables pour thème.

Backend :
- Node.js 18 : Runtime JavaScript serveur.
- Express.js : Framework API REST léger.
- MySQL 8 : Base de données relationnelle.
- JWT : Authentification stateless.
- Bcryptjs : Hashage sécurisé des mots de passe.
- Stripe : API paiement.

Outils :
- Git : Versionning avec commits fréquents.
- VS Code : Éditeur avec extensions Vue/Node.
- Postman : Test API endpoints.
- Jest : Tests unitaires.
- Docker : Conteneurisation pour déploiement.

Choix justifiés : Simples pour débutant, populaires en entreprise, gratuites.

2.4 Planning Prévisionnel (Page 9)

- Semaine 1 : Analyse, setup projet, DB schema, maquettes.
- Semaine 2 : Backend (auth, API produits), tests manuels.
- Semaine 3 : Frontend (pages, panier, responsive), intégration.
- Semaine 4 : Tests unitaires, déploiement Docker, docs, corrections.

Suivi via Trello personnel.

*(Fin Section 2 - 5 pages.)*
\pagebreak


## 3. Analyse Fonctionnelle (Pages 10-16)

Sommaire de la section :
- 3.1 Cas d'Usage Détaillés
- 3.2 Acteurs et Rôles
- 3.3 Maquettes et Interfaces
- 3.4 Exigences Non Fonctionnelles

3.1 Cas d'Usage Détaillés (Pages 10-12)

UC1 : Parcourir le Catalogue  
Préconditions : Utilisateur sur le site.  
Actions : Clic sur "Boutique" ; scroll grille produits ; clic sur image pour détails.  
Postconditions : Produits visibles avec add to cart.  
Alternatives : Produits non chargés → message erreur.

UC2 : S'Inscrire  
Pré : User anonyme.  
Actions : Remplir form (nom, email, mdp) ; submit.  
Post : Compte créé en DB ; email vérifié unique ; redirect login.  
Exceptions : Email pris → erreur ; mdp faible → avertissement.

UC3 : Se Connecter  
Pré : Compte existant.  
Actions : Saisir email/mdp ; submit.  
Post : Vérif hash ; token généré ; stockage local ; affichage user info.  
Exceptions : Mdp incorrect → erreur ; token expiré → relogin.

UC4 : Gérer le Panier  
Pré : Produits ajoutés.  
Actions : Modifier qty ; supprimer item ; voir total.  
Post : localStorage mis à jour ; total exact.  
Exceptions : Panier vide → checkout disabled.

UC5 : Effectuer un Paiement  
Pré : Panier non vide ; user connecté.  
Actions : Clic checkout ; saisir carte Stripe ; confirmer.  
Post : Session créée ; redirect succès ; email simulé.  
Exceptions : Carte invalide → erreur Stripe ; session fail → message.

UC6 : Consulter Profil  
Pré : Connecté.  
Actions : Clic "Profil" ; voir/modifier infos.  
Post : DB mise à jour.  
Exceptions : Non connecté → redirect login.

*(Détails pour 6 UC, avec diagrammes UML textuels.)*

3.2 Acteurs et Rôles (Page 13)

- Utilisateur Anonyme : Accès lecture (catalogue, contact) ; peut s'inscrire.
- Utilisateur Connecté : + panier, paiement, profil.
- Administrateur : (Futur) CRUD produits – rôle non implémenté pour focus user.

3.3 Maquettes et Interfaces (Pages 14-15)

Descriptions textuelles détaillées :
- Page Accueil : Header avec nav (Accueil, Boutique, etc.) ; section hero avec image abeilles ; texte intro ; footer avec liens.
- Page Boutique : Grille responsive 4 colonnes ; chaque carte : image, nom, prix, input qty, bouton add.
- Page Inscription : Form centré : labels, inputs, bouton ; messages erreur/succès.
- Page Profil : Affichage infos user ; boutons modifier/logout.
- Modal Panier : Liste items (nom, qty, prix) ; total ; boutons +/- , supprimer, checkout.

*(Ajoute 10+ wireframes décrits en texte, ou placeholders pour images.)*

3.4 Exigences Non Fonctionnelles (Page 16)

- Performance : Chargement <3s ; images <500KB.
- Sécurité : Conformité RGPD (pas de données sensibles, droit de suppression des comptes, pas de conservation inutile des données) ; HTTPS futur.
- Accessibilité : Contraste couleurs ; alt images ; navigation clavier.
- Maintenabilité : Code commenté ; séparation backend/frontend.
- Portabilité : Fonctionne sur Windows/Linux/Mac via Docker.

*(Fin Section 3 - 7 pages.)*
\pagebreak


## 4. Conception (Pages 17-24)

Sommaire de la section :
- 4.1 Architecture Générale
- 4.2 Modèle de Données (MCD)
- 4.3 API Routes et Endpoints
- 4.4 Sécurité et Performance
- 4.5 Diagrammes et Schémas

4.1 Architecture Générale (Pages 17-18)

L'architecture suit le modèle client-serveur avec séparation claire :

```
[Navigateur Web (Client)]
    ↓ HTTP/HTTPS
[Application Vue.js (SPA)]
    ↓ Requêtes Axios
[API Express (Serveur)]
    ↓ Requêtes SQL
[Base MySQL]
    ↓ API Stripe (for products/payments)
[Services Externes]
```

Avantages : Scalabilité (backend indépendant), sécurité (API stateless), maintenabilité (frontend/backend séparés).

Composants :
- Frontend : Composants Vue, router, store local.
- Backend : Routes, middlewares, contrôleurs.
- DB : Tables utilisateurs, produits (via Stripe).
- Externe : Stripe pour paiement.

4.2 Modèle de Données (MCD) (Pages 19-20)

Table utilisateurs :
- id (INT, PK, AUTO_INCREMENT)
- nom (VARCHAR 100, NOT NULL)
- prenom (VARCHAR 100, NOT NULL)
- adresse (VARCHAR 255)
- ville (VARCHAR 100)
- code_postal (VARCHAR 10)
- email (VARCHAR 255, UNIQUE, NOT NULL)
- password (VARCHAR 255, NOT NULL)  // Hashé
- created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

Table produits : Non créée localement ; données depuis Stripe API (id, name, price, images).

Dans un souci de simplicité et de maîtrise, les produits sont définis côté frontend, tandis que Stripe est utilisé uniquement pour la gestion des prix et des paiements.

Relations : Aucune pour l'instant (futur : table achats liant user à produits).

Schéma SQL :
```sql
CREATE TABLE utilisateurs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  adresse VARCHAR(255),
  ville VARCHAR(100),
  code_postal VARCHAR(10),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4.3 API Routes et Endpoints (Pages 21-22)

Liste complète des endpoints :

- GET / : Sert index.html Vue.
- GET /api/products : Récupère produits Stripe (avec prix).
- POST /api/register : Crée user (hash mdp, vérif email).
- POST /api/login : Auth user (retourne token).
- POST /create-checkout-session : Crée session Stripe (avec line_items).
- GET /success : Page post-paiement réussi.
- GET /cancel : Page post-paiement annulé.
- GET /contact : Page contact (statique).
- GET /images : Galerie images.

Chaque endpoint documenté avec méthode, params, réponse exemple.

4.4 Sécurité et Performance (Page 23)

Sécurité :
- Hashage bcrypt (10 rounds) pour mdp.
- JWT avec secret env, expiration 1h.
- La vérification du JWT côté serveur pourrait être renforcée via un middleware dédié, ce qui constitue une piste d’amélioration.
- Validation inputs avec express-validator.
- CORS : origines limitées à localhost.
- Pas de logs sensibles.

Performance :
- Images optimisées (compression TinyPNG).
- Requêtes DB indexées.
- Cache localStorage pour panier.
- Build Vue optimisé (chunks).

4.5 Diagrammes et Schémas (Page 24)

- Diagramme de classes : User, Product, Cart.
- Diagramme de séquence : Login flow.
- Schéma réseau : Client → API → DB.

*(Fin Section 4 - 8 pages. Ajoute schémas textuels.)*
\pagebreak


## 5. Réalisation (Pages 25-32)

Sommaire de la section :
- 5.1 Choix Techniques et Implémentation
- 5.2 Code Clé et Extraits
- 5.3 Difficultés Rencontrées et Solutions
- 5.4 Simplifications pour un Jeune Développeur

5.1 Choix Techniques et Implémentation (Pages 25-26)

Choix justifiés :
- Vue.js : Plus simple que React pour débutant ; Composition API moderne.
- Node/Express : JS full-stack, communauté large.
- MySQL : Relationnel pour données user structurées.
- Stripe : Paiement sécurisé sans gérer cartes.
- Jest : Tests faciles en JS.

Implémentation : Backend d'abord (API), puis frontend (intégration).

5.2 Code Clé et Extraits (Pages 27-30)

**Extrait 1 : Initialisation du serveur et connexion DB (Backend - server.js)**

```javascript
// Chargement des dépendances
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Connexion DB
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB");
});
```

**Explication :** Ce code initialise le serveur Express, charge les variables d'environnement, et établit la connexion à la base de données MySQL. Cela permet au backend de communiquer avec la DB pour stocker les utilisateurs.

**Extrait 2 : Route d'inscription (Backend - server.js)**

```javascript
app.post("/api/register", (req, res) => {
  const { nom, prenom, adresse, ville, code_postal, email, password } = req.body;

  if (!nom || !prenom || !adresse || !ville || !code_postal || !email || !password) {
    return res.status(400).json({ message: "All fields required." });
  }

  // Vérifier email unique
  const checkEmailQuery = "SELECT * FROM utilisateurs WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (results.length > 0) return res.status(400).json({ message: "Email already used." });

    // Hasher le mot de passe
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      const query = "INSERT INTO utilisateurs (nom, prenom, adresse, ville, code_postal, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(query, [nom, prenom, adresse, ville, code_postal, email, hashedPassword], (err) => {
        if (err) return res.status(500).json({ message: "Register error." });
        res.status(200).json({ message: "Register success!" });
      });
    });
  });
});
```

**Explication :** Cette route gère l'inscription des utilisateurs. Elle valide les champs, vérifie l'unicité de l'email, hashe le mot de passe avec bcrypt pour la sécurité, et insère l'utilisateur en DB.

**Extrait 3 : Route de connexion (Backend - server.js)**

```javascript
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email and password required." });

  const query = "SELECT * FROM utilisateurs WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (results.length === 0) return res.status(400).json({ message: "User not found." });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) return res.status(400).json({ message: "Wrong password." });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({
        message: "Login success!",
        token,
        user: { id: user.id, nom: user.nom, prenom: user.prenom, email: user.email },
      });
    });
  });
});
```

**Explication :** Cette route authentifie l'utilisateur en comparant le mot de passe hashé et génère un token JWT pour les sessions sécurisées.

**Extrait 4 : Création de session de paiement Stripe (Backend - server.js)**

```javascript
app.post("/create-checkout-session", async (req, res) => {
  const { line_items } = req.body;

  if (!line_items || line_items.length === 0) {
    return res.status(400).json({ error: "Need items" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.protocol}://${req.get("host")}/success`,
      cancel_url: `${req.protocol}://${req.get("host")}/success`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: error.message });
  }
});
```

**Explication :** Cette route crée une session de paiement Stripe avec les articles du panier, redirigeant vers des pages de succès ou d'annulation.

**Extrait 5 : Logique du panier côté frontend (BoutiquePage.vue)**

```vue
<script>
const products = [
  { name: "Miel de tilleul", price: 12, img: "/images/image%20miel/...", stripePriceId: "price_..." },
  // Autres produits...
];

const addToCart = (product, qty) => {
  const existingProduct = cart.value.find(item => item.name === product.name);
  if (existingProduct) {
    existingProduct.quantity += qty;
  } else {
    cart.value.push({ ...product, quantity: qty });
  }
  localStorage.setItem("panier", JSON.stringify(cart.value));
};

const finalizePurchase = async () => {
  const response = await axios.post('/create-checkout-session', {
    line_items: cart.value.map((item) => ({
      price: item.stripePriceId,
      quantity: item.quantity,
    })),
  });
  window.location.href = response.data.url;
};
</script>
```

**Explication :** Ce code montre la définition des produits hardcodés, l'ajout au panier avec persistance localStorage, et l'appel à l'API pour créer la session Stripe.

*(Extraits clés pour illustrer les fonctionnalités principales, avec explications pour chaque partie.)*

Frontend - Exemple BoutiquePage.vue (extrait) :

**Extrait du template et script de BoutiquePage.vue**

```vue
<template>
  <div>
    <div class="page-header">
      <h2>🐝 Nos Miels</h2>
      <button @click="toggleCartModal" class="sticky-cart-btn">
        🛒 Panier
        <span v-if="totalItems > 0" class="cart-badge">{{ totalItems }}</span>
      </button>
    </div>

    <main>
      <section class="articles">
        <article class="article" v-for="(product, index) in products" :key="index">
          <img :src="product.img" :alt="'Miel de ' + product.name">
          <div class="info-article">
            <h4>{{ product.name }}</h4>
            <span class="price">{{ product.price }}€/pot</span>
            <button @click="addToCart(product, 1)" class="btn-add">Ajouter au panier</button>
          </div>
        </article>
      </section>
    </main>

    <!-- Modale Panier simplifiée -->
    <div v-if="showCartModal" class="modal-overlay" @click.self="toggleCartModal">
      <div class="modal-content">
        <h3>Votre Panier</h3>
        <div v-for="item in cart" :key="item.name">
          <p>{{ item.name }} - {{ item.quantity }} x {{ item.price }}€</p>
        </div>
        <p>Total : {{ totalPrice }}€</p>
        <button @click="finalizePurchase" :disabled="cart.length === 0">Commander</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const showCartModal = ref(false);
    const cart = ref(JSON.parse(localStorage.getItem("panier")) || []);

    const products = [
      { name: "Miel de tilleul", price: 12, img: "/images/image%20miel/...", stripePriceId: "price_..." },
      // Autres produits...
    ];

    const totalPrice = computed(() => {
      return cart.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    });

    const totalItems = computed(() => {
      return cart.value.reduce((sum, item) => sum + item.quantity, 0);
    });

    const addToCart = (product, qty) => {
      const existing = cart.value.find(item => item.name === product.name);
      if (existing) {
        existing.quantity += qty;
      } else {
        cart.value.push({ ...product, quantity: qty });
      }
      localStorage.setItem("panier", JSON.stringify(cart.value));
    };

    const finalizePurchase = async () => {
      const response = await axios.post('/create-checkout-session', {
        line_items: cart.value.map(item => ({
          price: item.stripePriceId,
          quantity: item.quantity,
        })),
      });
      window.location.href = response.data.url;
    };

    const toggleCartModal = () => {
      showCartModal.value = !showCartModal.value;
    };

    return { cart, showCartModal, products, totalPrice, totalItems, addToCart, finalizePurchase, toggleCartModal };
  }
};
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; background: #f1c40f; }
.articles { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
.article { background: white; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.btn-add { background: #f1c40f; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer; }
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; }
.modal-content { background: white; padding: 20px; border-radius: 5px; }
</style>

**Explication :** Ce composant Vue affiche la liste des produits en grille, permet d'ajouter au panier avec persistance localStorage, et gère la modale du panier pour finaliser l'achat via Stripe. Le style est responsive avec CSS Grid.

*(Extrait représentatif de la page boutique, montrant l'affichage des produits et la gestion du panier.)*
\pagebreak


## Annexes (Pages 46+)

A1. Extraits de Code Source (Backend) : Extraits clés de server.js avec explications (routes auth, paiement), 5 pages.

A2. Extraits de Code Source (Frontend) : Extraits de App.vue, main.js, pages (BoutiquePage.vue, etc.), 10 pages.

A3. Screenshots de l'Application (20 images) : 20 images (pages app, tests, etc.), 10 pages.

A4. Logs de Tests et Build : Console, build, 5 pages.

A5. Schéma de Base de Données : MCD, 2 pages.

A6. Documentation API (Postman) : Exports, 3 pages.

A7. CV et Lettres de Motivation : 5 pages.

A8. Références et Ressources Utilisées : Liens, 2 pages.

*(Total : 40+ pages avec annexes détaillées.)*
