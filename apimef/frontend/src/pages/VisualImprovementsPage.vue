<template>
  <div class="visual-improvements page">
    <main class="container">
      <h1>🎨 Propositions d'Améliorations Visuelles - Apimef</h1>

      <section>
        <h2>🔴 Problèmes Identifiés</h2>
        <h3>1. <strong>Footer Inconsistant</strong> ❌</h3>
        <p><strong>Problème:</strong> Chaque page a son propre code de footer</p>
        <ul>
          <li>HomePage: Footer personnalisé</li>
          <li>BoutiquePage: Pas de footer visible</li>
          <li>ConnexionPage: Footer personnalisé</li>
          <li>InscriptionPage: Footer personnalisé</li>
          <li>ProfilPage: Footer personnalisé</li>
          <li>ContactPage: Footer personnalisé</li>
        </ul>
        <p><strong>Solution:</strong> ✅ Créé un composant Footer réutilisable (<code>components/Footer.vue</code>)</p>
      </section>

      <section>
        <h2>✨ Améliorations Visuelles Proposées</h2>

        <h3>PRIORITÉ HAUTE</h3>

        <h4>1. Gradient Hero Section sur HomePage 🌟</h4>
        <p><strong>Où:</strong> HomePage - Section introduction</p>
        <pre><code class="language-css">#introduction {
  background: linear-gradient(135deg, var(--color-pollen) 0%, var(--color-wax) 100%);
  padding: var(--spacing-3xl);
  text-align: center;
  border-radius: var(--radius-lg);
}</code></pre>

        <h4>2. Icônes et Emojis Significatifs 🍯</h4>
        <p><strong>Où:</strong> Partout (headings, buttons, sections)</p>
        <pre><code>- 🍯 Miel → Headings produits
- 🐝 Abeilles → Sections écologie
- ✨ Éclat → Premium/highlight
- 🌿 Nature → Produits bio
- 📦 Panier → Actions
- 👤 Profil → Account
- 📧 Contact → Email
- 🔒 Sécurité → Login/Register</code></pre>

        <h4>3. Breadcrumb Navigation 🔗</h4>
        <p><strong>Où:</strong> Toutes les pages (sauf HomePage)</p>
        <pre><code>HomePage &gt; BoutiquePage &gt; ProductDetail
HomePage &gt; ProfilPage
HomePage &gt; ConnexionPage</code></pre>

        <h4>4. Card Styling Uniforme 🎴</h4>
        <p>HomePage (sections valeurs), BoutiquePage (produits). Hover effect, icons, gradient borders.</p>

        <h4>5. Loading States & Feedback Visuel ⚡</h4>
        <p>Spinners miel-themed, disabled button styles, skeleton loaders, toast notifications.</p>
      </section>

      <section>
        <h3>PRIORITÉ MOYENNE</h3>
        <h4>6. Images Responsive avec WebP 🖼️</h4>
        <pre><code>&lt;picture&gt;
  &lt;source srcset="/images/image-1.webp" type="image/webp"&gt;
  &lt;img src="/images/image-1.jpg" alt="Description"&gt;
&lt;/picture&gt;</code></pre>

        <h4>7. Animations d'Entrée de Page ✨</h4>
        <pre><code>@keyframes slideInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
section { animation: slideInUp 0.6s ease-out; }</code></pre>

        <h4>8. Badge "Nouveau" ou "Best Seller" 🏆</h4>
        <pre><code>&lt;div class="product-badge badge-new"&gt;Nouveau&lt;/div&gt;</code></pre>

        <h4>9. Rating System ⭐</h4>
        <pre><code>&lt;div class="product-rating"&gt;
  &lt;span class="stars"&gt;★★★★★&lt;/span&gt;
  &lt;span class="count"&gt;(127 avis)&lt;/span&gt;
&lt;/div&gt;</code></pre>

        <h4>10. CTA Buttons 🎯</h4>
        <p>Make CTAs prominent: shadow-honey, hover scale, icons on left.</p>
      </section>

      <section>
        <h3>PRIORITÉ BASSE</h3>
        <h4>11. Dark Mode Toggle 🌙</h4>
        <p>Navbar toggle, store preference in <code>localStorage</code>, swap CSS variables.</p>

        <h4>12. Search avec Auto-Complete 🔍</h4>
        <p>Suggestions, history, advanced filters.</p>

        <h4>13. Back to Top Button ⬆️</h4>
        <p>Floating button in footer, shows after 300px scroll.</p>

        <h4>14. Micro-animations Subtiles ✨</h4>
        <pre><code>.btn:hover { animation: pulse 0.6s ease-out; }
.btn:active { transform: scale(0.98); }</code></pre>

        <h4>15. Cookie Banner 🍪</h4>
        <p>RGPD compliance: accept/refuse cookies, link to policy.</p>
      </section>

      <section>
        <h2>Plan d'Implémentation Immédiat</h2>
        <ol>
          <li>Phase 1 (Critique) - Aujourd'hui
            <ul>
              <li>[x] Créer composant Footer réutilisable</li>
              <li>[ ] Remplacer tous les footers par composant Footer</li>
              <li>[ ] Ajouter icônes emojis aux headings</li>
              <li>[ ] Améliorer gradient sur HomePage intro</li>
            </ul>
          </li>
          <li>Phase 2 (Haute) - Demain
            <ul>
              <li>[ ] Ajouter breadcrumb navigation</li>
              <li>[ ] Améliorer card styling (valeurs + produits)</li>
              <li>[ ] Ajouter loading states</li>
              <li>[ ] Ajouter toast notifications</li>
            </ul>
          </li>
        </ol>
      </section>

      <section class="notes">
        <h3>Notes Supplémentaires</h3>
        <ul>
          <li>Performance: priorité images WebP avant animations</li>
          <li>Accessibilité: vérifier contraste emojis/texte</li>
          <li>Mobile: tester toutes améliorations sur mobile</li>
          <li>Maintenabilité: utiliser CSS variables pour cohérence</li>
          <li>SEO: ajouter schema.org pour produits si possible</li>
        </ul>
      </section>

    </main>
  </div>
</template>

<script>
export default {
  name: 'VisualImprovementsPage'
};
</script>

<style scoped>
.visual-improvements .container { max-width: 1100px; margin: 40px auto; padding: 24px; }
.visual-improvements h1 { font-size: 1.8rem; color: var(--color-honey-dark); margin-bottom: 16px; }
.visual-improvements pre { background: var(--color-wax); padding: 12px; border-radius: 8px; overflow:auto; }
.visual-improvements code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace; }
.visual-improvements h2 { margin-top: 24px; }
.visual-improvements section { margin-bottom: 20px; }
</style>
