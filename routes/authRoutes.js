const passport = require('passport');
const UserController = require('../controllers/UserController');

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
            res.redirect('/order');
        });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });


    //LOCAL STRATEGY
    
    app.post('/api/signup',(req, res, next) => { 
        passport.authenticate('local-signup',(err, user, info)=> {
            if (err) {
              return next(err);
            }
            if (!user) {
              return res.status(401).json(info);
            }
            req.logIn(user, function(err) {
              if (err) {
                return next(err);
              }
              return res.json(user);
            });

    })(req, res, next)
})
    

    
    app.post('/api/login',  (req, res, next) => {
        passport.authenticate('local',(err, user, info)=> {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json(info);
            }
            req.logIn(user, function(err) {
                if (err) {
                return next(err);
                }
                return res.json(user);
            });
        })(req, res, next)
    });

}