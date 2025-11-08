import CommonPage from "@/components/common/CommonPage";
import Image from "next/image";
import React from "react";
import "./Careers.css";
import { JobCard } from "@/components/common/JobCard";

const jobPostings = [
  {
    id: 1,
    title: "Executive/ Senior Executive (Sales)",
    educationalRequirements:
      "Master's degree or any discipline From a Reputed Educational Institution.",
    deadline: "30 March, 2025",
    isExpired: true,
  },
  {
    id: 2,
    title: "Executive/ Senior Executive (Sales)",
    educationalRequirements:
      "Master's degree or any discipline From a Reputed Educational Institution.",
    deadline: "30 March, 2025",
    isExpired: true,
  },
  {
    id: 3,
    title: "Executive/ Senior Executive (Sales)",
    educationalRequirements:
      "Master's degree or any discipline From a Reputed Educational Institution.",
    deadline: "30 March, 2025",
    isExpired: true,
  },
  {
    id: 4,
    title: "Executive/ Senior Executive (Sales)",
    educationalRequirements:
      "Master's degree or any discipline From a Reputed Educational Institution.",
    deadline: "30 March, 2025",
    isExpired: true,
  },
  {
    id: 5,
    title: "Executive/ Senior Executive (Sales)",
    educationalRequirements:
      "Master's degree or any discipline From a Reputed Educational Institution.",
    deadline: "30 March, 2025",
    isExpired: true,
  },
  {
    id: 6,
    title: "Executive/ Senior Executive (Sales)",
    educationalRequirements:
      "Master's degree or any discipline From a Reputed Educational Institution.",
    deadline: "30 March, 2025",
    isExpired: true,
  },
];
export default function page() {
  return (
    <CommonPage>
      <section className="contact-image-container">
        <Image
          src="/career.png" // replace with your actual image path
          alt="About Us Background"
          fill
          //   width={100}
          //   height={100}
          priority
          // className="about-image"
          // style={{
          //   objectFit: "cover",
          // }}
        />
        <div className="about-overlay"></div>
        <h1 className="about-title">Career</h1>
        <div className="scroll-indicator">
          <div className="triangle"></div>
        </div>{" "}
      </section>
      <section className="careers-page">
        <div className="careers-container">
          <div className="careers-header">
            <h1 className="careers-title">Career Opportunities</h1>
            <p className="careers-subtitle">
              Join our team and grow your career with us
            </p>
          </div>

          <div className="job-cards-grid">
            {jobPostings.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                educationalRequirements={job.educationalRequirements}
                deadline={job.deadline}
                isExpired={job.isExpired}
              />
            ))}
          </div>
        </div>
      </section>
    </CommonPage>
  );
}
