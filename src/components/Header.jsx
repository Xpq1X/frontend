import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Make sure your Header.css is correct

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        Giga Science Shop
      </div>

      <nav className="nav-container">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
