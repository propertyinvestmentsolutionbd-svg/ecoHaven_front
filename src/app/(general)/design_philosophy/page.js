import CommonPage from "@/components/common/CommonPage";
import Image from "next/image";
import React from "react";
import "./philosophy.css";
import { Col, Row } from "antd";
import { FeatureCard } from "@/components/common/FeatureCard";
import { LuSparkles } from "react-icons/lu";
import { LuRocket } from "react-icons/lu";
import { LuLeaf } from "react-icons/lu";
import { ImageTextSection } from "@/components/common/ImageTextSection";

export default function page() {
  return (
    <CommonPage>
      <section className="philosophy-container">
        <Image
          src="/design.png" // replace with your actual image path
          alt="About Us Background"
          fill
          // width={1800}
          // height={1000}
          priority
          // className="about-image"
          style={{
            objectFit: "cover",

            // cover, contain, none
          }}
        />
        <div className="about-overlay"></div>
        <h1 className="about-title">Design Philosophy</h1>
        <div className="scroll-indicator">
          <div className="triangle"></div>
        </div>{" "}
      </section>
      <div className="philosophy-page">
        <div className="philosophy-content">
          {/* Feature Cards Section */}
          <Row
            gutter={[24, 24]}
            justify="space-between"
            className="feature-cards-section"
          >
            <Col xs={24} sm={12} lg={8}>
              <FeatureCard icon={LuSparkles} title="Modern Design" />
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <FeatureCard icon={LuLeaf} title="Eco-friendly" />
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <FeatureCard icon={LuRocket} title="Innovation" />
            </Col>
          </Row>

          {/* First Image-Text Section */}
          <ImageTextSection
            image="/mission1.png"
            label="Title Lorem Ipsum"
            title="Structural Engineering"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
            imagePosition="left"
          />

          {/* Second Image-Text Section */}
          <ImageTextSection
            image="/mission1.png"
            label="Title Lorem Ipsum"
            title="Modern Interior Design"
            description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
            imagePosition="top"
          />
        </div>
      </div>
    </CommonPage>
  );
}
