<template>
  <div>
    <!-- Navbar moved to global component -->

    <main id="profil-container">
      <h1>Mon Profil</h1>
      <div id="profil-details"></div>

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
        <button type="submit" class="btn">Sauvegarder les modifications</button>
      </form>

      <a @click.prevent="logout" class="btn">Déconnexion</a>
    </main>

    <footer>
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
        email: '',
        adresse: '',
        ville: '',
        code_postal: ''
      }
    };
  },
  methods: {
    saveChanges() {
      // Sauvegarder les modifications
    },
    logout() {
      localStorage.removeItem('utilisateur');
      localStorage.removeItem('token');
      alert('Vous êtes déconnecté.');
      this.$router.push('/');
    }
  },
  created() {
    const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
    if (utilisateur) {
      this.user = utilisateur;
      this.form.nom = utilisateur.nom || '';
      this.form.prenom = utilisateur.prenom || '';
      this.form.email = utilisateur.email || '';
      this.form.adresse = utilisateur.adresse || '';
      this.form.ville = utilisateur.ville || '';
      this.form.code_postal = utilisateur.code_postal || '';
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
  --text-color: #333;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: var(--background-color);
  margin: 0;
  padding: 0;
  color: var(--text-color);
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

#profil-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: var(--primary-color);
}

h2 {
  color: var(--secondary-color);
}

#profil-details {
  margin: 20px 0;
  padding: 15px;
  background-color: var(--background-color);
  border-radius: 8px;
  font-size: 18px;
  line-height: 1.5;
}

.form-group {
  margin: 15px 0;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--text-color);
}

input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus {
  border-color: var(--primary-color);
  outline: none;
}

#modification-form {
  background-color: var(--background-color);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--accent-color);
  color: white;
  font-size: 18px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: var(--primary-color);
}

footer {
  background-color: var(--secondary-color);
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 50px;
  position: relative;
  width: 100%;
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
}

footer ul li {
  display: inline-block;
  margin: 0 10px;
}

footer ul a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

footer ul a:hover {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  nav ul {
    flex-direction: column;
    gap: 10px;
  }

  #profil-container {
    width: 90%;
  }
}
</style>
