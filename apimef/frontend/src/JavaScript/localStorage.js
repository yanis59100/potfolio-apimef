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

    li.textContent = `${item.quantite} x ${item.produit} - ${item.prix * item.quantite}€ `;
    li.appendChild(decrementBtn);
    li.appendChild(incrementBtn);

    panierListe.appendChild(li);
    total += item.prix * item.quantite;
  });

  totalPrix.textContent = `${total}€`;
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

function finaliserAchat() {
  alert("Merci pour votre achat !");
  localStorage.removeItem("panier");
  afficherPanier();
}

document.addEventListener("DOMContentLoaded", () => {
  const userInfo = document.getElementById('user-info');
  const logoutBtn = document.getElementById('logout-btn');
  const connexionLink = document.getElementById('connexion-link');
  const inscriptionLink = document.getElementById('inscription-link');

  afficherPanier();

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("utilisateur");
      localStorage.removeItem("token");

      alert("Vous êtes déconnecté.");

      masquerUtilisateur();
      window.location.href = '/connexion';
    });
  }

  function afficherUtilisateur() {
    const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
    const userName = document.getElementById('user-name');
    
    userName.textContent = utilisateur.nom;
    userInfo.style.display = 'block';

    connexionLink.style.display = 'none';
    inscriptionLink.style.display = 'none';
  }

  function masquerUtilisateur() {
    userInfo.style.display = 'none';

    connexionLink.style.display = 'block';
    inscriptionLink.style.display = 'block';
  }

  if (localStorage.getItem('utilisateur') && localStorage.getItem('token')) {
    afficherUtilisateur();
  } else {
    masquerUtilisateur();
  }
});
