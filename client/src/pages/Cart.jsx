import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';

function Cart({ cartItems }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleProceed = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate('/bank-payment');
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-muted">Your cart is empty.</p>
          <Link to="/" className="btn btn-primary">Go Shopping</Link>
        </div>
      ) : (
        <div className="card shadow">
          <div className="card-body">
            <ul className="list-group mb-3">
              {cartItems.map((item, index) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                  <div className="d-flex align-items-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="img-thumbnail me-3" 
                      style={{ width: "60px", height: "60px", objectFit: "cover" }} 
                    />
                    <div>
                      <h5 className="mb-1">{item.name}</h5>
                      <small className="text-muted">ID: {item.id}</small><br />
                      <small className="text-muted">Price: ${item.price.toFixed(2)}</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <button 
                      className="btn btn-outline-secondary btn-sm me-2" 
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <span className="badge bg-primary rounded-pill">${item.price.toFixed(2)}</span>
                    <button 
                      className="btn btn-outline-secondary btn-sm ms-2" 
                      onClick={() => handleAddItem(item)}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between align-items-center">
              <h4>Total:</h4>
              <h4>${total.toFixed(2)}</h4>
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-success btn-lg" onClick={handleProceed}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}
      <ConfirmationModal 
        show={showModal} 
        onConfirm={handleConfirm} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );

  function handleRemoveItem(id) {
    // Logic to remove item from cart
    console.log(`Remove item with id: ${id}`);
  }

  function handleAddItem(item) {
    // Logic to add item to cart
    console.log(`Add item:`, item);
  }
}

export default Cart;