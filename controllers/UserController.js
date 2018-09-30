const mongoose = require('mongoose');
const Address = mongoose.model('addresses');
const Delivery = mongoose.model('deliveries');
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
            const { telephone,street, floor, apartment, zone, delivery } = req.body.address;
            const newDelivery = new Delivery(delivery);

            const newAddress = new Address({
                telephone,
                street,
                floor,
                apartment,
                zone,
                delivery: newDelivery
            });
        
            req.user.addresses.push(newAddress);
            const user = await req.user.save();
            res.send(user);
        
           }catch(error){
            res.status(422).send(error);
           }
           
    }

    async deleteAddress(req, res, next){
        try {
            const { id } = req.body;

            let index = req.user.addresses.findIndex(address => address._id === id )
            req.user.addresses.splice(index ,1);

            const user = await req.user.save();

            res.send(user);

        } catch (error) {
            res.status(422).send(error);
        }
    }

    async addOrder(req, res){
        try{
            const { order,delivery } = req.body;
            let amount=0;

            order.products.forEach(product =>{
                product.properties.forEach(property => {
                    amount += property.cant  * property.price
                })
            })
            const DELIVERY_ENV = JSON.parse(config.delivery);
            order.delivery =  parseFloat(DELIVERY_ENV[delivery])
            order.subtotal =  amount +   order.delivery;
            order.discount = ( order.subtotal * 0.10).toFixed(2);
            order.total =  ( order.subtotal * 0.90).toFixed(2);

            const newOrder = new Orders({
                address: order.address,
                products: order.products,
                total:  parseFloat(order.total),
                subtotal:  order.subtotal ,
                delivery: order.delivery,
                discount:  parseFloat(order.discount),
                orderDate:  new Date()
            })

            req.user.orders.push(newOrder);
            
            const user = await req.user.save();
            
            //SEND EMAIL 
            const mailer = new Mailer( req.user.local.email, confirmOrderTemplate({order:newOrder}))
            
            await mailer.send();
            
            res.send(user);
        
           }catch(error){
            res.status(422).send(error);
           }
    }

    
}
module.exports = new UserController;