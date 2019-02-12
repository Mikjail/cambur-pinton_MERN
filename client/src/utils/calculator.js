const calculator = {
    calculateSubtotal(products){
        let amount = 0;
        if(products && products.length > 0){
            products.forEach(product=>{
            amount += product.properties.reduce((accum,property) => accum += (property.cant  * property.price),0);
            });
        }
        return amount;   
    }
}

export default calculator;