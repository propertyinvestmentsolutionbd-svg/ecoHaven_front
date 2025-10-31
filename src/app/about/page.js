import Image from "next/image";
import React from "react";
import "./about.css";

export default function About() {
  return (
    <div>
      <section className="about-section">
        <div className="about-image-container">
          <Image
            src="/about-bg.png" // replace with your actual image path
            alt="About Us Background"
            fill
            priority
            className="about-image"
          />
          <div className="about-overlay"></div>
          <h1 className="about-title">About us</h1>
          <div className="scroll-indicator">
            <div className="triangle"></div>
          </div>
        </div>
      </section>
      <section className="about-overview">
        <div className="overview-text">
          <h2>Overview</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting.
          </p>
        </div>

        <div className="about-sections">
          <div className="about-card">
            <div className="about-mission">
              <Image
                src="/mission1.png"
                alt="Mission"
                width={400}
                height={260}
                className="image"
              />
            </div>
            <div className="about-content">
              <h3>Mission</h3>
              <h4>It’s a promise</h4>
              <p>
                When an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
              </p>
            </div>
          </div>

          <div className="about-card reverse">
            <div className="about-mission">
              <Image
                src="/mission2.png"
                alt="Vision"
                width={400}
                height={260}
                className="image"
              />
            </div>
            <div className="about-content">
              <h3>Vision</h3>
              <h4>Our value to accomplish the promise</h4>
              <p>
                When an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
              </p>
            </div>
          </div>

          <div className="about-card">
            <div className="about-mission">
              <Image
                src="/mission3.png"
                alt="Values"
                width={400}
                height={260}
                className="image"
              />
            </div>
            <div className="about-content">
              <h3>Values</h3>
              <h4>Values grow with quality product, delivery and commitment</h4>
              <p>
                When an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
