import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../styles/CartPage.css';

const CartPage = () => {
  const { cart, removeOneFromCart } = useCart();

  const handleRemoveFromCart = (id) => {
    removeOneFromCart(id);
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const formatCurrency = (amount) =>
    `$${(Math.round(amount * 100) / 100).toFixed(2)}`;

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateTotalQuantity = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-page-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items-container">
          {cart.map((item) => {
            const itemTotal = item.price * item.quantity;
            return (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h2>{item.name}</h2>
                  <p>Price: {formatCurrency(item.price)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Item Total: {formatCurrency(itemTotal)}</p>
                </div>
                <button className="remove-btn small-btn" onClick={() => handleRemoveFromCart(item.id)}>
  Remove
</button>

              </div>
            );
          })}
          <div className="cart-summary">
            <h3>Total Quantity: {calculateTotalQuantity()}</h3>
            <h3>Total: {formatCurrency(calculateTotal())}</h3>
            <p className="checkout-info">
              After clicking "Proceed to Checkout," you will be redirected to a page where you can enter your address and payment details.
            </p>
            <button onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      )}
      <Link to="/products" className="continue-shopping">Continue Shopping</Link>
    </div>
  );
};

export default CartPage;
