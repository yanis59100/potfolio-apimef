<template>
  <div id="app">
    <header id="home" role="banner">
      <div class="container">
        <img src="/images/image%20miel/abeilles.jpg" alt="Des abeilles butinant sur des fleurs" loading="lazy" />
        <img src="/images/image%20miel/cadre.jpg" alt="Un cadre de ruche avec des abeilles" loading="lazy" />
        <img src="/images/image%20miel/miel.jpg" alt="Pot de miel biologique" loading="lazy" />
        <img src="/images/image%20miel/pollen.jpg" alt="Pollen récolté par les abeilles" loading="lazy" />
      </div>
    </header>

    <section id="introduction">
      <img src="/images/apimef.jpg" alt="Apimef Logo" class="hero-logo" />
      <h1>🍯 Welcome to Apimef 🐝</h1>
      <p>
        Apimef shows you beekeeping and sells 100% French honey, directly from our hives. Our honey is organic, harvested with care for a natural experience.
      </p>
    </section>

    <section id="a-propos">
      <h2>🌿 About Apimef</h2>
      <p>
        At Apimef, we care about sustainable beekeeping. We believe bees are important for the ecosystem. That's why we use organic practices, no pesticides. Our hives are in clean places for pure honey.
      </p>
    </section>

    <section id="valeurs">
      <div>
        <h3>🌍 Respect environment</h3>
        <p>
          We believe in responsible beekeeping, good for the environment. Our practices help biodiversity and bee populations.
        </p>
      </div>
      <div>
        <h3>✨ Quality and Authenticity</h3>
        <p>
          Our honey is 100% organic, harvested with care. Each jar has pure honey, no additives, for natural taste.
        </p>
      </div>
      <div>
        <h3>🔍 Transparence</h3>
        <p>
          Nous vous offrons une transparence totale sur l'origine de nos
          produits. Vous pouvez suivre toute la chaîne de production, de la
          récolte à la mise en pot, pour une expérience authentique et en toute
          confiance.
        </p>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script>
import { computed } from 'vue';
import AppFooter from '../components/AppFooter.vue';

export default {
  name: 'HomePage',
  components: {
    AppFooter
  },
  setup() {
    /**
     * Compute user from localStorage
     * Returns null if no user is stored
     */
    const user = computed(() => {
      try {
        return JSON.parse(localStorage.getItem('utilisateur')) || null;
      } catch {
        return null;
      }
    });

    return {
      user
    };
  }
};
</script>

<style scoped>
#app {
  width: 100%;
}

#introduction {
  text-align: center;
  background: linear-gradient(135deg, var(--color-pollen) 0%, var(--color-wax) 100%);
  padding: var(--spacing-3xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-base);
}

.hero-logo {
  height: 80px;
  width: auto;
  margin-bottom: var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

#introduction h1 {
  font-size: var(--font-size-4xl);
  color: var(--color-honey-dark);
  margin-bottom: var(--spacing-xl);
}

#introduction p {
  font-size: var(--font-size-lg);
  max-width: 900px;
  margin: 0 auto var(--spacing-xl);
  color: var(--color-dark-gray);
  line-height: 1.8;
}

#a-propos {
  text-align: center;
  background: linear-gradient(135deg, var(--color-honey-light) 0%, var(--color-pollen) 100%);
  border: 2px solid var(--color-honey-dark);
}

#a-propos h2 {
  color: var(--color-honey-dark);
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-xl);
}

#a-propos p {
  font-size: var(--font-size-lg);
  max-width: 900px;
  margin: 0 auto;
  color: var(--color-bee);
  line-height: 1.8;
}

#valeurs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-2xl);
  animation: none;
}

#valeurs div {
  background: var(--color-white);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-base);
  border-left: 4px solid var(--color-honey-dark);
  transition: all var(--transition-base);
  position: relative;
}

#valeurs div::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-honey-dark), var(--color-honey-light));
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

#valeurs div:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-honey);
  border-left-color: var(--color-honey-light);
}

#valeurs h3 {
  color: var(--color-honey-dark);
  font-size: var(--font-size-2xl);
  margin-top: 0;
  margin-bottom: var(--spacing-lg);
  font-family: var(--font-secondary);
}

#valeurs p {
  color: var(--color-dark-gray);
  font-size: var(--font-size-base);
  line-height: 1.7;
  margin-bottom: 0;
}

@media (max-width: 1024px) {
  #introduction h1 {
    font-size: var(--font-size-3xl);
  }

  #a-propos h2 {
    font-size: var(--font-size-2xl);
  }
}

@media (max-width: 768px) {
  #introduction h1 {
    font-size: var(--font-size-2xl);
  }

  #introduction p {
    font-size: var(--font-size-base);
  }

  #a-propos h2 {
    font-size: var(--font-size-xl);
  }

  #a-propos p {
    font-size: var(--font-size-sm);
  }

  #valeurs {
    gap: var(--spacing-xl);
  }

  #valeurs div {
    padding: var(--spacing-xl);
  }

  #valeurs h3 {
    font-size: var(--font-size-xl);
  }
}
</style>
