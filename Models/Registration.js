const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name : {type:String},
    Email : {type:String,unique:true},
    Password : {type:String},
    Products : {
        type:Array,
        default:[]
    }
});

module.exports = mongoose.model('users', userSchema);
