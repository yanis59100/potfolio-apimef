<template>
  <footer role="contentinfo" class="footer">
    <div class="footer-content">
      <!-- Contact Section -->
      <div class="footer-section">
        <h3>Nous Contacter</h3>
        <p>
          <a href="mailto:8845@holbertonstudents.com" class="footer-link">
            📧 8845@holbertonstudents.com
          </a>
        </p>
      </div>

      <!-- Social Media Section -->
      <div class="footer-section">
        <h3>Suivez-nous</h3>
        <ul class="social-links">
          <li>
            <a
              href="https://facebook.com/Apimef"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suivre Apimef sur Facebook"
              class="footer-link"
            >
              f Facebook
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/Apimef"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suivre Apimef sur Instagram"
              class="footer-link"
            >
              📷 Instagram
            </a>
          </li>
        </ul>
      </div>

      <!-- About Section -->
      <div class="footer-section">
        <h3>À Propos</h3>
        <p>
          Apimef: Miel biologique 100% français, récolté avec passion dans
          nos ruches. Respecter l'environnement, notre priorité.
        </p>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <p>&copy; 2024 Apimef. Tous droits réservés.</p>
      <p class="footer-tagline">🍯 Miel Authentique • Apiculture Responsable 🐝</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
};
</script>

<style scoped>
footer {
  background: linear-gradient(135deg, var(--color-bee) 0%, var(--color-honey-dark) 100%);
  color: var(--color-light);
  border-top: 4px solid var(--color-honey-light);
  padding: var(--spacing-3xl) var(--spacing-2xl);
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-3xl);
  max-width: 1200px;
  margin: 0 auto var(--spacing-3xl);
}

.footer-section h3 {
  color: var(--color-honey-light);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-lg);
  font-family: var(--font-secondary);
}

.footer-section p {
  font-size: var(--font-size-sm);
  line-height: 1.6;
  opacity: 0.95;
}

.footer-link {
  color: var(--color-pollen);
  text-decoration: none;
  transition: color var(--transition-base), text-shadow var(--transition-base);
  font-weight: var(--font-weight-semibold);
}

.footer-link:hover {
  color: var(--color-honey-light);
  text-shadow: 0 0 8px rgba(244, 208, 63, 0.3);
}

.social-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.social-links a {
  display: inline-block;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: var(--spacing-2xl);
  border-top: 1px solid rgba(244, 208, 63, 0.2);
  text-align: center;
  font-size: var(--font-size-sm);
}

.footer-bottom p {
  margin: var(--spacing-sm) 0;
  opacity: 0.9;
}

.footer-tagline {
  font-weight: var(--font-weight-semibold);
  color: var(--color-honey-light);
}

/* Responsive Design */
@media (max-width: 768px) {
  footer {
    padding: var(--spacing-2xl) var(--spacing-lg);
  }

  .footer-content {
    gap: var(--spacing-2xl);
  }

  .footer-section h3 {
    font-size: var(--font-size-base);
  }

  .footer-section p {
    font-size: var(--font-size-xs);
  }
}

@media (max-width: 480px) {
  footer {
    padding: var(--spacing-xl) var(--spacing-base);
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .footer-section h3 {
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-base);
  }
}
</style>
