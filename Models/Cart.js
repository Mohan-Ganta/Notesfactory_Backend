const mongoose = require("mongoose")
const cartSchema = new mongoose.Schema({
    userId : {type:String},
    products : {type:Array}
})
const Cart = mongoose.model("cartitems",cartSchema)
module.exports = Cart
