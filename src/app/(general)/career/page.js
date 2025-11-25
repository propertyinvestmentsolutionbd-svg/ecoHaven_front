"use client";
import CommonPage from "@/components/common/CommonPage";
import Image from "next/image";
import React from "react";
import "./Careers.css";
import { JobCard } from "@/components/common/JobCard";
import { useGetCareersQuery } from "@/redux/api/careerApi";
export default function CareersPage() {
  const { data: careersData, isLoading, error } = useGetCareersQuery();

  // Use actual data from API with fallback to empty array
  const jobPostings = careersData?.data || [];

  // Show loading state
  if (isLoading) {
    return (
      <CommonPage>
        <section className="contact-image-container">
          <Image
            src="/career.png"
            alt="Careers Background"
            fill
            priority
            style={{
              objectFit: "cover",
            }}
          />
          <div className="about-overlay"></div>
          <h1 className="about-title">Career</h1>
          <div className="scroll-indicator">
            <div className="triangle"></div>
          </div>
        </section>
        <section className="careers-page">
          <div className="careers-container">
            <div className="loading-state">Loading career opportunities...</div>
          </div>
        </section>
      </CommonPage>
    );
  }

  // Show error state
  if (error) {
    return (
      <CommonPage>
        <section className="contact-image-container">
          <Image
            src="/career.png"
            alt="Careers Background"
            fill
            priority
            style={{
              objectFit: "cover",
            }}
          />
          <div className="about-overlay"></div>
          <h1 className="about-title">Career</h1>
          <div className="scroll-indicator">
            <div className="triangle"></div>
          </div>
        </section>
        <section className="careers-page">
          <div className="careers-container">
            <div className="error-state">
              Error loading career opportunities. Please try again later.
            </div>
          </div>
        </section>
      </CommonPage>
    );
  }

  return (
    <CommonPage>
      <section className="contact-image-container">
        <Image
          src="/career.png"
          alt="Careers Background"
          fill
          priority
          style={{
            objectFit: "cover",
          }}
        />
        <div className="about-overlay"></div>
        <h1 className="about-title">Career</h1>
        <div className="scroll-indicator">
          <div className="triangle"></div>
        </div>
      </section>

      <section className="careers-page">
        <div className="careers-container">
          <div className="careers-header">
            <h1 className="careers-title">Career Opportunities</h1>
            <p className="careers-subtitle">
              Join our team and grow your career with us
            </p>
          </div>

          {jobPostings.length > 0 ? (
            <div className="job-cards-grid">
              {jobPostings.map((job) => (
                <JobCard
                  key={job.id}
                  title={job.title}
                  educationalRequirements={job.description}
                  deadline={job.deadline}
                  isExpired={job.status !== "active"}
                  jobType={job.type}
                  redirectLink={job.redirectLink}
                />
              ))}
            </div>
          ) : (
            <div className="no-jobs-message">
              <p>No current job openings at the moment.</p>
              <p>Please check back later for new opportunities.</p>
            </div>
          )}
        </div>
      </section>
    </CommonPage>
  );
}
