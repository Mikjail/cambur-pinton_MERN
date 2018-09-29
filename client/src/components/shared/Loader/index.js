import React from 'react'
import {Preloader} from "react-materialize";
import './Loader.css';

export const Loader = ({show}) => {

             return (
            <div className="loader">
                <Preloader size='small'/>
            </div>
            )
        
       

}

export default Loader;