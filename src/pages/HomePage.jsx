import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // Import your CSS file for styles

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 flex flex-col items-center justify-center text-center p-8">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-4xl w-full">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-600 to-indigo-700 mb-6">
          Welcome to Giga Science Shop!
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Your one-stop shop for all your science needs. Explore our wide range of high-quality products designed to fuel your scientific curiosity.
        </p>
        <Link
          to="/products"
          className="bg-gradient-to-r from-green-500 via-blue-600 to-indigo-700 text-white py-3 px-8 rounded-full font-semibold text-lg shadow-lg hover:scale-105 transition duration-300 transform"
        >
          Explore Products
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
