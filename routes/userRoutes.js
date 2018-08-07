const requireLogin = require('../middlewares/requireLogin');
const UserController = require('../controllers/UserController');
 
module.exports = app =>{
    
    app.post("/api/updateAddress", requireLogin, UserController.updateAddress);

}