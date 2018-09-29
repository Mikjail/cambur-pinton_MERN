import {DELIVERY} from '../actions/types';

export default function(state={}, action){
    switch(action.type){
            case DELIVERY:   
                return action.payload;
            default:    
              return state;
       }
       
   }