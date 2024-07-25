const mongoose = require("mongoose")
//const Product = require("./Product")

const cartSchema = new mongoose.Schema({
   userId:{
      type:String
   },
   Products:{
      type:Array
   }
})
const Cart = mongoose.model("cartitems",cartSchema)


module.exports = Cart;
