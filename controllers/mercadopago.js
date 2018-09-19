const MercadoPago = require('mercadopago');
const config  = require('../config/keys');

module.exports = async (req, res, next) => {
  try{

    const { user } = req;
    const { products } = req.body;

    
    const mercadoPago  = new MercadoPago(config.mercadoPago_client_id, config.mercadoPago_client_secret);
    
    let items = parseProduct(products);

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

const parseProduct = function(products){
  let items=[]
  let totalAmount=0;
  
  for (let index = 0; index < products.length; index++) {
    for (let j = 0; j < products[index].properties.length; j++) {
      totalAmount += (products[index].properties[j].cant *  products[index].properties[j].price)
      // let element={};
       
        // element.id = products[index].properties[j]._id;
        // element.title = `${products[index].name} - ${products[index].properties[j].name}`;
        // element.quantity = products[index].properties[j].cant;
        // element.currency_id ='ARS';
        // element.unit_price = products[index].properties[j].price;
        // items.push(element);
    }
  }
  totalAmount +=  parseFloat(config.delivery);
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
