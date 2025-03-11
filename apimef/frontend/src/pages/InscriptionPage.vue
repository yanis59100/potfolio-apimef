<template>
  <div>
    <nav aria-label="Navigation principale">
      <ul>
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/boutique">Boutique</router-link></li>
        <li><router-link to="/images">Galerie</router-link></li>
        <li><router-link to="/profil">Profil</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li><router-link to="/inscription">Inscription</router-link></li>
        <li><router-link to="/connexion">Connexion</router-link></li>
        <li v-if="user" id="user-info">
          Bienvenue, <span>{{ user.name }}</span>!
          <button @click="logout" id="logout-btn">Déconnexion</button>
        </li>
      </ul>
    </nav>

    <div class="container">
      <h1>Inscription</h1>
      <p>Créez un compte pour accéder à notre boutique.</p>

      <form @submit.prevent="submitForm">
        <label for="nom">Nom :</label>
        <input type="text" v-model="form.nom" placeholder="Votre nom" required />

        <label for="prenom">Prénom :</label>
        <input type="text" v-model="form.prenom" placeholder="Votre prénom" required />

        <label for="adresse">Adresse :</label>
        <input type="text" v-model="form.adresse" placeholder="Votre adresse" required />

        <label for="ville">Ville :</label>
        <input type="text" v-model="form.ville" placeholder="Votre ville" required />

        <label for="code_postal">Code Postal :</label>
        <input type="text" v-model="form.code_postal" placeholder="Votre code postal" required />

        <label for="email">Email :</label>
        <input type="email" v-model="form.email" placeholder="Votre email" required />

        <label for="password">Mot de passe :</label>
        <input type="password" v-model="form.password" placeholder="Votre mot de passe" required />

        <label for="confirm_password">Confirmer votre mot de passe :</label>
        <input type="password" v-model="form.confirmPassword" placeholder="Confirmer votre mot de passe" required />

        <button type="submit">S'inscrire</button>
      </form>

      <div v-if="message" :class="message.type" id="message-box">
        {{ message.text }}
      </div>
    </div>

    <footer role="contentinfo">
      <p>
        Vous avez une question ? <a href="mailto:8845@holbertonstudents.com">Contactez-nous</a>
      </p>
      <p>&copy; 2024 Apimef. Tous droits réservés.</p>
      <p>Suivez-nous sur :</p>
      <ul>
        <li><a href="https://facebook.com/Apimef" target="_blank" aria-label="Suivre Apimef sur Facebook">Facebook</a></li>
        <li><a href="https://instagram.com/Apimef" target="_blank" aria-label="Suivre Apimef sur Instagram">Instagram</a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      form: {
        nom: '',
        prenom: '',
        adresse: '',
        ville: '',
        code_postal: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      message: null
    };
  },
  methods: {
    async submitForm() {
      if (this.form.password !== this.form.confirmPassword) {
        this.showMessage("Les mots de passe ne correspondent pas.", "error");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.form),
        });

        if (!response.ok) {
          const error = await response.json();
          console.error("Erreur d'inscription :", error);
          this.showMessage(error.message || "Erreur lors de l'inscription.", "error");
          return;
        }

        // Suppression de la variable `data` non utilisée
        console.log("Inscription réussie !");
        this.showMessage("Inscription réussie ! Redirection vers la connexion...", "success");

        setTimeout(() => {
          this.$router.push("/connexion");
        }, 2000);
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        this.showMessage("Une erreur est survenue. Veuillez réessayer.", "error");
      }
    },
    showMessage(message, type) {
      this.message = { text: message, type };
      setTimeout(() => {
        this.message = null;
      }, 5000);
    },
    logout() {
      this.user = null;
      this.$router.push('/connexion');
    }
  },
  created() {
    // Vérifie si l'utilisateur est déjà connecté
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.user = user;
    }
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

.container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 30px;
  animation: slideUp 1s ease-in-out;
}

h1 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 15px;
  color: var(--primary-color);
}

p {
  color: var(--background-color);
  text-align: center;
  font-size: 16px;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

form label {
  font-size: 16px;
  font-weight: bold;
}

form input {
  padding: 10px;
  font-size: 16px;
  border: 2px solid var(--secondary-color);
  border-radius: 4px;
  margin-bottom: 10px;
  transition: border-color 0.3s ease;
}

form input:focus {
  border-color: var(--primary-color);
  outline: none;
}

form button {
  background-color: var(--secondary-color);
  color: white;
  font-size: 18px;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: var(--accent-color);
}

#message-box {
  margin-top: 15px;
  padding: 10px;
  text-align: center;
}

#message-box.success {
  background-color: #d4edda;
  color: #155724;
}

#message-box.error {
  background-color: #f8d7da;
  color: #721c24;
}

footer {
  padding: 20px;
  background-color: var(--secondary-color);
  color: white;
  text-align: center;
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
</style>
