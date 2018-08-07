import {FETCH_MERCADOPAGO} from '../actions/types';

export default function(state="", action){
    switch(action.type){
            case FETCH_MERCADOPAGO:   
                return action.payload;
            default:    
              return state;
       }
       
   }