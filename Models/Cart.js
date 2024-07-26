const mongoose = require("mongoose")
//const Product = require("./Product")

const cartSchema = new mongoose.Schema({
<<<<<<< HEAD
    userId : {type:String},
    products : {type:Array}
=======
   userId:{
      type:String
   },
   Products:{
      type:Array
   }
>>>>>>> e11a2ab7e9a7b6345fe269a1fc218f3bf998ef5c
})
const Cart = mongoose.model("cartitems",cartSchema)


module.exports = Cart;
