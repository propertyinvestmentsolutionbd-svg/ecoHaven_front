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
import { useGetProjectsByIdQuery } from "@/redux/api/projectApi";
import { useParams } from "next/navigation";
import { useAddContactsMutation } from "@/redux/api/contactApi";
import { toast } from "react-toastify";

const ProjectDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const projectId = params.id;
  const [addContacts, { isLoading: contactLoading }] = useAddContactsMutation();

  const {
    data: projectData,
    isLoading,
    error,
  } = useGetProjectsByIdQuery(projectId);

  // Use actual API data with fallbacks
  const project = projectData?.data || {};

  // Get hero image - use first image or fallback to dummy.jpg
  const getHeroImage = () => {
    if (project?.images?.[0]?.imageUrl) {
      return `http://localhost:5000${project.images[0].imageUrl}`;
    }
    // Fallback to first gallery image if no main images
    if (project?.galleryItems?.[0]?.imageUrl) {
      return `http://localhost:5000${project.galleryItems[0].imageUrl}`;
    }
    // Use dummy.jpg as final fallback
    return "/dummy.jpg";
  };

  // Get gallery images (first 3 gallery items)
  const getGalleryImages = () => {
    if (!project?.galleryItems || project.galleryItems.length === 0) {
      // Use dummy.jpg for all gallery images if no gallery items
      return ["/dummy.jpg", "/dummy.jpg", "/dummy.jpg"];
    }

    // Take first 3 gallery items
    return project.galleryItems
      .slice(0, 3)
      .map((item) =>
        item.imageUrl ? `http://localhost:5000${item.imageUrl}` : "/dummy.jpg"
      );
  };

  // Get thumbnail labels from gallery item titles
  const getThumbnailLabels = () => {
    if (!project?.galleryItems || project.galleryItems.length === 0) {
      return ["Bedroom", "Dining", "View"]; // Default labels
    }

    const labels = project.galleryItems
      .slice(0, 3)
      .map((item) => item.title || "Gallery");

    // Fill remaining slots with default labels if needed
    while (labels.length < 3) {
      labels.push(["Bedroom", "Dining", "View"][labels.length]);
    }

    return labels;
  };

  // Get project stats with fallbacks
  const getProjectStats = () => ({
    type: project.projectType || "Not specified",
    apartmentSize: project.sizeSqft
      ? `${project.sizeSqft} Sqft`
      : "Not specified",
    landArea: project.landArea || "Not specified",
    elevator: "1 unit", // Default value since not in API
    handover: project.completionYear?.toString() || "Not specified",
    stairCase: "1 Unit", // Default value since not in API
  });

  // Get progress percentage with fallback
  const getProgressPercentage = () => {
    return project.progressPercentage || 0;
  };

  // Get map image with fallback
  const getMapImage = () => {
    // You might want to use a static map image or another fallback
    return "/dummy.jpg";
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      console.log("Form values:", values);

      // Prepare the data for your API
      const contactData = {
        name: values.name,
        email: values.email,
        message: "",
        phone: values.mobile || "",
      };

      // Send data to backend
      const response = await addContacts(contactData).unwrap();

      console.log("Response:", response);
      toast.success("Message sent successfully!");

      // Check if brochure URL exists and trigger download
      if (project?.brochureUrl) {
        try {
          let downloadUrl = project.brochureUrl;

          // Convert Google Drive view link to direct download link
          if (project.brochureUrl.includes("drive.google.com")) {
            // Extract file ID from Google Drive URL
            const fileIdMatch = project.brochureUrl.match(/[-\w]{25,}/);
            if (fileIdMatch) {
              const fileId = fileIdMatch[0];
              downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
            }
          }

          // Create a temporary anchor element to trigger download
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.download = "project-brochure.pdf"; // Force download with a filename

          // Append to body, click, and remove
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          toast.success("Brochure download started!");
        } catch (downloadError) {
          console.error("Error triggering download:", downloadError);
          // Fallback: open in new tab
          window.open(project.brochureUrl, "_blank");
          toast.info("Opening brochure in new tab...");
        }
      } else {
        toast.success("Form submitted successfully!");
      }

      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="project-details-page">
        <div className="loading-state">Loading project details...</div>
      </div>
    );
  }
  if (contactLoading) {
    return (
      <div className="project-details-page">
        <div className="loading-state">Sending Request...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="project-details-page">
        <div className="error-state">
          Error loading project details. Please try again.
        </div>
      </div>
    );
  }

  const heroImage = getHeroImage();
  const galleryImages = getGalleryImages();
  const thumbnailLabels = getThumbnailLabels();
  const projectStats = getProjectStats();
  const progressPercentage = getProgressPercentage();
  const mapImage = getMapImage();

  return (
    <div className="project-details-page">
      {/* Hero Section */}
      <section
        className="projectDetails-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="projectDetails-overlay">
          <div className="projectDetails-content">
            <h1 className="project-title">{project.name || "Project Name"}</h1>
            <div className="gallery-thumbnails">
              {galleryImages.map((img, index) => (
                <div key={index} className="thumbnail">
                  <Image
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      // Fallback to dummy.jpg if image fails to load
                      e.target.src = "/dummy.jpg";
                    }}
                  />
                  <div className="thumbnail-label">
                    {thumbnailLabels[index]}
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
                          2 * Math.PI * 54 * (1 - progressPercentage / 100)
                        }`,
                      }}
                    />
                  </svg>
                  <div className="progress-text">
                    <span className="progress-value">
                      {progressPercentage}%
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
                        <div className="stat-value">{projectStats.type}</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12}>
                    <div className="stat-item">
                      <FaHome className="stat-icon" />
                      <div>
                        <div className="stat-label">Apartment Size</div>
                        <div className="stat-value">
                          {projectStats.apartmentSize}
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
                          {projectStats.landArea}
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
                          {projectStats.elevator}
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
                          {projectStats.handover}
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
                          {projectStats.stairCase}
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
                src={mapImage}
                alt="Project Location Map"
                fill
                style={{ objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "/dummy.jpg";
                }}
              />
              <div className="map-overlay">
                <a
                  href={project.mapUrl || "#"}
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
              // { required: true, message: "Please enter your mobile number" },
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
