// src/components/ReceiptPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ReceiptPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, total } = location.state || { items: [], total: 0 };

  if (!items.length) {
    return <p>No items to display. Please check your cart.</p>;
  }

  return (
    <div className="receipt-page">
      <h1>Order Receipt</h1>
      <p>Please make sure to keep a copy of this receipt!</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title} - {item.price}
          </li>
        ))}
      </ul>
      <p><strong>Total: </strong>{total}</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default ReceiptPage;
