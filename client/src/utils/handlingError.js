import React from 'react';

const handlingHerror = WrappedComponent => ({ showError, children }) => {
    return (
      <WrappedComponent>
        {showError && <div className="error-message">{showError}</div>}
        {children}
      </WrappedComponent>
    );
  };

  
export const DivWithErrorHandling = handlingHerror(({children}) => <div>{children}</div>);

export default DivWithErrorHandling;