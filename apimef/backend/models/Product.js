const db = require("../database/db");

class Product {
  // Note: DB table is `produits` (French). Model adapts to API contract using English field names.
  static getAll() {
    return new Promise((resolve, reject) => {
      const query = "SELECT id, nom, description, prix, stock FROM produits";
      db.query(query, (err, results) => {
        if (err) return reject(err);
        // map DB column names to API-friendly keys
        const mapped = results.map((r) => ({
          id: r.id,
          name: r.nom,
          description: r.description,
          price: parseFloat(r.prix),
          stock: r.stock,
        }));
        resolve(mapped);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT id, nom, description, prix, stock FROM produits WHERE id = ?";
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        const r = results[0];
        if (!r) return resolve(null);
        resolve({ id: r.id, name: r.nom, description: r.description, price: parseFloat(r.prix), stock: r.stock });
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      // Accept API payload with English keys and insert into French-named columns
      const query = "INSERT INTO produits (nom, description, prix, stock) VALUES (?, ?, ?, ?)";
      const prix = typeof data.price === 'number' ? data.price : parseFloat(data.price || 0);
      db.query(query, [data.name, data.description, prix, data.stock || 0], (err, results) => {
        if (err) return reject(err);
        resolve({ id: results.insertId, name: data.name, description: data.description, price: prix, stock: data.stock || 0 });
      });
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE produits SET nom = ?, description = ?, prix = ?, stock = ? WHERE id = ?";
      const prix = typeof data.price === 'number' ? data.price : parseFloat(data.price || 0);
      db.query(query, [data.name, data.description, prix, data.stock || 0, id], (err, results) => {
        if (err) return reject(err);
        resolve({ id: parseInt(id, 10), name: data.name, description: data.description, price: prix, stock: data.stock || 0 });
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM produits WHERE id = ?";
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Product;
