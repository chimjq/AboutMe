const db = require('../config/dbConn');

class RoleQueries {
    // Get all available roles
    getAllRoles() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM roles";
            db.all(sql, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    // Find a role by its primary key
    findRoleById(roleId) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM roles WHERE id = ?";
            db.get(sql, [roleId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }
}

module.exports = new RoleQueries();