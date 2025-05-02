import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Import Firebase auth
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css'; // Import the CSS file for styling

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect after successful registration
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Sign Up</h2>
        <div className="ipugrupu">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="auth-button-signup">Sign Up</button>
        {error && <p>{error}</p>}
        <div className="auth-link-2">
          <span>Already have an account?</span>
          <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
