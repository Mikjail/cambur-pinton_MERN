import axios from 'axios';
import {FETCH_USER, 
    FETCH_PRODUCTS, 
    FETCH_ORDER, 
    AUTH_USER,
    FETCH_MERCADOPAGO,
    ALERT_MESSAGE,
    LOADER} from './types';



export const fetchOrder = () =>async (dispatch) =>{

        const order = JSON.parse(localStorage.getItem("order"));

        dispatch({ type: FETCH_ORDER , payload: order})   

}

export const fetchPaylink = () => async(dispatch) =>{

        const mercadopago = localStorage.getItem("mercadopago");

        dispatch({ type: FETCH_MERCADOPAGO , payload: mercadopago})   
 
}
export const currentUser = () => (dispatch) =>{
    try{
        const user = JSON.parse(localStorage.getItem("user"));

        dispatch({type: FETCH_USER, payload: user })
    
    } catch (error) {
        console.log(error)     
    }
}

export const fetchProducts = () =>async (dispatch) =>{
    try {    

        let products = JSON.parse(localStorage.getItem("order"));
        localStorage.removeItem("order");
        localStorage.removeItem("total");
        localStorage.removeItem("mercadopago");

        if(!products){
            const res = await axios.get('./api/products');
            products = res.data;
        }
        
        dispatch({ type: FETCH_PRODUCTS , payload: products})  
    } catch (error) {
        console.log(error)
    }
}




export const addProduct = (order) =>async (dispatch) =>{
    try {    
        
        dispatch({ type: FETCH_PRODUCTS , payload: [...order]})  
    } catch (error) {
        console.log(error)
    }
}


export const onCheckout = (values, history) => async (dispatch) =>{

    try{
        dispatch({ type: LOADER, payload:true});
        const res = await axios.post("/api/checkout", {products: values});
        localStorage.setItem("mercadopago", res.data.response.init_point)

        history.push({
            pathname: '/order/checkout',
        });

    }catch (error) {
        history.push({
            pathname: '/order/checkout',
        });
    }
};


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

        const res = await axios.get('/api/current_user')

        const user = res.data?JSON.stringify(res.data): ""
        
        localStorage.setItem("user",user);
        
        dispatch({type: FETCH_USER, payload: res.data })
        
    } catch (error) {
        console.log(error)     
    }
    
}   

// ADD ADDRESS
export const onSubmitAddress = (values,action, props) => async dispatch =>{
    dispatch({ type: LOADER, payload:true});
    try{
        const res = await axios.post('/api/updateAddress', {address: values});
    
        localStorage.setItem("user",JSON.stringify(res.data));
        localStorage.setItem("address",res.data.addresses[0]._id);
        
        props.changeStatus(true);
    
        dispatch({ type: LOADER, payload:false});
        dispatch({ type : FETCH_USER, payload: res.data});
    }catch(error){
        
        dispatch({ type: LOADER, payload:false});
    }
    
};


//ADD ORDER
export const onSubmitOrder = (history) => async dispatch =>{

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

    const address = user.addresses.filter(address =>{
        return address._id == localStorage.getItem("address");
    })

    valueToSend.address =`${address[0].street} ${address[0].number}  ${address[0].floor}${address[0].apartment} -  ${address[0].zone}` ;
    
    try{
        const res = await axios.post('/api/submitOrder', {order : valueToSend});
        

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


