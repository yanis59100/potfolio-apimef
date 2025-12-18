<template>
  <div>
    <div class="page-header">
      <div class="header-content">
        <h2>🍯 Notre Boutique de Miel</h2>
        <p>Sélection premium de miels biologiques français, récoltés avec passion</p>
      </div>
      <button @click="toggleCartModal" class="sticky-cart-btn">
        🛒 Panier
        <span v-if="totalItems > 0" class="cart-badge">{{ totalItems }}</span>
      </button>
    </div>

    <main>
      <section class="intro">
        <h3>✨ Nos Gammes Exceptionnelles</h3>
        <p>Quatre variétés premium de miel biologique 100% français. Chaque récolte raconte l'histoire de nos abeilles et de nos ruches.</p>
      </section>

      <h3>🐝 Nos Miels</h3>

      <section class="articles">
        <article class="article" v-for="(product, index) in products" :key="index">
          <img :src="product.img" :alt="'Miel de ' + product.name">
          <div class="info-article">
            <h4>{{ product.name }}</h4>
            <span class="price">{{ product.price }}€/pot</span>
            <p class="description">Miel pur et authentique, saveur naturelle remarquable.</p>
            <div class="quantity-control">
              <label>Quantité:</label>
              <input type="number" v-model.number="quantity[index]" min="0" max="50" />
            </div>
            <button @click="addToCart(product, quantity[index])" class="btn-add" :disabled="quantity[index] < 1">
              📦 Ajouter ({{ quantity[index] }})
            </button>
          </div>
        </article>
      </section>
    </main>

    <!-- MODALE PANIER -->
    <div v-if="showCartModal" class="modal-overlay" @click.self="toggleCartModal">
      <div class="modal-content">
        <h2>Mon Panier</h2>
        <ul>
          <li v-for="item in cart" :key="item.name" class="cart-item">
            <div class="cart-item-left">
              <strong>{{ item.name }}</strong>
              <div class="cart-item-controls">
                <button @click="decreaseQty(item)">−</button>
                <span class="cart-qty">{{ item.quantity }}</span>
                <button @click="increaseQty(item)">+</button>
                <button @click="removeItem(item)" class="remove-item">Supprimer</button>
              </div>
            </div>
            <div class="cart-item-right">
              {{ (item.price * item.quantity).toFixed(2) }}€
            </div>
          </li>
        </ul>
        <p>Total: {{ totalPrice }}€</p>
        <button @click="finalizePurchase">Payer</button>
        <button @click="toggleCartModal" class="close-button">Fermer</button>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import AppFooter from '../components/AppFooter.vue';
import axios from "axios";
import { API_BASE } from "../config";
import { useRouter } from 'vue-router';

