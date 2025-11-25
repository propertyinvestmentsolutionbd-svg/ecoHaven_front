"use client";

import React, { useEffect, useState, useRef } from "react";
import { Carousel, Skeleton } from "antd";
import Image from "next/image";
import { FaGreaterThan } from "react-icons/fa";
import { useGetReviewsQuery } from "@/redux/api/reviewsApi";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const carouselRef = useRef();

  // Use RTK Query with proper error handling
  const { data: reviewsData, isLoading, error, isError } = useGetReviewsQuery();

  // Transform API data to component format
  const transformedReviews = React.useMemo(() => {
    if (!reviewsData?.success || !reviewsData.data) return [];

    return reviewsData.data.map((review) => ({
      id: review.id,
      name: review.reviewerName,
      title: review.type || "Customer", // Fallback if type is null
      review: review.description,
      mediaType: "image",
      media: review.imageUrl
        ? `http://localhost:5000${review.imageUrl}`
        : "/default-review.jpg", // Fallback image
      imageUrl: review.imageUrl, // Keep original for conditional rendering
    }));
  }, [reviewsData]);

  // Update reviews when transformed data changes
  useEffect(() => {
    setReviews(transformedReviews);
  }, [transformedReviews]);

  const next = () => carouselRef.current?.next();
  const prev = () => carouselRef.current?.prev();

  // Show error state
  if (isError) {
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
        <div className="error-state">
          <p>Failed to load reviews. Please try again later.</p>
        </div>
      </section>
    );
  }

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

      {isLoading ? (
        <div className="review-skeleton">
          <div className="review-skeleton-text">
            <Skeleton active paragraph={{ rows: 3 }} title={false} />
          </div>
          <div className="review-skeleton-media">
            <Skeleton.Image active style={{ width: 400, height: 400 }} />
          </div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="no-reviews">
          <p>No reviews available at the moment. Check back later!</p>
        </div>
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
                    {item.imageUrl ? (
                      <Image
                        src={item.media}
                        alt={`Review from ${item.name}`}
                        width={400}
                        height={400}
                        className="review-media-box"
                        priority={index === 0}
                      />
                    ) : (
                      <div className="no-image-placeholder">
                        <p>No Image Available</p>
                      </div>
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
