const requireLogin = require('../middlewares/requireLogin');
const mercadopago = require('../controllers/mercadopago');
const ProductController = require('../controllers/ProductController');
const UserController = require('../controllers/UserController')

module.exports = app =>{
    
    app.get('/api/products', ProductController.getProducts)

    app.delete('/api/products',requireLogin, ProductController.deleteProduct)
        
    app.post("/api/checkout", requireLogin, mercadopago);

    app.post("/api/submitOrder", requireLogin, UserController.addOrder);
}