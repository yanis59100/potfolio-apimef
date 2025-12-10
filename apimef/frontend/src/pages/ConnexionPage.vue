<template>
  <div>
    <!-- Navbar moved to global component -->

    <main>
      <section class="container">
        <h1>Connexion à votre compte Apimef</h1>

        <div v-if="errorMessage" id="errorMessage" style="color: red;">
          <p>{{ errorMessage }}</p>
        </div>

        <form @submit.prevent="connecterUtilisateur">
          <div>
            <label for="email">Email :</label>
            <input type="email" v-model="email" placeholder="Votre email" required />
          </div>
          <div>
            <label for="password">Mot de passe :</label>
            <input type="password" v-model="password" placeholder="Votre mot de passe" required />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import AppFooter from '../components/AppFooter.vue';
import { API_BASE } from "../config";

export default {
  name: "ConnexionPage",
  components: {
    AppFooter
  },
  setup() {
    // Déclaration des variables réactives
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const userInfo = reactive({
      name: "",
      isAuthenticated: false
    });

    // Fonction pour se connecter
    const connecterUtilisateur = async () => {
      errorMessage.value = ""; // Réinitialiser le message d'erreur

      if (!email.value || !password.value) {
        errorMessage.value = "Veuillez remplir tous les champs.";
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.value, password: password.value })
        });

        if (!response.ok) {
          const error = await response.json();
          errorMessage.value = error.message || "Erreur lors de la connexion.";
          return;
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("utilisateur", JSON.stringify(data.utilisateur));

        userInfo.name = data.utilisateur.nom;
        userInfo.isAuthenticated = true;

        setTimeout(() => {
          window.location.href = "/profil";
        }, 2000);
      } catch (error) {
        errorMessage.value = "Une erreur est survenue. Veuillez réessayer.";
      }
    };

    // Fonction de déconnexion
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("utilisateur");
      userInfo.isAuthenticated = false;
      userInfo.name = "";
    };

    // Vérification de l'utilisateur lors du montage
    onMounted(() => {
      const storedUser = localStorage.getItem("utilisateur");
      if (storedUser) {
        userInfo.isAuthenticated = true;
        userInfo.name = JSON.parse(storedUser).nom;
      }
    });

    return {
      email,
      password,
      errorMessage,
      userInfo,
      connecterUtilisateur,
      logout
    };
  }
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-light-gray) 0%, var(--color-wax) 100%);
  padding: var(--spacing-2xl);
}

.container {
  background: var(--color-white);
  padding: var(--spacing-3xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-width: 450px;
  text-align: center;
  animation: fadeInUp 0.8s ease-out;
  border-top: 4px solid var(--color-honey-dark);
}

h1 {
  font-size: var(--font-size-2xl);
  color: var(--color-honey-dark);
  margin-bottom: var(--spacing-2xl);
  font-family: var(--font-secondary);
}

form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

form div {
  text-align: left;
}

form label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-bee);
  margin-bottom: var(--spacing-sm);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

form input {
  width: 100%;
  padding: var(--spacing-base) var(--spacing-lg);
  font-size: var(--font-size-base);
  border: 2px solid var(--color-medium-gray);
  border-radius: var(--radius-base);
  transition: all var(--transition-base);
  background: var(--color-white);
  color: var(--color-black);
  font-family: var(--font-primary);
}

form input:focus {
  outline: none;
  border-color: var(--color-honey-dark);
  box-shadow: 0 0 0 3px rgba(139, 105, 20, 0.1);
  background: var(--color-wax);
}

form input::placeholder {
  color: var(--color-medium-gray);
}

button {
  padding: var(--spacing-base) var(--spacing-lg);
  font-size: var(--font-size-base);
  background: linear-gradient(135deg, var(--color-honey-dark) 0%, var(--color-honey-medium) 100%);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: var(--shadow-md);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

#errorMessage {
  margin-top: var(--spacing-lg);
  color: var(--color-danger);
  font-size: var(--font-size-sm);
  animation: slideInDown 0.3s ease-out;
}

@media (max-width: 768px) {
  .container {
    padding: var(--spacing-2xl);
  }

  h1 {
    font-size: var(--font-size-xl);
  }
}

@media (max-width: 480px) {
  main {
    padding: var(--spacing-lg);
  }

  .container {
    padding: var(--spacing-xl);
    border-radius: var(--radius-base);
  }
}
</style>
