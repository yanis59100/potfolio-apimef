/*******************************
 * PRODUITS (IDs Stripe)
 *******************************/
export const produits = {
  "Miel de colza": "price_1Qw23XPi9FcT27xIio720j0o",
  "Miel d'été": "price_1Qw23FPi9FcT27xIV5lkFXrv",
  "Miel de printemps": "price_1Qw22zPi9FcT27xI9yjLfUGs",
  "Miel de tilleul": "price_1Qw22cPi9FcT27xIHjjPvp5Q",
};

/*******************************
 * PANIER
 *******************************/
export function getPanier() {
  return JSON.parse(localStorage.getItem("panier")) || [];
}

export function setPanier(panier) {
  localStorage.setItem("panier", JSON.stringify(panier));
}

/*******************************
 * AJOUTER AU PANIER
 *******************************/
export function ajouterAuPanier(produit, prix, quantite = 1) {
  quantite = parseInt(quantite, 10);
  if (quantite < 1 || isNaN(quantite)) {
    alert("Veuillez entrer une quantité valide.");
    return;
  }

  let panier = getPanier();
  const index = panier.findIndex(item => item.produit === produit);

  if (index !== -1) {
    panier[index].quantite += quantite;
  } else {
    panier.push({ produit, prix, quantite });
  }

  setPanier(panier);
}

/*******************************
 * AJUSTER QUANTITÉ
 *******************************/
export function ajusterQuantite(produit, changement) {
  let panier = getPanier();
  const index = panier.findIndex(item => item.produit === produit);
  if (index === -1) return;

  panier[index].quantite += changement;

  if (panier[index].quantite <= 0) panier.splice(index, 1);

  setPanier(panier);
}

/*******************************
 * AFFICHER PANIER
 *******************************/
export function afficherPanier(panierListeEl, totalPrixEl) {
  const panier = getPanier();
  panierListeEl.innerHTML = "";
  let total = 0;

  panier.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.quantite} x ${item.produit} - ${(item.quantite * 1).toFixed(2)}€`;

    const decrementBtn = document.createElement("button");
    decrementBtn.textContent = "-";
    decrementBtn.onclick = () => { ajusterQuantite(item.produit, -1); afficherPanier(panierListeEl, totalPrixEl); };

    const incrementBtn = document.createElement("button");
    incrementBtn.textContent = "+";
    incrementBtn.onclick = () => { ajusterQuantite(item.produit, 1); afficherPanier(panierListeEl, totalPrixEl); };

    li.appendChild(decrementBtn);
    li.appendChild(incrementBtn);
    panierListeEl.appendChild(li);

    total += item.quantite * 1;
  });

  totalPrixEl.textContent = `${total.toFixed(2)}€`;
}

/*******************************
 * FINALISER ACHAT (Stripe)
 *******************************/
export async function finaliserAchat() {
  const panier = getPanier();
  if (panier.length === 0) return alert("Votre panier est vide.");

  const token = localStorage.getItem("token");
  if (!token) return alert("Vous devez être connecté pour procéder au paiement.");

  try {
    const lineItems = panier.map(item => ({
      price: produits[item.produit],
      quantity: item.quantite
    }));

    const response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ line_items: lineItems }),
    });

    const data = await response.json();
    if (data.url) window.location.href = data.url;
    else alert("Erreur lors de la création du paiement.");

  } catch (error) {
    console.error(error);
    alert("Erreur lors de la connexion au serveur.");
  }
}

/*******************************
 * GESTION UTILISATEUR
 *******************************/
export function setupUtilisateur(userInfoEl, userNameEl, logoutBtnEl, inscriptionLinkEl, connexionLinkEl) {
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
  if (!utilisateur) return;

  userInfoEl.style.display = "block";
  userNameEl.textContent = utilisateur.nom;
  inscriptionLinkEl.style.display = "none";
  connexionLinkEl.style.display = "none";

  logoutBtnEl.addEventListener("click", () => {
    localStorage.removeItem("utilisateur");
    localStorage.removeItem("token");
    alert("Vous êtes déconnecté.");
    window.location.reload();
  });
}

/*******************************
 * RECHERCHE PRODUITS
 *******************************/
export async function rechercherProduits(terme, containerEl) {
  try {
    const response = await fetch(`/search?q=${encodeURIComponent(terme)}`);
    if (!response.ok) throw new Error("Erreur lors de la recherche.");

    const resultats = await response.json();
    containerEl.innerHTML = "";

    if (resultats.length === 0) containerEl.innerHTML = 'Aucun produit trouvé.';
    else {
      resultats.forEach(produit => {
        const div = document.createElement("div");
        div.className = "produit";
        div.innerHTML = `
          <h3>${produit.nom}</h3>
          <p>Prix ID Stripe : ${produit.prixId}</p>
          <button onclick="ajouterAuPanier('${produit.nom}', '${produit.prixId}', 1)">
            Ajouter au panier
          </button>
        `;
        containerEl.appendChild(div);
      });
    }

  } catch (error) {
    console.error(error);
    alert("Erreur lors de la recherche.");
  }
}
