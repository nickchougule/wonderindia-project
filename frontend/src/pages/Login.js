import React, { useState } from 'react';
// 1. Import 'useNavigate' and 'Link' for navigation
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/api'; // Make sure this path is correct

// 2. Import necessary React Bootstrap components
import { 
    Container, 
    Row, 
    Col, 
    Card, 
    Form, 
    Button, 
    Alert, 
    Image 
} from 'react-bootstrap';

// 3. Import your images
import logo from '../assets/images/WonderIndiaIndianStyle-removebg-preview.png';
// ★ Removed Google, Facebook, and LinkedIn icons

// ★ 4. IMPORT THE 'useAuth' HOOK
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

function Login() {
  // State for inputs, errors, and navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ★ 5. GET THE 'setUser' FUNCTION FROM CONTEXT
  const { setUser } = useAuth();

  // Submit handler logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await API.post('/auth/login', { email, password });

      if (response.data && response.data.token) {
        
        console.log('LOGIN SUCCESSFUL. API Response:', response.data);
        console.log('Data being set as user:', response.data.user); 

        // Save the token and user to localStorage (still important)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // THE FIX: UPDATE THE GLOBAL STATE
        setUser(response.data.user); 
        
        // Navigate without a page reload
        navigate('/'); 
      } else {
        setError('Invalid login response from server.');
      }
    } catch (err) {
      // ★ 6. NEW ERROR HANDLING
      const errData = err.response?.data;
      if (errData && errData.notVerified) {
        // If user is not verified, show message and redirect to verify page
        setError(errData.message);
        setTimeout(() => {
          navigate('/verify-email', { state: { email: errData.email } });
        }, 2000);
      } else {
        // Show other login errors
        setError(errData?.message || 'Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center p-3">
      <Row className="w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-4 p-sm-5">
              <div className="text-center mb-4">
                <Image src={logo} alt="WonderIndia Logo" height="120" />
              </div>
              <h2 className="text-center fw-bold fs-4 mb-3">
                Sign In to WonderIndia
              </h2>

              <Form noValidate onSubmit={handleSubmit}>
                {error && (
                  <Alert variant="danger" className="py-2">
                    {error}
                  </Alert>
                )}

                <Form.Floating className="mb-3">
                  <Form.Control
                    type="email"
                    id="floatingEmail"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-describedby="emailHelp"
                  />
                  <label htmlFor="floatingEmail">Email Address</label>
                </Form.Floating>

                <Form.Floating className="mb-3">
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

                {/* ★ 7. UPDATED FORGOT PASSWORD LINK */}
                <div className="text-end mb-3">
                  <Link to="/request-reset" className="text-primary text-decoration-none">
                    Forgot Password?
                  </Link>
                </div>

                <div className="d-grid mb-3">
                  <Button variant="primary" type="submit" size="lg" className="fw-bold">
                    Continue
                  </Button>
                </div>

                {/* ★ 
                    REMOVED THE "or" DIVIDER AND SOCIAL LOGIN BUTTONS 
                ★ */}
                
                <div className="text-center mt-4">
                  <span className="text-muted">Don't have an account? </span>
                  <Link to="/signup" className="text-primary fw-bold text-decoration-none">
                    Create one
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;