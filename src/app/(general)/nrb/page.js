/* eslint-disable react/no-unescaped-entities */
"use client";
import CommonPage from "@/components/common/CommonPage";
import { Button, Card, Col, Row, Select } from "antd";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import "./AgentsSection.css";
import { useGetAgentQuery } from "@/redux/api/userApi";

export default function NRB() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const { data } = useGetAgentQuery();

  const countryDDL = data?.data?.countries || [];
  const allAgents = data?.data?.agents || [];

  // Filter agents based on selected country
  const filteredAgents = useMemo(() => {
    if (!selectedCountry) {
      return allAgents;
    }
    return allAgents.filter(
      (agent) => agent.country?.toLowerCase() === selectedCountry.toLowerCase()
    );
  }, [allAgents, selectedCountry]);

  // Handle clear filter
  const handleClearFilter = () => {
    setSelectedCountry("");
  };

  return (
    <CommonPage>
      <section className="contact-image-container">
        <Image src="/nrb.png" alt="About Us Background" fill priority />
        <div className="about-overlay"></div>
        <h1 className="about-title">NRB</h1>
        <div className="scroll-indicator">
          <div className="triangle"></div>
        </div>
      </section>

      <section className="agents-section">
        <div className="agent-page">
          <div className="agent-header">
            <p level={3} className="agent-title">
              We're Global to privilege you
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
              placeholder="Select a country"
              value={selectedCountry}
              onChange={setSelectedCountry}
              className="agent-select"
              options={countryDDL}
              allowClear
              onClear={handleClearFilter}
              style={{ width: 200 }}
            />
            <Button type="primary" className="agent-search-btn">
              Search our agents
            </Button>
            {selectedCountry && (
              <Button
                type="default"
                className="agent-clear-btn"
                onClick={handleClearFilter}
              >
                Clear Filter
              </Button>
            )}
          </div>

          {/* Results Info */}
          {selectedCountry && (
            <div className="agent-results-info">
              <p>
                Showing {filteredAgents.length} agent
                {filteredAgents.length !== 1 ? "s" : ""} in {selectedCountry}
                {filteredAgents.length === 0 && " - No agents found"}
              </p>
            </div>
          )}

          <Row gutter={[24, 24]} className="agent-grid">
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
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
                    src={
                      agent.profileImg
                        ? `http://localhost:5000${agent.profileImg}`
                        : `/dummy.jpg`
                    }
                    className="agent-image"
                    width={300}
                    height={300}
                  />
                  <p className="agent-name">{agent.name}</p>
                  <p className="agent-role">
                    {agent.country} • {agent.designation}
                  </p>
                  {agent.agentDescription && (
                    <p className="agent-desc">
                      {agent.agentDescription.length > 100
                        ? `${agent.agentDescription.substring(0, 100)}...`
                        : agent.agentDescription}
                    </p>
                  )}
                  <Button type="link" className="agent-link">
                    Book Now
                  </Button>
                </Col>
              ))
            ) : selectedCountry ? (
              <Col span={24} className="no-agents-message">
                <div className="no-agents-container">
                  <p>No agents found in {selectedCountry}</p>
                  <Button type="primary" onClick={handleClearFilter}>
                    Show All Agents
                  </Button>
                </div>
              </Col>
            ) : (
              <Col span={24} className="no-agents-message">
                <div className="no-agents-container">
                  <p>No agents available at the moment</p>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </section>
    </CommonPage>
  );
}
