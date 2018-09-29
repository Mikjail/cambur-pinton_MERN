const MercadoPago = require('mercadopago');
const config  = require('../config/keys');

module.exports = async (req, res, next) => {
  try{

    const { user } = req;
    const { products, delivery } = req.body;

    
    const mercadoPago  = new MercadoPago(config.mercadoPago_client_id, config.mercadoPago_client_secret);
    
    let items = parseProduct(products,delivery);

    // Create a preference structure
    let preference = {
    items: items,
      payer: {
        "name": user.name,
        "surname": user.lastName ,
        "email": user.local.email
      },
      payment_methods:{
        excluded_payment_types:[
          { id: "ticket" },
          { id: "atm" },
          { id: "prepaid_card"}]
      },
      back_urls:{
        success: 'https://guarded-savannah-73486.herokuapp.com/order/success',
        failure: 'https://guarded-savannah-73486.herokuapp.com/order/failure'
      }
    };

    const prefRes = await mercadoPago.createPreference(preference);


    res.send(prefRes);
  }catch(error){
    // If an error has occurred
    res.send(error)
  }
};

const parseProduct = (products,delivery) => {
  let items=[]
  let totalAmount=0;
  
  for (let index = 0; index < products.length; index++) {
    totalAmount += products[index].properties.reduce((total, product) => total += (product.cant * product.price),0);
  }

  totalAmount +=  parseFloat(config.delivery[delivery]);
  totalAmount =  totalAmount * 0.90;
  let element = {
    id: "1",
    title: 'Cambur Pinton - Compra web',
    quantity: 1,
    currency_id: 'ARS',
    unit_price: totalAmount,
  }
  
  items.push(element);
  
  return items;
}
