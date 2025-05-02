// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6tp1MllvGed0kgD3zTFdupp9L7KOHM4Q",
  authDomain: "giga-science-shop.firebaseapp.com",
  projectId: "giga-science-shop",
  storageBucket: "giga-science-shop.firebasestorage.app",
  messagingSenderId: "732589195835",
  appId: "1:732589195835:web:2602f441db2b64b134121e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
