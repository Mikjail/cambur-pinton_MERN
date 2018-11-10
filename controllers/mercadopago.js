const mercadopago = require('mercadopago');
const config  = require('../config/keys');

module.exports = async (req, res, next) => {
  try{

    const { user } = req;
    const { products, delivery } = req.body;

  
    //  mercadopago.configure({client_id:config.mercadoPago_client_id, client_secret: config.mercadoPago_client_secret});
    mercadopago.configure({'client_id': '8075613250763653', 'client_secret': 'vQsdgo6VhnL4Aebo0touuJrV90HW2Ova'})
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
        success: 'https://cambur-pinton.com/proccess',
        failure: 'https://cambur-pinton.com/failure'
      },
      auto_return: "all"
    };
    
  
    const prefRes = await mercadopago.preferences.create(preference);
    

    res.send(prefRes);
  }catch(error){
    console.log(error)
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

  const DELIVERY_ENV = JSON.parse(config.delivery);
  
  totalAmount +=  parseFloat(DELIVERY_ENV[delivery]);
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
