
const mongoose = require('mongoose');
const { Schema } = mongoose; // const Schema = mongoose.Schema;
const PropertySchema = require('./Property');

const productSchema = new Schema({
    name: { type: String},
    class: { type: String},
    properties: [PropertySchema]
})

mongoose.model('products', productSchema);