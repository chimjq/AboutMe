const db = require('../config/dbConn');

class OrderQueries {
    createOrderRecord(userId, totalAmount) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO orders (user_id, total_amount, order_status) VALUES (?, ?, 'Paid')";
            db.run(sql, [userId, totalAmount], function(err) {
                if (err) reject(err);
                else resolve(this.lastID); // Returns the generated Order ID
            });
        });
    }

    insertOrderItem(orderId, productId, quantity, priceAtPurchase) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)";
            db.run(sql, [orderId, productId, quantity, priceAtPurchase], function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    }

    findOrderHistoryByUserId(userId) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC";
            db.all(sql, [userId], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
}

module.exports = new OrderQueries();