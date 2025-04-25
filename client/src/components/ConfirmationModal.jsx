import React from 'react';

function ConfirmationModal({ show, onConfirm, onClose }) {
  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Purchase</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Do you want to proceed with payment?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={onConfirm}>Yes, Proceed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
