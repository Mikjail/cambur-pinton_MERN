const mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
const { Schema } = mongoose; // const Schema = mongoose.Schema;

const AddressSchema = require('./Address');
const OrderSchema = require('./Order');

let userSchema = new Schema({
    local: {  email:String, password: String},
    google: { googleId: String },
    name: {type: String, default:""},
    lastName: {type: String, default:""},
    addresses: [AddressSchema],
    orders: [OrderSchema]
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = (password, localPassword)=>{
    return bcrypt.compareSync(password, localPassword);
};


mongoose.model('users', userSchema);
