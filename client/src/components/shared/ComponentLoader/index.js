import React from 'react'
import {Preloader} from "react-materialize";
import './ComponentLoader.css';

export const ComponentLoader = ({show}) => {

        return (
            <div className="component-loader">
                <Preloader size='small'/>
            </div>
            )
        
       

}

export default ComponentLoader;