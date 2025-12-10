<template>
  <div>
    <main id="profil-container">
      <h1>Mon Profil</h1>
      
      <div class="message-container" v-if="message" :class="message.type">
        {{ message.text }}
      </div>

      <div id="profil-details" v-if="user" class="profil-info">
        <p v-if="formattedCreatedDate"><strong>Utilisateur créé le:</strong> {{ formattedCreatedDate }}</p>
      </div>

      <h2>Modifier mes informations</h2>
      <form @submit.prevent="saveChanges">
        <div class="form-group">
          <label for="nom">Nom :</label>
          <input type="text" v-model="form.nom" id="nom" name="nom" required />
        </div>
        <div class="form-group">
          <label for="prenom">Prénom :</label>
          <input type="text" v-model="form.prenom" id="prenom" name="prenom" required />
        </div>
        <div class="form-group">
          <label for="email">Email :</label>
          <input type="email" v-model="form.email" id="email" name="email" required />
        </div>
        <div class="form-group">
          <label for="adresse">Adresse :</label>
          <input type="text" v-model="form.adresse" id="adresse" name="adresse" required />
        </div>
        <div class="form-group">
          <label for="ville">Ville :</label>
          <input type="text" v-model="form.ville" id="ville" name="ville" required />
        </div>
        <div class="form-group">
          <label for="code_postal">Code Postal :</label>
          <input type="text" v-model="form.code_postal" id="code_postal" name="code_postal" required />
        </div>
        <button type="submit" class="btn" :disabled="isLoading">
          {{ isLoading ? "Sauvegarde en cours..." : "Sauvegarder les modifications" }}
        </button>
      </form>

      <button @click="logout" class="btn btn-logout">Déconnexion</button>
    </main>

    <AppFooter />
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import AppFooter from '../components/AppFooter.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { API_BASE } from '../config';

export default {
  name: 'ProfilPage',
  components: {
    AppFooter
  },
  setup() {
    const router = useRouter();
    const message = ref(null);
    const isLoading = ref(false);
    const user = ref(null);
    
    const form = reactive({
      nom: '',
      prenom: '',
      email: '',
      adresse: '',
      ville: '',
      code_postal: ''
    });

    /**
     * Format created_at date safely
     */
    const formattedCreatedDate = ref('');

    const formatCreatedDate = () => {
      if (!user.value || !user.value.created_at) {
        formattedCreatedDate.value = '';
        return;
      }

      try {
        const date = new Date(user.value.created_at);
        // Check if date is valid
        if (isNaN(date.getTime())) {
          formattedCreatedDate.value = '';
          return;
        }
        formattedCreatedDate.value = date.toLocaleDateString('fr-FR');
      } catch (e) {
        formattedCreatedDate.value = '';
      }
    };

    /**
     * Display a message to the user
     * @param {string} text - Message text
     * @param {string} type - Message type ('success', 'error', 'warning')
     * @param {number} duration - Duration in milliseconds before auto-hide
     */
    const showMessage = (text, type = 'success', duration = 3000) => {
      message.value = { text, type };
      if (duration > 0) {
        setTimeout(() => {
          message.value = null;
        }, duration);
      }
    };

    /**
     * Load user profile from localStorage
     */
    const loadUserProfile = () => {
      const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
      if (utilisateur) {
        user.value = utilisateur;
        formatCreatedDate();
        form.nom = utilisateur.nom || '';
        form.prenom = utilisateur.prenom || '';
        form.email = utilisateur.email || '';
        form.adresse = utilisateur.adresse || '';
        form.ville = utilisateur.ville || '';
        form.code_postal = utilisateur.code_postal || '';
      } else {
        // Redirect to connexion if no user
        router.push('/connexion');
      }
    };

    /**
     * Save profile changes to backend
     */
    const saveChanges = async () => {
      // Validate form
      if (!form.nom || !form.prenom || !form.email || !form.adresse || !form.ville || !form.code_postal) {
        showMessage('Veuillez remplir tous les champs.', 'error');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        showMessage('Veuillez entrer une adresse email valide.', 'error');
        return;
      }

      isLoading.value = true;

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          showMessage('Session expirée. Veuillez vous reconnecter.', 'error');
          router.push('/connexion');
          return;
        }

        const response = await axios.put(
          `${API_BASE}/profile`,
          {
            nom: form.nom,
            prenom: form.prenom,
            email: form.email,
            adresse: form.adresse,
            ville: form.ville,
            code_postal: form.code_postal
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data && response.data.success) {
          // Update localStorage with new user data
          const updatedUser = {
            ...user.value,
            nom: form.nom,
            prenom: form.prenom,
            email: form.email,
            adresse: form.adresse,
            ville: form.ville,
            code_postal: form.code_postal
          };
          localStorage.setItem('utilisateur', JSON.stringify(updatedUser));
          user.value = updatedUser;
          formatCreatedDate();
          
          showMessage('Profil mis à jour avec succès!', 'success', 3000);
        } else {
          showMessage(response.data.message || 'Erreur lors de la mise à jour du profil.', 'error');
        }
      } catch (error) {
        if (error.response) {
          // Handle 401 Unauthorized
          if (error.response.status === 401) {
            showMessage('Session expirée. Veuillez vous reconnecter.', 'error');
            setTimeout(() => router.push('/connexion'), 1500);
          } else {
            showMessage(error.response.data?.message || 'Erreur serveur lors de la mise à jour.', 'error');
          }
        } else if (error.request) {
          showMessage('Erreur de connexion au serveur.', 'error');
        } else {
          showMessage('Erreur: ' + error.message, 'error');
        }
      } finally {
        isLoading.value = false;
      }
    };

    /**
     * Logout user and clear session
     */
    const logout = () => {
      localStorage.removeItem('utilisateur');
      localStorage.removeItem('token');
      localStorage.removeItem('panier');
      // Emit custom event so navbar updates immediately
      window.dispatchEvent(new Event('user:logout'));
      showMessage('Vous êtes déconnecté.', 'success', 1500);
      setTimeout(() => router.push('/'), 1500);
    };

    // Load profile on component mount
    loadUserProfile();

    return {
      user,
      form,
      message,
      isLoading,
      formattedCreatedDate,
      saveChanges,
      logout
    };
  }
};
</script>

