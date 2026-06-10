const db = require('../config/dbConn');

class UserQueries {
    findUserByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get("SELECT users.*, roles.role_name as role_name FROM users LEFT JOIN roles ON users.role_id = roles.id WHERE users.email = ?", [email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    createNewUser(email, passwordHash, firstName, lastName, roleId = 1) { // Defaults to 1 (Customer)
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO users (email, password_hash, first_name, last_name, role_id) 
                VALUES (?, ?, ?, ?, ?)
            `;
            
            db.run(sql, [email, passwordHash, firstName, lastName, roleId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ 
                        id: this.lastID, 
                        email, 
                        first_name: firstName, 
                        last_name: lastName,
                        role_id: roleId
                    });
                }
            });
        });
    }
}

module.exports = new UserQueries();