export default {
  name: "BoutiquePage",
  components: {
    AppFooter
  },
  setup() {
    const router = useRouter();
    const showCartModal = ref(false);
    const quantity = reactive({});
    // Load cart from localStorage and sanitize (remove invalid items)
    const rawCart = JSON.parse(localStorage.getItem("panier")) || [];
    const cart = ref((rawCart || []).filter(item => item && item.quantity && item.quantity > 0));
    
    const products = [
      { name: "Miel de tilleul", price: 12, img: "/images/image%20miel/IMG-20241116-WA0002.jpg", stripePriceId: "price_1Qw0ZjB4WwtW5CxY3r3i45g0" },
      { name: "Miel de printemps", price: 10, img: "/images/image%20miel/IMG-20241116-WA0004.jpg", stripePriceId: "price_1Qw0a4B4WwtW5CxYeyQGwpPi" },
      { name: "Miel d'été", price: 10, img: "/images/image%20miel/IMG-20241116-WA0003.jpg", stripePriceId: "price_1Qw0aMB4WwtW5CxYUnPeKneY" },
      { name: "Miel de colza", price: 10, img: "/images/image%20miel/IMG-20241116-WA0001.jpg", stripePriceId: "price_1Qw0agB4WwtW5CxY6uIgogkw" }
    ];

    // Init quantities
    products.forEach((_, index) => {
      quantity[index] = 0;
    });

    const totalPrice = computed(() => {
      return cart.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    });

    const totalItems = computed(() => {
      return cart.value.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    });

    const addToCart = (product, qty) => {
      const amount = Number(qty) && qty > 0 ? Number(qty) : 1;
      const existingProduct = cart.value.find(item => item.name === product.name);
      if (existingProduct) {
        existingProduct.quantity += amount;
      } else {
        cart.value.push({ ...product, quantity: amount });
      }
      localStorage.setItem("panier", JSON.stringify(cart.value));
    };

    const increaseQty = (item) => {
      const idx = cart.value.findIndex(i => i.name === item.name);
      if (idx === -1) return;
      cart.value[idx].quantity = Number(cart.value[idx].quantity || 0) + 1;
      localStorage.setItem("panier", JSON.stringify(cart.value));
    };

    const decreaseQty = (item) => {
      const idx = cart.value.findIndex(i => i.name === item.name);
      if (idx === -1) return;
      const newQty = Number(cart.value[idx].quantity || 0) - 1;
      if (newQty > 0) {
        cart.value[idx].quantity = newQty;
      } else {
        cart.value.splice(idx, 1);
      }
      localStorage.setItem("panier", JSON.stringify(cart.value));
    };

    const removeItem = (item) => {
      const idx = cart.value.findIndex(i => i.name === item.name);
      if (idx === -1) return;
      cart.value.splice(idx, 1);
      localStorage.setItem("panier", JSON.stringify(cart.value));
    };

    const finalizePurchase = async () => {
      if (cart.value.length === 0) {
        alert("Votre panier est vide.");
        return;
      }

      // Check if user is authenticated
      const token = localStorage.getItem('token');
      const utilisateur = localStorage.getItem('utilisateur');
      
      if (!token || !utilisateur) {
        // Store a message to display on connexion page
        localStorage.setItem('loginMessage', 'Vous devez être connecté pour procéder au paiement.');
        router.push('/connexion');
        showCartModal.value = false;
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.post(
          `${API_BASE}/create-checkout-session`,
          {
            line_items: cart.value.map((item) => ({
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
    };

    const toggleCartModal = () => {
      showCartModal.value = !showCartModal.value;
    };

    return {
      cart,
      quantity,
      showCartModal,
      products,
      totalPrice,
      totalItems,
      addToCart,
      increaseQty,
      decreaseQty,
      removeItem,
      finalizePurchase,
      toggleCartModal
    };
  }
};
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg) var(--spacing-xl);
  gap: var(--spacing-md);
  background: linear-gradient(135deg, var(--color-wax) 0%, rgba(255,250,235,0.6) 100%);
  border-bottom: 1px solid rgba(0,0,0,0.04);
}

.header-content h2 {
  margin: 0;
  font-size: var(--font-size-2xl);
  color: var(--color-honey-dark);
}

.header-content p {
  margin: 0;
  color: var(--color-dark-gray);
  font-size: var(--font-size-sm);
}

.sticky-cart-btn {
  position: relative;
  background: linear-gradient(135deg, var(--color-honey-dark) 0%, var(--color-honey-medium) 100%);
  color: var(--color-white);
  padding: calc(var(--spacing-base) - 2px) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  box-shadow: var(--shadow-md);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.cart-badge {
  background: var(--color-bee);
  color: var(--color-white);
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 0.8rem;
  font-weight: var(--font-weight-bold);
  margin-left: 6px;
}

.page-controls {
  display: flex;
  justify-content: flex-end;
  padding: var(--spacing-lg) var(--spacing-xl);
  background: linear-gradient(135deg, var(--color-light-gray) 0%, var(--color-wax) 100%);
  border-bottom: 2px solid var(--color-honey-light);
}

.cart-button {
  background: linear-gradient(135deg, var(--color-honey-dark) 0%, var(--color-honey-medium) 100%);
  color: var(--color-white);
  padding: var(--spacing-base) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-base);
  font-size: var(--font-size-lg);
  box-shadow: var(--shadow-md);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cart-button:hover {
  background: linear-gradient(135deg, var(--color-honey-medium) 0%, var(--color-honey-light) 100%);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
}

.intro {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  animation: fadeInUp 0.6s ease-out;
}

.intro h4 {
  font-size: var(--font-size-2xl);
  color: var(--color-honey-dark);
  margin-bottom: var(--spacing-lg);
  font-family: var(--font-secondary);
}

.intro p {
  font-size: var(--font-size-lg);
  color: var(--color-dark-gray);
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
}

.recherche {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-3xl);
  animation: slideInDown 0.8s ease-out;
}

.recherche form {
  display: flex;
  gap: var(--spacing-lg);
  width: 100%;
  max-width: 600px;
}

.recherche input {
  flex: 1;
  padding: var(--spacing-base) var(--spacing-lg);
  border: 2px solid var(--color-medium-gray);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-family: var(--font-primary);
  transition: all var(--transition-base);
}

.recherche input:focus {
  outline: none;
  border-color: var(--color-honey-dark);
  box-shadow: 0 0 0 3px rgba(139, 105, 20, 0.1);
  background: var(--color-wax);
}

.recherche input::placeholder {
  color: var(--color-medium-gray);
}

.recherche button {
  padding: var(--spacing-base) var(--spacing-2xl);
  background: linear-gradient(135deg, var(--color-forest) 0%, var(--color-bee) 100%);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-base);
  text-transform: uppercase;
  font-size: var(--font-size-sm);
  letter-spacing: 0.5px;
  box-shadow: var(--shadow-md);
}

.recherche button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

main > h3 {
  font-size: var(--font-size-3xl);
  color: var(--color-honey-dark);
  margin-bottom: var(--spacing-2xl);
  text-align: center;
  font-family: var(--font-secondary);
}

.articles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--spacing-2xl);
}

.article {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-base);
  transition: all var(--transition-base);
  border: 1px solid var(--color-medium-gray);
  display: flex;
  flex-direction: column;
}

.article:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-honey);
  border-color: var(--color-honey-light);
}

