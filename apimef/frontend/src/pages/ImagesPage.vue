<template>
  <div>
    <header>
      <nav aria-label="Navigation principale">
        <ul>
          <li><a href="/">Accueil</a></li>
          <li><a href="/boutique">Boutique</a></li>
          <li><a href="/images">Galerie</a></li>
          <li><a href="/profil">Profil</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/inscription">Inscription</a></li>
          <li><a href="/connexion">Connexion</a></li>
          <li v-if="utilisateur" id="user-info">
            Bienvenue, <span id="user-name">{{ utilisateur.nom }}</span>!
            <button id="logout-btn" @click="logout">Déconnexion</button>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <section>
        <h3>Galerie d'Images</h3>
        <p>Explorez notre galerie de photos qui vous plonge dans l'univers fascinant de l'apiculture, de la production de miel et de nos abeilles en action.</p>

        <div class="container">
          <figure v-for="(image, index) in images" :key="index">
            <img :src="image.src" :alt="image.alt" :height="image.height" :width="image.width">
          </figure>
        </div>

        <h3>Vidéo</h3>
        <p>Découvrez nos vidéos exclusives montrant les différentes étapes de la production de miel et des visites guidées de notre ferme apicole.</p>

        <div class="container">
          <figure v-for="(video, index) in videos" :key="index">
            <video :src="video.src" height="200" controls muted loop></video>
          </figure>
        </div>
      </section>
    </main>

    <footer role="contentinfo">
      <p>
        Vous avez une question ? <a href="mailto:8845@holbertonstudents.com">Contactez-nous</a>
      </p>
      <p>&copy; 2024 Apimef. Tous droits réservés.</p>
      <p>Suivez-nous sur :</p>
      <ul>
        <li><a href="https://facebook.com/Apimef" target="_blank" rel="noopener noreferrer">Facebook</a></li>
        <li><a href="https://instagram.com/Apimef" target="_blank" rel="noopener noreferrer">Instagram</a></li>
      </ul>
      <div>
        <a href="politique-de-confidentialite.html">Politique de confidentialité</a> | <a href="termes-et-conditions.html">Termes et conditions</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      utilisateur: JSON.parse(localStorage.getItem("utilisateur")),
      images: [
        { src: "/images/apimef.jpg", alt: "Photo d'une ruche", height: 200, width: 200 },
        { src: "/images/image miel/cire.jpg", alt: "Cire d'abeille en production", height: 200, width: 200 },
        { src: "/images/lieu1.jpg", alt: "Lieu de production de miel", height: 200, width: 200 },
        { src: "/images/miel.jpg", alt: "Pot de miel récolté", height: 200, width: 200 },
        { src: "/images/ruche.jpg", alt: "Ruche en pleine récolte", height: 200, width: 200 },
        { src: "/images/ruche1.jpg", alt: "Ruche dans la nature", height: 200, width: 200 },
        { src: "/images/vente.jpg", alt: "Vente de miel", height: 200, width: 200 },
        { src: "/images/visite.jpg", alt: "Visite guidée de la ferme apicole", height: 200, width: 200 },
        { src: "/images/visite1.jpg", alt: "Visite des ruches", height: 200, width: 200 }
      ],
      videos: [
        { src: "/images/intro.mp4" },
        { src: "/images/extraction.mp4" },
        { src: "/images/visite.mp4" },
        { src: "/images/preparation.mp4" },
        { src: "/images/ruche5.mp4" },
        { src: "/images/image miel/210260_small.mp4" }
      ]
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("utilisateur");
      localStorage.removeItem("token");
      alert("Vous êtes déconnecté.");
      window.location.href = "/";
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
  padding: 40px;
}

h3 {
  color: var(--primary-color);
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
}

p {
  text-align: center;
  color: var(--background-color);
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;
}

figure {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 300px;
  height: 200px;
  cursor: pointer;
}

figure img, figure video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
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

footer ul li {
  display: inline-block;
  margin: 0 10px;
}

footer ul a {
  color: white;
  font-size: 16px;
  text-decoration: none;
  transition: color 0.3s ease;
}

footer ul a:hover {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  h3 {
    font-size: 24px;
  }

  p {
    font-size: 16px;
  }

  footer p {
    font-size: 14px;
  }

  footer ul li {
    margin: 0 5px;
  }
}
</style>
