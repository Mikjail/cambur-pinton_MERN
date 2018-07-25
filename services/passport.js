const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = mongoose.model('users');


//AUTH

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', { session: false });

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
       const existingUser = await User.findOne({ googleId: profile.id})  
        if(existingUser){
            return done(null, existingUser);
        }
        
        const user = await new User({ googleId: profile.id, 
                                        name: profile.name.givenName || "", 
                                        lastName: profile.name.familyName || "",
                                        email: profile.emails[0].value || ""  }).save()
        done(null, user);                    
        
    })
);

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.secret
};

//Create JWT Strategyx
passport.use(new JwtStrategy(jwtOptions, function(payload, done){
    // See if the user ID and payload exist in ou ddbb
    // if it does call done with that user
    // otherwise, call done without userObject
    User.findById(payload.sub, function(err, user){ 
        if(err){ return done(err, false);}

        if(user){ 
            return done(null, user);
        }
        else{ 
            return done(null, false);
        }
    })

})
);

