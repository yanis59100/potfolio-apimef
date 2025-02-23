document.addEventListener('DOMContentLoaded', () => {
  const profilDetails = document.getElementById("profil-details");
  const modificationForm = document.getElementById("modification-form");
  const logoutBtn = document.getElementById("logout-btn");
  const userInfo = document.getElementById("user-info");
  const userName = document.getElementById("user-name");
  const inscriptionLink = document.getElementById("inscription-link");
  const connexionLink = document.getElementById("connexion-link");

  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

  if (utilisateur) {
      profilDetails.innerHTML = `
          <p><strong>Nom :</strong> ${utilisateur.nom}</p>
          <p><strong>Prénom :</strong> ${utilisateur.prenom}</p>
          <p><strong>Email :</strong> ${utilisateur.email}</p>
          <p><strong>Adresse :</strong> ${utilisateur.adresse}, ${utilisateur.ville} - ${utilisateur.code_postal}</p>
      `;

      document.getElementById("nom").value = utilisateur.nom;
      document.getElementById("prenom").value = utilisateur.prenom;
      document.getElementById("email").value = utilisateur.email;
      document.getElementById("adresse").value = utilisateur.adresse;
      document.getElementById("ville").value = utilisateur.ville;
      document.getElementById("code_postal").value = utilisateur.code_postal;

      userInfo.style.display = "block";
      userName.textContent = utilisateur.nom;

      inscriptionLink.style.display = "none";
      connexionLink.style.display = "none";
  } else {
      alert("Vous devez être connecté pour accéder à cette page.");
      window.location.href = "/connexion";
  }

  logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("utilisateur");
      localStorage.removeItem("token");

      alert("Vous êtes déconnecté.");
      window.location.href = "/";
  });

  modificationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const updatedUser = {
          nom: document.getElementById("nom").value,
          prenom: document.getElementById("prenom").value,
          email: document.getElementById("email").value,
          adresse: document.getElementById("adresse").value,
          ville: document.getElementById("ville").value,
          code_postal: document.getElementById("code_postal").value
      };

      localStorage.setItem("utilisateur", JSON.stringify(updatedUser));
      alert("Informations mises à jour avec succès !");
      
      profilDetails.innerHTML = `
          <p><strong>Nom :</strong> ${updatedUser.nom}</p>
          <p><strong>Prénom :</strong> ${updatedUser.prenom}</p>
          <p><strong>Email :</strong> ${updatedUser.email}</p>
          <p><strong>Adresse :</strong> ${updatedUser.adresse}, ${updatedUser.ville} - ${updatedUser.code_postal}</p>
      `;
  });
});
