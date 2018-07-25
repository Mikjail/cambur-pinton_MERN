const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddressSchema = new Schema({
    telephone: Number,
    street:{ type: String, default: 0},
    number: { type: Number, default: 0},
    floor:{ type: String},
    apartment: { type: String},
    zone: {type: String}
})

mongoose.model('addresses', AddressSchema);