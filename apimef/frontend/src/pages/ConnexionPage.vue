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

    <footer>
      <p>
        Vous avez une question ?
        <a href="mailto:8845@holbertonstudents.com">Contactez-nous</a>
      </p>
      <p>&copy; 2024 Apimef. Tous droits réservés.</p>
      <p>Suivez-nous sur :</p>
      <ul>
        <li><a href="https://facebook.com/Apimef" target="_blank">Facebook</a></li>
        <li><a href="https://instagram.com/Apimef" target="_blank">Instagram</a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { API_BASE } from "../config";

export default {
  name: "ConnexionPage",

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
:root {
  --primary-color: #f1c40f;
  --secondary-color: #2c3e50;
  --accent-color: #e67e22;
  --background-color: #ecf0f1;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: var(--background-color);
  margin: 0;
  padding: 0;
  color: #ffffff;
}

nav {
  background-color: var(--secondary-color);
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

nav ul {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  margin: 0 20px;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background 0.3s ease, transform 0.3s ease;
}

nav a:hover {
  background: var(--primary-color);
  transform: scale(1.1);
}

#user-info {
  display: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
}

#logout-btn {
  background-color: var(--accent-color);
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

#logout-btn:hover {
  background-color: var(--primary-color);
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--background-color);
  padding: 20px;
}

.container {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  animation: fadeInUp 1s ease-out;
}

h1 {
  font-size: 28px;
  color: var(--primary-color);
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

form div {
  text-align: left;
}

form label {
  font-size: 16px;
  font-weight: bold;
  color: var(--secondary-color);
}

form input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid var(--secondary-color);
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

form input:focus {
  border-color: var(--primary-color);
}

button {
  padding: 12px;
  font-size: 16px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--accent-color);
}

#errorMessage {
  margin-top: 20px;
  color: red;
  font-size: 14px;
}

.footer {
  margin-top: 20px;
  font-size: 14px;
  color: var(--secondary-color);
}

.footer a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer a:hover {
  color: var(--accent-color);
}

footer {
  padding: 20px;
  background-color: var(--secondary-color);
  color: white;
  text-align: center;
  animation: fadeIn 2s ease-in-out;
}

footer p, footer a {
  font-size: 16px;
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
  list-style-type: none;
  padding: 0;
}

footer li {
  display: inline;
  margin: 0 10px;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
