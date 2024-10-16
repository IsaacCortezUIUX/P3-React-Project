// src/components/CheckoutPage.jsx
import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useUser } from './UserContext'; // Import the UserContext
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { currentUser, setCurrentUser } = useUser(); // Access setCurrentUser
  const navigate = useNavigate();

  // State to track purchase completion and message display
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [receiptCode, setReceiptCode] = useState(null);

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0).toFixed(2);

  const handleCompletePurchase = () => {
    // Generate a random 6-digit receipt code
    const code = Math.floor(100000 + Math.random() * 900000);
    setReceiptCode(code);

    // Show success message
    setPurchaseCompleted(true);

    // Create a new purchase record
    const newPurchase = {
      title: cart.map(item => item.title).join(', '),
      date: new Date().toLocaleDateString(),
      price: `$${total}`,
    };

    // Update current user's purchase history
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        purchaseHistory: [...currentUser.purchaseHistory, newPurchase],
      };
      setCurrentUser(updatedUser); // Update context
    }

    // Set a timeout to clear the cart and navigate back to the home page after 5 seconds
    setTimeout(() => {
      clearCart();
      navigate('/'); // Navigate back to the home page
    }, 5000); // 5 seconds delay
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="checkout-item">
              <div className="checkout-item-details">
                <p>{item.title}</p>
                <p>{item.price}</p>
              </div>
            </div>
          ))}
          <p>Total: ${total}</p>
          
          {/* Display the receipt code above the button */}
          {receiptCode && (
            <p>Your receipt code: <strong>{receiptCode}</strong></p>
          )}
          
          <button onClick={handleCompletePurchase}>Complete Purchase</button>

          {/* Conditionally render the success message */}
          {purchaseCompleted && (
            <div className="purchase-success">
              <p>We have received your purchase! Please make sure to take a screenshot of your items with your receipt code.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
