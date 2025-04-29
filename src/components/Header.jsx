import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have auth context
import '../styles/Header.css'; // Updated styles for a sleeker design

const Header = () => {
  const { currentUser, logout } = useAuth(); // Get current user from context
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to login after logout
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
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/contact">Contact</a></li>

          {currentUser ? (
            <>
              <li className="user-profile">
                <button onClick={toggleDropdown} className="nav-button">{currentUser.username}</button>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <a href="/profile">Profile</a>
                    <a href="/settings">Settings</a>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li><a href="/login">Login</a></li>

            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
