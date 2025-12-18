import { API_BASE } from "../config";

export async function loginUser(email, password) {
  console.log("Trying to login");
  try {
    if (!email || !password) {
      showMessage("Fill all fields.", "error");
      return false;
    }

    const response = await fetch(`${API_BASE}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      showMessage(error.message || "Login error.", "error");
      return false;
    }

    const data = await response.json();
    console.log("Login successful");

    localStorage.setItem("token", data.token);
    localStorage.setItem("utilisateur", JSON.stringify(data.user));

    showMessage(`Welcome, ${data.user.nom} !`, "success");

    setTimeout(() => {
      window.location.href = "/profil";
    }, 2000);

    return data.user;
  } catch (error) {
    console.log("Login failed");
    showMessage("Error. Try again.", "error");
    return false;
  }
}

function showMessage(message, type = "success") {
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

  loginUser(email, password);
});
