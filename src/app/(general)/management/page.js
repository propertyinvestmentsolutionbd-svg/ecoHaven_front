"use client";

import CommonPage from "@/components/common/CommonPage";
import Image from "next/image";
import React, { useState } from "react";
import "./management.css";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Carousel, Modal, Row, Col } from "antd";
import { useAllUsersQuery } from "@/redux/api/userApi";

export default function Management() {
  const { data } = useAllUsersQuery();

  // Use actual data from API
  const users = data?.data?.users || [];

  // Find featured employee (first employee with isFeatured: true)
  const featuredEmployeeFromApi = users.find(
    (user) => user.isFeatured === true
  );

  // Get all employees (users with role "employee")
  // const employeesFromApi = users.filter((user) => user.role === "employee");

  // Featured employee with fallbacks
  const featuredEmployee = {
    name: featuredEmployeeFromApi?.name || "Managing Director",
    role: featuredEmployeeFromApi?.profileDescription
      ? "Managing Director"
      : "Managing Director",
    image: featuredEmployeeFromApi?.profileImg
      ? `http://localhost:5000${featuredEmployeeFromApi?.profileImg}`
      : "/dummy.jpg",
    description:
      featuredEmployeeFromApi?.profileDescription ||
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  };

  // Transform API employees to match the expected format
  const employees = users.map((user, index) => ({
    id: user.id,
    name: user.name || "Employee",
    role: user.profileDescription ? "Employee" : "Team Member",
    image: user.profileImg
      ? `http://localhost:5000${user.profileImg}`
      : "/dummy.jpg",
    description:
      user.profileDescription ||
      "Dedicated professional committed to organizational success and excellence.",
    // Include original user data for modal if needed
    originalData: user,
  }));

  // Fallback employees if no employees from API
  const fallbackEmployees = [
    {
      id: 1,
      name: "Abdullah Khan",
      role: "CEO, Director",
      image: "/dummy.jpg",
      description:
        "Experienced leader with a passion for innovation and growth.",
    },
    {
      id: 2,
      name: "Team Member",
      role: "Professional",
      image: "/dummy.jpg",
      description: "Dedicated professional focused on delivering excellence.",
    },
    {
      id: 3,
      name: "Team Member",
      role: "Specialist",
      image: "/dummy.jpg",
      description: "Strategic thinker committed to organizational success.",
    },
    {
      id: 4,
      name: "Team Member",
      role: "Expert",
      image: "/dummy.jpg",
      description: "Results-driven expert with proven track record.",
    },
  ];

  // Use API employees or fallback
  const displayEmployees = employees.length > 0 ? employees : fallbackEmployees;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState();

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const CustomArrow = ({ direction, onClick }) => (
    <button
      className={`carousel-arrow carousel-arrow-${direction}`}
      onClick={onClick}
    >
      {direction === "left" ? (
        <LuChevronLeft size={24} />
      ) : (
        <LuChevronRight size={24} />
      )}
    </button>
  );

  return (
    <CommonPage>
      <section className="management-image-container">
        <Image
          src="/management.png"
          alt="Management Background"
          fill
          priority
          style={{
            objectFit: "cover",
          }}
        />
        <div className="about-overlay"></div>
        <h1 className="about-title">Management</h1>
        <div className="scroll-indicator">
          <div className="triangle"></div>
        </div>
      </section>

      <section>
        <div className="team-section">
          {/* Featured Employee */}
          <div className="featured-employee">
            <Row gutter={[32, 32]} align="middle">
              <Col xs={24} md={10} lg={8}>
                <div className="featured-image-wrapper">
                  <Image
                    src={featuredEmployee.image}
                    alt={featuredEmployee.name}
                    width={400}
                    height={400}
                    priority
                    className="featured-image"
                    style={{
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.src = "/dummy.jpg";
                    }}
                  />
                </div>
              </Col>
              <Col xs={24} md={14} lg={16}>
                <div className="featured-content">
                  <h2 className="featured-name">{featuredEmployee.name}</h2>
                  <h3 className="featured-role">{featuredEmployee.role}</h3>
                  <p className="featured-description">
                    {featuredEmployee.description}
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          {/* Employee Carousel */}
          <div className="employee-carousel-section">
            <Carousel
              dots={false}
              slidesToShow={Math.min(4, displayEmployees.length)}
              slidesToScroll={1}
              arrows={displayEmployees.length > 1}
              prevArrow={<CustomArrow direction="left" />}
              nextArrow={<CustomArrow direction="right" />}
              responsive={[
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: Math.min(3, displayEmployees.length),
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: Math.min(2, displayEmployees.length),
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ]}
            >
              {displayEmployees.map((employee) => (
                <div key={employee.id} className="employee-slide">
                  <div
                    className="employee-card"
                    onClick={() => handleEmployeeClick(employee)}
                  >
                    <div className="employee-image-wrapper">
                      <Image
                        src={employee.image}
                        alt={employee.name}
                        width={300}
                        height={300}
                        priority
                        className="employee-image"
                        style={{
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.src = "/dummy.jpg";
                        }}
                      />
                    </div>
                    <div className="employee-info">
                      <h4 className="employee-name">{employee.name}</h4>
                      <p className="employee-role">{employee.role}</p>
                      <p className="employee-preview">{employee.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Employee Detail Modal */}
          <Modal
            title={null}
            open={isModalOpen}
            onCancel={handleModalClose}
            footer={null}
            width={600}
            className="employee-modal"
          >
            {selectedEmployee && (
              <div className="modal-content">
                <Image
                  src={selectedEmployee.image}
                  alt={selectedEmployee.name}
                  width={200}
                  height={200}
                  priority
                  className="modal-image"
                  style={{
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src = "/dummy.jpg";
                  }}
                />
                <h2 className="modal-name">{selectedEmployee.name}</h2>
                <h3 className="modal-role">{selectedEmployee.role}</h3>
                <p className="modal-description">
                  {selectedEmployee.description}
                </p>
              </div>
            )}
          </Modal>
        </div>
      </section>
    </CommonPage>
  );
}
