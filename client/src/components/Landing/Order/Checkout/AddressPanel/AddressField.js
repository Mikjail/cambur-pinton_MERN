import React from 'react';

export default ({ styling, input, label, type, meta: {error, touched }}) =>{
    return (
        <div className={styling}>
            <label>{label} </label>
            <input {...input} 
            type={type} 

            style={{marginBottom:'5px', height: '25px' }}/>
            <div className="red-text" style={{marginBottom: '20px' }}>
                {touched && error}
            </div>
            
        </div>
        //{touched && error} if touched is false the enteriment state won't be executed
        // if touched ==true it will return the error string
    )
}
