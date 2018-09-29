const mongoose = require('mongoose');
const { Schema } = mongoose;

const DeliverySchema = new Schema({
    lat: {type: String},
    lng: {type: String},
    radius: {type: String}
})
mongoose.model('deliveries', DeliverySchema);