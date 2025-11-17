import React from 'react';
// 1. Import 'Link' for navigation
import { Link, useNavigate } from 'react-router-dom';

// ★ 2. IMPORT THE 'useAuth' HOOK
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

// Import your assets
import '../assets/css/WIindex.css';
import logo from '../assets/images/WonderIndiaIndianStyle-removebg-preview.png';

function Navbar() { 
  const navigate = useNavigate();

  // ★ 3. GET THE *LIVE* USER STATE & 'setUser' FROM CONTEXT
  // 'user' will now update automatically when you call setUser in Login.js
  const { user, setUser } = useAuth();

  // ★ 4. DEBUGGING: See what the 'user' object contains
  // Check your browser's console (F12) to see what properties
  // your user object has (e.g., .name, .email, .username)
  console.log('USER OBJECT IN NAVBAR:', user);

  // ★ 5. UPDATED LOGOUT FUNCTION
  const handleLogout = (e) => {
    e.preventDefault(); // Prevent link jump
    
    // Clear the global state
    setUser(null);
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Navigate to login using React Router
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="WonderIndia Logo"
            height="80px"
          />
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Navigation Links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/destinations">Top Destinations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/packages">Packages</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>

          {/* ★ 6. CONDITIONAL LOGIN/LOGOUT LOGIC */}
          {user ? (
            // --- If LOGGED IN, show "Profile" dropdown ---
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle btn btn-signin text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person-circle me-1"></i>
                  {/*
                    ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
                    ★ IMPORTANT: If your console.log shows the user object has
                       'email' or 'username' but NOT 'name', you MUST change
                       this line from {user.name} to {user.email} or {user.username}
                    ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
                  */}
                  {user.name} 
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/profile">My Profile & Bookings</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                </ul>
              </li>
            </ul>
          ) : (
            // --- If LOGGED OUT, show "Signup/Signin" buttons ---
            <ul className="navbar-nav d-flex flex-lg-row flex-column">
              <li className="nav-item">
                <Link className="btn btn-signup me-lg-2 mb-2 mb-lg-0" to="/signup">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-signin" to="/login">
                  Signin
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;