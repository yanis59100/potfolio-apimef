<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1>404</h1>
      <h2>Page non trouvée</h2>
      <p>La page que vous recherchez n'existe pas ou a été supprimée.</p>
      <router-link to="/" class="btn-home">Retour à l'accueil</router-link>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue';

export default {
  name: 'NotFoundPage',
  components: {
    AppFooter
  }
};
</script>

<style scoped>
:root {
  --primary-color: #f1c40f;
  --secondary-color: #2c3e50;
  --accent-color: #e67e22;
}

.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  background: linear-gradient(135deg, var(--secondary-color), #34495e);
  color: white;
  padding: 20px;
}

.not-found-content {
  text-align: center;
  animation: slideUp 0.6s ease-in-out;
}

h1 {
  font-size: 120px;
  margin: 0;
  font-weight: bold;
  color: var(--primary-color);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

h2 {
  font-size: 32px;
  margin: 10px 0;
  font-weight: bold;
}

p {
  font-size: 18px;
  margin: 20px 0 40px 0;
  opacity: 0.9;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.btn-home {
  display: inline-block;
  padding: 12px 30px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: all 0.3s ease;
  font-size: 16px;
}

.btn-home:hover {
  background-color: var(--accent-color);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 80px;
  }

  h2 {
    font-size: 24px;
  }

  p {
    font-size: 16px;
  }

  .btn-home {
    padding: 10px 20px;
    font-size: 14px;
  }
}
</style>
