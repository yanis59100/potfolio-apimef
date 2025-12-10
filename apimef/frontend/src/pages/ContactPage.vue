<template>
  <div>
    <main>
      <section id="info-entreprise">
        <h2>À propos de Apimef</h2>
        <p>Chez Apimef, nous nous engageons à offrir des produits apicoles de la plus haute qualité. Notre engagement envers la durabilité et la qualité fait de nous un leader dans le secteur de l'apiculture biologique.</p>
      </section>

      <section id="form">
        <h2>Formulaire de contact</h2>
        
        <div class="message-container" v-if="message" :class="message.type">
          {{ message.text }}
        </div>

        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="gender">Genre</label>
            <select v-model="formData.gender" id="gender" required>
              <option value="Homme" selected>Monsieur</option>
              <option value="Femme">Madame</option>
            </select>
          </div>
          <div class="form-group">
            <label for="name">Nom</label>
            <input type="text" v-model="formData.name" id="name" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="formData.email" id="email" required />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea v-model="formData.message" id="message" required></textarea>
          </div>
          <button type="submit" :disabled="isLoading">
            {{ isLoading ? "Envoi en cours..." : "Envoyer" }}
          </button>
        </form>
      </section>

      <section id="contact-info">
        <h3>Informations de contact</h3>
        <ul>
          <li>
            <strong>Téléphone:</strong> <a href="tel:0123456789">01 23 45 67 89</a>
          </li>
          <li>
            <strong>Email:</strong> <a href="mailto:contact@apimef.com">contact@apimef.com</a>
          </li>
          <li>
            <strong>Adresse:</strong> 123 Rue de l'Apiculture, 59000 Lille, France
          </li>
        </ul>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import AppFooter from '../components/AppFooter.vue';
import axios from 'axios';
import { API_BASE } from '../config';

export default {
  name: 'ContactPage',
  components: {
    AppFooter
  },
  setup() {
    const message = ref(null);
    const isLoading = ref(false);
    
    const formData = reactive({
      gender: 'Homme',
      name: '',
      email: '',
      message: ''
    });

    /**
     * Display message to user with auto-hide
     * @param {string} text - Message text
     * @param {string} type - Message type ('success', 'error')
     * @param {number} duration - Auto-hide duration in milliseconds
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
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} - True if valid
     */
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    /**
     * Submit contact form
     */
    const submitForm = async () => {
      // Validate form
      if (!formData.name || !formData.email || !formData.message) {
        showMessage('Veuillez remplir tous les champs.', 'error');
        return;
      }

      if (!validateEmail(formData.email)) {
        showMessage('Veuillez entrer une adresse email valide.', 'error');
        return;
      }

      isLoading.value = true;

      try {
        // Note: This endpoint needs to be implemented in your backend
        const response = await axios.post(
          `${API_BASE}/contact`,
          {
            gender: formData.gender,
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        );

        if (response.data && response.data.success) {
          showMessage('Votre message a été envoyé avec succès!', 'success', 3000);
          // Reset form
          formData.name = '';
          formData.email = '';
          formData.message = '';
          formData.gender = 'Homme';
        } else {
          showMessage(response.data?.message || 'Erreur lors de l\'envoi du message.', 'error');
        }
      } catch (error) {
        if (error.response) {
          showMessage(error.response.data?.message || 'Erreur serveur.', 'error');
        } else if (error.request) {
          showMessage('Erreur de connexion. Veuillez réessayer.', 'error');
        } else {
          showMessage('Erreur: ' + error.message, 'error');
        }
      } finally {
        isLoading.value = false;
      }
    };

    return {
      formData,
      message,
      isLoading,
      submitForm
    };
  }
};
</script>

<style scoped>
:root {
  --primary-color: #f1c40f;
  --secondary-color: #2c3e50;
  --accent-color: #e67e22;
  --background-color: #ecf0f1;
  --success-color: #27ae60;
  --error-color: #e74c3c;
}

main {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
}

section {
  margin-bottom: 40px;
}

h2 {
  color: var(--secondary-color);
  font-size: 28px;
  margin-bottom: 20px;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 10px;
}

h3 {
  color: var(--secondary-color);
  font-size: 22px;
  margin-bottom: 15px;
}

#info-entreprise {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

#info-entreprise p {
  font-size: 16px;
  color: var(--secondary-color);
  line-height: 1.6;
}

#form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.message-container {
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-weight: bold;
  animation: slideIn 0.3s ease-in-out;
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

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  color: var(--secondary-color);
  margin-bottom: 8px;
  font-size: 14px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 5px rgba(241, 196, 15, 0.3);
}

.form-group textarea {
  resize: vertical;
  min-height: 150px;
}

form button {
  padding: 12px 30px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s ease;
}

form button:hover:not(:disabled) {
  background-color: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

#contact-info {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

#contact-info ul {
  list-style: none;
  padding: 0;
}

#contact-info li {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  color: var(--secondary-color);
}

#contact-info li:last-child {
  border-bottom: none;
}

#contact-info a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

#contact-info a:hover {
  color: var(--accent-color);
}

footer {
  padding: 30px 20px;
  background-color: var(--secondary-color);
  color: white;
  text-align: center;
  margin-top: 50px;
}

footer p {
  font-size: 14px;
  margin: 10px 0;
}

footer a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

footer a:hover {
  color: var(--accent-color);
}

footer ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 15px 0;
}

footer li {
  display: inline;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  main {
    margin: 20px;
    padding: 10px;
  }

  h2 {
    font-size: 22px;
  }

  h3 {
    font-size: 18px;
  }

  #form {
    padding: 20px;
  }

  footer ul {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
