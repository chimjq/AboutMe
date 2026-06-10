const db = require('../config/dbConn');

class ProductQueries {
    findAllActiveProducts() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM products WHERE stock_quantity > 0", [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    findProductById(id) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    updateStockCount(productId, quantity) {
        return new Promise((resolve, reject) => {
            db.run("UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?", [quantity, productId], function(err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });
    }

    createNewProduct(name, description, price, stockQuantity) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO products (name, description, price, stock_quantity) 
                VALUES (?, ?, ?, ?)
            `;
            
            db.run(sql, [name, description, price, stockQuantity], function (err) {
                if (err) {
                    reject(err);
                } else {
                    // Return the complete object payload including the newly generated SQLite identity ID
                    resolve({ 
                        id: this.lastID, 
                        name, 
                        description, 
                        price, 
                        stock_quantity: stockQuantity 
                    });
                }
            });
        });
    }
}

module.exports = new ProductQueries();