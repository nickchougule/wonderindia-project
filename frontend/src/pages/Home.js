import React, { useEffect, useState } from 'react'; // ★ 1. IMPORT useState
import { Link } from 'react-router-dom';
import API from '../api/api'; // ★ 2. IMPORT API

// React Bootstrap Components
// ★ 3. IMPORT Alert
import { Container, Row, Col, Button, Card, Carousel, Form, Ratio, Alert } from 'react-bootstrap'; 

// Custom CSS
import '../assets/css/WIindex.css';

// ... (all your image imports) ...
import tajMahalHero from '../assets/images/historicalPlaces/Tajmahal.jpg';
import ladakhNadiHero from '../assets/images/ladakhNadi.jpg';
import goldenTempleHero from '../assets/images/temples/GoldenTemple.jpg';
import tajMahalDest from '../assets/images/temples/TajMahal.jpg';
import redFortDest from '../assets/images/temples/RedFort.webp';
import goldenTempleDest from '../assets/images/temples/goldenTempleNew.jpg';
import amerFortDest from '../assets/images/temples/amerfort.webp';
import hawaMahalDest from '../assets/images/temples/hawamahal.webp';
import mysorePalaceDest from '../assets/images/temples/MysorePalace.webp';
import goabeachBooking from '../assets/images/goabeach.jpg';
import keralaPackage from '../assets/images/temples/KeralaBackwaters.webp';
import rajasthanPackage from '../assets/images/temples/RajsthaniFort.webp';
import himachalPackage from '../assets/images/temples/HimachalPradesh.webp';
import user1 from '../assets/images/johnDoe.avif';
import user2 from '../assets/images/priyaMehta.avif';
import user3 from '../assets/images/AbhishekSingh.avif';
import aboutImg from '../assets/images/indianTravel.webp';


