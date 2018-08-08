const mongoose = require('mongoose');
const Address = mongoose.model('addresses');
const Orders = mongoose.model('orders');
const config = require('../config/keys');

class UserController {

    async signup(req, done) {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
       const user = await User.findOne({ 'local.email' :  email });
            try {
               // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, { message:'signupMessage That email is already taken.'});
                } 
        
                // if there is no user with that email
                // create the user
                var newUser  = new User();

                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                const res = await newUser.save()
                
                
                done(null, res);

            } catch (error) {
                  res.status(422).send(error);
            }
            
        
    }
    
    async login(req, done) { 
        
        try {
            res.send(req);

        } catch (error) {
            res.status(422).send(error);
        }
    };



   async updateAddress(req, res, next){
        try{
            const { address } = req.body;
            
            const newAddress = new Address({
                telephone: address.telephone,
                street: address.street,
                number: address.number,
                floor: address.floor,
                apartment: address.apartment,
                zone: address.zone
            });
        
            req.user.addresses.push(newAddress);
            const user = await req.user.save();
            res.send(user);
        
           }catch(error){
            res.status(422).send(error);
           }
           
    }

    async addOrder(req, res){
        try{
            const { order } = req.body;
            let amount=0;

            order.products.forEach(product =>{
                product.properties.forEach(property => {
                    amount += property.cant  * property.price
                })
            })
            order.subtotal = amount + config.delivery;
            order.discount = ( order.subtotal * 0.10).toFixed(2);
            order.total =  ( order.subtotal * 0.90).toFixed(2);

            const newOrder = new Orders({
                address: order.address,
                products: order.products,
                total:  parseFloat(order.total),
                subtotal:  order.subtotal ,
                discount:  parseFloat(order.discount),
                orderDate:  new Date()
            })

            req.user.orders.push(newOrder);
            const user = await req.user.save();

            res.send(user);
        
           }catch(error){
            res.status(422).send(error);
           }
    }

    
}
module.exports = new UserController;