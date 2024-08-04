const router = require('express').Router();
const Product = require('../Models/Product');
const ProductList = require('../Models/Purchase');
const User = require('../Models/Registration');

router.post('/addProducts', async (req, res) => {
    try{
        const{ category, name, description, cost, image,file } = req.body;
        const newProduct = new Product({ category, name, description, cost, image, file });
        await newProduct.save();
        res.status(200).json(newProduct);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/category/:category', async (req, res) => {
    try{
        const category = req.params.category;
        const products = await Product.find({ category });
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/getAllProducts', async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
});

router.delete('/deleteProduct/:id', async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
});

router.put('/updateProduct/:id', async (req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id);
        product.name = req.body.name;
        product.description = req.body.description;
        product.cost = req.body.cost;
        product.image = req.body.image;
        product.file = req.body.file;
        await product.save();
        res.status(200).json(product);
    
    }catch(err){
        res.status(500).json(err);
    }
});

// router.post('/addProductList/:id', async (req, res) => {
//     try{
//         const product = await Product.find({ _id: id });
//         const{ UserId, Amount, PaymentUTR, PaymentProof, Address } = req.body;
//         const newProductList = new ProductList({ UserId, product, Amount, PaymentUTR, PaymentProof, Address });
//         await newProductList.save();
//         res.status(200).json(newProductList);
//     }catch(err){
//         res.status(500).json(err);
//     }
// });

router.post('/addProductList', async (req, res) => {
    try {
        const userId = req.body.UserId;
        const {UserId, PaymentUTR, PaymentProof, Address } = req.body;
        const user = await User.findById(userId);
        const products = await Product.find({ _id: { $in: user.Products } });
        const amount = products.reduce((total, product) => total + product.cost, 0);
        const newProductList = new ProductList({
            ProductIds: products.map(product => product._id),
            UserId,
            Amount: amount,
            PaymentUTR,
            PaymentProof, 
            Address
        });

        await newProductList.save();
        res.status(200).json(newProductList);
    } catch (err) {
        res.status(500).json(err);
    }
});





module.exports = router