import React, { useState } from 'react';
import '../styles/CheckoutPage.css';
import { useCart } from '../context/CartContext';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const CheckoutPage = () => {
  const { cart } = useCart();

  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [addressInfo, setAddressInfo] = useState({
    street: '',
    city: '',
    postalCode: '',
    paymentMethod: ''
  });

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleNext = () => {
    if (step === 1) {
      // Ensure required fields are filled in Step 1
      if (!personalInfo.name || !personalInfo.email || !personalInfo.phone) {
        alert('Please fill in all personal information fields.');
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleOrderSubmit = async () => {
    const orderData = {
      ...personalInfo,
      ...addressInfo,
      products: cart.map(item => item.id),
      total_price: totalPrice,
    };

    try {
      const response = await fetch('/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      console.log('Order submitted:', data);
      alert('Order placed successfully!');
    } catch (err) {
      console.error('Error submitting order:', err);
      alert('There was an error submitting your order.');
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {step === 1 && (
        <div className="checkout-section">
          <h2>1. Personal Information</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={personalInfo.name}
            onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={personalInfo.email}
            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
            required
          />
          <div className="phone-input">
            <PhoneInput
              country={'cz'}
              value={personalInfo.phone}
              onChange={(phone) => setPersonalInfo({ ...personalInfo, phone })}
              required
              inputStyle={{
                width: '100%',
                padding: '12px 16px',
                paddingLeft: '50px',
                fontSize: '1.2rem',
                borderRadius: '8px',
                border: '1px solid #ccc'
              }}
            />
          </div>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="checkout-section">
          <h2>2. Address & Payment</h2>
          <input
            type="text"
            placeholder="Street Address"
            value={addressInfo.street}
            onChange={(e) => setAddressInfo({ ...addressInfo, street: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={addressInfo.city}
            onChange={(e) => setAddressInfo({ ...addressInfo, city: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={addressInfo.postalCode}
            onChange={(e) => setAddressInfo({ ...addressInfo, postalCode: e.target.value })}
            required
          />
        
          <div className="step-buttons">
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="checkout-section">
          <h2>3. Review Your Order</h2>
          <div className="review-info">
            <p><strong>Name:</strong> {personalInfo.name}</p>
            <p><strong>Email:</strong> {personalInfo.email}</p>
            <p><strong>Phone:</strong> {personalInfo.phone}</p>
            <p><strong>Address:</strong> {addressInfo.street}, {addressInfo.city}, {addressInfo.postalCode}</p>
            <p><strong>Payment:</strong> {addressInfo.paymentMethod}</p>
          </div>

          <h3>Cart Items:</h3>
          <ul className="cart-review-list">
            {cart.map((item) => (
              <li key={item.id}>{item.name} × {item.quantity}</li>
            ))}
          </ul>
          <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>

          <div className="step-buttons">
            <button onClick={handleBack}>Back</button>
            <button onClick={handleOrderSubmit}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
