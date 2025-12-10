import { API_BASE } from "../config";

export async function inscrireUtilisateur(
  nom,
  prenom,
  adresse,
  ville,
  code_postal,
  email,
  password,
  confirmPassword
) {
  try {
    if (password !== confirmPassword) {
      afficherMessage("Les mots de passe ne correspondent pas.", "error");
      return false;
    }

    const response = await fetch(`${API_BASE}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom,
        prenom,
        adresse,
        ville,
        code_postal,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      afficherMessage(error.message || "Erreur lors de l'inscription.", "error");
      return false;
    }

    const data = await response.json();

    afficherMessage("Inscription réussie ! Redirection vers la connexion...", "success");

    setTimeout(() => {
      window.location.href = "/connexion.html";
    }, 2000);

    return data;
  } catch (error) {
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

document.getElementById("inscription-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const adresse = document.getElementById("adresse").value;
  const ville = document.getElementById("ville").value;
  const code_postal = document.getElementById("code_postal").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  inscrireUtilisateur(nom, prenom, adresse, ville, code_postal, email, password, confirmPassword);
});
