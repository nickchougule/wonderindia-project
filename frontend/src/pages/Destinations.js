import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import React Bootstrap components
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

// Import your shared components
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

// Import CSS
import '../assets/css/WIindex.css'; 
import '../assets/css/DestinationPage.css'; 

// Import the destination data
import { allDestinations } from '../data/allDestinations';

// ★ 1. Renamed to "Destinations"
function Destinations() {
  // --- React State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('all');
  const [filteredDestinations, setFilteredDestinations] = useState(allDestinations);

  // --- Event Handlers ---
  const handleFilter = () => {
    let newFilteredList = allDestinations;

    // 1. Filter by Region
    if (region !== 'all') {
      newFilteredList = newFilteredList.filter(dest => dest.region === region);
    }

    // 2. Filter by Search Term
    if (searchTerm.trim() !== '') {
      newFilteredList = newFilteredList.filter(dest =>
        dest.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 3. Update the state
    setFilteredDestinations(newFilteredList);
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="parallax-hero text-center">
        <div>
          <h1 className="fw-bold display-4">Top Destinations in India</h1>
          <p className="lead">Discover the beauty of India from the Himalayas to the beaches of Goa</p>
        </div>
      </section>

      {/* Search & Filters */}
      <Container className="filter-bar mt-4">
        <Row className="g-2">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search Destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="all">All Regions</option>
              <option value="north">North India</option>
              <option value="south">South India</option>
              <option value="east">East India</option>
              <option value="west">West India</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Button className="btn-primary w-100" onClick={handleFilter}> 
              Apply Filter
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Destinations Grid */}
      <section className="container py-5" id="destinations">
        <Row className="g-4" id="destinationsGrid">
          
          {filteredDestinations.map((destination) => (
            <Col md={4} key={destination.name} className="destination-card">
              <Card className="shadow-sm ms-auto" style={{ width: '23rem' }}>
                <Card.Img 
                  variant="top" 
                  src={destination.image}
                  alt={destination.name} 
                  className="destination-card-img"
                />
                <Card.Body>
                  <Card.Title as="h5">{destination.name}</Card.Title>
                  <Card.Text>{destination.text}</Card.Text>
                  <Button as={Link} to="/packages" variant="outline-primary">
                    View Packages
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {/* Show a message if no destinations are found */}
          {filteredDestinations.length === 0 && (
            <Col className="text-center py-5">
              <h4 className="text-muted">No destinations match your filter.</h4>
              <Button variant="link" onClick={() => {
                setSearchTerm('');
                setRegion('all');
                setFilteredDestinations(allDestinations);
              }}>
                Clear Filters
              </Button>
            </Col>
          )}

        </Row>
      </section>

      {/* CTA */}
      <section className="text-center py-5 bg-light">
        <Container>
          <h2 className="fw-bold">Ready for Your Adventure?</h2>
          <p className="lead">Choose from our packages and start your journey with WonderIndia!</p>
          <Button as={Link} to="/packages" variant="primary" size="lg">
            Explore Packages
          </Button>
        </Container>
      </section>

    </>
  );
}

// ★ 1. Export renamed
export default Destinations;