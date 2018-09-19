const mongoose = require('mongoose');
const Address = mongoose.model('addresses');
const Orders = mongoose.model('orders');
const config = require('../config/keys');
const Mailer = require('../services/Mailer');
const confirmOrderTemplate = require('../services/emailTemplates/confirmOrderTemplate')
class UserController {
    
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
            order.subtotal = ( amount +  parseFloat(config.delivery));
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

            //SEND EMAIL 
            const mailer = new Mailer( req.user.local.email, confirmOrderTemplate({user:req.user, order:newOrder}))
            
            await mailer.send();
            
            res.send(user);
        
           }catch(error){
            res.status(422).send(error);
           }
    }

    
}
module.exports = new UserController;