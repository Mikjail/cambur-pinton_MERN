const mongoose = require('mongoose');
const Product = mongoose.model('products');

class ProductController {

   async getProducts(req,res){
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
    }

    async deleteProduct(req,res){
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
    }


}
module.exports= new ProductController;
