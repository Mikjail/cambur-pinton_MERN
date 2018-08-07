import {ALERT_MESSAGE} from '../actions/types';


export default function(state="", action){
    switch(action.type){
            case ALERT_MESSAGE:   
                return action.payload;
            default:    
              return state;
       }
       
   }