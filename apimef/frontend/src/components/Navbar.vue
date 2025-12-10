<template>
  <header class="site-header">
    <nav class="navbar">
      <div class="nav-left">
        <router-link to="/" class="logo">Apimef</router-link>
      </div>

      <ul class="nav-links">
        <li><router-link to="/boutique">Boutique</router-link></li>
        <li><router-link to="/images">Galerie</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>

      <div class="nav-right">
        <div v-if="utilisateur" class="user-area">
          <span class="welcome">Bienvenue, {{ utilisateur.nom }}</span>
          <button class="btn-logout" @click="logout">Déconnexion</button>
        </div>
        <div v-else class="auth-links">
          <router-link to="/inscription" class="auth">Inscription</router-link>
          <router-link to="/connexion" class="auth">Connexion</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'AppNavbar',
  setup() {
    const router = useRouter();
    const utilisateur = ref(null);

    const loadUser = () => {
      try {
        const stored = localStorage.getItem('utilisateur');
        utilisateur.value = stored ? JSON.parse(stored) : null;
      } catch (e) {
        utilisateur.value = null;
      }
    };

    const logout = () => {
      localStorage.removeItem('utilisateur');
      localStorage.removeItem('token');
      utilisateur.value = null;
      router.push('/');
      // small visual feedback
      setTimeout(() => window.location.reload(), 300);
    };

    onMounted(() => {
      loadUser();
      // listen to storage events from other tabs
      window.addEventListener('storage', loadUser);
    });

    return { utilisateur, logout };
  }
};
</script>

<style scoped>
.site-header { background: linear-gradient(90deg, #2c3e50, #243141); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
.navbar { display:flex; align-items:center; justify-content:space-between; max-width:1200px; margin:0 auto; padding:12px 20px; }
.logo { color: var(--primary-color); font-weight:700; font-size:1.4rem; }
.nav-links { list-style:none; display:flex; gap:12px; margin:0; padding:0; }
.nav-links a { color:#fff; padding:6px 10px; border-radius:6px; transition:transform .18s ease, background .18s ease; }
.nav-links a:hover { background: rgba(255,255,255,0.06); transform:translateY(-2px); }
.nav-right { display:flex; align-items:center; gap:10px; }
.welcome { color: #fff; margin-right:8px; font-weight:600; }
.btn-logout { background: transparent; color: #fff; border:1px solid rgba(255,255,255,0.18); padding:6px 10px; border-radius:6px; cursor:pointer; transition:all .18s; }
.btn-logout:hover { background:#fff; color:var(--secondary-color); transform:translateY(-2px); }
.auth { color:#fff; margin-left:8px; padding:6px 10px; border-radius:6px; border:1px solid rgba(255,255,255,0.06); }
.auth:hover { background: var(--primary-color); color: #222; }

@media (max-width: 768px) {
  .nav-links { display:none; }
}
</style>
