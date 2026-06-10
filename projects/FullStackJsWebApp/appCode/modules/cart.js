const express = require('express');
const router = express.Router();
const cartQueries = require('../queries/cart');

// For simplicity, we mock a user ID from a session or token (User ID: 1)
const MOCK_USER_ID = 1;

router.get('/', async (req, res) => {
    try {
        const cart = await cartQueries.getCartByUserId(MOCK_USER_ID);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const item = await cartQueries.addItemToCart(MOCK_USER_ID, productId, quantity);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const cartItemId = req.params.id;

    try {
        // Execute the predefined DAL query routine
        const result = await cartQueries.deleteCartItem(cartItemId);
        
        // Validation: Check if the row actually existed before running the delete
        if (result.rowsAffected === 0) {
            return res.status(404).json({ 
                success: false, 
                message: "Item not found. It may have already been deleted." 
            });
        }

        res.json({ 
            success: true, 
            message: "Item removed from cart table successfully." 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

module.exports = router;