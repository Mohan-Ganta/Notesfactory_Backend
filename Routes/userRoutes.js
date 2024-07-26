const router = require('express').Router();
const User = require('../Models/Registration');
const Product = require('../Models/Product');
const Cart = require("../Models/Cart")

router.post('/register', async (req, res) => {
    try{
        const{ Name, Email, Password } = req.body;
        const newUser = new User({ Name, Email, Password });
        await newUser.save();
        res.status(200).json(newUser)
    }catch(err){
        res.status(500).json(err);
    }
});

<<<<<<< HEAD
router.get("/loginuser/:email/:password",(req,res)=>{
    User.findOne({email:req.params.email,password:req.params.password})
    .then(user=>{
        res.send(user)
    })
    .catch(err=>res.send("Invalid Credentials"))
})
router.post('/addItem/:id',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
    
        const{category,name,description,cost,image,file} = req.body;
        const newProduct = new Product({category,name,description,cost,image,file});
        await newProduct.save();
        user.Products.push(newProduct);
        await user.save();
        res.status(200).json(newProduct);
    }catch(err){    
        res.status(500).json(err);
    }
});
=======
// router.post('/addtocart/:id',async(req,res)=>{
//     try{
//         const user = await User.findById(req.params.id);
//         const{userId,Products} = req.body;
//         const newProduct = new Cart({userId,Products});
//         await newProduct.save();
//         newProduct.Products.push(newProduct);
//         //await user.save();
//         //const products = await Product.find({ _id: { $in: user.Products } });
//         res.status(200).json(Products);
//     }catch(err){    
//         res.status(500).json(err);
//     }
// });

>>>>>>> e11a2ab7e9a7b6345fe269a1fc218f3bf998ef5c

router.get('/getUserProducts/:id', async (req, res) => {

    try{
        const user = await User.findById(req.params.id);
        const products = await Product.find({ _id: { $in: user.Products } });
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
    
});

router.get('/getAllUsers', async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
});


<<<<<<< HEAD

=======
// router.post("/addtocart/:id",(req,res)=>{
//     Cart.find({userid:req.params.id})
//     const {userid,Products} = req.body;
//     const newProduct = new Cart({userid,Products});
//     newProduct.save()
//     .then(items=>res.send(items))
//     .catch(err=>err.send(err))
// });

router.post("/addtocart/:id", async (req, res) => {
    const { userId, Products } = req.body;

    try {
        let userCart = await Cart.findOne({ userId: req.params.id });

        if (userCart) {
            userCart.Products = userCart.Products.concat(Products);
        } else {
            userCart = new Cart({ userId, Products });
        }
        await userCart.save();
        const updatedCart = await Cart.findOne({ userId: req.params.id });
        res.send(updatedCart);
    } catch (err) {
        res.status(500).send(err);
    }
});

// router.post("/isApproved/removeFromCart/:id", async (req, res) => {
//     const { products } = req.body;

//     try {
//         let userCart = await Cart.findOne({ userId: req.params.id });
//         userCart.Products = userCart.Products.filter(
//             (product) => !products.includes(product._id)
//         );
//         await userCart.save();
//         const updatedCart = await Cart.findOne({ userId: req.params.id });
//         res.send(updatedCart);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });



router.get("/getcartitems/:id",(req,res)=>{
    Cart.find({userid:req.params.id})
    .then(items=>res.send(items))
    .catch(err=>err.send(err))
})
>>>>>>> e11a2ab7e9a7b6345fe269a1fc218f3bf998ef5c
module.exports = router