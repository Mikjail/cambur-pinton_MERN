import React from 'react';

export default ({ input, label, type,  meta: {error, touched }}) =>{
    
    return (
        <div className="field-container">
            <div>
            <label>{label} </label>
            <input {...input} type={type} style={{marginBottom:'5px' }}/>
            </div>

            <div className="red-text" style={{marginBottom: '20px', position:'absolute'}}>
                {touched && error}
            </div>
        </div>
            
        //{touched && error} if touched is false the enteriment state won't be executed
        // if touched ==true it will return the error string
    )
}