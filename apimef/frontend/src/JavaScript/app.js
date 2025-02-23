document.addEventListener("DOMContentLoaded", () => {
    console.log("Document chargé");

    const userInfo = document.getElementById("user-info");
    const userName = document.getElementById("user-name");
    const logoutBtn = document.getElementById("logout-btn");
    const inscriptionLink = document.querySelector("a[href='/inscription']");
    const connexionLink = document.querySelector("a[href='/connexion']");

    const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
    console.log("Utilisateur récupéré:", utilisateur);

    if (utilisateur) {
        userInfo.style.display = "block";
        userName.textContent = `${utilisateur.nom}`;
        inscriptionLink.style.display = "none";
        connexionLink.style.display = "none";
    } else {
    }
    logoutBtn.addEventListener("click", () => {
        console.log("Déconnexion en cours...");
        localStorage.removeItem("utilisateur");
        localStorage.removeItem("token");
        alert("Vous êtes déconnecté.");
        window.location.href = "/";
    });
});
