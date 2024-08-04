const mongoose = require('mongoose')
const ProductListSchema = new mongoose.Schema({
   Products:{
      type:Array,
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
  
   isApproved:{
      type: Boolean,
      default: false
   }
});
module.exports = mongoose.model('purchases',ProductListSchema)