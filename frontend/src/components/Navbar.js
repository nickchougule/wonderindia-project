import React, { useState } from 'react';
// 1. Import 'Link' for navigation
import { Link, useNavigate } from 'react-router-dom';

// Import the useAuth hook
import { useAuth } from '../context/AuthContext'; 

// Import your assets
import '../assets/css/WIindex.css';
import logo from '../assets/images/WonderIndiaIndianStyle-removebg-preview.png';

// Import Bootstrap components
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

function Navbar() { 
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  // ★ 1. NEW STATE TO CONTROL THE MENU
  const [expanded, setExpanded] = useState(false);

  // ★ 2. HELPER FUNCTION TO CLOSE MENU
  const closeNav = () => setExpanded(false);

  const handleLogout = (e) => {
    e.preventDefault(); 
    
    // Clear global state & local storage
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Close the menu manually after logout
    closeNav();

    navigate('/login');
  };

  return (
    // ★ 3. PASS 'expanded' AND 'onToggle' PROPS
    <BootstrapNavbar 
      expanded={expanded} 
      onToggle={setExpanded} 
      expand="lg" 
      fixed="top"
      className="bg-white shadow-sm" // Added some styling classes for better look
    >
      <Container fluid>
        <BootstrapNavbar.Brand as={Link} to="/" onClick={closeNav}>
          <img
            src={logo}
            alt="WonderIndia Logo"
            height="80px"
          />
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </BootstrapNavbar.Toggle>

        <BootstrapNavbar.Collapse id="navbarSupportedContent">
          {/* Navigation Links */}
          <Nav className="mx-auto mb-2 mb-lg-0">
            <Nav.Link as={Link} to="/" onClick={closeNav}>Home</Nav.Link>
            <Nav.Link as={Link} to="/services" onClick={closeNav}>Services</Nav.Link>
            <Nav.Link as={Link} to="/destinations" onClick={closeNav}>Top Destinations</Nav.Link>
            <Nav.Link as={Link} to="/packages" onClick={closeNav}>Packages</Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={closeNav}>About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={closeNav}>Contact</Nav.Link>
          </Nav>

          {/* Login/Logout Logic */}
          {user ? (
            // --- If LOGGED IN ---
            <Nav>
              <div className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle btn btn-signin text-white" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {user.name} 
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile" onClick={closeNav}>
                      My Profile & Bookings
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </Nav>
          ) : (
            // --- If LOGGED OUT ---
            <Nav className="d-flex flex-lg-row flex-column">
              <Nav.Item className="mb-2 mb-lg-0 me-lg-2">
                <Link 
                  className="btn btn-signup w-100" 
                  to="/signup" 
                  onClick={closeNav}
                >
                  Signup
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link 
                  className="btn btn-signin w-100" 
                  to="/login" 
                  onClick={closeNav}
                >
                  Signin
                </Link>
              </Nav.Item>
            </Nav>
          )}
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;