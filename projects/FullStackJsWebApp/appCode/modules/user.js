const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userQueries = require('../queries/user');

router.get('/:email', async (req, res) => {
    try {
        const user = await userQueries.findUserByEmail(req.params.email);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/users/register - Create a new customer account
router.post('/register', async (req, res) => {
    // 1. Pull roleId out of the request payload body along with the other fields
    const { email, password, firstName, lastName, roleId } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required fields." });
    }

    try {
        const saltRounds = 10;
        const securePasswordHash = await bcrypt.hash(password, saltRounds);

        // 2. Fall back to role 1 (Customer) if no explicit roleId is passed
        const assignedRoleId = roleId || 1; 

        // 3. Execute query with the assigned role id parameter
        const newUser = await userQueries.createNewUser(
            email, 
            securePasswordHash, 
            firstName, 
            lastName, 
            assignedRoleId
        );
        
        res.status(201).json({ message: "User account created successfully", user: newUser });
    } catch (error) {
        if (error.message.includes('UNIQUE')) {
            return res.status(409).json({ error: "An account with this email address already exists." });
        }
        res.status(500).json({ error: error.message });
    }
});

// POST /api/users/login - Simple authentication verification checkpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user row matching the input email address
        const user = await userQueries.findUserByEmail(email);
        
        if (!user) {
            return res.status(401).json({ message: "Invalid email credentials or password." });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
        
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid email credentials or password." });
        }

        // Authentication success! Wipes sensitive password data before returning profile payload
        delete user.password_hash;
        res.json({ message: "Login successful!", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;