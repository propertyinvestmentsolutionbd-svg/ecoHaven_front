"use client";

import React, { useRef } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./PhotoSlider.css";

const RoyalStandard = () => {
  const carouselRef = useRef();

  const next = () => carouselRef.current.next();
  const prev = () => carouselRef.current.prev();

  const slides = [
    {
      id: 1,
      title: "The Royal Standard.",
      subtitle: "Where Trust Meets Exquisite Craftsmanship.",
      images: ["/royal1.png", "/royal2.png", "/royal3.png"],
    },
    {
      id: 2,
      title: "The Grand Enclave.",
      subtitle: "Luxury Living Redefined.",
      images: ["/royal1.png", "/royal1.png", "/royal1.png"],
    },
  ];

  return (
    <section className="royal-section">
      <Carousel dots={false} ref={carouselRef} effect="fade">
        {slides.map((slide) => (
          <div className="royal-slide" key={slide.id}>
            {/* Left big image */}
            <div className="royal-left">
              <Image
                src={slide.images[0]}
                alt="Main building"
                width={600}
                height={800}
                className="royal-big-image"
              />
            </div>

            {/* Right side text + images */}
            <div className="royal-right">
              <div className="royal-text">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <div className="royal-arrows">
                  <button onClick={prev} className="nav-btn">
                    <FaArrowLeft />
                  </button>
                  <button onClick={next} className="nav-btn">
                    <FaArrowRight />
                  </button>
                </div>
              </div>

              <div className="royal-thumbs">
                <div className="thumb">
                  <Image
                    src={slide.images[1]}
                    alt="Side view"
                    width={300}
                    height={400}
                  />
                </div>
                <div className="thumb">
                  <Image
                    src={slide.images[2]}
                    alt="Top view"
                    width={300}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default RoyalStandard;
