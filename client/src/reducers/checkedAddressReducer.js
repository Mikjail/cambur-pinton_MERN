import {CHECKED_ADDRESS} from '../actions/types';

export default function(state='', action){
    switch(action.type){
            case CHECKED_ADDRESS:   
                return action.payload;
            default:    
              return state;
       }
       
   }