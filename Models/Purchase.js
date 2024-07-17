const mongoose = require('mongoose')
const Products = require('./Product');
// const Registration = require('./Registration');

const ProductListSchema = new mongoose.Schema({
   ProductIds:{
      type: Array,
      required: true
   },
   UserId:{
      type: String,
      required: true
   },
   Amount : {
    type: Number,
    required: true
   },
   PaymentUTR :{
    type: String,
    required: true
   },
   PaymentProof:{
    type: String,
    required: true
   },
   Address:{
      type: String,
      required: false,
      default: null
   },
   isApproved:{
      type: Boolean,
      default: false
   }
});
module.exports = mongoose.model('ProductList',ProductListSchema)