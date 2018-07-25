const mongoose = require('mongoose');
const { Schema } = mongoose; // const Schema = mongoose.Schema;

const AddressSchema = require('./Address');
const OrderSchema = require('./Order');

const userSchema = new Schema({
    googleId: String,
    name: {type: String, default:""},
    lastName: {type: String, default:""},
    email: {type: String, default:""},
    addresses: [AddressSchema],
    orders: [OrderSchema]
});

mongoose.model('users', userSchema);
