"use client";

import React, { useEffect, useState } from "react";
import { Carousel, Skeleton } from "antd";
import Image from "next/image";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = React.useRef();

  useEffect(() => {
    // Simulate delayed fetch
    setTimeout(() => {
      setReviews([
        {
          id: 1,
          name: "Dr. Abdullah Al Jahangir",
          title: "Respected Landowner",
          review:
            "When we decided to partner with a developer, the initial step of trusting them with our land felt like the biggest hurdle. Eco Haven quickly put those fears to rest.",
          mediaType: "image",
          media: "/review1.jpg",
        },
        {
          id: 2,
          name: "Mr. Hasan Mahmud",
          title: "Apartment Owner",
          review:
            "The entire journey with Eco Haven was smooth. They delivered more than what was promised.",
          mediaType: "video",
          media: "/review2.mp4",
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const next = () => carouselRef.current.next();
  const prev = () => carouselRef.current.prev();

  return (
    <section className="review-section">
      <div className="review-header">
        <h2>
          <span className="highlight">Review</span> From Our{" "}
          <span className="highlight">Beloved Customer</span>
        </h2>
      </div>

      {loading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <div className="review-container">
          <Carousel
            autoplay
            dots={false}
            ref={carouselRef}
            effect="fade"
            autoplaySpeed={4000}
          >
            {reviews.map((item) => (
              <div key={item.id} className="review-slide">
                <div className="review-content">
                  <div className="review-text">
                    <p className="quote">“</p>
                    <p>{item.review}</p>
                    <p className="reviewer">
                      ~ {item.name}, <span>({item.title})</span>
                    </p>
                  </div>

                  <div className="review-media">
                    {item.mediaType === "video" ? (
                      <video
                        src={item.media}
                        controls
                        className="review-video"
                      />
                    ) : (
                      <Image
                        src={item.media}
                        alt={item.name}
                        width={400}
                        height={400}
                        className="review-image"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>

          {/* Manual Controls */}
          <button className="arrow-btn left" onClick={prev}>
            <FaArrowLeft />
          </button>
          <button className="arrow-btn right" onClick={next}>
            <FaArrowRight />
          </button>
        </div>
      )}
    </section>
  );
}
