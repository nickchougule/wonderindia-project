import React from 'react';
import { Link } from 'react-router-dom';

// Import React Bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap';

// Import your shared components
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

// Import CSS
import '../assets/css/WIindex.css';
import '../assets/css/ServicePage.css';

// Import Images
import travelTeamImg from '../assets/images/travelTeam.webp';

// ★ 1. Renamed to "Services"
function Services() {
  return (
    <>
      <Navbar />

      {/* Parallax Section */}
      <section className="parallax-section d-flex align-items-center justify-content-center text-white">
        <div className="text-center">
          <h1 className="fw-bold">Discover the Best Services</h1>
          <p className="lead">Your journey, our responsibility ✈️</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services py-5">
        <Container>
          <Row className="text-center mb-5">
            <h2 className="fw-bold">What We Offer</h2>
            <p className="text-muted">From travel planning to hassle-free experiences</p>
          </Row>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <i className="bi bi-globe2 display-4 text-warning"></i>
              <h5 className="mt-3">Wide Range of Destinations</h5>
              <p>Explore from iconic landmarks to hidden gems across India.</p>
            </Col>
            <Col md={3} className="mb-4">
              <i className="bi bi-house-door display-4 text-primary"></i>
              <h5 className="mt-3">Comfortable Stays</h5>
              <p>Handpicked hotels & resorts for a luxurious experience.</p>
            </Col>
            <Col md={3} className="mb-4">
              <i className="bi bi-car-front display-4 text-success"></i>
              <h5 className="mt-3">Hassle-Free Transport</h5>
              <p>Convenient travel with cars, buses, trains & flights.</p>
            </Col>
            <Col md={3} className="mb-4">
              <i className="bi bi-headset display-4 text-danger"></i>
              <h5 className="mt-3">24/7 Support</h5>
              <p>Round-the-clock assistance to ensure peace of mind.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold">Why Choose WonderIndia?</h2>
              <p>We provide personalized travel experiences that suit every budget and preference.</p>
              <ul className="list-unstyled">
                <li>✔ 10+ Years of Experience</li>
                <li>✔ 500+ Trips Successfully Planned</li>
                <li>✔ Trusted by Thousands of Travelers</li>
                <li>✔ Affordable Packages with Premium Services</li>
              </ul>
            </Col>
            <Col md={6} className="text-center">
              <img 
                src={travelTeamImg} 
                alt="Travel Team" 
                className="img-fluid rounded shadow" 
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section 
        className="cta py-5 text-center text-white" 
        style={{ background: 'linear-gradient(to right, #ff6600, #e05500)' }}
      >
        <Container>
          <h2 className="fw-bold">Ready for Your Next Adventure?</h2>
          <p className="lead">Plan your trip today with WonderIndia and make memories that last a lifetime!</p>
          <Button as={Link} to="/destinations" variant="light" size="lg">
            Explore Destinations
          </Button>
        </Container>
      </section>
      
    </>
  );
}

// ★ 1. Export renamed
export default Services;