const mongoose = require('mongoose');
const { Schema } = mongoose;
const DeliverySchema = require('./Delivery');

const AddressSchema = new Schema({
    telephone: Number,
    street:{ type: String},
    floor:{ type: String},
    apartment: { type: String},
    zone: {type: String},
    delivery: DeliverySchema
})

mongoose.model('addresses', AddressSchema);