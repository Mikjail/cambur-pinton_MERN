const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductSchema = require('./Product');

const OderSchema = new Schema({
    address: String,
    telephone: String,
    products: [ProductSchema],
    total: {type: Number, default: 0},
    subtotal: {type: Number, default: 0},
    discount: {type:Number, default: 0},
    delivery: { type: Number, default: 0},
    orderDate: Date,
    paymentMethod: Object
});

mongoose.model('orders', OderSchema);