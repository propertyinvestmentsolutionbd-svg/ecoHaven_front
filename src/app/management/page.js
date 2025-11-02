"use client";

import CommonPage from "@/components/common/CommonPage";
import Image from "next/image";
import React, { useState } from "react";
import "./management.css";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Carousel, Modal, Row, Col } from "antd";

export default function Management() {
  const featuredEmployee = {
    name: "Abdul Karim",
    role: "Managing Director",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  };

  const employees = [
    {
      id: 1,
      name: "Abdullah Khan",
      role: "Ceo, Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      description:
        "Experienced leader with a passion for innovation and growth. Read more...",
    },
    {
      id: 2,
      name: "Abdullah Khan",
      role: "Ceo, Director",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
      description:
        "Dedicated professional focused on delivering excellence. Read more...",
    },
    {
      id: 3,
      name: "Abdullah Khan",
      role: "Ceo, Director",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
      description:
        "Strategic thinker committed to organizational success. Read more...",
    },
    {
      id: 4,
      name: "Abdullah Khan",
      role: "Ceo, Director",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
      description:
        "Results-driven expert with proven track record. Read more...",
    },
  ];
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
          src="/management.png" // replace with your actual image path
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
        <h1 className="about-title">Management</h1>
        <div className="scroll-indicator">
          <div className="triangle"></div>
        </div>{" "}
      </section>
      <section>
        <div className="team-section">
          {/* Featured Employee */}
          <div className="featured-employee">
            <Row gutter={[32, 32]} align="middle">
              <Col xs={24} md={10} lg={8}>
                <div className="featured-image-wrapper">
                  <Image
                    src={featuredEmployee.image} // replace with your actual image path
                    alt="About Us Background"
                    // fill
                    width={2000}
                    height={2000}
                    priority
                    className="featured-image"
                    // style={{
                    //   objectFit: "cover",
                    // }}
                  />
                  {/* <img
                    src={featuredEmployee.image}
                    alt={featuredEmployee.name}
                    className="featured-image"
                  /> */}
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
              slidesToShow={4}
              slidesToScroll={1}
              arrows
              prevArrow={<CustomArrow direction="left" />}
              nextArrow={<CustomArrow direction="right" />}
              responsive={[
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
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
              {employees.map((employee) => (
                <div key={employee.id} className="employee-slide">
                  <div
                    className="employee-card"
                    onClick={() => handleEmployeeClick(employee)}
                  >
                    <div className="employee-image-wrapper">
                      <Image
                        src={employee.image} // replace with your actual image path
                        alt="About Us Background"
                        // fill
                        width={2000}
                        height={2000}
                        priority
                        className="employee-image"
                        // style={{
                        //   objectFit: "cover",
                        // }}
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
                  src={selectedEmployee.image} // replace with your actual image path
                  alt="About Us Background"
                  // fill
                  width={2000}
                  height={2000}
                  priority
                  className="modal-image"
                  // style={{
                  //   objectFit: "cover",
                  // }}
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
