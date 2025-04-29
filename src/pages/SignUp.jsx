import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginSignUp.css';

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });

      const res = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
      }, { withCredentials: true });

      login(res.data.user);
      navigate('/'); // Redirect to home
    } catch (err) {
      console.error(err);
      setError('Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignUp} className="auth-form">
        <h2>Sign Up</h2>
       
        <div class="input-group-2">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <button type="submit" class="auth-button-signup">Sign up</button>
        
        <li className="auth-link-2">
          <span>Already have an account?</span> <a href="/login">Log in</a>
        </li>
       
      </form>
    
    </div>
  );
};

export default SignUp;
