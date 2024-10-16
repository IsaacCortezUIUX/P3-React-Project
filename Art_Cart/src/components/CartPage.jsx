// CartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">
                <p>{item.title}</p>
                <p>{item.price}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                {/* Updated link to product details page */}
                <Link to={`/product/${item.id}`}>
                  <button>Check Product Details</button>
                </Link>
              </div>
            </div>
          ))}
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default CartPage;
