// src/context/CartContext.js

import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex(item => item.id === product.id);
      if (productIndex !== -1) {
        const newCart = [...prevCart];
        newCart[productIndex].quantity += 1;
        return newCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const adjustQuantity = (productId, quantity) => {
    if (quantity < 1) return; // Prevent negative or zero quantity
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const productIndex = newCart.findIndex(item => item.id === productId);
      if (productIndex !== -1) {
        newCart[productIndex].quantity = quantity;
      }
      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, adjustQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
