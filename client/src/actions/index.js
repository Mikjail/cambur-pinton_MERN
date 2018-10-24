import axios from 'axios';
import { 
    FETCH_PRODUCTS, 
    FETCH_ORDER, 
    AUTH_USER,
    FETCH_MERCADOPAGO,
    ALERT_MESSAGE,
    DELIVERY,
    CHECKED_ADDRESS,
    COMPONENT_LOADER,
    LOADER} from './types';

/***********************FOOD SECTION*****************************/


//Get current user
export const currentUser = () => (dispatch) =>{
    try{
        const user = JSON.parse(localStorage.getItem("user"));

        dispatch({type: AUTH_USER, payload: user })
    
    } catch (error) {
        localStorage.removeItem('user');
        
        console.log(error)     
    }
}

//Get Products
export const fetchProducts = () =>async (dispatch) =>{
    try {    

        let products = JSON.parse(localStorage.getItem("order"));

        if(!products){
            const res = await axios.get('./api/products');
            products = res.data;
        }
        
        dispatch({ type: FETCH_PRODUCTS , payload: [...products]})  
    } catch (error) {
        console.log(error)
    }
}

//Add/update product cant
export const addProduct = (order) =>async (dispatch) =>{
    try {    
        
        dispatch({ type: FETCH_PRODUCTS , payload: [...order]})  
    } catch (error) {
        console.log(error)
    }
}

//Clear Order 
export const clearProducts = () => async dispatch =>{
    try {
        localStorage.removeItem("order");
        dispatch({ type: FETCH_PRODUCTS , payload: [...[]]})  
    } catch (error) {
        console.log(error)
    }
}



/***********************LOGIN/SIGNUP*****************************/

// SIGNUP
export const onSignup= ({email, password}, action, {history} ) => async(dispatch) =>{
    
    try {
        dispatch({ type: LOADER, payload:true});
        const res = await axios.post('/api/signup', {email, password} )
        
        localStorage.setItem('user', JSON.stringify(res.data));
        
        history.push({
            pathname: '/order',
        });

        dispatch({ type: AUTH_USER , payload: res.data});
        dispatch({ type: LOADER, payload:false});

        }catch({response}){
            if(response.data){
                const {data } = response.data;
                dispatch({type: ALERT_MESSAGE, payload: data})
                dispatch({ type: LOADER, payload:false});
            }
        }
   
}

// LOGIN
export const onLogin= (user, password,history) => async(dispatch) =>{
   
    try {
        
        dispatch({ type: ALERT_MESSAGE, payload:""});
        dispatch({ type: LOADER, payload:true});

        const res = await axios.post('/api/login', {email:user, password:password} )

        localStorage.setItem('user', JSON.stringify(res.data));
           
        history.push({
            pathname: '/order',
        });

        dispatch({ type: AUTH_USER , payload: res.data});
        dispatch({ type: LOADER, payload:false});

    }catch({response}){
        if(response.data){
            const {data } = response.data;
           
            dispatch({type: ALERT_MESSAGE, payload: data})
            dispatch({ type: LOADER, payload:false});
        }
    }
}

// CURRENT USER
export const fetchUser =  () =>async (dispatch) => {
    // dispatch is coming thanks to redux-thunk so we don't have to 
    try {

        const res = await axios.get('/api/current_user');
        
        const user = res.data ? JSON.stringify(res.data): ''

        localStorage.setItem("user",user);
        
        dispatch({type: AUTH_USER, payload: res.data })
        
    } catch (error) {
        console.log(error)     
    }
    
}   

/***********************CHECKOUT*****************************/


/**********************************/
/**********************************/
/*********SUMMARY PANNEL***********/
/**********************************/
/**********************************/

//UPDATE LIST CHECKED ADDRESS
export const setCheckedAddress = (value) => async dispatch => {    
    dispatch({type: CHECKED_ADDRESS, payload: value});
}

//ADD DELIVERYSTATUS
export const addDeliveryStatus = (value) => async dispatch =>{
    dispatch({type: DELIVERY, payload: value});
}


//get orders saved in localstorage
export const fetchOrder = () =>async (dispatch) =>{

    const order = JSON.parse(localStorage.getItem("order"));

    dispatch({ type: FETCH_ORDER , payload: order})   

}