function Home() {

    // --- ★ 4. STATE FOR FORMS ---
    // State for Subscribe Form
    const [subEmail, setSubEmail] = useState('');
    const [subError, setSubError] = useState('');
    const [subSuccess, setSubSuccess] = useState('');

    // State for Contact Form
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [contactError, setContactError] = useState('');
    const [contactSuccess, setContactSuccess] = useState('');

    // --- 5. HANDLER FOR SUBSCRIBE FORM ---
    const handleSubscribe = async (e) => {
      e.preventDefault();
      setSubError('');
      setSubSuccess('');
      try {
        const response = await API.post('/subscribe', { email: subEmail });
        setSubSuccess(response.data.message);
        setSubEmail(''); // Clear input
      } catch (err) {
        setSubError(err.response?.data?.message || 'Subscription failed.');
      }
    };

    // --- 6. HANDLERS FOR CONTACT FORM ---
    const handleContactChange = (e) => {
      setContactForm({
        ...contactForm,
        [e.target.name]: e.target.value,
      });
    };

    const handleContactSubmit = async (e) => {
      e.preventDefault();
      setContactError('');
      setContactSuccess('');
      try {
        const response = await API.post('/message', {
          ...contactForm,
          topic: "Home Page Inquiry" // Topic is fixed for this form
        });
        setContactSuccess(response.data.message);
        setContactForm({ name: '', email: '', message: '' }); // Clear form
      } catch (err) {
        setContactError(err.response?.data?.message || 'Failed to send message.');
      }
    };

    // Scroll restoration logic
    useEffect(() => {
        let scrollPosition = localStorage.getItem("scrollPosition");
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition, 10));
        }
        const handleBeforeUnload = () => {
            localStorage.setItem("scrollPosition", window.scrollY);
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);


    return (
        <>
            {/* ... (Hero, Services, Destinations, Booking, Packages, Testimonials sections are all correct) ... */}
            
            {/* ---------------------------Hero Section-------------------------- */}
            <section className="hero" id="home">
                <Container className="py-5">
                    <Row>
                        <Col md={6}>
                            <div className="hero-content">
                                <h1 style={{ paddingTop: '25px' }}>
                                    Explore Incredible <span style={{ color: 'orange' }}>INDIA</span>
                                </h1>
                                <p>Discover breathtaking destinations, rich heritage, and unforgettable journeys with
                                    WonderIndia
                                    Tours.</p>
                                <Button as={Link} to="/packages" className="btn-explore">Start Exploring</Button>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="hero-images">
                                <img src={tajMahalHero} alt="Taj Mahal" className="img-1" />
                                <img src={ladakhNadiHero} alt="Ladakh" className="img-2" />
                                <img src={goldenTempleHero} alt="Golden Temple" className="img-3" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* -------------------------------------Services Section---------------------------- */}
            <section className="services py-5" id="services">
                <Container className="text-center">
                    <h2 className="section-title">We Offer the <span style={{ color: '#ff6600' }}>Best Services</span></h2>
                    <p className="section-subtitle">Making your travel smooth, memorable, and stress-free</p>
                    <Row className="mt-4">
                        <Col md={3} sm={6} className="mb-4">
                            <div className="service-card">
                                <i className="bi bi-globe2 service-icon"></i>
                                <h5>Wide Range of Destinations</h5>
                                <p>Explore from iconic landmarks to hidden gems all over India.</p>
                            </div>
                        </Col>
                        <Col md={3} sm={6} className="mb-4">
                            <div className="service-card">
                                <i className="bi bi-house-door service-icon"></i>
                                <h5>Comfortable Stays</h5>
                                <p>Stay in handpicked hotels and resorts with the best amenities.</p>
                            </div>
                        </Col>
                        <Col md={3} sm={6} className="mb-4">
                            <div className="service-card">
                                <i className="bi bi-car-front service-icon"></i>
                                <h5>Hassle-Free Transport</h5>
                                <p>Convenient travel with private cars, buses, or flights.</p>
                            </div>
                        </Col>
                        <Col md={3} sm={6} className="mb-4">
                            <div className="service-card">
                                <i className="bi bi-headset service-icon"></i>
                                <h5>24/7 Support</h5>
                                <p>Our team is available round the clock for your assistance.</p>
                            </div>
                        </Col>
                    </Row>
                    <div className="mt-4">
                        <Button as={Link} to="/services" variant="warning" size="lg">Learn More</Button>
                    </div>
                </Container>
            </section>

            {/* ------------------------------------------Top Destinations------------------------ */}
            <section className="TopDestination py-5 " id="TopDestination">
                <Row className="text-center fw-bold">
                    <h1 className="section-title">Top Destinations</h1>
                </Row>
                <Container>
                    <Row className="mt-4">
                        <Col md={4} sm={6} className="d-flex justify-content-center">
                            <Card style={{ width: '23rem' }}>
                                <Card.Img variant="top" src={tajMahalDest} alt="Taj Mahal" height="250px" />
                                <Card.Body>
                                    <Card.Title as="h3"><span className="destination-number">1.</span> Taj Mahal</Card.Title>
                                    <Card.Text>
                                        The Taj Mahal, built in 1648 by Emperor Shah Jahan...
                                    </Card.Text>
                                    <Button as={Link} to="/packages" variant="secondary" className="me-2">Explore More</Button>
                                    <Button as={Link} to="/contact" variant="primary">Plan Trip</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} sm={6} className="d-flex justify-content-center">
                            <Card style={{ width: '23rem' }}>
                                <Card.Img variant="top" src={redFortDest} alt="Red Fort" height="250px" />
                                <Card.Body>
                                    <Card.Title as="h3"><span className="destination-number">2.</span> Red Fort</Card.Title>
                                    <Card.Text>
                                        The Red Fort, built in 1648 by Emperor Shah Jahan...
                                    </Card.Text>
                                    <Button as={Link} to="/packages" variant="secondary" className="me-2">Explore More</Button>
                                    <Button as={Link} to="/contact" variant="primary">Plan Trip</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} sm={6} className="d-flex justify-content-center">
                            <Card style={{ width: '23rem' }}>
                                <Card.Img variant="top" src={goldenTempleDest} alt="Golden Temple" height="250px" />
                                <Card.Body>
                                    <Card.Title as="h3"><span className="destination-number">3.</span> Golden Temple</Card.Title>
                                    <Card.Text>
                                        The Golden Temple, built in 1604 by Guru Arjan Dev Ji...
                                    </Card.Text>
                                    <Button as={Link} to="/packages" variant="secondary" className="me-2">Explore More</Button>
                                    <Button as={Link} to="/contact" variant="primary">Plan Trip</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row className="mt-4">
                        <Col md={4} sm={6} className="d-flex justify-content-center">
                            <Card style={{ width: '23rem' }}>
                                <Card.Img variant="top" src={amerFortDest} alt="Amer Fort" height="250px" />
                                <Card.Body>
                                    <Card.Title as="h3"><span className="destination-number">4.</span> Amer Fort</Card.Title>
                                    <Card.Text>
                                        Amer Fort, built in 1592 by Raja Man Singh I...
                                    </Card.Text>
                                    <Button as={Link} to="/packages" variant="secondary" className="me-2">Explore More</Button>
                                    <Button as={Link} to="/contact" variant="primary">Plan Trip</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} sm={6} className="d-flex justify-content-center">
                            <Card style={{ width: '23rem' }}>
                                <Card.Img variant="top" src={hawaMahalDest} alt="Hawa Mahal" height="250px" />
                                <Card.Body>
                                    <Card.Title as="h3"><span className="destination-number">5.</span> Hawa Mahal</Card.Title>
                                    <Card.Text>
                                        Hawa Mahal, or the Palace of Winds, was built in 1799...
                                    </Card.Text>
                                    <Button as={Link} to="/packages" variant="secondary" className="me-2">Explore More</Button>
                                    <Button as={Link} to="/contact" variant="primary">Plan Trip</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} sm={6} className="d-flex justify-content-center">
                            <Card style={{ width: '23rem' }}>
                                <Card.Img variant="top" src={mysorePalaceDest} alt="Mysore Palace" height="250px" />
                                <Card.Body>
                                    <Card.Title as="h3"><span className="destination-number">6.</span> Mysore Palace</Card.Title>
                                    <Card.Text>
                                        Mysore Palace, completed in 1912, is the royal residence...
                                    </Card.Text>
                                    <Button as={Link} to="/packages" variant="secondary" className="me-2">Explore More</Button>
                                    <Button as={Link} to="/contact" variant="primary">Plan Trip</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Booking & Package Section */}
            <section className="BookingSteps py-5 " id="BookingSteps">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6} className="mb-4">
                            <h4 className="text-uppercase text-muted">Easy And Fast</h4>
                            <h1>Book Your Next Trip In <br /><span style={{ color: '#ff6600' }}>3 Easy Steps</span></h1>
                            <div className="d-flex mb-4">
                                <div className="step-icon me-3">1️⃣</div>
                                <div>
                                    <h5>Choose Destination</h5>
                                    <p className="text-muted">🌍 Pick from our wide range of incredible Indian destinations.</p>
                                </div>
                            </div>
                            <div className="d-flex mb-4">
                                <div className="step-icon me-3">2️⃣</div>
                                <div>
                                    <h5>Book & Pay</h5>
                                    <p className="text-muted">💳 Secure your trip instantly with easy and safe payments.</p>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="step-icon me-3">3️⃣</div>
                                <div>
                                    <h5>Enjoy Your Trip</h5>
                                    <p className="text-muted">✈️ Pack your bags and get ready for unforgettable experiences!</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="d-flex justify-content-center">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={goabeachBooking} alt="Goa Beach" />
                                <Card.Body>
                                    <Card.Title as="h4">Goa Beach Getaway</Card.Title>
                                    <Card.Text>
                                        3 Nights / 4 Days - Starting from <strong>₹12,999</strong>
                                    </Card.Text>
                                    <Button as={Link} to="/package/1" variant="warning">Book Now</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* ----------------- Single Card Holiday Packages Carousel ----------------- */}
            <section className="holiday-packages py-5" id="package">
                <Container>
                    <Row className="text-center mb-4">
                        <h1 className="section-title fw-bold">Special Holiday Packages</h1>
                        <p className="text-muted">Choose from our handpicked packages and make your trip unforgettable.</p>
                    </Row>
                    <Carousel
                        id="holidayCarousel"
                        prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon bg-dark rounded-circle p-3" />}
                        nextIcon={<span aria-hidden="true" className="carousel-control-next-icon bg-dark rounded-circle p-3" />}
                    >
                        <Carousel.Item>
                            <Card className="shadow mx-auto" style={{ width: '22rem' }}>
                                <Card.Img variant="top" src={goabeachBooking} alt="Goa Beach" />
                                <Card.Body>
                                    <Card.Title as="h5" className="fw-bold">Goa Beach Getaway</Card.Title>
                                    <Card.Text>
                                        3 Nights / 4 Days<br /><strong>₹12,999</strong>
                                    </Card.Text>
                                    <Button as={Link} to="/package/1" variant="warning">Book Now</Button>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Card className="shadow mx-auto" style={{ width: '22rem' }}>
                                <Card.Img variant="top" src={keralaPackage} alt="Kerala" />
                                <Card.Body>
                                    <Card.Title as="h5" className="fw-bold">Kerala Backwaters</Card.Title>
                                    <Card.Text>
                                        4 Nights / 5 Days<br /><strong>₹18,499</strong>
                                    </Card.Text>
                                    <Button as={Link} to="/package/3" variant="warning">Book Now</Button>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Card className="shadow mx-auto" style={{ width: '22rem' }}>
                                <Card.Img variant="top" src={rajasthanPackage} alt="Rajasthan" />
                                <Card.Body>
                                    <Card.Title as="h5" className="fw-bold">Royal Rajasthan</Card.Title>
                                    <Card.Text>
                                        5 Nights / 6 Days<br /><strong>₹22,999</strong>
                                    </Card.Text>
                                    <Button as={Link} to="/package/4" variant="warning">Book Now</Button>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Card className="shadow mx-auto" style={{ width: '22rem' }}>
                                <Card.Img variant="top" src={himachalPackage} alt="Himachal" />
                                <Card.Body>
                                    <Card.Title as="h5" className="fw-bold">Himachal Adventure</Card.Title>
                                    <Card.Text>
                                        6 Nights / 7 Days<br /><strong>₹24,499</strong>
                                    </Card.Text>
                                    <Button as={Link} to="/packages" variant="warning">Book Now</Button>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                    </Carousel>
                </Container>
            </section>

            {/* --------------------------Testinomials------------------------ */}
            <section className="testimonials py-5 bg-light">
                <Container>
                    <Row className="text-center mb-4">
                        <h1 className="section-title fw-bold">What Our Customers Say</h1>
                        <p className="text-muted">Real experiences from our happy travelers</p>
                    </Row>
                    <Carousel
                        id="testimonialCarousel"
                        prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon bg-dark rounded-circle p-3" />}
                        nextIcon={<span aria-hidden="true" className="carousel-control-next-icon bg-dark rounded-circle p-3" />}
                    >
                        <Carousel.Item className="text-center">
                            <img src={user1} className="rounded-circle mb-3" width="100" height="100"
                                alt="User 1" style={{ objectFit: 'cover' }} />
                            <h5 className="fw-bold">Vishal Mishra</h5>
                            <p className="text-muted">⭐⭐⭐⭐⭐</p>
                            <p className="mx-auto" style={{ maxWidth: '600px' }}>
                                "The Goa Beach package was amazing! Everything was perfectly arranged, and I had the best
                                time of my life."
                            </p>
                        </Carousel.Item>
                        <Carousel.Item className="text-center">
                            <img src={user2} className="rounded-circle mb-3" width="100" height="100"
                                alt="User 2" style={{ objectFit: 'cover' }} />
                            <h5 className="fw-bold">Priya Mehta</h5>
                            <p className="text-muted">⭐⭐⭐⭐</p>
                            <p className="mx-auto" style={{ maxWidth: '600px' }}>
                                "Kerala backwaters were beautiful. The staff was very supportive and the whole trip felt
                                hassle-free."
                            </p>
                        </Carousel.Item>
                        <Carousel.Item className="text-center">
                            <img src={user3} className="rounded-circle mb-3" width="100" height="100"
                                alt="User 3" style={{ objectFit: 'cover' }} />
                            <h5 className="fw-bold">Abhishek Singh</h5>
                            <p className="text-muted">⭐⭐⭐⭐⭐</p>
                            <p className="mx-auto" style={{ maxWidth: '600px' }}>
                                "Loved the Rajasthan royal experience! Highly recommend this agency for well-planned
                                holidays."
                            </p>
                        </Carousel.Item>
                    </Carousel>
                </Container>
            </section>

            {/* --- ★ SUBSCRIBE SECTION (NOW FUNCTIONAL) ★ --- */}
            <section className="subscribe-section py-5 text-center text-white"
                style={{ background: 'linear-gradient(to right, #ff6600, #e05500)' }}>
                <Container>
                    <h2 className="fw-bold mb-3">Subscribe for Latest Updates</h2>
                    <p className="mb-4">Get notified about new holiday packages and special offers directly in your inbox.</p>

                    {/* ★ 7. WIRED UP THE SUBSCRIBE FORM ★ */}
                    <Form className="d-flex justify-content-center" style={{ maxWidth: '500px', margin: '0 auto' }} onSubmit={handleSubscribe}>
                        <Form.Control 
                          type="email" 
                          className="me-2" 
                          placeholder="Enter your email" 
                          value={subEmail}
                          onChange={(e) => setSubEmail(e.target.value)}
                          required 
                        />
                        <Button type="submit" variant="dark" className="px-4">Subscribe</Button>
                    </Form>
                    {/* ★ 8. ADDED SUCCESS/ERROR ALERTS ★ */}
                    {subSuccess && <Alert variant="success" className="mt-3 py-2" style={{ maxWidth: '500px', margin: '10px auto 0' }}>{subSuccess}</Alert>}
                    {subError && <Alert variant="danger" className="mt-3 py-2" style={{ maxWidth: '500px', margin: '10px auto 0' }}>{subError}</Alert>}
                </Container>
            </section>

            {/* About Us Section */}
            <section className="about-us py-5" id="About">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6} className="mb-4 mb-md-0">
                            <img src={aboutImg} alt="About Us" className="img-fluid rounded shadow" />
                        </Col>
                        <Col md={6}>
                            <h2 className="fw-bold mb-3">About Us</h2>
                            <p className="text-muted">
                                At <strong>Wonder India Tours</strong>, we believe every journey is an experience worth
                                remembering.
                                With years of expertise, we specialize in curating customized travel packages that blend
                                culture,
                                adventure, and relaxation.
                            </p>
                            <p className="text-muted">
                                From the royal palaces of Rajasthan to the serene backwaters of Kerala, our mission is to make
                                your
                                holidays unforgettable with seamless planning and personalized services.
                            </p>
                            <Button as={Link} to="/about" variant="warning" className="mt-3">Learn More</Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* --- ★ CONTACT US SECTION (NOW FUNCTIONAL) ★ --- */}
            <section className="contact-us py-5 bg-light" id="contact-us">
                <Container>
                    <Row className="mb-4 text-center">
                        <h1 className="fw-bold">Contact Us</h1>
                        <p className="text-muted">We’d love to hear from you! Reach out for queries, bookings, or support.</p>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-4">
                            <Card className="shadow p-4">
                                <h4 className="fw-bold mb-3">Get in Touch</h4>
                                {/* ★ 9. WIRED UP THE CONTACT FORM ★ */}
                                <Form onSubmit={handleContactSubmit}>
                                    {contactSuccess && <Alert variant="success" className="py-2">{contactSuccess}</Alert>}
                                    {contactError && <Alert variant="danger" className="py-2">{contactError}</Alert>}
                                    
                                    <Form.Group className="mb-3" controlId="formFullName">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control 
                                          type="text" 
                                          placeholder="Enter your name" 
                                          name="name" // ★ Added name
                                          value={contactForm.name}
                                          onChange={handleContactChange}
                                          required 
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control 
                                          type="email" 
                                          placeholder="Enter your email" 
                                          name="email" // ★ Added name
                                          value={contactForm.email}
                                          onChange={handleContactChange}
                                          required 
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formMessage">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control 
                                          as="textarea" 
                                          rows={4} 
                                          placeholder="Write your message..." 
                                          name="message" // ★ Added name
                                          value={contactForm.message}
                                          onChange={handleContactChange}
                                          required 
                                        />
                                    </Form.Group>
                                    <Button type="submit" variant="warning" className="w-100">Send Message</Button>
                                </Form>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Ratio aspectRatio="4x3">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4841.973619374917!2d73.83410293457474!3d18.51827586369819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf866c6444cb%3A0x7c87518c11be678c!2sSPARK%20IT%20Training%20Institute%20for%20Full%20Stack%20Development%20Classes%20%26%20Training%20Institute%20in%20Pune!5e0!3m2!1sen!2sin!4v1757099817273!5m2!1sen!2sin"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Map Location"
                                ></iframe>
                            </Ratio>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Home;