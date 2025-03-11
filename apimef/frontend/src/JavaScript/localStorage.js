const produits = {
    "Miel de colza": "price_1Qw23XPi9FcT27xIio720j0o",
    "Miel d'été": "price_1Qw23FPi9FcT27xIV5lkFXrv",
    "Miel de printemps": "price_1Qw22zPi9FcT27xI9yjLfUGs",
    "Miel de tilleul": "price_1Qw22cPi9FcT27xIHjjPvp5Q",
  };
  
  function ajouterAuPanier(produit, prix, quantite) {
    quantite = parseInt(quantite, 10);
    if (quantite < 1) {
      alert("Veuillez entrer une quantité valide.");
      return;
    }
  
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
  
    const index = panier.findIndex(item => item.produit === produit);
    if (index !== -1) {
      panier[index].quantite += quantite;
    } else {
      panier.push({ produit, prix, quantite });
    }
  
    localStorage.setItem("panier", JSON.stringify(panier));
    afficherPanier();
  }
  
  async function rechercherProduits(terme) {
    try {
      const response = await fetch(`/search?q=${encodeURIComponent(terme)}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la recherche des produits.");
      }
      const resultats = await response.json();
      afficherResultats(resultats);
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de la recherche des produits.");
    }
  }
  
  function afficherResultats(resultats) {
    const container = document.getElementById('resultats-container');
    container.innerHTML = '';
  
    if (resultats.length === 0) {
      container.innerHTML = 'Aucun produit trouvé.';
      return;
    }
  
    resultats.forEach((produit) => {
      const div = document.createElement('div');
      div.className = 'produit';
      div.innerHTML = `
        <h3>${produit.nom}</h3>
        <p>Prix ID: ${produit.prixId}</p>
        <button onclick="ajouterAuPanier('${produit.nom}', '${produit.prixId}', 1)">Ajouter au panier</button>
      `;
      container.appendChild(div);
    });
  }
  
  function afficherPanier() {
    const panierListe = document.getElementById("panierListe");
    const totalPrix = document.getElementById("totalPrix");
  
    panierListe.innerHTML = "";
  
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let total = 0;
  
    panier.forEach(item => {
      const li = document.createElement("li");
  
      const decrementBtn = document.createElement("button");
      decrementBtn.textContent = "-";
      decrementBtn.onclick = () => ajusterQuantite(item.produit, -1);
  
      const incrementBtn = document.createElement("button");
      incrementBtn.textContent = "+";
      incrementBtn.onclick = () => ajusterQuantite(item.produit, 1);
  
      li.textContent = `${item.quantite} x ${item.produit} - ${(item.prix * item.quantite).toFixed(2)}€`;
      li.appendChild(decrementBtn);
      li.appendChild(incrementBtn);
  
      panierListe.appendChild(li);
      total += item.prix * item.quantite;
    });
  
    totalPrix.textContent = `${total.toFixed(2)}€`;
  }
  
  function ajusterQuantite(produit, changement) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    
    const index = panier.findIndex(item => item.produit === produit);
    if (index !== -1) {
      panier[index].quantite += changement;
  
      if (panier[index].quantite <= 0) {
        panier.splice(index, 1);
      }
  
      localStorage.setItem("panier", JSON.stringify(panier));
      afficherPanier();
    }
  }
  
  async function finaliserAchat() {
    const panier = JSON.parse(localStorage.getItem("panier")) || [];
    
    if (panier.length === 0) {
      alert("Votre panier est vide.");
      return;
    }
  
    try {
      const lineItems = panier.map(item => ({
        price: produits[item.produit],
        quantity: item.quantite,
      }));
  
      const response = await fetch("/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ line_items: lineItems }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur de réponse :", response.status, errorData);
        alert(`Erreur lors de la création de la session de paiement : ${errorData.error || 'Erreur inconnue'}`);
        return;
      }
  
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur lors de la création de la session de paiement.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la connexion au serveur.");
    }
  }
  
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
  const userInfo = document.getElementById("user-info");
  const userName = document.getElementById("user-name");
  const logoutBtn = document.getElementById("logout-btn");
  const inscriptionLink = document.getElementById("inscription-link");
  const connexionLink = document.getElementById("connexion-link");
  
  if (utilisateur) {
    userInfo.style.display = "block";
    userName.textContent = utilisateur.nom;
  
    inscriptionLink.style.display = "none";
    connexionLink.style.display = "none";
  
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("utilisateur");
      localStorage.removeItem("token");
      alert("Vous êtes déconnecté.");
      window.location.reload();
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    afficherPanier();
  });
  