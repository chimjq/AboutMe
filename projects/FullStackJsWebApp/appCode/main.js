const express = require('express');
const cors = require('cors');

// Force runtime execution of database initializers
require('./config/dbConn');

const productRoutes = require('./modules/product');
const cartRoutes = require('./modules/cart');
const orderRoutes = require('./modules/order');
const userRoutes = require('./modules/user');
const roleRoutes = require('./modules/role');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Bind HTTP resource routers
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

app.listen(PORT, () => {
    console.log(`E-Commerce Engine actively running on: http://localhost:${PORT}`);
});