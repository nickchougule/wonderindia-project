// src/context/AuthContext.js

import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
// This component will wrap your entire app
export function AuthProvider({ children }) {
  // 3. Initialize state directly from localStorage
  // This keeps the user logged in even after a page refresh
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem('user')) || null
  );

  // 4. Provide the user state and the 'setUser' function to the rest of the app
  const value = { user, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 5. Create a custom hook to easily use the context
// This avoids having to import 'useContext' and 'AuthContext' in every file
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}