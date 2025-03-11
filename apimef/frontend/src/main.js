import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

const HomePage = () => import('./pages/HomePage.vue');
const InscriptionPage = () => import('./pages/InscriptionPage.vue');
const ConnexionPage = () => import('./pages/ConnexionPage.vue');
const ContactPage = () => import('./pages/ContactPage.vue');
const ImagesPage = () => import('./pages/ImagesPage.vue');
const BoutiquePage = () => import('./pages/BoutiquePage.vue');
const ProfilPage = () => import('./pages/ProfilPage.vue');
const NotFoundPage = () => import('./pages/NotFoundPage.vue');

import './css/styles.css';
import './css/images.css';
import './css/inscription.css';
import './css/connexion.css';
import './css/contact.css';
import './css/boutique.css';
import './css/profil.css';

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
