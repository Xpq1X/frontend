import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assume you have auth context
import '../styles/Header.css'; // Make sure your Header.css is correct


const Header = () => {
  const { currentUser, logout } = useAuth(); // Assume you have currentUser info
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>
        Giga Science Shop
      </div>

      <nav className="nav-container">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/contact">Contact</a></li>

          {currentUser ? (
            <>
              <li><button onClick={handleLogout} className="nav-button">Logout</button></li>
              <li><a href="/admin">Admin Panel</a></li>  {/* Admin panel link */}
            </>
          ) : (
            <>
              <li><a href="/login">Login</a></li> {/* Login link */}
              <li><a href="/register">Register</a></li> {/* Register link */}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