<style scoped>
main {
  max-width: 600px;
  margin: var(--spacing-3xl) auto;
  padding: var(--spacing-3xl);
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  border-top: 4px solid var(--color-honey-dark);
  animation: fadeInUp 0.8s ease-out;
}

h1 {
  text-align: center;
  color: var(--color-honey-dark);
  margin-bottom: var(--spacing-2xl);
  font-size: var(--font-size-3xl);
  font-family: var(--font-secondary);
}

h2 {
  color: var(--color-honey-dark);
  margin-top: var(--spacing-2xl);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-xl);
  border-bottom: 2px solid var(--color-honey-light);
  padding-bottom: var(--spacing-base);
  font-family: var(--font-secondary);
}

.message-container {
  padding: var(--spacing-lg);
  border-radius: var(--radius-base);
  margin-bottom: var(--spacing-lg);
  font-weight: var(--font-weight-semibold);
  animation: slideInDown 0.3s ease-in-out;
}

.message-container.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message-container.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.profil-info {
  background: var(--color-pollen);
  padding: var(--spacing-lg);
  border-radius: var(--radius-base);
  margin-bottom: var(--spacing-lg);
  border-left: 4px solid var(--color-honey-dark);
}

.profil-info p {
  margin: var(--spacing-sm) 0;
  color: var(--color-bee);
}

.form-group {
  margin-bottom: var(--spacing-lg);
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: var(--font-weight-semibold);
  color: var(--color-bee);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input {
  padding: var(--spacing-base) var(--spacing-lg);
  border: 2px solid var(--color-medium-gray);
  border-radius: var(--radius-base);
  font-size: var(--font-size-base);
  font-family: var(--font-primary);
  transition: all var(--transition-base);
  background: var(--color-white);
  color: var(--color-black);
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-honey-dark);
  box-shadow: 0 0 0 3px rgba(139, 105, 20, 0.1);
  background: var(--color-wax);
}

.btn {
  padding: var(--spacing-base) var(--spacing-lg);
  margin-top: var(--spacing-base);
  background: linear-gradient(135deg, var(--color-honey-dark) 0%, var(--color-honey-medium) 100%);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  transition: all var(--transition-base);
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: var(--shadow-md);
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-logout {
  background: linear-gradient(135deg, var(--color-danger) 0%, #c0392b 100%);
  margin-top: var(--spacing-2xl);
}

.btn-logout:hover {
  box-shadow: var(--shadow-lg);
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  main {
    margin: var(--spacing-lg);
    padding: var(--spacing-2xl);
  }

  h1 {
    font-size: var(--font-size-2xl);
  }
}

@media (max-width: 480px) {
  main {
    margin: var(--spacing-base);
    padding: var(--spacing-lg);
  }

  h1 {
    font-size: var(--font-size-xl);
  }

  .btn {
    padding: var(--spacing-sm) var(--spacing-base);
    font-size: var(--font-size-sm);
  }
}
</style>
