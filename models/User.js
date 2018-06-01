const mongoose = require('mongoose');
const { Schema } = mongoose; // const Schema = mongoose.Schema;

const OrderSchema = require('./Order');

const userSchema = new Schema({
    googleId: String,
    orders: [OrderSchema]
});

mongoose.model('users', userSchema);
