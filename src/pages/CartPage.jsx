import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, adjustQuantity } = useCart();

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handleAdjustQuantity = (id, quantity) => {
    adjustQuantity(id, quantity);
  };

  const handleCheckout = () => {
    // Proceed to checkout (could involve a backend call)
    alert('Proceeding to checkout...');
  };

  useEffect(() => {
    // Optionally, you can still use localStorage to sync with the CartContext state.
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);  // Sync cart state with localStorage whenever it changes

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id}>
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <p>Quantity: 
                <input 
                  type="number" 
                  value={item.quantity} 
                  min="1" 
                  onChange={(e) => handleAdjustQuantity(item.id, parseInt(e.target.value))}
                />
              </p>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <div>
            <h3>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h3>
            <button onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      )}
      <Link to="/products">Continue Shopping</Link>
    </div>
  );
};

export default CartPage;
