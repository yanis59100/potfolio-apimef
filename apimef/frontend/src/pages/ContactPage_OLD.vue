<template>
  <div>
    <!-- Navbar moved to global component -->

    <main>
      <section id="info-entreprise">
        <h2>À propos de Apimef</h2>
        <p>Chez Apimef, nous nous engageons à offrir des produits apicoles de la plus haute qualité...</p>
      </section>

      <section id="form">
        <h2>Formulaire de contact</h2>
        <form @submit.prevent="submitForm">
          <div>
            <label for="gender">Genre</label>
            <select v-model="formData.gender" id="gender" required>
              <option value="Homme" selected>Monsieur</option>
              <option value="Femme">Madame</option>
            </select>
          </div>
          <div>
            <label for="name">Nom</label>
            <input type="text" v-model="formData.name" id="name" required />
          </div>
          <div>
            <label for="email">Email</label>
            <input type="email" v-model="formData.email" id="email" required />
          </div>
          <div>
            <label for="message">Message</label>
            <textarea v-model="formData.message" id="message" required></textarea>
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </section>

      <section id="contact-info">
        <h3>Informations de contact</h3>
        <ul>
          <li>Téléphone: 01 23 45 67 89</li>
          <li>Email: contact@apimef.com</li>
          <li>Adresse: 123 Rue de l'Apiculture, Lille</li>
        </ul>
      </section>
    </main>

    <footer>
      <p>&copy; 2025 Apimef. Tous droits réservés.</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      utilisateur: JSON.parse(localStorage.getItem('utilisateur')) || null,
      formData: {
        gender: 'Homme',
        name: '',
        email: '',
        message: ''
      }
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('utilisateur');
      localStorage.removeItem('token');
      this.utilisateur = null;
      this.$router.push('/');
      alert('Vous êtes déconnecté.');
    },
    submitForm() {
      // Traitement du formulaire
      // Vous pouvez envoyer les données via une API ici
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
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--background-color);
}

#info-entreprise {
  max-width: 800px;
  text-align: center;
  padding: 20px;
  background-color: white;
  margin-bottom: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

#info-entreprise h2 {
  font-size: 28px;
  color: var(--primary-color);
  margin-bottom: 20px;
}

#info-entreprise p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--secondary-color);
}

#form {
  max-width: 800px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

#form h2 {
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

form input,
form select,
form textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid var(--secondary-color);
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

form input:focus,
form select:focus,
form textarea:focus {
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

#contact-info {
  max-width: 800px;
  text-align: center;
  padding: 20px;
  background-color: white;
  margin-top: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

#contact-info h3 {
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: 20px;
}

#contact-info ul {
  list-style-type: none;
  padding: 0;
}

#contact-info li {
  font-size: 16px;
  color: var(--secondary-color);
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
  padding: 20px;
  background-color: var(--secondary-color);
  color: white;
  text-align: center;
}

footer p,
footer a {
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
