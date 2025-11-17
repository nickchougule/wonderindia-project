import React, { useState } from 'react'; // ★ 1. IMPORT useState
import API from '../api/api'; // ★ 2. IMPORT API

// Import React Bootstrap components
// ★ 3. IMPORT Alert
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'; 

// Import your shared components
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

// Import CSS
import '../assets/css/WIindex.css';
import '../assets/css/ContactPage.css';

function Contact() {
  
  // --- ★ 4. STATE FOR FORM ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // --- ★ 5. HANDLER FOR FORM SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!consent) {
      setError('You must agree to be contacted before sending.');
      return;
    }

    try {
      const response = await API.post('/message', {
        name,
        email,
        phone,
        topic,
        message
      });
      
      setSuccess(response.data.message);
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setTopic('General Inquiry');
      setMessage('');
      setConsent(false);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message.');
    }
  };


  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="contact-hero">
        <Container>
          <h1>Contact Us</h1>
          <p>We'd love to help you plan your perfect trip</p>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-5">
        <Container>
          <Row>
            {/* Contact Info */}
            <Col lg={5} className="mb-4">
              <div className="contact-card">
                <h3 className="section-title">Get in Touch</h3>
                <p className="text-muted mb-4">Reach us via phone, email or visit our office.</p>

                <div className="contact-info mb-4">
                  <p><i className="bi bi-geo-alt-fill"></i>21/7 Travel Lane, Andheri (E), Mumbai, Maharashtra 400059</p>
                  <p><i className="bi bi-envelope-fill"></i>hello@wonderindia.tours</p>
                  <p><i className="bi bi-telephone-fill"></i>+91 98765 43210</p>
                  <p><i className="bi bi-clock-fill"></i>Mon–Sat: 9:00 AM – 7:00 PM (IST)</p>
                </div>

                <div className="info-pill">
                  <i className="bi bi-whatsapp"></i>
                  <span>WhatsApp: +91 98765 43210</span>
                </div>
                <div className="info-pill">
                  <i className="bi bi-instagram"></i>
                  <span>Instagram: @wonderindia.tours</span>
                </div>
                <div className="info-pill">
                  <i className="bi bi-facebook"></i>
                  <span>Facebook: /WonderIndiaTours</span>
                </div>
              </div>
            </Col>

            {/* --- ★ 6. WIRED UP CONTACT FORM ★ --- */}
            <Col lg={7}>
              <div className="contact-card">
                <h4 className="section-title">Send us a Message</h4>
                
                <Form onSubmit={handleSubmit}>
                  {success && <Alert variant="success" className="py-2">{success}</Alert>}
                  {error && <Alert variant="danger" className="py-2">{error}</Alert>}

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="name" className="mb-3">
                        <Form.Label className="form-label">Full Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Your name" 
                          required 
                          className="form-control" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="email" className="mb-3">
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control 
                          type="email" 
                          placeholder="you@example.com" 
                          required 
                          className="form-control" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="phone" className="mb-3">
                        <Form.Label className="form-label">Phone</Form.Label>
                        <Form.Control 
                          type="tel" 
                          placeholder="+91 XXXXX XXXXX" 
                          className="form-control" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="topic" className="mb-3">
                        <Form.Label className="form-label">Topic</Form.Label>
                        <Form.Select 
                          id="topic" 
                          className="form-select"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                        >
                          <option>General Inquiry</option>
                          <option>Packages</option>
                          <option>Booking</option>
                          <option>Support</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="message">
                    <Form.Label className="form-label">Message</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={5} 
                      placeholder="How can we help?" 
                      required 
                      className="form-control" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Form.Group>

                  <div className="mb-3">
                    <div className="form-check">
                      <Form.Check.Input 
                        type="checkbox" 
                        id="consent" 
                        className="form-check-input" 
                        required 
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                      />
                      <label htmlFor="consent" className="form-check-label small text-muted">
                        I agree to be contacted regarding my inquiry.
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="btn-primary">
                    <i className="bi bi-send me-2"></i>Send Message
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>

          {/* Map Section */}
          <Row className="mt-4">
            <Col xs={12}>
              <div className="contact-card p-0 overflow-hidden">
                <iframe
                  src="https://maps.google.com/maps?q=Andheri%20East%20Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="WonderIndia Location"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}

export default Contact;