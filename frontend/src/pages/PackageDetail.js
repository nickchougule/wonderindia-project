import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/api';

// Import React Bootstrap components
import { Container, Card, Button, ListGroup, Row, Col, Form, Alert } from 'react-bootstrap';

// Import your shared components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import your data and logo
import { allPackages } from '../data/allPackages';
import logo from '../assets/images/WonderIndiaIndianStyle-removebg-preview.png';

function PackageDetail() {
  // --- Hooks ---
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // --- State for Booking ---
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // --- Find Package ---
  const pkg = allPackages.find(p => p.id === parseInt(id));

  // --- Helper for formatting ---
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // --- Helper function to load Razorpay script ---
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // --- Payment Handler ---
  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!date) {
      setError('Please select a date for your trip.');
      return;
    }

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      setError('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const currentTotal = pkg.price * parseInt(guests);

    try {
      // 1. Call backend to create a Razorpay order
      const { data } = await API.post('/payment/create-order', {
        packageName: pkg.title,
        date: date,
        guests: parseInt(guests),
        totalAmount: currentTotal,
      });

      const { order, booking } = data; 

      // 2. Configure Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
        amount: order.amount,
        currency: "INR",
        name: "WonderIndia Tours",
        description: `Booking for ${pkg.title}`,
        image: logo,
        order_id: order.id,
        handler: async (response) => {
          // 3. This function runs on payment success
          try {
            await API.post('/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              booking_id: booking._id, 
            });
            
            setSuccess('Payment successful! Redirecting to your profile...');
            setTimeout(() => navigate('/profile'), 3000);

          } catch (err) {
            setError('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#ff6600",
        },
        // ★★★ THIS IS THE NEWLY ADDED SECTION ★★★
        // This suggests which payment method to show first.
        // In Live Mode, this will default to the UPI/QR code screen.
        method: {
          upi: true,
        },
        // ★★★ END OF NEW SECTION ★★★
      };

      // 4. Open the Razorpay modal
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on('payment.failed', (response) => {
        setError(`Payment failed. ${response.error.description}`);
      });

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create payment order.');
    }
  };


  // --- Handle package not found ---
  if (!pkg) {
    return (
      <>
        <Navbar />
        <Container style={{ paddingTop: '120px', paddingBottom: '50px' }} className="text-center">
          <h2>Package not found!</h2>
          <p>The package you are looking for does not exist.</p>
          <Button as={Link} to="/packages">Back to All Packages</Button>
        </Container>
        <Footer />
      </>
    );
  }

  // --- Render the main page ---
  return (
    <>
      <Navbar />
      <Container style={{ paddingTop: '120px', paddingBottom: '50px' }}>
        <Row className="g-4">
          
          {/* --- Left Column: Package Details --- */}
          <Col lg={7}>
            <Card className="shadow-lg border-0">
              <Card.Img 
                variant="top" 
                src={pkg.image} 
                alt={pkg.title}
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <Card.Body className="p-4">
                <Card.Title as="h2" className="fw-bold">{pkg.title}</Card.Title>
                <p className="card-text text-muted">{pkg.duration}</p>
                <p><strong>Price:</strong> {formatPrice(pkg.price)} per person</p>

                <h4 className="mt-4">Itinerary</h4>
                <ListGroup variant="flush">
                  {pkg.itinerary.map((day, index) => (
                    <ListGroup.Item key={index}>{day}</ListGroup.Item>
                  ))}
                </ListGroup>

                <h4 className="mt-4">Inclusions</h4>
                <ListGroup horizontal="flush" className="flex-wrap">
                  {pkg.inclusions.map((item, index) => (
                    <ListGroup.Item key={index} className="border-0 ps-0">
                      ✔️ {item}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          {/* --- Right Column: Booking Form --- */}
          <Col lg={5}>
            <Card className="shadow-lg border-0 sticky-top" style={{ top: '120px' }}>
              <Card.Body className="p-4">
                {user ? (
                  // --- SHOW BOOKING FORM IF LOGGED IN ---
                  <>
                    <h3 className="fw-bold">Book Your Trip</h3>
                    <p>You are logged in as {user.name}.</p>
                    
                    <Form onSubmit={handlePayment}>
                      <Form.Group className="mb-3" controlId="bookingDate">
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]} 
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="bookingGuests">
                        <Form.Label>Number of Guests</Form.Label>
                        <Form.Control
                          type="number"
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          min={1}
                          max={10}
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button variant="success" size="lg" type="submit">
                          Pay Now ({formatPrice(pkg.price * guests)})
                        </Button>
                      </div>
                    </Form>
                    
                    {/* Show success/error messages */}
                    {success && <Alert variant="success" className="mt-3">{success}</Alert>}
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                  </>
                ) : (
                  // --- Show Login Button if Logged Out ---
                  <>
                    <h3 className="fw-bold">Login to Book</h3>
                    <p>You must be logged in to book a package.</p>
                    <div className="d-grid">
                      <Button as={Link} to="/login" variant="primary" size="lg">
                        Login or Sign Up
                      </Button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default PackageDetail;