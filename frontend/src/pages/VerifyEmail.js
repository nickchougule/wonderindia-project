import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import API from '../api/api';
import { useAuth } from '../context/AuthContext';
import { Container, Col, Form, Button, Image, Card, Alert } from 'react-bootstrap';
import logo from '../assets/images/WonderIndiaIndianStyle-removebg-preview.png';

function VerifyEmail() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();
  
  // Get the email from the registration page
  const location = useLocation();
  const email = location.state?.email;

  // If no email, redirect to signup
  if (!email) {
    navigate('/signup');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await API.post('/auth/verify-email', { email, otp });

      if (response.data && response.data.token) {
        // Save token and user
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Update global state
        setUser(response.data.user);
        
        // Show success message and redirect
        setSuccess('Verification successful! Redirecting to home...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please check the OTP and try again.');
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center p-3">
      <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-4 p-sm-5 text-center">
            <Image src={logo} alt="WonderIndia Logo" height="120" className="mb-4" />
            <h2 className="text-center fw-bold fs-4 mb-3">Verify Your Email</h2>
            <p className="text-muted">
              An OTP has been sent to <strong>{email}</strong>. Please enter it below.
            </p>
            
            <Form noValidate onSubmit={handleSubmit}>
              {error && <Alert variant="danger" className="py-2">{error}</Alert>}
              {success && <Alert variant="success" className="py-2">{success}</Alert>}

              <Form.Floating className="mb-3">
                <Form.Control
                  type="text"
                  id="floatingOtp"
                  placeholder="1234"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength="4"
                />
                <label htmlFor="floatingOtp">4-Digit OTP</label>
              </Form.Floating>

              <div className="d-grid mb-3">
                <Button variant="primary" type="submit" size="lg" className="fw-bold">
                  Verify Account
                </Button>
              </div>
            </Form>
            
            <div className="text-center mt-4">
              <span className="text-muted">Didn't get an OTP? </span>
              <Link to="/signup" className="text-primary fw-bold text-decoration-none">
                Register again
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

export default VerifyEmail;