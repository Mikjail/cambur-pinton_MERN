//mongodb://<dbuser>:<dbpassword>@ds153123.mlab.com:53123/camburpintondb
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret : process.env.GOOGLE_CLIENT_SECRET,
    mongoDB_URI : process.env.MONGODB_URI,
    cookieKey: process.env.COOKIE_KEY
}