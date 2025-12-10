<template>
  <div id="app">
    <!-- Navbar moved to global component -->
    <div class="page-controls">
      <button @click="toggleCartModal" class="cart-button">Panier ({{ cart.length }})</button>
    </div>

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
    </main>

    <!-- MODALE PANIER -->
    <div v-if="showCartModal" class="modal-overlay" @click.self="toggleCartModal">
      <div class="modal-content">
        <h2>Mon Panier</h2>
        <ul>
          <li v-for="item in cart" :key="item.name">
            {{ item.quantity }} x {{ item.name }} - {{ (item.price * item.quantity).toFixed(2) }}€
          </li>
        </ul>
        <p>Total: {{ totalPrice }}€</p>
        <button @click="finalizePurchase">Payer</button>
        <button @click="toggleCartModal" class="close-button">Fermer</button>
      </div>
    </div>

    <footer>
      <p>Vous avez une question ? <a href="mailto:8845@holbertonstudents.com">Contactez-nous</a></p>
      <p>&copy; 2024 Apimef. Tous droits réservés.</p>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE } from "../config";

export default {
  name: "App",
  data() {
    return {
      searchQuery: "",
      cart: JSON.parse(localStorage.getItem("panier")) || [],
      quantity: [],
      showCartModal: false,
      products: [
        { name: "Miel de tilleul", price: 12, img: "/images/image%20miel/IMG-20241116-WA0002.jpg", stripePriceId: "price_1Qw0ZjB4WwtW5CxY3r3i45g0" },
        { name: "Miel de printemps", price: 10, img: "/images/image%20miel/IMG-20241116-WA0004.jpg", stripePriceId: "price_1Qw0a4B4WwtW5CxYeyQGwpPi" },
        { name: "Miel d'été", price: 10, img: "/images/image%20miel/IMG-20241116-WA0003.jpg", stripePriceId: "price_1Qw0aMB4WwtW5CxYUnPeKneY" },
        { name: "Miel de colza", price: 10, img: "/images/image%20miel/IMG-20241116-WA0001.jpg", stripePriceId: "price_1Qw0agB4WwtW5CxY6uIgogkw" }
      ]
    };
  },
  created() {
    // Initialise les quantités à 1 pour chaque produit si non défini
    if (!this.quantity || this.quantity.length !== this.products.length) {
      this.quantity = this.products.map(() => 1);
    }
  },
  computed: {
    filteredProducts() {
      if (!this.searchQuery) return this.products;
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

      localStorage.setItem("panier", JSON.stringify(this.cart));
    },

    async finalizePurchase() {
      if (this.cart.length === 0) {
        alert("Votre panier est vide.");
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.post(
          `${API_BASE}/create-checkout-session`,
          {
            line_items: this.cart.map((item) => ({
              price: item.stripePriceId,
              quantity: item.quantity,
            })),
          },
          { headers }
        );

        if (response.data && response.data.url) {
          window.location.href = response.data.url;
        } else {
          alert('Aucune URL de session retournée.');
        }
      } catch (err) {
        alert("Impossible de procéder au paiement.");
      }
    },

    searchProduct() {
      // Recherche déjà effectuée via computed
    },
    toggleCartModal() {
      this.showCartModal = !this.showCartModal;
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
}
.close-button {
  margin-top: 10px;
  background: #ccc;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
.cart-button {
  background: #ffcc00;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
