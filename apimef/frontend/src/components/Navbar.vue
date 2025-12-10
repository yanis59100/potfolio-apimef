<template>
  <header class="site-header">
    <nav class="navbar">
      <div class="nav-left">
        <router-link to="/" class="logo-link">
          <img src="/images/apimef.jpg" alt="Apimef Logo" class="logo-img" />
          <span class="logo-text">Apimef</span>
        </router-link>
      </div>

      <ul class="nav-links">
        <li><router-link to="/boutique">Boutique</router-link></li>
        <li><router-link to="/images">Galerie</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>

      <div class="nav-right">
        <div v-if="utilisateur" class="user-area">
          <router-link to="/profil" class="welcome-link">Bienvenue, {{ utilisateur.nom }}</router-link>
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
import { ref, onMounted, onUnmounted } from 'vue';
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

    // Watch for localStorage changes from other components (e.g., ProfilPage logout)
    const handleStorageChange = (event) => {
      if (event.key === 'utilisateur' && !event.newValue) {
        utilisateur.value = null;
      }
    };

    onMounted(() => {
      loadUser();
      // Listen to storage events from other tabs and logout from other components
      window.addEventListener('storage', loadUser);
      window.addEventListener('storage', handleStorageChange);
      // Also listen for custom events from same page logout
      window.addEventListener('user:logout', loadUser);
    });

    onUnmounted(() => {
      window.removeEventListener('storage', loadUser);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('user:logout', loadUser);
    });

    return { utilisateur, logout };
  }
};
</script>

<style scoped>
.site-header { background: linear-gradient(90deg, #2c3e50, #243141); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
.navbar { display:flex; align-items:center; justify-content:space-between; max-width:1200px; margin:0 auto; padding:12px 20px; }
.logo-link { display: flex; align-items: center; gap: 8px; text-decoration: none; }
.logo-img { height: 40px; width: auto; border-radius: 6px; }
.logo-text { color: var(--primary-color); font-weight: 700; font-size: 1.4rem; }
.nav-links { list-style:none; display:flex; gap:12px; margin:0; padding:0; }
.nav-links a { color:#fff; padding:6px 10px; border-radius:6px; transition:transform .18s ease, background .18s ease; }
.nav-links a:hover { background: rgba(255,255,255,0.06); transform:translateY(-2px); }
.nav-right { display:flex; align-items:center; gap:10px; }
.welcome-link { color: #fff; margin-right:8px; font-weight:600; text-decoration: none; padding: 6px 10px; border-radius: 6px; transition: all .18s ease; cursor: pointer; }
.welcome-link:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }
.btn-logout { background: transparent; color: #fff; border:1px solid rgba(255,255,255,0.18); padding:6px 10px; border-radius:6px; cursor:pointer; transition:all .18s; }
.btn-logout:hover { background:#fff; color:var(--secondary-color); transform:translateY(-2px); }
.auth { color:#fff; margin-left:8px; padding:6px 10px; border-radius:6px; border:1px solid rgba(255,255,255,0.06); }
.auth:hover { background: var(--primary-color); color: #222; }

@media (max-width: 768px) {
  .nav-links { display:none; }
}
</style>
