import {COMPONENT_LOADER} from '../actions/types';

export default function(state=false, action){
    switch(action.type){
        case COMPONENT_LOADER:   
            return action.payload;
        default:    
            return state;
    }
       
}
