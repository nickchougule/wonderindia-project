import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all your page components
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Destinations from './pages/Destinations';
import Packages from './pages/Packages';
import Services from './pages/Services';
import Login from './pages/Login';
import Signup from './pages/Signup'; // Corrected case
import PackageDetail from './pages/PackageDetail'; 
import Profile from './pages/Profile'; 

// ★ 1. IMPORT NEW PAGES
import VerifyEmail from './pages/VerifyEmail';
import RequestReset from './pages/RequestReset';
import ResetPassword from './pages/ResetPassword';

// Import layout & auth
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; 

// Import your CSS
import './assets/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/css/WIindex.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/services" element={<Services />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* ★ 2. ADD NEW AUTH FLOW ROUTES */}
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/request-reset" element={<RequestReset />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Protected Routes */}
        <Route 
          path="/package/:id" 
          element={<ProtectedRoute><PackageDetail /></ProtectedRoute>} 
        />
        <Route 
          path="/profile" 
          element={<ProtectedRoute><Profile /></ProtectedRoute>} 
        />
        
      </Routes>
      <Footer />
    </>
  );
}

export default App;