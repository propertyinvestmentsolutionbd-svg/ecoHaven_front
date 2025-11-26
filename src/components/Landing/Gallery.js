import React, { useRef } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import { useAllGalleryQuery } from "@/redux/api/projectApi";

const GalleriesSection = () => {
  const carouselRef = useRef(null);
  const { data } = useAllGalleryQuery();

  // Use actual data from API, fallback to empty array if no data
  const galleryImages =
    data?.data?.map((item) => ({
      id: item.id,
      url: `http://localhost:5000${item?.imageUrl}`, // Using imageUrl from API response
      alt: item.title || "Gallery image", // Using title from API response as alt text
    })) || [];

  const carouselSettings = {
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    infinite: galleryImages.length > 1, // Only infinite if we have more than 1 image
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

  // Handle case when there's no data
  if (!data?.data || galleryImages.length === 0) {
    return (
      <section className="galleries-section">
        <div className="galleries-container">
          <h2 className="galleries-title">Galleries</h2>
          <div className="no-images-message">
            <p>No gallery images available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    // Add proper image optimization
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
