// src/components/ContactUs.js
import React from "react";

const ContactUs = () => {
  return (
    <div className="contact-card">
      <h4 className="section-title">Send us a Message</h4>
      <form>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" id="name" className="form-control" placeholder="Your name" required />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email" className="form-control" placeholder="you@example.com" required />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input type="tel" id="phone" className="form-control" placeholder="+91 XXXXX XXXXX" />
          </div>
          <div className="col-md-6">
            <label htmlFor="topic" className="form-label">Topic</label>
            <select id="topic" className="form-select">
              <option selected>General Inquiry</option>
              <option>Packages</option>
              <option>Booking</option>
              <option>Support</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea id="message" rows="5" className="form-control" placeholder="How can we help?" required></textarea>
        </div>

        <div className="mb-3">
          <div className="form-check">
            <input type="checkbox" id="consent" className="form-check-input" required />
            <label htmlFor="consent" className="form-check-label small text-muted">
              I agree to be contacted regarding my inquiry.
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          <i className="bi bi-send me-2"></i>Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
