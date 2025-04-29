import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginSignUp.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });

      const res = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      }, { withCredentials: true });

      login(res.data.user);
      navigate('/'); // Redirect to home
    } catch (err) {
      console.error(err);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
       
        <div class="input-group">
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
        <button type="submit" class="auth-button-login">Log in</button>
        <li className="auth-link">
          <span>Don't have an account?</span> <a href="/signup">Sign up</a>
        </li>

       
      </form>
      
    </div>
    
  );
};

export default Login;
