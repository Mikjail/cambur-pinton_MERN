const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');




const Product = mongoose.model('products');

module.exports = app =>{
    
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


    app.post('/api/order', requireLogin, async (req, res)=> {
        const { products, total, discount, orderDate } = req.body;
        const order = new Order({
            products,
            total,
            discount,
            orderDate: Date.now()
        });
        try {
            req.user.orders.push(order);
            const user = await req.user.save();
           } catch (error) {
               res.status(422).send(error);
           }
           res.send(req.user);
    })
}