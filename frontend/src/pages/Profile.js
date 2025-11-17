import React, { useState, useEffect } from 'react';
// ★ 1. IMPORT useNavigate, Button, and Alert
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Spinner, Button, Alert } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from '../api/api'; // Your API instance
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/WonderIndiaIndianStyle-removebg-preview.png';

function Profile() {
  const { user } = useAuth(); 
  const navigate = useNavigate();
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ★ 2. ADD STATE FOR PAYMENT MESSAGES
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // --- Fetch Bookings on Load ---
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await API.get('/bookings');
        // Sort bookings to show pending ones first
        const sortedBookings = response.data.sort((a, b) => 
          a.paymentStatus === 'pending' ? -1 : 1
        );
        setBookings(sortedBookings);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
      setLoading(false);
    };

    fetchBookings();
  }, []); // Empty array means this runs once on page load

  // --- Helper to format dates ---
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // --- ★ 3. ADD loadScript HELPER (Copied from PackageDetail.js) ---
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

  // --- ★ 4. ADD PAYMENT HANDLER ---
  const handlePayNow = async (pendingBooking) => {
    setError('');
    setSuccess('');

    // 1. Load Razorpay script
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      setError('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      // 2. Call backend to create a *new* order for this *existing* booking
      const { data } = await API.post('/payment/recreate-order', {
        booking_id: pendingBooking._id,
      });

      const { order, booking } = data; // We get the new order and our booking

      // 3. Configure Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "WonderIndia Tours",
        description: `Completing payment for ${booking.packageName}`,
        image: logo,
        order_id: order.id,
        handler: async (response) => {
          // 4. On payment success, call verify-payment
          try {
            await API.post('/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              booking_id: booking._id,
            });
            
            setSuccess('Payment successful! Your booking is confirmed.');
            
            // 5. Update the UI instantly
            setBookings(currentBookings =>
              currentBookings.map(b =>
                b._id === booking._id ? { ...b, paymentStatus: 'completed' } : b
              )
            );

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
        method: {
          upi: true,
        },
      };

      // 5. Open Razorpay modal
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on('payment.failed', (response) => {
        setError(`Payment failed. ${response.error.description}`);
      });

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create payment order.');
    }
  };


  return (
    <>
      <Navbar />
      <Container style={{ paddingTop: '120px', paddingBottom: '50px', minHeight: '70vh' }}>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Header as="h4">My Profile</Card.Header>
              <Card.Body>
                {user ? (
                  <>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>User ID:</strong> {user.id}</p>
                  </>
                ) : (
                  <p>Loading user data...</p>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <h4>My Bookings</h4>
            
            {/* --- ★ 5. ADD ALERTS FOR SUCCESS/ERROR --- */}
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Loading bookings...</p>
              </div>
            ) : bookings.length > 0 ? (
              <ListGroup>
                {bookings.map((booking) => (
                  <ListGroup.Item key={booking._id} className="mb-3 shadow-sm border-0">
                    <Row>
                      <Col md={9}>
                        <h5 className="mb-1">{booking.packageName}</h5>
                        <p className="mb-1">
                          <strong>Date:</strong> {formatDate(booking.date)} | <strong>Guests:</strong> {booking.guests}
                        </p>
                        <p className="mb-1">
                          <strong>Total:</strong> {booking.totalAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })} | 
                          <strong> Status:</strong> 
                          {/* --- ★ 6. CONDITIONAL STATUS BADGE --- */}
                          <span 
                            className={`text-capitalize fw-bold ${
                              booking.paymentStatus === 'completed' ? 'text-success' : 'text-danger'
                            }`}
                          >
                            {booking.paymentStatus}
                          </span>
                        </p>
                        <small className="text-muted">Booking ID: {booking._id}</small>
                      </Col>
                      
                      {/* --- ★ 7. CONDITIONAL PAYMENT BUTTON --- */}
                      {booking.paymentStatus === 'pending' && (
                        <Col md={3} className="d-flex align-items-center justify-content-end">
                          <Button 
                            variant="success" 
                            size="sm"
                            onClick={() => handlePayNow(booking)}
                          >
                            Complete Payment
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <p className="mb-0">You have not booked any packages yet.</p>
                </Card.Body>
              </Card> 
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Profile;