.article img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform var(--transition-base);
}

.article:hover img {
  transform: scale(1.05);
}

.info-article {
  padding: var(--spacing-lg);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.info-article span {
  font-weight: var(--font-weight-bold);
  color: var(--color-honey-dark);
  display: block;
  margin-bottom: var(--spacing-base);
  font-size: var(--font-size-lg);
  font-family: var(--font-secondary);
}

.info-article p {
  font-size: var(--font-size-sm);
  color: var(--color-dark-gray);
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
  flex-grow: 1;
}

.info-article label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-sm);
  color: var(--color-bee);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-article input[type="number"] {
  width: 100%;
  padding: var(--spacing-base);
  border: 2px solid var(--color-medium-gray);
  border-radius: var(--radius-base);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-base);
  transition: all var(--transition-base);
}

.info-article input[type="number"]:focus {
  outline: none;
  border-color: var(--color-honey-dark);
  box-shadow: 0 0 0 3px rgba(139, 105, 20, 0.1);
}

.info-article button {
  width: 100%;
  padding: var(--spacing-base) var(--spacing-lg);
  background: linear-gradient(135deg, var(--color-honey-dark) 0%, var(--color-honey-medium) 100%);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-base);
  cursor: pointer;
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-base);
  text-transform: uppercase;
  font-size: var(--font-size-sm);
  box-shadow: var(--shadow-md);
}

.info-article button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  animation: fadeInUp 0.3s ease-out;
}

.modal-content {
  background: var(--color-white);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
  border-top: 4px solid var(--color-honey-dark);
}

.modal-content h2 {
  color: var(--color-honey-dark);
  margin-bottom: var(--spacing-2xl);
  font-size: var(--font-size-2xl);
  font-family: var(--font-secondary);
}

.modal-content ul {
  list-style: none;
  padding: 0;
  margin-bottom: var(--spacing-2xl);
}

.modal-content li {
  padding: var(--spacing-base) 0;
  border-bottom: 1px solid var(--color-medium-gray);
  font-size: var(--font-size-base);
  color: var(--color-dark-gray);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-content li:last-child {
  border-bottom: none;
}

.cart-item {
  padding: var(--spacing-lg) 0 !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-lg);
}

.cart-item-left {
  flex: 1;
}

.cart-item-left strong {
  display: block;
  color: var(--color-bee);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
}

.cart-item-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}

.cart-item-controls button {
  width: auto;
  padding: 4px 10px;
  border: 1px solid var(--color-honey-light);
  background: var(--color-white);
  color: var(--color-honey-dark);
  cursor: pointer;
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-bold);
  transition: all var(--transition-base);
  font-size: var(--font-size-base);
}

.cart-item-controls button:hover {
  background: var(--color-honey-light);
  color: var(--color-white);
  transform: scale(1.1);
}

.cart-qty {
  min-width: 30px;
  text-align: center;
  display: inline-block;
  font-weight: var(--font-weight-bold);
  color: var(--color-bee);
}

.remove-item {
  padding: 4px 12px !important;
  background: rgba(231, 76, 60, 0.1) !important;
  color: var(--color-danger) !important;
  border-color: var(--color-danger) !important;
}

.remove-item:hover {
  background: var(--color-danger) !important;
  color: var(--color-white) !important;
}

.cart-item-right {
  font-weight: var(--font-weight-bold);
  color: var(--color-honey-dark);
  min-width: 80px;
  text-align: right;
  font-family: var(--font-secondary);
  font-size: var(--font-size-lg);
}

.modal-content p {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-honey-dark);
  margin-bottom: var(--spacing-2xl);
  text-align: right;
  font-family: var(--font-secondary);
}

.modal-content button {
  padding: var(--spacing-base) var(--spacing-lg);
  margin-right: var(--spacing-lg);
  border: none;
  border-radius: var(--radius-base);
  cursor: pointer;
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-base);
  text-transform: uppercase;
  font-size: var(--font-size-sm);
}

.modal-content button:first-of-type {
  background: linear-gradient(135deg, var(--color-honey-dark) 0%, var(--color-honey-medium) 100%);
  color: var(--color-white);
  box-shadow: var(--shadow-md);
}

.modal-content button:first-of-type:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.close-button {
  background-color: var(--color-medium-gray);
  color: var(--color-bee);
  margin-right: 0;
}

.close-button:hover {
  background-color: var(--color-dark-gray);
  color: var(--color-white);
}

@media (max-width: 768px) {
  main {
    padding: var(--spacing-2xl) var(--spacing-base);
  }

  .articles {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--spacing-lg);
  }

  .recherche form {
    flex-direction: column;
    gap: var(--spacing-base);
  }

  .modal-content {
    width: 95%;
    padding: var(--spacing-lg);
  }

  .modal-content h2 {
    font-size: var(--font-size-xl);
  }

  .modal-content p {
    font-size: var(--font-size-xl);
  }

  .modal-content button {
    width: 100%;
    margin-right: 0;
    margin-bottom: var(--spacing-base);
  }
}
</style>
