import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import API from '../api/api';
import { Container, Col, Form, Button, Image, Card, Alert } from 'react-bootstrap';
import logo from '../assets/images/WonderIndiaIndianStyle-removebg-preview.png';

function ResetPassword() {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  const location = useLocation();
  const email = location.state?.email; // Get email from previous page

  // If no email, redirect
  if (!email) {
    navigate('/request-reset');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await API.post('/auth/reset-password', { email, otp, password });
      setSuccess(response.data.message);
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed. Please try again.');
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center p-3">
      <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-4 p-sm-5">
            <div className="text-center mb-4">
              <Image src={logo} alt="WonderIndia Logo" height="120" />
            </div>
            <h2 className="text-center fw-bold fs-4 mb-3">Reset Your Password</h2>
            <p className="text-muted text-center">
              Enter the OTP sent to <strong>{email}</strong> and your new password.
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
              
              <Form.Floating className="mb-3">
                <Form.Control
                  type="password"
                  id="floatingPassword"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="floatingPassword">New Password</label>
              </Form.Floating>

              <div className="d-grid mb-3">
                <Button variant="primary" type="submit" size="lg" className="fw-bold">
                  Reset Password
                </Button>
              </div>
            </Form>
            
            <div className="text-center mt-4">
              <Link to="/login" className="text-primary fw-bold text-decoration-none">
                Back to Login
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

export default ResetPassword;