import React from 'react';
import './modal.css';

function Modal(props) {
  const { children } = props;

  return (
    <div className="modal-container">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}

export default Modal;
