import React from 'react';

// Import React Bootstrap components
import { Container, Row, Col } from 'react-bootstrap';

// Import your shared components
// (Adjust path if AppNavbar/Footer are in a different folder)
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

// Import CSS
// NOTE: bootstrap.min.css should be imported ONCE in your main App.js or index.js
import '../assets/css/WIindex.css';     // Your main stylesheet
import '../assets/css/AboutPage.css';   // <-- Create this new file (see below)

// Import Images
import logo from '../assets/images/WonderIndiaIndianStyle-removebg-preview.png';
import teamRohit from '../assets/images/rohitSharma.webp';
import teamVirat from '../assets/images/ViratKohli.webp';
import teamPriya from '../assets/images/priyapatel.webp';

function AboutUs() {
  return (
    <>
      {/* 1. NAVBAR 
        Import your AppNavbar component. Do not copy/paste navbar HTML here.
      */}
      <Navbar />

      {/* --- Main Page Content Starts Here --- */}

      {/* Hero Banner */}
      {/* The background image is handled by 'AboutPage.css' */}
      <section className="hero-banner">
        <div>
          <h1>About WonderIndia Tours</h1>
          <p>Your gateway to unforgettable Indian journeys</p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-5">
        <Container>
          <div className="text-center">
            <h2 className="section-title">Who We Are</h2>
            <p className="lead">
              WonderIndia Tours is a trusted travel companion dedicated to showcasing the diverse beauty, culture,
              and history of India. With curated packages and personalized experiences, we ensure that every trip
              is more than just a journey – it's a lifetime memory.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-5" style={{ backgroundColor: 'var(--light-bg)' }}>
        <Container>
          <h2 className="section-title text-center">Our Mission & Vision</h2>
          <Row>
            <Col md={6}>
              <div className="mission-vision-card">
                <h4>Our Mission</h4>
                <p>To make travel in India seamless, enjoyable, and affordable for every explorer,
                  while promoting local culture and sustainable tourism.</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mission-vision-card">
                <h4>Our Vision</h4>
                <p>To become India's most loved travel platform, known for creating unforgettable
                  journeys that connect people with the soul of India.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-5">
        <Container>
          <h2 className="section-title text-center">Why Choose Us</h2>
          <Row>
            <Col md={3} sm={6}>
              <div className="icon-box">
                <i className="bi bi-star-fill text-warning"></i>
                <h5>Trusted Service</h5>
                <p>Years of experience in travel industry</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="icon-box">
                <i className="bi bi-cash-coin text-success"></i>
                <h5>Best Price Guarantee</h5>
                <p>Competitive prices for all destinations</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="icon-box">
                <i className="bi bi-geo-alt-fill text-danger"></i>
                <h5>Diverse Destinations</h5>
                <p>From beaches to mountains, we cover it all</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="icon-box">
                <i className="bi bi-people-fill text-primary"></i>
                <h5>Expert Team</h5>
                <p>Professional and knowledgeable staff</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-5" style={{ backgroundColor: 'var(--light-bg)' }}>
        <Container>
          <h2 className="section-title text-center">Meet Our Team</h2>
          <Row className="justify-content-center">
            <Col md={4} sm={6}>
              <div className="team-member">
                <img src={teamRohit} alt="Rohit Sharma" />
                <h5>Rohit Sharma</h5>
                <p>Founder & CEO</p>
                <p className="small">Leading WonderIndia with passion for travel and customer satisfaction.</p>
              </div>
            </Col>
            <Col md={4} sm={6}>
              <div className="team-member">
                <img src={teamVirat} alt="Virat Kohli" />
                <h5>Virat Kohli</h5>
                <p>Travel Expert</p>
                <p className="small">Specialist in creating unique and memorable travel experiences.</p>
              </div>
            </Col>
            <Col md={4} sm={6}>
              <div className="team-member">
                <img src={teamPriya} alt="Priya Patel" />
                <h5>Priya Patel</h5>
                <p>Customer Relations</p>
                <p className="small">Ensuring every customer has the best possible travel experience.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Statistics */}
      <section className="py-5">
        <Container>
          <Row className="text-center">
            <Col md={3} col={6} className="mb-4"> {/* Use 'col' for smallest breakpoint */}
              <h2 className="text-primary">500+</h2>
              <p>Happy Customers</p>
            </Col>
            <Col md={3} col={6} className="mb-4">
              <h2 className="text-success">50+</h2>
              <p>Destinations</p>
            </Col>
            <Col md={3} col={6} className="mb-4">
              <h2 className="text-warning">100+</h2>
              <p>Tour Packages</p>
            </Col>
            <Col md={3} col={6} className="mb-4">
              <h2 className="text-danger">5</h2>
              <p>Years Experience</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 2. FOOTER 
        Create a Footer.js component, import it, and use it here.
        I have converted the code, but you should move this to its own file.
      */}
      {/* --- You can use the converted code below to create your 'Footer.js' --- */}
      
      {/* <footer>
        <Container className="text-center">
          <img src={logo} alt="WonderIndia Logo" height="60" className="mb-3" />
          <p>&copy; 2025 WonderIndia Tours. All Rights Reserved.</p>
          <p className="small">Experience the incredible diversity of India with our expertly crafted tours.</p>
          <div className="footer-social">
            <a href="#!"><i className="bi bi-facebook"></i></a>
            <a href="#!"><i className="bi bi-instagram"></i></a>
            <a href="#!"><i className="bi bi-twitter"></i></a>
            <a href="#!"><i className="bi bi-youtube"></i></a>
          </div>
        </Container>
      </footer> */}
    </>
  );
}

export default AboutUs;