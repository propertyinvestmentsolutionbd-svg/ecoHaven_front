"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { Select, Row, Col } from "antd";
// import { Option } from "antd/es/mentions";
import "./project.css";
import Link from "next/link";

// Mock data - will be replaced with API data
const mockProjects = [
  {
    id: 1,
    name: "Shanila Tower",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    type: "Residential",
    location: "Dhaka",
    status: "Ongoing",
  },
  {
    id: 2,
    name: "Marine Tower",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
    type: "Commercial",
    location: "Chittagong",
    status: "Ongoing",
  },
  {
    id: 3,
    name: "Jannat Tower",
    image:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&q=80",
    type: "Residential",
    location: "Sylhet",
    status: "Completed",
  },
  {
    id: 4,
    name: "Shanila Tower",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    type: "Residential",
    location: "Dhaka",
    status: "Ongoing",
  },
  {
    id: 5,
    name: "Marine Tower",
    image:
      "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
    type: "Mixed Use",
    location: "Chittagong",
    status: "Ongoing",
  },
  {
    id: 6,
    name: "Jannat Tower",
    image:
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&q=80",
    type: "Commercial",
    location: "Sylhet",
    status: "Upcoming",
  },
];
export default function Projects() {
  const [filters, setFilters] = useState({
    type: undefined,
    location: undefined,
    status: undefined,
  });
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };
  // Filter projects based on selected filters
  const filteredProjects = mockProjects.filter((project) => {
    if (filters.type && project.type !== filters.type) return false;
    if (filters.location && project.location !== filters.location) return false;
    if (filters.status && project.status !== filters.status) return false;
    return true;
  });

  return (
    <>
      <section className="contact-image-container">
        <Image
          src="/projectsBg.png" // replace with your actual image path
          alt="About Us Background"
          fill
          //   width={100}
          //   height={100}
          priority
          // className="about-image"
          // style={{
          //   objectFit: "cover",
          // }}
        />
        <div className="about-overlay"></div>
        <h1 className="about-title">Projects</h1>
        <div className="scroll-indicator">
          <div className="triangle"></div>
        </div>{" "}
      </section>
      <div className="projects-page">
        <div className="projects-container">
          {/* Filters Section */}
          <div className="filters-section">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Select
                  placeholder="Type"
                  options={[
                    { value: "Residential", label: "Residential" },
                    { value: "Commercial", label: "Commercial" },
                    { value: "Mixed Use", label: "Mixed Use" },
                  ]}
                  className="filter-select"
                  onChange={(value) => handleFilterChange("type", value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={8}>
                <Select
                  placeholder="Location"
                  options={[
                    { value: "Dhaka", label: "Dhaka" },
                    { value: "Chittagong", label: "Chittagong" },
                    { value: "Sylhet", label: "Sylhet" },
                  ]}
                  className="filter-select"
                  onChange={(value) => handleFilterChange("location", value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={8}>
                <Select
                  placeholder="Status"
                  options={[
                    { value: "Ongoing", label: "Ongoing" },
                    { value: "Completed", label: "Completed" },
                    { value: "Upcoming", label: "Upcoming" },
                  ]}
                  className="filter-select"
                  onChange={(value) => handleFilterChange("status", value)}
                  allowClear
                />
              </Col>
            </Row>
          </div>

          {/* Projects Grid */}
          <Row gutter={[24, 24]} className="projects-grid">
            {filteredProjects.map((project) => (
              <Col xs={24} sm={12} lg={8} key={project.id}>
                <Link href={`/projects/${project.id}`}>
                  <div className="project-card">
                    <div className="project-card-image-wrapper">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="project-card-image"
                      />
                      <div className="project-status-badge">
                        {project.status}
                      </div>
                    </div>
                    <div className="project-card-title">{project.name}</div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>

          {filteredProjects.length === 0 && (
            <div className="no-results">
              No projects found matching your filters.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
