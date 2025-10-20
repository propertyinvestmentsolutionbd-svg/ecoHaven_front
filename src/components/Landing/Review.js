"use client";

import React, { useEffect, useState, useRef } from "react";
import { Carousel, Skeleton } from "antd";
import Image from "next/image";
import { FaGreaterThan } from "react-icons/fa";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef();

  useEffect(() => {
    // Replace with your real API fetch
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        // setReviews([
        //   {
        //     id: 1,
        //     name: "Dr. Abdullah Al Jahangir",
        //     title: "Respected Landowner",
        //     review:
        //       "When we decided to partner with a developer, the initial step of trusting them with our land felt like the biggest hurdle. Eco Haven quickly put those fears to rest.",
        //     mediaType: "image",
        //     media: "/review1.jpg",
        //   },
        //   {
        //     id: 2,
        //     name: "Mr. Hasan Mahmud",
        //     title: "Apartment Owner",
        //     review:
        //       "The entire journey with Eco Haven was smooth. They delivered more than what was promised.",
        //     mediaType: "video",
        //     media: "/review2.mp4",
        //   },
        // ]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const next = () => carouselRef.current?.next();
  const prev = () => carouselRef.current?.prev();

  return (
    <section className="review-section">
      <div className="review-header">
        <h2>
          <span className="line-break">
            <span className="highlight">REVIEW</span> From Our{" "}
          </span>
          <span className="line-break">
            Beloved <span className="highlight">CUSTOMERS</span>
          </span>
        </h2>
      </div>

      {loading ? (
        <div className="review-skeleton">
          <div className="review-skeleton-text">
            <Skeleton active paragraph={{ rows: 3 }} title={false} />
          </div>
          <div className="review-skeleton-media">
            <Skeleton.Image active style={{ width: 400, height: 400 }} />
          </div>
        </div>
      ) : reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <div
          className={`review-container ${
            reviews.length > 1 ? "hover-enabled" : ""
          }`}
        >
          <Carousel
            autoplay
            dots={false}
            ref={carouselRef}
            effect="fade"
            autoplaySpeed={5000}
          >
            {reviews.map((item, index) => (
              <div key={item.id} className="review-slide">
                <div
                  className={`review-content ${
                    index % 2 === 1 ? "reverse" : ""
                  }`}
                >
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
                        className="review-media-box"
                      />
                    ) : (
                      <Image
                        src={item.media}
                        alt={item.name}
                        width={400}
                        height={400}
                        className="review-media-box"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>

          {reviews.length > 1 && (
            <>
              <button className="arrow-btn left" onClick={prev}>
                <FaGreaterThan style={{ transform: "rotate(180deg)" }} />
              </button>
              <button className="arrow-btn right" onClick={next}>
                <FaGreaterThan />
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
