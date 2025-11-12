import React, { useRef } from "react";
import { Carousel } from "antd";
import Image from "next/image";

const GalleriesSection = () => {
  const carouselRef = useRef(null);

  // Sample gallery images - replace with actual images
  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      alt: "Team meeting",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
      alt: "Office workspace",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
      alt: "Team collaboration",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800",
      alt: "Business meeting",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
      alt: "Team photo",
    },
  ];

  const carouselSettings = {
    autoplay: true,
    autoplaySpeed: 2000, // 3 seconds - customize as needed
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "60px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };

  return (
    <section className="galleries-section">
      <div className="galleries-container">
        <h2 className="galleries-title">Galleries</h2>
        <div className="galleries-carousel-wrapper">
          <Carousel
            ref={carouselRef}
            {...carouselSettings}
            className="galleries-carousel"
          >
            {galleryImages.map((image) => (
              <div key={image.id} className="gallery-slide">
                <div className="gallery-image-wrapper">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    className="gallery-image"
                    fill
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default GalleriesSection;
