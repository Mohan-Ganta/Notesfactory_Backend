const express = require("express");
const bodyParser = require("body-parser");
const products = require('./Routes/productRoutes');
require('dotenv').config();
require('./db');
const app = express();
app.use(bodyParser.json());

app.use('/products', products);

const PORT = 3000;

app.get("/test", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})