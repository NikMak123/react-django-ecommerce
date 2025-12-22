import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupIcon from '@mui/icons-material/Group';

export default function About() {
  return (
    <div style={{ background: "#f4f4f7", paddingTop: "80px" }}>
      
      {/* HERO */}
      <Container className="text-center mb-5">
        <h1 className="fw-bold display-5">
          About <span style={{ color: "#4f46e5" }}>Our Store</span>
        </h1>
        <p className="mt-3 lead text-muted mx-auto" style={{ maxWidth: 650 }}>
          Delivering premium products, fast deliveries, and a smooth shopping experience crafted for today’s customers.
        </p>
      </Container>

      {/* STORY SECTION */}
      <Container className="my-5">
        <Row className="align-items-center g-4">
          
          <Col md={6}>
            <img
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713"
              alt="Store"
              className="img-fluid rounded-4 shadow"
              style={{ width: "100%", height: "auto" }}
            />
          </Col>

          <Col md={6}>
            <h2 className="fw-bold mb-3">Who We Are</h2>
            <p className="text-muted fs-5">
              Welcome to <span className="fw-semibold" style={{ color: "#4f46e5" }}>Our Ecommerce Store</span>,
              your trusted place for high-quality products at the best prices.
            </p>
            <p className="text-muted fs-5">
              We focus on offering a wide variety of items along with smooth delivery, secure checkout, and top-class customer service.
            </p>
          </Col>

        </Row>
      </Container>

      {/* FEATURES */}
      <Container className="my-5">
        <Row className="g-4">
          {[
            { icon: <ShoppingBagIcon sx={{ fontSize: 45, color: "#4f46e5" }} />, title: "Premium Range", desc: "Thousands of curated products." },
            { icon: <LocalShippingIcon sx={{ fontSize: 45, color: "#4f46e5" }} />, title: "Fast Delivery", desc: "Quick nationwide shipping." },
            { icon: <VerifiedUserIcon sx={{ fontSize: 45, color: "#4f46e5" }} />, title: "Secure Checkout", desc: "Safe and encrypted payments." },
            { icon: <GroupIcon sx={{ fontSize: 45, color: "#4f46e5" }} />, title: "Trusted Community", desc: "Thousands of happy customers." },
          ].map((item, i) => (
            <Col md={3} sm={6} xs={12} key={i}>
              <Card className="h-100 text-center shadow-sm border-0 p-3 rounded-4">
                <div className="mb-3">{item.icon}</div>
                <h5 className="fw-bold mb-2">{item.title}</h5>
                <p className="text-muted small">{item.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* MISSION & VISION */}
      <Container className="my-5">
        <Row className="g-4">
          
          <Col md={6}>
            <Card className="p-4 shadow rounded-4 border-0 h-100">
              <h3 className="fw-bold mb-3">Our Mission</h3>
              <p className="text-muted fs-5">
                To provide convenience, quality, and affordability — ensuring every customer enjoys a delightful shopping experience.
              </p>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-4 shadow rounded-4 border-0 h-100">
              <h3 className="fw-bold mb-3">Our Vision</h3>
              <p className="text-muted fs-5">
                To become a global ecommerce brand known for innovation, trust, and customer-focused service.
              </p>
            </Card>
          </Col>

        </Row>
      </Container>

      {/* CTA */}
      <Container className="text-center my-5 pb-5">
        <h2 className="fw-bold display-6 mb-3">We’re More Than Just a Store</h2>
        <p className="text-muted mx-auto fs-5" style={{ maxWidth: 600 }}>
          Discover a seamless shopping experience built with care, comfort, and speed.
        </p>

        <a
          href="#"
          className="btn btn-lg mt-3 px-5 py-3 text-white"
          style={{ background: "#4f46e5", borderRadius: "50px" }}
        >
          Shop Now
        </a>
      </Container>

    </div>
  );
}
