const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

//GOOGLE OAUTH

//is what is saved from google auth
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id).then(user =>{
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
       const existingUser = await User.findOne({ "local.email": profile.emails[0].value})  
        if(existingUser){
            if(existingUser.google.googleId){
                return done(null, existingUser);
            }
        }
        
        const user = await new User({   
                                        google: { googleId: profile.id}, 
                                        name: profile.name.givenName || "", 
                                        lastName: profile.name.familyName || "",
                                        local: {email: profile.emails[0].value || "" }
                                    })
        user.local.password = user.generateHash((Math.floor(Math.random() * 10000)).toString(36));
        await user.save();
        done(null, user);                    
        
    })
);

const localOptions = { usernameField: 'email',passwordField: 'password'};

passport.use(new LocalStrategy(
    localOptions,
    async (username, password, done) => {
    try{
       const user = await User.findOne({"local.email":username});
            
            if (!user) {
              return done(null, false, { data: "Username doesn't exist." });
            }
            if(user.local.password){
                if (!user.validPassword(password, user.local.password)) {
                    return done(null, false, { data: 'Incorrect password.' });
                  }
            }
            return done(null, user);     
        
    }catch(err){
        return done(err);
    }
      
}));


passport.use('local-signup', new LocalStrategy(localOptions,
async (email, password, done) => {
    let user = await User.findOne({"local.email": email})
    if(user) {
        console.log('user already exists');
        return done(null, false,  {data: 'That email is already in use.'});
    }
    else {
        let newUser = await new User({local: {email: email || ""  }});
        newUser.local.password = newUser.generateHash(password);

        let newUserVal = await newUser.save();
        if(newUser) {
            return done(null, newUserVal);
            
            }
        else{

            return done(null, false, {data: 'Please fill all fields'});
        }
    }
}));

