const passport = require('passport');
const passportService = require('../services/passport');//login/signup ddbb
const Authentication = require('../controllers/AuthController');;//login/signup ddbb

module.exports = app => {

    //GOOGLE OAUTH
    app.get('/auth/google', 
        passport.authenticate('google',{
        scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', 
        passport.authenticate('google'),
        (req, res)=>{
            res.redirect('/');
        });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });


    //JWT AUTH
    const requireAuth = passport.authenticate('jwt', { session: false});
    const requireSignin = passport.authenticate('local', { session: false });


}
