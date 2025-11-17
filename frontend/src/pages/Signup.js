import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/api'; // Import your API file

// Import React Bootstrap components
import { Container, Col, Form, Button, Image, Alert } from 'react-bootstrap';

// Import CSS
import '../assets/css/WISignUp.css'; 

// Import Images
import logo from '../assets/images/WonderIndiaIndianStyle-removebg-preview.png';
// Removed googleIcon import

function SignUp() {
  // --- State for all form fields ---
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // --- Form submit handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Call your API to register
      const response = await API.post('/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });

      // On success, show message and redirect to verify
      if (response.data && response.data.message) {
        setSuccess(response.data.message);
        
        // Redirect to verify page after 2 seconds
        setTimeout(() => {
          navigate('/verify-email', { state: { email: response.data.email } });
        }, 2000);
      } else {
        setError('An unknown error occurred.');
      }

    } catch (err) {
      // Show errors from the server (e.g., "Email already in use")
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="Wrapper">
      <Container>
        <Col
          sm={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
          xl={{ span: 4, offset: 4 }}
          className="text-center"
        >
          <div className="logo">
            <Image 
              src={logo} 
              alt="WonderIndiaIndianStyle-removebg-preview" 
              height="150px" 
            />
          </div>

          <Form className="rounded shadow p-5" id="signup" onSubmit={handleSubmit}>
            <h3 className="text-dark fw-bolder fs-4 mb-2">
              Create an Account
            </h3>

            <div className="fw-normal text-muted mb-4">
              Already Have An Account? 
              <Link to="/login" className="text-decoration-none text-primary fw-bold">
                Sign In Here
              </Link>
            </div>

            {/* Removed social login buttons */}

            {/* --- Show error/success messages --- */}
            {error && <Alert variant="danger" className="py-2">{error}</Alert>}
            {success && <Alert variant="success" className="py-2">{success}</Alert>}

            {/* --- Connect all inputs to state --- */}
            <Form.Floating className="mb-3">
              <Form.Control
                type="text"
                id="floatingInputfirstName"
                placeholder="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <label htmlFor="floatingInputfirstName">First Name</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                type="text"
                id="floatingInputlastName"
                placeholder="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <label htmlFor="floatingInputlastName">Last Name</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                type="email"
                id="floatingInputEmail"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="floatingInputEmail">Email Address</label>
            </Form.Floating>

            <Form.Floating>
              <Form.Control
                type="password"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </Form.Floating>

            <div className="fw-normal text-muted mb-4">
              use 8 or more characters with a mix of letters, numbers & symbols
            </div>

            <Form.Floating className="mb-3">
              <Form.Control
                type="password"
                id="confirmfloatingPassword"
                placeholder="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {/* ★★★ THE FIX IS HERE ★★★ */}
              <label htmlFor="confirmfloatingPassword">Confirm Password</label>
              {/* ★★★ END OF FIX ★★★ */}
            </Form.Floating>

            <Form.Check 
              className="text-start mt-2" 
              type="checkbox" 
              id="checkChecked" 
              defaultChecked 
              required
              label={
                <>
                  I agree <a href="#">Terms & Conditions</a>
                </>
              }
            />

            <div className="button mt-4">
              <Button type="submit" className="btn-primary w-100">
                Continue
              </Button>
            </div>

          </Form>
        </Col>
      </Container>
    </div>
  );
}

export default SignUp;