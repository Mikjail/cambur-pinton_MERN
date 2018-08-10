import {LOADER} from '../actions/types';

export default function(state=false, action){
    switch(action.type){
            case LOADER:   
                return action.payload;
            default:    
              return state;
       }
       
   }