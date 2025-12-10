<template>
  <div id="app">
    <!-- Navbar moved to global component -->

    <header id="home" role="banner">
      <div class="container">
        <img src="/images/image%20miel/abeilles.jpg" alt="Des abeilles butinant sur des fleurs" loading="lazy" />
        <img src="/images/image%20miel/cadre.jpg" alt="Un cadre de ruche avec des abeilles" loading="lazy" />
        <img src="/images/image%20miel/miel.jpg" alt="Pot de miel biologique" loading="lazy" />
        <img src="/images/image%20miel/pollen.jpg" alt="Pollen récolté par les abeilles" loading="lazy" />
      </div>
    </header>

    <section id="introduction">
      <h1>Bienvenue sur Apimef</h1>
      <p>
        Apimef vous présente l'univers de l'apiculture et vous propose du miel
        100% français, directement issu de nos ruches. Notre miel est
        entièrement biologique, récolté avec soin pour vous offrir une
        expérience authentique et naturelle.
      </p>
    </section>

    <section id="a-propos">
      <h2>À propos de Apimef</h2>
      <p>
        Chez Apimef, nous mettons un point d'honneur à cultiver l'amour de
        l'apiculture durable. Nous croyons fermement que les abeilles jouent un
        rôle crucial dans l'équilibre de notre écosystème. C'est pourquoi nous
        nous engageons à respecter des pratiques biologiques, sans pesticides
        ni produits chimiques. Nos ruches sont installées dans des environnements
        préservés pour garantir un miel pur et naturel.
      </p>
    </section>

    <section id="valeurs">
      <div>
        <h3>Respect de l'environnement</h3>
        <p>
          Nous croyons en une apiculture responsable, respectueuse de
          l'environnement. Nos pratiques visent à préserver la biodiversité et
          à soutenir les populations d'abeilles dans un monde en constante
          évolution.
        </p>
      </div>
      <div>
        <h3>Qualité et Authenticité</h3>
        <p>
          Notre miel est 100% biologique, récolté avec soin dans nos ruches.
          Chaque pot contient un produit pur, sans ajout d'additifs, pour une
          saveur naturelle et délicieuse.
        </p>
      </div>
      <div>
        <h3>Transparence</h3>
        <p>
          Nous vous offrons une transparence totale sur l'origine de nos
          produits. Vous pouvez suivre toute la chaîne de production, de la
          récolte à la mise en pot, pour une expérience authentique et en toute
          confiance.
        </p>
      </div>
    </section>

    <footer role="contentinfo">
      <p>
        Vous avez une question ?
        <a href="mailto:8845@holbertonstudents.com">Contactez-nous</a>
      </p>
      <p>&copy; 2024 Apimef. Tous droits réservés.</p>
      <p>Suivez-nous sur :</p>
      <ul>
        <li>
          <a href="https://facebook.com/Apimef" target="_blank" aria-label="Suivre Apimef sur Facebook">Facebook</a>
        </li>
        <li>
          <a href="https://instagram.com/Apimef" target="_blank" aria-label="Suivre Apimef sur Instagram">Instagram</a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("utilisateur")),
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("utilisateur");
      localStorage.removeItem("token");
      alert("Vous êtes déconnecté.");
      this.$router.go(0);
    },
  },
};
</script>

<style>
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

header {
  position: relative;
  overflow: hidden;
}

header .container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  animation: fadeIn 1s ease-in-out;
}

header img {
  width: 24%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.5s ease;
}

header img:hover {
  transform: scale(1.1);
}

#home {
  background-color: var(--background-color);
}

#introduction {
  padding: 40px;
  background-color: #fff;
  text-align: center;
  border-bottom: 1px solid #ddd;
  animation: slideUp 1s ease-in-out;
}

#introduction h1 {
  font-size: 36px;
  color: var(--primary-color);
}

#introduction p {
  font-size: 18px;
  max-width: 800px;
  margin: 20px auto;
  color: var(--secondary-color);
}

#a-propos {
  padding: 40px;
  background-color: var(--primary-color);
  color: white;
  text-align: center;
  animation: fadeIn 1.5s ease-in-out;
}

#a-propos h2 {
  font-size: 32px;
  margin-bottom: 20px;
}

#a-propos p {
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto;
}

#valeurs {
  display: flex;
  justify-content: space-between;
  padding: 40px;
  background-color: #f9f9f9;
  animation: slideUp 1.5s ease-in-out;
}

#valeurs div {
  width: 30%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

#valeurs div:hover {
  transform: scale(1.05);
}

#valeurs h3 {
  color: var(--accent-color);
}

#valeurs p {
  color: var(--secondary-color);
}

footer {
  padding: 20px;
  background-color: var(--secondary-color);
  color: white;
  text-align: center;
  animation: fadeIn 2.5s ease-in-out;
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


button {
  background-color: var(--accent-color);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--primary-color);
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideUp {
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
