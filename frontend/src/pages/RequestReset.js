import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';
import { Container, Col, Form, Button, Image, Card, Alert } from 'react-bootstrap';
import logo from '../assets/images/WonderIndiaIndianStyle-removebg-preview.png';

function RequestReset() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await API.post('/auth/forgot-password', { email });
      setSuccess(response.data.message);
      // Redirect to the reset password page, passing the email
      setTimeout(() => {
        navigate('/reset-password', { state: { email: email } });
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center p-3">
      <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-4 p-sm-5 text-center">
            <Image src={logo} alt="WonderIndia Logo" height="120" className="mb-4" />
            <h2 className="text-center fw-bold fs-4 mb-3">Forgot Password</h2>
            <p className="text-muted">
              Enter your registered email address to receive an OTP.
            </p>
            
            <Form noValidate onSubmit={handleSubmit}>
              {error && <Alert variant="danger" className="py-2">{error}</Alert>}
              {success && <Alert variant="success" className="py-2">{success}</Alert>}

              <Form.Floating className="mb-3">
                <Form.Control
                  type="email"
                  id="floatingEmail"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="floatingEmail">Email Address</label>
              </Form.Floating>

              <div className="d-grid mb-3">
                <Button variant="primary" type="submit" size="lg" className="fw-bold">
                  Send OTP
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

export default RequestReset;