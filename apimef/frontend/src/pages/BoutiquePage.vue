<template>
  <div id="app">
    <nav>
      <ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="/boutique">Boutique</a></li>
        <li><a href="/images">Galerie</a></li>
        <li><a href="/profil">Profil</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/inscription" id="inscription-link">Inscription</a></li>
        <li><a href="/connexion" id="connexion-link">Connexion</a></li>
      </ul>
    </nav>

    <main>
      <section class="intro">
        <h4>Quatre gammes pour une sélection de miels d'exception</h4>
        <p>Découvrez notre sélection de miels biologiques récoltés directement dans nos ruches. Chaque pot contient l'authenticité du savoir-faire apicole d'Apimef.</p>
      </section>

      <section class="recherche">
        <form @submit.prevent="searchProduct">
          <input type="text" v-model="searchQuery" placeholder="Rechercher un produit" />
          <button type="submit">Rechercher</button>
        </form>
      </section>

      <h3>Nos Produits</h3>

      <section class="articles">
        <article class="article" v-for="(product, index) in filteredProducts" :key="index">
          <img :src="product.img" :alt="'Miel de ' + product.name">
          <div class="info-article">
            <span>{{ product.name }} - Prix: {{ product.price }}€</span>
            <p>Le {{ product.name }} est un miel d'exception récolté dans nos ruches.</p>
            <label for="quantity">Quantité :</label>
            <input type="number" v-model.number="quantity[index]" min="1" />
            <button @click="addToCart(product, quantity[index])">Ajouter au panier</button>
          </div>
        </article>
      </section>

      <section class="panier">
        <h2>Panier</h2>
        <ul>
          <li v-for="item in cart" :key="item.name">
            {{ item.quantity }} x {{ item.name }} - {{ (item.price * item.quantity).toFixed(2) }}€
          </li>
        </ul>
        <p>Total: {{ totalPrice }}€</p>
        <button @click="finalizePurchase">Payer</button>
      </section>
    </main>

    <footer>
      <p>Vous avez une question ? <a href="mailto:8845@holbertonstudents.com">Contactez-nous</a></p>
      <p>&copy; 2024 Apimef. Tous droits réservés.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      searchQuery: '',
      cart: JSON.parse(localStorage.getItem('panier')) || [],
      quantity: [],
      products: [
        { name: 'Miel de tilleul', price: 12, img: '/images/image miel/IMG-20241116-WA0002.jpg' },
        { name: 'Miel de printemps', price: 10, img: '/images/image miel/IMG-20241116-WA0004.jpg' },
        { name: 'Miel d\'été', price: 10, img: '/images/image miel/IMG-20241116-WA0003.jpg' },
        { name: 'Miel de colza', price: 10, img: '/images/image miel/IMG-20241116-WA0001.jpg' },
      ]
    }
  },
  computed: {
    filteredProducts() {
      if (!this.searchQuery) {
        return this.products;
      }
      return this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }
  },
  methods: {
    addToCart(product, quantity) {
      if (quantity < 1) return;

      const existingProduct = this.cart.find(item => item.name === product.name);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        this.cart.push({ ...product, quantity });
      }

      // Sauvegarder le panier dans le localStorage
      localStorage.setItem('panier', JSON.stringify(this.cart));
    },
    finalizePurchase() {
      if (this.cart.length === 0) {
        alert("Votre panier est vide.");
        return;
      }
      // Logique pour la finalisation de l'achat
      alert("Achat terminé !");
    },
    searchProduct() {
      // Recherche déjà effectuée via computed property
    }
  }
}
</script>

<style scoped>
@import '../css/boutique.css';
</style>
