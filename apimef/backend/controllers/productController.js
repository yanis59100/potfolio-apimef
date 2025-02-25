const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.status(200).json(products);
  } catch (err) {
    console.error("Erreur lors de la récupération des produits:", err);
    res.status(500).json({ message: "Erreur lors de la récupération des produits", error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Produit non trouvé" });
    }
  } catch (err) {
    console.error("Erreur lors de la récupération du produit:", err);
    res.status(500).json({ message: "Erreur lors de la récupération du produit", error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Erreur lors de la création du produit:", err);
    res.status(500).json({ message: "Erreur lors de la création du produit", error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.params.id, req.body);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Produit non trouvé pour mise à jour" });
    }
  } catch (err) {
    console.error("Erreur lors de la mise à jour du produit:", err);
    res.status(500).json({ message: "Erreur lors de la mise à jour du produit", error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const result = await Product.delete(req.params.id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Produit supprimé avec succès" });
    } else {
      res.status(404).json({ message: "Produit non trouvé pour suppression" });
    }
  } catch (err) {
    console.error("Erreur lors de la suppression du produit:", err);
    res.status(500).json({ message: "Erreur lors de la suppression du produit", error: err.message });
  }
};
