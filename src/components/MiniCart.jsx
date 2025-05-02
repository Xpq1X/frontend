import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../styles/MiniCart.css';

const MiniCart = () => {
  const { cart, removeOneFromCart, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  // Function to format currency
  const formatCurrency = (amount) => `$${(Math.round(amount * 100) / 100).toFixed(2)}`;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="mini-cart-container">
      <button className="cart-toggle-btn" onClick={() => setOpen(!open)}>
        🛒 Cart ({totalItems})
      </button>
      {open && (
        <div className="mini-cart-dropdown">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul>
                {cart.map(item => (
                  <li key={item.id}>
                    <div className="cart-item">
                      {item.quantity}× {item.name} — {formatCurrency(item.price * item.quantity)}
                      <button className="remove-item-btn" onClick={() => removeOneFromCart(item.id)}>✕</button>
                    </div>
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> {formatCurrency(total)}</p>
              <div className="checkout-section">
                <Link to="/cart">
                  <button className="checkout-btn">View Cart</button>
                </Link>
                <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniCart;
