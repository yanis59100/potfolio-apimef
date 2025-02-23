export async function connecterUtilisateur(email, password) {
  try {
    console.log("Tentative de connexion avec email:", email);

    if (!email || !password) {
      afficherMessage("Veuillez remplir tous les champs.", "error");
      console.log("Champs manquants.");
      return false;
    }

    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Réponse obtenue:", response);

    if (!response.ok) {
      const error = await response.json();
      afficherMessage(error.message || "Erreur lors de la connexion.", "error");
      console.log("Erreur de connexion:", error.message);
      return false;
    }

    const data = await response.json();
    console.log("Connexion réussie ! Données utilisateur:", data);

    localStorage.setItem("token", data.token);
    localStorage.setItem("utilisateur", JSON.stringify(data.utilisateur));

    afficherMessage(`Bienvenue, ${data.utilisateur.nom} !`, "success");

    setTimeout(() => {
      window.location.href = "/profil";
    }, 2000);

    return data.utilisateur;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    afficherMessage("Une erreur est survenue. Veuillez réessayer.", "error");
    return false;
  }
}

function afficherMessage(message, type = "success") {
  const messageBox = document.getElementById("message-box");
  if (!messageBox) return;

  messageBox.style.display = "block";
  messageBox.textContent = message;

  if (type === "success") {
    messageBox.style.backgroundColor = "#d4edda";
    messageBox.style.color = "#155724";
    messageBox.style.borderColor = "#c3e6cb";
  } else if (type === "error") {
    messageBox.style.backgroundColor = "#f8d7da";
    messageBox.style.color = "#721c24";
    messageBox.style.borderColor = "#f5c6cb";
  }

  setTimeout(() => {
    messageBox.style.display = "none";
  }, 5000);
}

document.getElementById("connexion-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  connecterUtilisateur(email, password);
});
