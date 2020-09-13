/*
 * @Author: Indrajit Bhattacharya 
 * @Date: 2020-09-11 10:42:46 
 * @Last Modified by:   Indrajit Bhattacharya 
 * @Last Modified time: 2020-09-11 10:42:46 
 */
import React from 'react';

import './ErrorModal.css';

const ErrorModal = React.memo(props => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="error-modal">
        <h2>An Error Occurred!</h2>
        <p>{props.children}</p>
        <div className="error-modal__actions">
          <button type="button" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModal;
