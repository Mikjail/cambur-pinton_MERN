import {FETCH_ORDER} from '../actions/types';

export default function(state=[], action){
    switch(action.type){
            case FETCH_ORDER:   
                return action.payload;
            default:    
              return state;
       }
       
   }