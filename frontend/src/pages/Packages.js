import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import React Bootstrap components
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

// Import your shared components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import CSS
import '../assets/css/WIindex.css';
import '../assets/css/PackagePage.css'; // Assuming this is your CSS file name

// Import the package data
import { allPackages } from '../data/allPackages';

// ★ 1. Renamed to "Packages"
function Packages() {
  // --- State Management for Filters ---
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('All Price Ranges');
  const [category, setCategory] = useState('all');

  // State to hold the packages that are actually displayed
  const [filteredPackages, setFilteredPackages] = useState(allPackages);

  // This 'useEffect' hook runs automatically whenever the filters change.
  useEffect(() => {
    let packages = [...allPackages];

    // 1. Filter by Search Term
    if (searchTerm) {
      packages = packages.filter(pkg =>
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filter by Category
    if (category !== 'all') {
      packages = packages.filter(pkg => pkg.category === category);
    }

    // 3. Filter by Price Range
    if (priceRange.includes('Under')) {
      packages = packages.filter(pkg => pkg.price < 20000);
    } else if (priceRange.includes('Mid-Range')) {
      packages = packages.filter(pkg => pkg.price >= 20000 && pkg.price <= 30000);
    } else if (priceRange.includes('Premium')) {
      packages = packages.filter(pkg => pkg.price > 30000);
    }

    // Update the state with the new filtered list
    setFilteredPackages(packages);

  }, [searchTerm, priceRange, category]); // The "dependency array"

  // Helper for formatting currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Discover Incredible India</h1>
          <p>Handcrafted travel experiences at unbeatable prices</p>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <Container>
          <Row>
            <Col lg={6} className="mb-3 mb-lg-0">
              <Form.Control
                type="text"
                className="search-input"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col lg={6}>
              <Form.Select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option>All Price Ranges</option>
                <option>Budget (Under ₹20,000)</option>
                <option>Mid-Range (₹20,000 - ₹30,000)</option>
                <option>Premium (Above ₹30,000)</option>
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <Container>
          <div className="text-center">
            <h6 className="text-muted mb-3">Filter by Category</h6>
            <Button
              className="filter-btn"
              active={category === 'all'}
              onClick={() => setCategory('all')}>
              All Packages
            </Button>
            <Button
              className="filter-btn"
              active={category === 'beach'}
              onClick={() => setCategory('beach')}>
              Beach & Islands
            </Button>
            <Button
              className="filter-btn"
              active={category === 'mountains'}
              onClick={() => setCategory('mountains')}>
              Mountains
            </Button>
            <Button
              className="filter-btn"
              active={category === 'heritage'}
              onClick={() => setCategory('heritage')}>
              Heritage & Culture
            </Button>
            <Button
              className="filter-btn"
              active={category === 'adventure'}
              onClick={() => setCategory('adventure')}>
              Adventure
            </Button>
            <Button
              className="filter-btn"
              active={category === 'spiritual'}
              onClick={() => setCategory('spiritual')}>
              Spiritual
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Packages */}
      <section className="packages py-5" id="package" style={{ paddingBottom: '80px' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Featured Travel Packages</h2>
            <p className="section-subtitle">Carefully curated experiences that showcase the best of India</p>
          </div>
          <Row className="g-4">

            {filteredPackages.map((pkg) => (
              <Col lg={4} md={6} key={pkg.id}>
                <div className="package-card">
                  <Card.Img variant="top" src={pkg.image} alt={pkg.title} className="card-img-top" />
                  <Card.Body className="card-body">
                    <h5 className="card-title">{pkg.title}</h5>
                    <div className="card-subtitle">
                      <i className="bi bi-geo-alt me-1"></i>{pkg.location} • {pkg.duration}
                    </div>
                    <ul className="features-list">
                      {pkg.features.map((feature, index) => (
                        <li key={index}><i className="bi bi-check-circle-fill me-2"></i>{feature}</li>
                      ))}
                    </ul>
                    <div className="price-section mb-3">
                      <span className="original-price">{formatPrice(pkg.originalPrice)}</span>
                      <span className="price">{formatPrice(pkg.price)}</span>
                      <span className="discount-badge">{pkg.discount}</span>
                    </div>
                    
                    {/* Updated Link */}
                    <Button as={Link} to={`/package/${pkg.id}`} className="btn-book">
                      <i className="bi bi-calendar-check me-2"></i>View Details
                    </Button>

                  </Card.Body>
                </div>
              </Col>
            ))}

            {/* Show a message if no packages match the filters */}
            {filteredPackages.length === 0 && (
              <Col className="text-center py-5">
                <h4 className="text-muted">No packages match your filters.</h4>
                <Button variant="link" onClick={() => {
                  setSearchTerm('');
                  setPriceRange('All Price Ranges');
                  setCategory('all');
                }}>
                  Clear All Filters
                </Button>
              </Col>
            )}

          </Row>
        </Container>
      </section>

    </>
  );
}

// ★ 1. Export renamed
export default Packages;