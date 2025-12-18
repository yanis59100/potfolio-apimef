// Backend for honey site
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");

// Middleware Auth
const authMiddleware = require("./authMiddleware");

const app = express();
const port = process.env.PORT || 3000;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Check env vars
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME || !process.env.JWT_SECRET || !process.env.STRIPE_SECRET_KEY) {
  console.error("Missing env vars");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// Static files
app.use("/css", express.static(path.join(__dirname, "../frontend/src/css")));
app.use("/js", express.static(path.join(__dirname, "../frontend/src/JavaScript")));
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("DB error:", err);
    process.exit(1);
  }
  console.log("Connected to DB");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Get products
app.get("/api/products", async (req, res) => {
  console.log("Getting products");
  try {
    const products = await stripe.products.list({ expand: ["data.default_price"] });
    res.json(products.data);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: error.message });
  }
});

// Create checkout session
app.post("/create-checkout-session", async (req, res) => {
  const { line_items } = req.body;

  if (!line_items || line_items.length === 0) {
    return res.status(400).json({ error: "Need items" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.protocol}://${req.get("host")}/success`,
      cancel_url: `${req.protocol}://${req.get("host")}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/success", (req, res) => {
  res.send(`
    <html>
      <head><meta charset="utf-8"><title>Paiement réussi</title></head>
      <body>
        <h1>Paiement réussi</h1>
        <p>Merci pour votre achat.</p>
        <a href="/">Retour à l'accueil</a>
      </body>
    </html>
  `);
});

app.get("/cancel", (req, res) => {
  res.send(`
    <html>
      <head><meta charset="utf-8"><title>Paiement annulé</title></head>
      <body>
        <h1>Paiement annulé</h1>
        <p>La transaction a été annulée.</p>
        <a href="/">Retour à l'accueil</a>
      </body>
    </html>
  `);
});

// Register
app.post("/api/register", (req, res) => {
  console.log("Registering user");
  const { nom, prenom, adresse, ville, code_postal, email, password } = req.body;

  if (!nom || !prenom || !adresse || !ville || !code_postal || !email || !password) {
    return res.status(400).json({ message: "All fields required." });
  }

  const checkEmailQuery = "SELECT * FROM utilisateurs WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Error." });
    if (results.length > 0) return res.status(400).json({ message: "Email already used." });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: "Error." });

      const query = "INSERT INTO utilisateurs (nom, prenom, adresse, ville, code_postal, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(query, [nom, prenom, adresse, ville, code_postal, email, hashedPassword], (err) => {
        if (err) return res.status(500).json({ message: "Register error." });
        res.status(200).json({ message: "Register success!" });
      });
    });
  });
});

// Login
app.post("/api/login", (req, res) => {
  console.log("Logging in user");
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email and password required." });

  const query = "SELECT * FROM utilisateurs WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Error." });
    if (results.length === 0) return res.status(400).json({ message: "User not found." });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Error." });
      if (!isMatch) return res.status(400).json({ message: "Wrong password." });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({
        message: "Login success!",
        token,
        user: { id: user.id, nom: user.nom, prenom: user.prenom, email: user.email },
      });
    });
  });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
