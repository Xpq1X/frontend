import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Import components
import Header from './components/Header.jsx';
import MiniCart from './components/MiniCart';

// Import pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import AddProductPage from './pages/AddProductPage';
import Login from './pages/LoginPage.jsx';
import SignUp from './pages/RegisterPage.jsx';
import OrdersPage from './pages/OrdersPage';
import SettingsPage from './pages/SettingsPage';
import FaqPage from './pages/FAQPage.jsx';

// Import Firebase authentication
import { useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import FAQPage from './pages/FAQPage.jsx';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />; // Redirect to homepage if not logged in
};

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <Header />
      {location.pathname !== "/checkout" && <MiniCart />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/faq" element={<FAQPage />} />
         
          {/* Protected Routes */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
         
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                {/* Admin content to be added */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute>
                <AddProductPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
