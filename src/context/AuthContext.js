import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a Context for the Auth
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a user (this could be from local storage, or an API call)
    const user = JSON.parse(localStorage.getItem('currentUser')); // Example from localStorage
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user)); // Save to localStorage (or a better way)
    navigate('/');
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser'); // Remove from localStorage
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
