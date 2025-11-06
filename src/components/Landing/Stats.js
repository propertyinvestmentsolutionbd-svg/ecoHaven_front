"use client";

import { Row, Col } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
// import "./landing.css";

const StatsSection = () => {
  const statsData = [
    {
      number: "35",
      label: "Ongoing",
      title: "PROJECTS",
    },
    {
      number: "5",
      label: "Complete",
      title: "PROJECTS",
    },
    {
      number: "15",
      label: "Years",
      title: "ACHIEVEMENT",
    },
    {
      number: "52",
      label: "Premium",
      title: "UNITS",
    },
  ];

  const openGoogleMaps = () => {
    window.open(
      "https://www.google.com/maps?q=40.71274377933185,-74.00594908459418",
      "_blank"
    );
  };

  return (
    <div className="stats-section">
      <div className="stats-container">
        {/* Stats Grid */}
        <Row gutter={[40, 40]} className="stats-grid">
          {statsData.map((stat, index) => (
            <Col xs={12} sm={12} md={6} lg={6} key={index}>
              <div className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-title">{stat.title}</div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Company Name */}
        <div className="company-name">Eco Haven</div>
      </div>
      {/* Full Width Map with Overlay */}
      <div className="full-width-map">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25313.551081338017!2d90.34815775786113!3d23.839401774675263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1000038396f%3A0x576a62bf370ec5f!2sEco%20Haven%20Limited!5e0!3m2!1sen!2sbd!4v1760734829326!5m2!1sen!2sbd"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Digitmark Creative Location"
          />

          {/* Map Overlay */}
          <div className="map-overlay" onClick={openGoogleMaps}>
            <div className="overlay-content">
              <EnvironmentOutlined className="pin-icon" />
              <span className="overlay-text">Click here to view on map</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
