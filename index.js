const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const config = require('./config/keys');
const bodyParser = require('body-parser');
var flash = require('connect-flash');

require('./models/User');
require('./models/Product');
require('./models/Property');
require('./services/passport');

mongoose.connect(config.mongoDB_URI, (err, res) => {
    if (err) {
    console.log ('ERROR connecting to: ' + config.mongoDB_URI + '. ' + err);
    } else {
    console.log ('Succeeded connected to: ' + config.mongoDB_URI);
    }
  });

const app = express();
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 1000,
        keys: [config.cookieKey] 
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(flash());

require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/orderRoutes')(app);

if(process.env.NODE_ENV === 'production'){
    // 1. Express will serve up prod assets like main.css and main.js
    app.use(express.static('client/build'));
   
    // 2. Express wirll serve up index.html if it doesn't recognize the file 
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);