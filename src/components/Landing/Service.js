"use client";

import { Row, Col } from "antd";
import Image from "next/image";
import "./service.css";
const ServicesSection = () => {
  const services = [
    {
      number: "01",
      title: "Building Design.",
      description:
        "Architectural excellence and innovative building design solutions tailored to your vision and requirements.",
    },
    {
      number: "02",
      title: "Interior Design.",
      description:
        "Creating beautiful, functional interior spaces that reflect your style and enhance your living experience.",
    },
    {
      number: "03",
      title: "Property Consultancy",
      description:
        "Expert property advice and consultancy services to help you make informed real estate decisions.",
    },
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
        </div>

        {/* Services Grid */}
        <Row gutter={[60, 40]} className="services-grid">
          {services.map((service, index) => (
            <Col xs={24} md={8} key={index}>
              <div className="service-item">
                <div className="imageService-container">
                  <Image
                    src={`/service${index + 1}.png`}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="service-image"
                    onError={(e) => {
                      console.error(
                        `Image service${index + 1}.png failed to load`
                      );
                      // Fallback to a colored background
                      e.target.style.display = "none";
                      const fallback =
                        e.target.parentElement.querySelector(".image-fallback");
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  {/* Fallback if image doesn't load */}
                  <div className="image-fallback">
                    <span>{service.title}</span>
                  </div>
                </div>
                <div className="service-number">{service.number}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default ServicesSection;
