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


router.post("/addtocart/:id",(req,res)=>{
    const {userId,products} = req.body
    const cartItem = new Cart({userId,products})
    cartItem.save()
    .then(item=>res.send(item))
    .catch(err=>res.send(err))
})
router.get("/getcartitems/:id",(req,res)=>{
    cart.find({userid:req.params.id})
    .then(items=>res.send(items))
    .catch(err=>err.send(err))
})
module.exports = router