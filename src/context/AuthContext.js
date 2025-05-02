import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Make sure to export auth from your Firebase setup file

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Check if the user is already in localStorage when the app starts
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Initialize Firebase authentication state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));  // Save user to localStorage
      } else {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');  // Clear user from localStorage
      }
    });

    return unsubscribe;  // Clean up listener on unmount
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));  // Save to localStorage
      })
      .catch((error) => {
        console.error('Login failed:', error);
        throw error; // Optionally, you can handle the error in your UI
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');  // Remove from localStorage
      })
      .catch((error) => {
        console.error('Logout failed:', error);
        throw error; // Optionally, you can handle the error in your UI
      });
  };

  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
