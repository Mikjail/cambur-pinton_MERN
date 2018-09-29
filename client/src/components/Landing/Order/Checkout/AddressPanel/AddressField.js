import React from 'react';
import Map from '../../../../Map';

export default ({ styling, input, label, type, meta: {error, touched }}) =>{
   
    if(input.name !== 'street'){
        return (
            <div className={`field-container ${styling}`}>
               <div>
                <label>{label} </label>
                <input {...input} 
                type={type} 
                autoComplete="none"
                style={{marginBottom:'5px', height: '20px' }}/>
                </div>
                <div className="red-text" style={{marginBottom: '20px', position: 'absolute' }}>
                {touched && error}
                </div>
            </div>
          
            //{touched && error} if touched is false the enteriment state won't be executed
            // if touched ==true it will return the error string
        )
    }
    return <Map input={input} error={error} touched={touched} />
}
