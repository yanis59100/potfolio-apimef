require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mysql = require("mysql2");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");

// Middleware Auth
const authMiddleware = require("./authMiddleware");

const app = express();
const port = process.env.PORT || 3000;
// Configure Stripe only if a secret key is provided and STRIPE_MOCK is not set
const useStripe = !!process.env.STRIPE_SECRET_KEY && process.env.STRIPE_MOCK !== "true";
const stripe = useStripe ? Stripe(process.env.STRIPE_SECRET_KEY) : null;

// Vérification des variables d'environnement (Stripe optionnel)
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME || !process.env.JWT_SECRET) {
  console.error("Missing required environment variables (DB/JWT). Ensure DB_HOST, DB_USER, DB_PASSWORD, DB_NAME and JWT_SECRET are set.");
  process.exit(1);
}

// Security headers
app.use(helmet());

// CORS: allow only FRONTEND_URL if provided, otherwise default to allow all (useful for local dev)
const corsOptions = {};
if (process.env.FRONTEND_URL) {
  corsOptions.origin = process.env.FRONTEND_URL;
}
app.use(cors(corsOptions));
app.use(express.json());

// Fichiers statiques
app.use("/css", express.static(path.join(__dirname, "../frontend/src/css")));
app.use("/js", express.static(path.join(__dirname, "../frontend/src/JavaScript")));
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Connexion MySQL
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

// Routes HTML
const htmlPages = ["boutique", "connexion", "inscription", "contact", "images", "profil"];
htmlPages.forEach((page) => {
  app.get(`/${page}`, (req, res) => {
    res.sendFile(path.join(__dirname, `../frontend/public/${page}.html`));
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});

// 🔥 Récupération des produits Stripe (ou mock si Stripe indisponible)
app.get("/api/products", async (req, res) => {
  if (!useStripe) {
    // Retourne des produits factices pour développement/local
    const mockProducts = [
      {
        id: "prod_mock_1",
        name: "Miel de tilleul",
        description: "Miel de tilleul artisanal",
        images: ["/images/image%20miel/IMG-20241116-WA0002.jpg"],
        default_price: { id: "price_mock_1", unit_amount: 1200, currency: "eur" }
      },
      {
        id: "prod_mock_2",
        name: "Miel de printemps",
        description: "Miel de printemps floral",
        images: ["/images/image%20miel/IMG-20241116-WA0004.jpg"],
        default_price: { id: "price_mock_2", unit_amount: 1000, currency: "eur" }
      }
    ];

    return res.json(mockProducts);
  }

  try {
    const products = await stripe.products.list({ expand: ["data.default_price"] });
    res.json(products.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({ error: error.message });
  }
});

// 🔐 Route protégée Stripe
app.post("/create-checkout-session", async (req, res) => {
  const { line_items } = req.body;

  // If Stripe is enabled, require a valid JWT (same as authMiddleware)
  if (useStripe) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Vous devez être connecté pour accéder à cette ressource." });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({ error: "Token invalide ou expiré." });
    }
  }

  if (!line_items || line_items.length === 0) {
    return res.status(400).json({ error: "Les éléments de ligne sont requis." });
  }

  if (!useStripe) {
    // Mode mock : on simule une session et on retourne une URL locale
    const mockSessionId = `sess_mock_${Date.now()}`;
    const host = `${req.protocol}://${req.get("host")}`;
    const url = `${host}/mock-checkout?session_id=${mockSessionId}`;
    // Mock session created (Stripe not configured)
    return res.json({ url });
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
    console.error("Erreur lors de la création de la session de paiement :", error);
    res.status(500).json({ error: error.message });
  }
});

// Routes mock pour tester le flux de paiement sans Stripe
app.get("/mock-checkout", (req, res) => {
  const sessionId = req.query.session_id || "unknown";
  const host = `${req.protocol}://${req.get("host")}`;
  // Simple page pour simuler la page de paiement
  res.send(`
    <html>
      <head><meta charset="utf-8"><title>Mock Checkout</title></head>
      <body style="font-family:Arial,Helvetica,sans-serif;">
        <h1>Mock Checkout</h1>
        <p>Session: ${sessionId}</p>
        <p>This is a mock checkout page. Use the buttons below to simulate success or cancellation.</p>
        <a href="${host}/success">Simulate Success</a>
        <br/><br/>
        <a href="${host}/cancel">Simulate Cancel</a>
      </body>
    </html>
  `);
});

app.get("/success", (req, res) => {
  res.send(`
    <html>
      <head><meta charset="utf-8"><title>Paiement réussi</title></head>
      <body style="font-family:Arial,Helvetica,sans-serif;">
        <h1>Paiement simulé réussi</h1>
        <p>Merci pour votre achat (mode mock).</p>
        <a href="/">Retour à l'accueil</a>
      </body>
    </html>
  `);
});

app.get("/cancel", (req, res) => {
  res.send(`
    <html>
      <head><meta charset="utf-8"><title>Paiement annulé</title></head>
      <body style="font-family:Arial,Helvetica,sans-serif;">
        <h1>Paiement simulé annulé</h1>
        <p>La transaction a été annulée (mode mock).</p>
        <a href="/">Retour à l'accueil</a>
      </body>
    </html>
  `);
});

// 🔐 Inscription
app.post("/api/register", (req, res) => {
  const { nom, prenom, adresse, ville, code_postal, email, password } = req.body;

  if (!nom || !prenom || !adresse || !ville || !code_postal || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  const checkEmailQuery = "SELECT * FROM utilisateurs WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur interne." });
    if (results.length > 0) return res.status(400).json({ message: "Cet email est déjà utilisé." });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: "Erreur interne." });

      const query = "INSERT INTO utilisateurs (nom, prenom, adresse, ville, code_postal, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(query, [nom, prenom, adresse, ville, code_postal, email, hashedPassword], (err) => {
        if (err) return res.status(500).json({ message: "Erreur lors de l'inscription." });
        res.status(200).json({ message: "Inscription réussie !" });
      });
    });
  });
});

// 🔐 Connexion
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

// Global Error Handling
app.use((err, req, res, next) => {
  console.error("Erreur survenue :", err.message);
  res.status(err.status || 500).json({ message: "Une erreur interne est survenue." });
});

// 🚀 Lancement du serveur
app.listen(port, () => {
  console.log(`[INFO] Server listening on port ${port}`);
});
