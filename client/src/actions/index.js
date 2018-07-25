import axios from 'axios';
import {FETCH_USER, FETCH_PRODUCTS, FETCH_ORDER} from './types';


export const fetchUser =  () =>async (dispatch) => {
    // dispatch is coming thanks to redux-thunk so we don't have to 
    try {

        const res = await axios.get('/api/current_user')
        localStorage.setItem("user",JSON.stringify(res.data));

        dispatch({type: FETCH_USER, payload: res.data })
        
    } catch (error) {
        console.log(error)     
    }
    
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
        
        if(!products){
            const res = await axios.get('./api/products');
            products = res.data;
        }
        
        dispatch({ type: FETCH_PRODUCTS , payload: products})  
        dispatch({ type: FETCH_ORDER , payload: products}) 
    } catch (error) {
        console.log(error)
    }
}


export const fetchOrder = (products=[]) =>async (dispatch) =>{
    try {    
        dispatch({ type: FETCH_ORDER , payload: products})   
    } catch (error) {
        console.log(error)
    }
}

export const addProduct = (order) =>async (dispatch) =>{
    try {    

        dispatch({ type: FETCH_ORDER , payload: [...order]})   
    } catch (error) {
        console.log(error)
    }
}


export const onCheckout = (values, history) => async (dispatch) =>{

    try{
        const res = await axios.post("/api/checkout", {products: values});
        localStorage.setItem("mercadopago", res.data.response.init_point)

        history.push({
            pathname: '/checkout',
            state: { paymentLink: res.data.response.init_point, products: values} 
        });

    }catch (error) {
        history.push({
            pathname: '/checkout',
            state: { paymentLink:'', products: values} 
        });
    }
};

export const onSubmitAddress = (values, history) => async dispatch =>{
    console.log(values)
    const res = await axios.post('/api/updateAddress', {address: values});
    localStorage.setItem("user",JSON.stringify(res.data));

    dispatch({ type : FETCH_USER, payload: res.data});
};



