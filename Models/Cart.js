const mongoose = require("mongoose")
const cartSchema = new mongoose.Schema({
    userId : {type:Array},
    products : {type:String}
})
const Cart = mongoose.model("cartitems",cartSchema)
module.exports = Cart
