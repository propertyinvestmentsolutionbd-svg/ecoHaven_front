"use client";
import Image from "next/image";
import React from "react";
import { FaHome, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="hero-container">
      <div
        className="hero-image-wrapper"
        style={{
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <Image
          src="/hero.png"
          alt="Modern Building"
          fill
          priority
          className="hero-image"
        />
      </div>

      <div className="hero-overlay">
        <div className="hero-box">
          <div className="hero-item">
            <FaHome size={22} />
            <p>Ongoing</p>
          </div>
          <div className="hero-item">
            <FaGlobe size={22} />
            <p>Handover</p>
          </div>
          <div className="hero-item">
            <FaMapMarkerAlt size={22} />
            <p>Landowner</p>
          </div>
        </div>
      </div>
    </section>
  );
}
