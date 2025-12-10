import { API_BASE } from "../config";

async function payer(lineItems) {
  try {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/create-checkout-session`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ line_items: lineItems }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url; // redirige vers Stripe ou la page mock
    } else {
      console.error('Erreur lors de la création de la session :', data);
    }
  } catch (err) {
    console.error(err);
  }
}

// Exemple d'utilisation avec un produit (décommenter pour tester manuellement)
// payer([{ price: 'price_1Qw0ZjB4WwtW5CxY3r3i45g0', quantity: 1 }]);

export { payer };
