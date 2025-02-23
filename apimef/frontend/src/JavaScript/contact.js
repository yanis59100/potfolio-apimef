document.addEventListener("DOMContentLoaded", function() {
    console.log("Document contact.js chargé");

    const userInfo = document.getElementById("user-info");
    const userName = document.getElementById("user-name");
    const loginLink = document.querySelector("a[href='/connexion']");
    const signupLink = document.querySelector("a[href='/inscription']");
    const logoutBtn = document.getElementById("logout-btn");

    const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
    console.log("Utilisateur récupéré:", utilisateur);

    if (utilisateur) {
        userInfo.style.display = "block";
        userName.textContent = `${utilisateur.nom}`;

        if (loginLink) loginLink.style.display = "none";
        if (signupLink) signupLink.style.display = "none";
    } else {
        userInfo.style.display = "none";
        if (loginLink) loginLink.style.display = "inline";
        if (signupLink) signupLink.style.display = "inline";
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            console.log("Déconnexion en cours...");
            localStorage.removeItem("utilisateur");
            localStorage.removeItem("token");

            alert("Vous êtes déconnecté.");
            window.location.href = "/";
        });
    }
});
