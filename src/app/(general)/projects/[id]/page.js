"use client";
import { useState } from "react";
import { Modal, Form, Input, Button, Row, Col, Card, message } from "antd";
import "./projectDetails.css";
import {
  LuBuilding2,
  LuCalendar,
  LuMapPin,
  LuUserSearch,
  LuWrench,
} from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import Image from "next/image";

// Mock data - will be replaced with API response
const projectData = {
  title: "Brishti Bilash",
  heroImage:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
  galleryImages: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80",
    "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&q=80",
  ],
  progress: 90,
  stats: {
    type: "Residential Building",
    apartmentSize: "2,480 Sqft",
    landArea: "5 Katha",
    elevator: "1 unit",
    handover: "2020",
    stairCase: "1 Unit",
  },
  location: {
    mapImage:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80",
    mapUrl: "#",
  },
};

const ProjectDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    // message.success("Thank you! Your brochure is downloading...");

    // Simulate file download
    // const link = document.createElement("a");
    // link.href = "#"; // Replace with actual file URL from API
    // link.download = "project-brochure.pdf";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="project-details-page">
      {/* Hero Section */}
      <section
        className="projectDetails-section"
        style={{ backgroundImage: `url(${projectData.heroImage})` }}
      >
        <div className="projectDetails-overlay">
          <div className="projectDetails-content">
            <h1 className="project-title">{projectData.title}</h1>
            <div className="gallery-thumbnails">
              {projectData.galleryImages.map((img, index) => (
                <div key={index} className="thumbnail">
                  <Image src={img} alt={`Gallery ${index + 1}`} fill />
                  <div className="thumbnail-label">
                    {index === 0 ? "Bedroom" : index === 1 ? "Dining" : "View"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* At A Glance Section */}
      <section className="glance-section">
        <div className="container">
          <h2 className="section-title">At A Glance</h2>
          <div className="glance-card">
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} md={8}>
                <div className="progress-circle">
                  <svg viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" className="progress-bg" />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      className="progress-fill"
                      style={{
                        strokeDasharray: `${2 * Math.PI * 54}`,
                        strokeDashoffset: `${
                          2 * Math.PI * 54 * (1 - projectData.progress / 100)
                        }`,
                      }}
                    />
                  </svg>
                  <div className="progress-text">
                    <span className="progress-value">
                      {projectData.progress}%
                    </span>
                  </div>
                </div>
                <p className="progress-label">Project Progress</p>
              </Col>

              <Col xs={24} md={16}>
                <Row gutter={[16, 16]}>
                  <Col xs={12} sm={12}>
                    <div className="stat-item">
                      <LuBuilding2 className="stat-icon" />
                      <div>
                        <div className="stat-label">Type</div>
                        <div className="stat-value">
                          {projectData.stats.type}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12}>
                    <div className="stat-item">
                      <FaHome className="stat-icon" />
                      <div>
                        <div className="stat-label">Apartment Size</div>
                        <div className="stat-value">
                          {projectData.stats.apartmentSize}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12}>
                    <div className="stat-item">
                      <LuMapPin className="stat-icon" />
                      <div>
                        <div className="stat-label">Land Area</div>
                        <div className="stat-value">
                          {projectData.stats.landArea}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12}>
                    <div className="stat-item">
                      <LuWrench className="stat-icon" />
                      <div>
                        <div className="stat-label">Elevator</div>
                        <div className="stat-value">
                          {projectData.stats.elevator}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12}>
                    <div className="stat-item">
                      <LuUserSearch className="stat-icon" />
                      <div>
                        <div className="stat-label">Handover</div>
                        <div className="stat-value">
                          {projectData.stats.handover}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12}>
                    <div className="stat-item">
                      <LuCalendar className="stat-icon" />
                      <div>
                        <div className="stat-label">Stair Case</div>
                        <div className="stat-value">
                          {projectData.stats.stairCase}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </section>

      {/* Project Location Section */}
      <section className="location-section">
        <div className="container">
          <h2 className="section-title">Project Location</h2>
          <div className="location-card">
            <div className="map-container">
              <Image
                src={projectData.location.mapImage}
                alt="Project Location Map"
                fill
              />
              <div className="map-overlay">
                <a
                  href={projectData.location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-button"
                >
                  Click Here To View The Map
                </a>
              </div>
            </div>
            <Button
              type="primary"
              size="large"
              className="download-button"
              onClick={showModal}
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* Download Brochure Modal */}
      <Modal
        title="Add your Mail For Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        className="brochure-modal"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="brochure-form"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please enter your name" },
              { max: 100, message: "Name must be less than 100 characters" },
            ]}
          >
            <Input size="large" placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            name="mobile"
            label="Mobile No:*"
            rules={[
              { required: true, message: "Please enter your mobile number" },
              {
                pattern: /^[0-9]{10,15}$/,
                message: "Please enter a valid mobile number",
              },
            ]}
          >
            <Input size="large" placeholder="Enter your mobile number" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email*"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
              { max: 255, message: "Email must be less than 255 characters" },
            ]}
          >
            <Input size="large" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="submit-button"
            >
              SUBMIT
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectDetails;
