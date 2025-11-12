/* eslint-disable react/no-unescaped-entities */
"use client";
import CommonPage from "@/components/common/CommonPage";
import { Button, Card, Col, Row, Select } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import "./AgentsSection.css";

const agents = [
  {
    id: 1,
    name: "Abdullah Khan",
    location: "UK agent",
    description: "It is a long established fact that a reader will be...",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Dr. Shafiqur Rhman",
    location: "UK Agent",
    description: "It is a long established fact that a reader will be...",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Dr. Shafiqur Rhman",
    location: "UK Agent",
    description: "It is a long established fact that a reader will be...",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Dr. Shafiqur Rhman",
    location: "UK Agent",
    description: "It is a long established fact that a reader will be...",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
  },
];
export default function NRB() {
  const [country, setCountry] = useState("");

  return (
    <CommonPage>
      <section className="contact-image-container">
        <Image
          src="/nrb.png" // replace with your actual image path
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
        <h1 className="about-title">NRB</h1>
        <div className="scroll-indicator">
          <div className="triangle"></div>
        </div>{" "}
      </section>
      <section className="agents-section">
        <div className="agent-page">
          <div className="agent-header">
            <p level={3} className="agent-title">
              We’re Global to privilege you
            </p>
            <p className="agent-subtitle">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>

          <div className="agent-search-bar">
            <Select
              showSearch
              value={country}
              onChange={setCountry}
              className="agent-select"
              options={[
                { value: "UK", label: "🇬🇧 UK" },
                { value: "USA", label: "🇺🇸 USA" },
                { value: "Canada", label: "🇨🇦 Canada" },
              ]}
            />
            <Button type="primary" className="agent-search-btn">
              Search our agents
            </Button>
          </div>

          <Row gutter={[24, 24]} className="agent-grid">
            {agents.map((agent) => (
              <Col
                key={agent.id}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                className="agent-card-col"
              >
                <Image
                  alt={agent.name}
                  src={agent.image}
                  className="agent-image"
                  width={300}
                  height={300}
                />
                <p className="agent-name">{agent.name}</p>
                <p className="agent-role">{agent.role}</p>
                <p className="agent-desc">{agent.description}</p>
                <Button type="link" className="agent-link">
                  Book Now
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </CommonPage>
  );
}
