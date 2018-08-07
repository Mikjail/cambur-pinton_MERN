//mongodb://<dbuser>:<dbpassword>@ds153123.mlab.com:53123/camburpintondb
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret : process.env.GOOGLE_CLIENT_SECRET,
    mongoDB_URI : process.env.MONGODB_URI,
    secret: 'mika123',
    cookieKey: process.env.COOKIE_KEY,
    mercadoPago_client_id:process.env.MERCADOPAGO_CLIENT_ID,
    mercadoPago_client_secret:process.env.MERCADOPAGO_CLIENT_SECRET,
    delivery: proccess.env.DELIVERY
}