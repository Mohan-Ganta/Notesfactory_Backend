const express = require("express");
const bodyParser = require("body-parser");
const products = require('./Routes/productRoutes');
const cors = require('cors')
const users = require('./Routes/userRoutes');
const purchaseRoutes = require('./Routes/purchaseRoutes')
const adminRouter = require('./Routes/adminRoutes')
require('dotenv').config();
require('./db');
const app = express();
app.use(bodyParser.json());
app.use(cors())

app.use('/products', products);
app.use('/users', users);
app.use('/purchases',purchaseRoutes)
app.use('/admin',adminRouter)
const PORT = 5000;

app.get("/test", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})