//Apply order to mercadolibre
export const onCheckout = (delivery) => async (dispatch) =>{
    try{
        let products = JSON.parse(localStorage.getItem("order"));
        let newProduct= products.filter(product=>{
            return product.properties.find((property)=>{
                if(property.cant > 0){
                    return product;
                }
            })
        })

        for (const product of newProduct) {
            product.properties =  product.properties.filter(property =>{
                if(property.cant > 0){
                    return property;
                }
            })
        }
        
        
        dispatch({ type: COMPONENT_LOADER, payload:true});
        
        const res = await axios.post("/api/checkout", {products: newProduct, delivery: delivery.radius });
    
        if(res.data.response){
            localStorage.setItem("mercadopago", res.data.response.init_point);
            dispatch({ type: FETCH_MERCADOPAGO , payload: res.data.response.init_point})   
        }
        
        
        dispatch({ type: COMPONENT_LOADER, payload:false});
 

    }catch (error) {
        console.log(error);
        dispatch({ type: COMPONENT_LOADER, payload:false});
    }
};

// ADD ADDRESS
export const onSubmitAddress = (values, action, props) => async dispatch =>{
    try{
        let addressToSend = {
            zone:  values.street.split(',')[1].trim(),
            ...values
        }
        addressToSend.street = addressToSend.street.split(',')[0].trim();
        addressToSend.delivery = props.delivery

        dispatch({ type: LOADER, payload:true});

        const res = await axios.post('/api/updateAddress', {address: addressToSend});
        

        dispatch({ type: CHECKED_ADDRESS, payload:res.data.addresses[res.data.addresses.length -1]._id})
        dispatch({ type: DELIVERY , payload: res.data.addresses[res.data.addresses.length -1].delivery})
        localStorage.setItem("user",JSON.stringify(res.data));
        props.availableAddressStatus(true);
        props.addressSelectedStatus(true);
        
        dispatch({ type: LOADER, payload:false});
        dispatch({ type : AUTH_USER, payload: res.data});
       
    }catch(error){
        
        dispatch({ type: LOADER, payload:false});
    }
    
};

//REMOVE ADDRESS
export const removeAddress = (values, props) => async dispatch =>{
    try {
        dispatch({ type: LOADER, payload:true});
        const res = await axios.post('/api/deleteAddress', {id: values});

       

        if(res.data.addresses.length < 1){
            props.availableAddressStatus(false);
            props.addressSelectedStatus(false);
        }else{
            props.availableAddressStatus(true);
            dispatch({ type: CHECKED_ADDRESS, payload:res.data.addresses[0]._id })
        }

        localStorage.setItem("user",JSON.stringify(res.data));
      
        dispatch({ type: LOADER, payload:false});
        dispatch({ type : AUTH_USER, payload: res.data});

    } catch (error) {
        console.log(error)
        dispatch({ type: LOADER, payload:false});
    }
}




//ADD ORDER
export const onSubmitOrder = (history,props) => async dispatch =>{

    dispatch({ type: LOADER, payload:true});
    const order = JSON.parse(localStorage.getItem("order"));
    const user = JSON.parse(localStorage.getItem("user"));
    const valueToSend = {
        products: [],
        address:""
    }
    
    order.forEach(elem =>{
        elem.properties = elem.properties.filter(property =>{
           return property.cant > 0 
        })
        if(elem.properties.length>0){
            valueToSend.products.push(elem);
        }
    })

    const address = user.addresses.find(address =>{
        return address.delivery._id === props.delivery._id
    })

    valueToSend.address =`${address.street} ${address.floor}${address.apartment} -  ${address.zone}` ;
    
    try{
        
        await axios.post('/api/submitOrder', {order : valueToSend, delivery: props.delivery.radius});
        

        history.push({
            pathname: '/order/success',
            
        });
        dispatch({ type: LOADER, payload:false});

    }catch(response){
        if(response.data){
            const { data } = response.data;

            dispatch({type: ALERT_MESSAGE, payload: data })
            dispatch({ type: LOADER, payload:false});
        }
    }
}


/**********************************/
/**********************************/
/*********PAYMENT PANEL************/
/**********************************/
/**********************************/

//get paymentlink
export const fetchPaylink = () => async(dispatch) =>{

    const mercadopago = localStorage.getItem("mercadopago");

    dispatch({ type: FETCH_MERCADOPAGO , payload: mercadopago})   

}

/***********************ERROR MESSAGE SERVICE*****************************/

export const displayError = (value) => async dispatch =>{
    dispatch({type: ALERT_MESSAGE, payload: value })
}
