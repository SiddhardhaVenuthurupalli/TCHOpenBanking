import React from 'react';
import { useLocation } from 'react-router-dom';

function Confirmation() {
  const location = useLocation();
  const email = location.state?.email || 'customer@example.com';

  const productId = location.state?.productId || '12345';
  const transactionId = location.state?.transactionId || 'TXN67890';
  const amount = location.state?.amount || '100.00';

  // Get the current date and format it
  const transactionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="text-center mt-5">
      <h2>Purchase Confirmed</h2>
      <p>Thank you for your purchase.</p>
      <div className="alert alert-success" role="alert">
        📧 A confirmation email has been sent to <strong>{email}</strong>.
      </div>
      <div className="mt-4">
        <p><strong>Product ID:</strong> {productId}</p>
        <p><strong>Transaction ID:</strong> {transactionId}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Transaction Date:</strong> {transactionDate}</p>
      </div>
    </div>
  );
}

export default Confirmation;