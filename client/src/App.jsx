import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import BankPayment from './pages/BankPayment';
import Confirmation from './pages/Confirmation';
import MerchantConsole from './pages/MerchantConsole'; // Import the new page
import BankConsole from './pages/BankConsole';

function App() {
  // State to manage the cart; this could be enhanced with context or redux in a full app
  const [cartItems, setCartItems] = useState([]);
  
  // Function to add an item to the cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Function to simulate cart clearing after purchase
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <Navbar cartCount={cartItems.length} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/bank-payment" element={<BankPayment clearCart={clearCart} />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/merchant-console" element={<MerchantConsole />} /> {/* Merchant Console Route */}
          <Route path="/bank-console" element={<BankConsole />} /> {/* Bank Console Route */}
        </Routes>
      </div>
    </>
  );
}

export default App;
