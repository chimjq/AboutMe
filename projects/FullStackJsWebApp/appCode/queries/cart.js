const db = require('../config/dbConn');

class CartQueries {
    getCartByUserId(userId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT c.id, c.product_id, c.quantity, p.name, p.price 
                FROM cart_items c
                JOIN products p ON c.product_id = p.id
                WHERE c.user_id = ?
            `;
            db.all(sql, [userId], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    addItemToCart(userId, productId, quantity) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)";
            db.run(sql, [userId, productId, quantity], function(err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, userId, productId, quantity });
            });
        });
    }

    clearCart(userId) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM cart_items WHERE user_id = ?", [userId], function(err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });
    }
    deleteCartItem(cartItemId) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM cart_items WHERE id = ?";
            
            db.run(sql, [cartItemId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    // "this.changes" returns the number of rows affected by the SQL command
                    resolve({ 
                        success: true, 
                        rowsAffected: this.changes 
                    });
                }
            });
        });
    }
}

module.exports = new CartQueries();