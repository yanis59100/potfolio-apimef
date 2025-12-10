<template>
  <div>
    <main>
      <section>
        <h2>🖼️ Galerie d'Images</h2>
        <p>Explorez notre galerie de photos qui vous plonge dans l'univers de l'apiculture, de la production de miel et de nos abeilles en action.</p>

        <div class="container">
          <figure v-for="(image, index) in images" :key="`img-${index}`">
            <img :src="image.src" :alt="image.alt" loading="lazy" />
          </figure>
        </div>

        <h2>🎬 Vidéos</h2>
        <p>Découvrez nos vidéos exclusives montrant les différentes étapes de la production de miel et des visites guidées de notre ferme apicole.</p>

        <div class="container">
          <figure v-for="(video, index) in videos" :key="`video-${index}`">
            <video :src="video.src" height="200" controls muted></video>
          </figure>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script>
import { ref } from 'vue';
import AppFooter from '../components/AppFooter.vue';

export default {
  name: 'ImagesPage',
  components: {
    AppFooter
  },
  setup() {
    const images = ref([
      { src: '/images/apimef.jpg', alt: 'Photo d\'une ruche' },
      { src: '/images/image%20miel/cire.jpg', alt: 'Cire d\'abeille en production' },
      { src: '/images/lieu1.jpg', alt: 'Lieu de production de miel' },
      { src: '/images/miel.jpg', alt: 'Pot de miel récolté' },
      { src: '/images/ruche.jpg', alt: 'Ruche en pleine récolte' },
      { src: '/images/ruche1.jpg', alt: 'Ruche dans la nature' },
      { src: '/images/vente.jpg', alt: 'Vente de miel' },
      { src: '/images/visite.jpg', alt: 'Visite guidée de la ferme apicole' },
      { src: '/images/visite1.jpg', alt: 'Visite des ruches' }
    ]);

    const videos = ref([
      { src: '/images/intro.mp4' },
      { src: '/images/extraction.mp4' },
      { src: '/images/visite.mp4' },
      { src: '/images/preparation.mp4' },
      { src: '/images/ruche5.mp4' }
    ]);

    return {
      images,
      videos
    };
  }
};
</script>

<style scoped>
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-3xl) var(--spacing-lg);
  min-height: 80vh;
}

section h2 {
  text-align: center;
  color: var(--color-honey-dark);
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-lg);
  font-family: var(--font-secondary);
}

section > p {
  text-align: center;
  color: var(--color-dark-gray);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-2xl);
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-3xl);
}

figure {
  margin: 0;
  overflow: hidden;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-base);
  transition: all var(--transition-base);
  background: var(--color-white);
  border: 2px solid var(--color-medium-gray);
}

figure:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-honey);
  border-color: var(--color-honey-light);
}

img,
video {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 1024px) {
  section h2 {
    font-size: var(--font-size-2xl);
  }

  section > p {
    font-size: var(--font-size-base);
  }
}

@media (max-width: 768px) {
  main {
    padding: var(--spacing-2xl) var(--spacing-base);
  }

  section h2 {
    font-size: var(--font-size-xl);
  }

  section > p {
    font-size: var(--font-size-sm);
  }

  .container {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: var(--spacing-base);
    margin-bottom: var(--spacing-2xl);
  }
}

@media (max-width: 480px) {
  main {
    padding: var(--spacing-lg) var(--spacing-sm);
  }

  section h2 {
    font-size: var(--font-size-lg);
  }

  section > p {
    font-size: var(--font-size-xs);
  }

  .container {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }
}
</style>
