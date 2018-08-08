const mercadopago = require('mercadopago');
const config  = require('../config/keys');

module.exports = async (req, res, next) => {
  try{
    const { user } = req;
    const { products } = req.body;


    mercadopago.configure({
        client_id: config.mercadoPago_client_id,
        client_secret: config.mercadoPago_client_secret
    });

    let items = parseProduct(products);
    // Create a preference structure
    let preference = {
    items: items,
      payer: {
        "name": user.name,
        "surname": user.lastName ,
        "email": user.email
      },
    };

    const prefRes = await mercadopago.preferences.create(preference);
    res.send(prefRes);
  }catch(error){
    // If an error has occurred
    res.send(error)
  }
};

const parseProduct = function(products){
  let items=[]
  for (let index = 0; index < products.length; index++) {
    for (let j = 0; j < products[index].properties.length; j++) {
        let element={};
        element.id = products[index].properties[j]._id;
        element.title = `${products[index].name} - ${products[index].properties[j].name}`;
        element.quantity = products[index].properties[j].cant;
        element.currency_id ='ARS';
        element.unit_price = products[index].properties[j].price;
        items.push(element);
    }
  }
  return items;
}