const mongoose = require('mongoose');
const { Schema } = mongoose; // const Schema = mongoose.Schema;

const propertiesSchema = new Schema({
    cant: { type: Number, default: 0},
    name: String,
    description: String,
    img: String,
    ingredients: [String],
    price: {type: Number, defualt: 0 },
    
})

mongoose.model('properties', propertiesSchema);