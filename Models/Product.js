const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    category: {
        type: String,
        category: ['Books', 'SourceCode', 'ArtsandDrawings'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false,
        default: null
    },
    file: {
        type: String,
        required: true,
        default: null
    },
    isPurchased: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Product', ProductSchema);