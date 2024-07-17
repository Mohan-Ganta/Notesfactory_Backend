const mongoose = require('mongoose');
const Product = require('./Product');


const UserSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Products:{
        type: Array,
        ref: Product
    }
    
});

module.exports=mongoose.model('User',UserSchema)