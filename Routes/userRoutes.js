const router = require('express').Router();
const Cart = require("../Models/Cart")
const User = require('../Models/Registration')
router.post('/register', async (req, res) => {
    const {Products,Name,Email,Password} = req.body
    const newUser = new User({Products,Name,Email,Password})
    newUser.save()
    .then(user=>{
        console.log(user)
        res.send(user)
    })
    .catch(err=>{
        console.log(err)
        res.status(400).send("Error")
    })
});

router.post('/login',(req,res)=>{
    const {email,Password} = req.body
    User.findOne({Email:email,Password:Password})
    .then(user=>res.send(user))
    .catch(err=>res.status(404).send(err))
})



// router.get('/getUserProducts/:id', async (req, res) => {

//     try{
//         const user = await User.findById(req.params.id);
//         const products = await Product.find({ _id: { $in: user.Products } });
//         res.status(200).json(products);
//     }catch(err){
//         res.status(500).json(err);
//     }
    
// });

router.get('/getAllUsers', async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
});



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

router.delete("/removefromcart/:userId/:productId", async (req, res) => {

    try{
        const userCart = await Cart.findOne({ userId: req.params.userId });
        userCart.Products = userCart.Products.filter(
            (product) => product._id != req.params.productId
        );
        await userCart.save();
        const updatedCart = await Cart.findOne({ userId: req.params.userId });
        res.send(updatedCart);
    }catch(err){
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
    Cart.find({userId:req.params.id})
    .then(items=>res.send(items[0].Products))
    .catch(err=>res.send(err))
})

module.exports = router