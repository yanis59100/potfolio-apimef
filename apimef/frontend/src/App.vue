<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
export default {
  name: "App",
  components: { Navbar }
};
</script>

<style>
:root {
  --primary-color: #f1c40f;
  --secondary-color: #2c3e50;
  --accent-color: #e67e22;
  --background-color: #ecf0f1;
  --text-color: #333;
}

#app {
  font-family: 'Arial', sans-serif;
  background-color: var(--background-color);
  margin: 0;
  padding: 0;
  color: var(--text-color);
}

header {
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
