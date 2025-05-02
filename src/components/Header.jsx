import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>
        Giga Science Shop
      </div>

      <nav className="nav-container">
        <ul className="nav-links">
          {/* Other buttons moved to the left */}
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/contact">Contact</a></li>

          {/* Guest or user profile dropdown */}
          {currentUser ? (
            <li className="user-profile">
              <button onClick={toggleDropdown} className="nav-button user-button">
                {currentUser.email} <span className="dropdown-arrow">▼</span>
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => navigate('/settings')}>Settings</button>
                  <button onClick={() => navigate('/orders')}>Orders</button>
                  <button onClick={() => navigate('/faq')}>FAQ</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </li>
          ) : (
            <li className="guest-profile">
              <button onClick={toggleDropdown} className="nav-button guest-button">
                Guest <span className="dropdown-arrow">▼</span>
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => navigate('/login')}>Login</button>
                  <button onClick={() => navigate('/signup')}>Sign Up</button>
                  <button onClick={() => navigate('/faq')}>FAQ</button>
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
