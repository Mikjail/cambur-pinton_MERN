const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const mercadopago = require('../controllers/mercadopago');
const UserController = require('../controllers/UserController')


const Product = mongoose.model('products');

module.exports = app =>{
    
    app.get('/api/products', async (req,res) =>{
        try{
            const products = await Product.find()
            res.send(products);
        }catch(error){
            res.send({
                status: 409,
                message: 'Request could not be completed. Check the id',
                data: ''
            })
        }
    })

    app.delete('/api/products',requireLogin,async (req, res)=>{
        try{
            const mongoResult = await Product.findByIdAndRemove(req.query[0]).exec();
            res.send(mongoResult);
        }catch(error){
            res.send({
                status: 409,
                message: 'Request could not be completed. Check the id',
                data: ''
            })
        }
        
    })

    app.post("/api/checkout", requireLogin, mercadopago);


    app.post("/api/updateAddress", requireLogin, UserController.updateAddress);

}