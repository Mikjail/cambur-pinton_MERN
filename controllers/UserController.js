const mongoose = require('mongoose');
const Address = mongoose.model('addresses');


class UserController {

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
}
module.exports = new UserController;