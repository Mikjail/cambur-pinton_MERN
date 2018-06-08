import axios from 'axios';
import {FETCH_USER, FETCH_PRODUCTS} from './types';


export const fetchUser =  () =>async (dispatch) => {
    // dispatch is coming thanks to redux-thunk so we don't have to 
    try {
        const res = await axios.get('/api/current_user')
        dispatch({type: FETCH_USER, payload: res.data })
        
    } catch (error) {
        console.log(error)     
    }
    
}   


export const fetchProducts = () =>async (dispatch) =>{
    try {    
        const res = await axios.get('./api/products')
        dispatch({ type: FETCH_PRODUCTS , payload: res.data})   
    } catch (error) {
        console.log(error)
    }
}
