// src/index.js (or App.js)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // 1. Import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* 2. Wrap your App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);