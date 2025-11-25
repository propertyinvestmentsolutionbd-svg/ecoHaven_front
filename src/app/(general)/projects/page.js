"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { Select, Row, Col } from "antd";
import "./project.css";
import Link from "next/link";
import {
  useAllProjectsQuery,
  useGetProjectLocationDropDownQuery,
} from "@/redux/api/projectApi";

export default function Projects() {
  const [filters, setFilters] = useState({
    type: undefined,
    location: undefined,
    status: undefined,
  });

  const { data: projectsData } = useAllProjectsQuery();
  const { data: locationDropdown } = useGetProjectLocationDropDownQuery();

  // Use actual data from API instead of mock data
  const projects = projectsData?.data?.projects || [];
  const locationOptions = locationDropdown?.data || [];

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  // Get unique project types from actual data
  const getProjectTypeOptions = () => {
    const types = projects
      .map((project) => project.projectType)
      .filter(
        (type) => type !== null && type !== undefined && type.trim() !== ""
      );

    const uniqueTypes = [...new Set(types)];

    return uniqueTypes.map((type) => ({
      value: type,
      label: type,
    }));
  };

  // Get unique statuses from actual data
  const getStatusOptions = () => {
    const statuses = projects
      .map((project) => project.status)
      .filter((status) => status !== null && status !== undefined);

    const uniqueStatuses = [...new Set(statuses)];

    return uniqueStatuses.map((status) => ({
      value: status,
      label: status,
    }));
  };

  // Filter projects based on selected filters using actual API data
  const filteredProjects = projects.filter((project) => {
    if (filters.type && project.projectType !== filters.type) return false;
    if (filters.location && project.location !== filters.location) return false;
    if (filters.status && project.status !== filters.status) return false;
    return true;
  });

  // Get project image - use featured image, first image, or gallery image

  return (
    <>
      <section className="contact-image-container">
        <Image
          src="/projectsBg.png"
          alt="Projects Background"
          fill
          priority
          style={{
            objectFit: "cover",
          }}
        />
        <div className="about-overlay"></div>
        <h1 className="about-title">Projects</h1>
        <div className="scroll-indicator">
          <div className="triangle"></div>
        </div>
      </section>

      <div className="projects-page">
        <div className="projects-container">
          {/* Filters Section */}
          <div className="filters-section">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Select
                  placeholder="Type"
                  options={getProjectTypeOptions()}
                  className="filter-select"
                  onChange={(value) => handleFilterChange("type", value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={8}>
                <Select
                  placeholder="Location"
                  options={locationOptions}
                  className="filter-select"
                  onChange={(value) => handleFilterChange("location", value)}
                  allowClear
                  loading={!locationDropdown}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Select
                  placeholder="Status"
                  options={getStatusOptions()}
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
                        src={
                          project?.images?.[0]?.imageUrl
                            ? `http://localhost:5000${project?.images?.[0]?.imageUrl}`
                            : `/dummy.jpg`
                        }
                        alt={project.name}
                        fill
                        className="project-card-image"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{
                          objectFit: "cover",
                        }}
                        // placeholder="blur"
                        // blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />

                      <div
                        className={`project-status-badge status-${project.status?.toLowerCase()}`}
                      >
                        {project.status}
                      </div>
                    </div>
                    <div className="project-card-content">
                      <div className="project-card-title">{project.name}</div>
                      <div className="project-card-meta">
                        <div className="project-card-location">
                          {project.location}
                        </div>
                        <div className="project-card-type">
                          {project.projectType}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>

          {filteredProjects.length === 0 && projects.length > 0 && (
            <div className="no-results">
              No projects found matching your filters.
            </div>
          )}

          {projects.length === 0 && (
            <div className="no-results">
              No projects available at the moment.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
