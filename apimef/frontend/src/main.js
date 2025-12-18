// Vue app
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import InscriptionPage from './pages/InscriptionPage.vue';
import ConnexionPage from './pages/ConnexionPage.vue';
import ContactPage from './pages/ContactPage.vue';
import ImagesPage from './pages/ImagesPage.vue';
import BoutiquePage from './pages/BoutiquePage.vue';
import ProfilPage from './pages/ProfilPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

import './css/styles.css';

const routes = [
  { path: '/', component: HomePage },
  { path: '/inscription', component: InscriptionPage },
  { path: '/connexion', component: ConnexionPage },
  { path: '/contact', component: ContactPage },
  { path: '/images', component: ImagesPage },
  { path: '/boutique', component: BoutiquePage },
  { path: '/profil', component: ProfilPage },
  { path: '/:pathMatch(.*)*', component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(router)
  .mount('#app');
