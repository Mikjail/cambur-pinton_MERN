const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductSchema = require('./Product');

const OderSchema = new Schema({
    products: [ProductSchema],
    total: {type: Number, default: 0},
    discount: {type:Number, default: 0},
    orderDate: Date
});

mongoose.model('orders', OderSchema);