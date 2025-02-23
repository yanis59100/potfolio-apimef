const db = require("../database/db");

class Product {
  static getAll() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM products";
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM products WHERE id = ?";
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)";
      db.query(query, [data.name, data.description, data.price, data.stock], (err, results) => {
        if (err) reject(err);
        else resolve({ id: results.insertId, ...data });
      });
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?";
      db.query(query, [data.name, data.description, data.price, data.stock, id], (err, results) => {
        if (err) reject(err);
        else resolve({ id, ...data });
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM products WHERE id = ?";
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }
}

module.exports = Product;
