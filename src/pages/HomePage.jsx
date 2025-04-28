import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Giga Science Shop!</h1>
      <p>Your one-stop shop for all your science needs.</p>
      <Link to="/products">Explore Products</Link>
    </div>
  );
};

export default HomePage;
