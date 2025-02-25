require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");

const app = express();
const port = process.env.PORT || 3000;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

if (!process.env.STRIPE_SECRET_KEY || !process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.use("/css", express.static(path.join(__dirname, "../frontend/src/css")));
app.use("/js", express.static(path.join(__dirname, "../frontend/src/JavaScript")));
app.use(express.static(path.join(__dirname, "../frontend/public")));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    process.exit(1);
  }
  console.log("Connecté à la base de données MySQL");
});

const htmlPages = ["boutique", "connexion", "inscription", "contact", "images", "profil"];
htmlPages.forEach((page) => {
  app.get(`/${page}`, (req, res) => {
    console.log(`Route appelée : /${page}`);
    res.sendFile(path.join(__dirname, `../frontend/public/${page}.html`));
  });
});

app.get("/", (req, res) => {
  console.log("Route appelée : /");
  res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await stripe.products.list({ expand: ["data.default_price"] });
    res.json(products.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);
  const { line_items } = req.body;

  if (!line_items || line_items.length === 0) {
    return res.status(400).json({ error: "Les éléments de ligne sont requis." });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.protocol}://${req.get('host')}/success`,
      cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error("Erreur lors de la création de la session de paiement :", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/register", (req, res) => {
  const { nom, prenom, adresse, ville, code_postal, email, password } = req.body;

  if (!nom || !prenom || !adresse || !ville || !code_postal || !email || !password) {
    console.log("Erreur : champs manquants.");
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  const checkEmailQuery = "SELECT * FROM utilisateurs WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur interne." });
    if (results.length > 0) return res.status(400).json({ message: "Cet email est déjà utilisé." });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: "Erreur interne." });

      const query = "INSERT INTO utilisateurs (nom, prenom, adresse, ville, code_postal, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(query, [nom, prenom, adresse, ville, code_postal, email, hashedPassword], (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur lors de l'inscription." });
        res.status(200).json({ message: "Inscription réussie !" });
      });
    });
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "L'email et le mot de passe sont requis." });

  const query = "SELECT * FROM utilisateurs WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur interne." });
    if (results.length === 0) return res.status(400).json({ message: "Utilisateur non trouvé." });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Erreur interne." });
      if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect." });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({
        message: "Connexion réussie !",
        token,
        utilisateur: { id: user.id, nom: user.nom, prenom: user.prenom, email: user.email },
      });
    });
  });
});

app.use((err, req, res, next) => {
  console.error("Erreur survenue :", err.message);
  res.status(err.status || 500).json({ message: "Une erreur interne est survenue." });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
