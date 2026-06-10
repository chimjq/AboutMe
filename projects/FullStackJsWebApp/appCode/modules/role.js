const express = require('express');
const router = express.Router();
const roleQueries = require('../queries/role');

// GET /api/roles - Fetch all structured system roles
router.get('/', async (req, res) => {
    try {
        const roles = await roleQueries.getAllRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;