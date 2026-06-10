const express = require('express');
const router = express.Router();
const productQueries = require('../queries/product');

router.get('/', async (req, res) => {
    try {
        const products = await productQueries.findAllActiveProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await productQueries.findProductById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { name, description, price, stock_quantity } = req.body;
    
    // Simple verification check
    if (!name || price === undefined || stock_quantity === undefined) {
        return res.status(400).json({ message: "Required product elements are missing." });
    }

    try {
        // Execute our predefined Data Access Layer function
        const newProduct = await productQueries.createNewProduct(name, description, price, stock_quantity);
        
        // Return 201 Created status code along with the structured payload
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;