import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';

function Checkout() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    // No redirection, keep the user on the same page
    navigate('/bank-payment');
  };

  return (
    <div>
      <h1>Checkout</h1>
      <p>Please choose your payment method.</p>
      <button className="btn btn-primary" onClick={handleProceed}>Confirm</button>
      <ConfirmationModal 
        show={showModal} 
        onConfirm={handleConfirm} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
}

export default Checkout;
