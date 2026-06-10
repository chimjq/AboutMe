const express = require('express');
const router = express.Router();
const cartQueries = require('../queries/cart');
const orderQueries = require('../queries/order');
const productQueries = require('../queries/product');

const MOCK_USER_ID = 1;

router.get('/', async (req, res) => {
    const MOCK_USER_ID = 1; // Keeping it aligned with our mock session context
    try {
        const history = await orderQueries.findOrderHistoryByUserId(MOCK_USER_ID);
        res.json(history); // Sends a clean JSON array back to Vue
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// The Checkout endpoint orchestrating multiple data-access queries
router.post('/checkout', async (req, res) => {
    try {
        // 1. Fetch active cart items
        const cartItems = await cartQueries.getCartByUserId(MOCK_USER_ID);
        if (cartItems.length === 0) return res.status(400).json({ message: "Cart is empty" });

        // 2. Calculate grand total dynamic amount
        let totalAmount = 0;
        cartItems.forEach(item => {
            totalAmount += item.price * item.quantity;
        });

        // 3. Create the master order ticket ledger entry
        const orderId = await orderQueries.createOrderRecord(MOCK_USER_ID, totalAmount);

        // 4. Process each item loop sequentially (Transaction execution simulation)
        for (const item of cartItems) {
            // Write to historical order lines
            await orderQueries.insertOrderItem(orderId, item.product_id, item.quantity, item.price);
            // Subtract inventory counts from shop shelf
            await productQueries.updateStockCount(item.product_id, item.quantity);
        }

        // 5. Clear shopping bag table data completely
        await cartQueries.clearCart(MOCK_USER_ID);

        res.status(201).json({ success: true, orderId, totalAmount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;