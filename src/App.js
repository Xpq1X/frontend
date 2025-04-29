import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import Header from './components/Header.jsx';  // Correct the extension to .jsx

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import AdminDashboard from './pages/AdminDashboard';
import AddProductPage from './pages/AddProductPage'; // Import the page
import MiniCart from './components/MiniCart';

function App() {
  return (
    <CartProvider> {/* Wrap the entire app with CartProvider */}
      <Router>
        <Header /> {/* Place Header inside Router */}
        <MiniCart /> {/* MiniCart should be placed in the header, likely as a cart summary or toggle */}
        <main>
          <Routes>
            <Route path="/admin/add-product" element={<AddProductPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
