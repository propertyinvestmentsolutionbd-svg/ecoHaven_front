"use client";
import CommonPage from "@/components/common/CommonPage";
import { useGetBlogsByIdQuery } from "@/redux/api/blogsApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

export default function BLogById() {
  const params = useParams();
  const blogId = params.id;

  const { data } = useGetBlogsByIdQuery(blogId);
  const blog = data?.data || {};
  return (
    <CommonPage>
      <section className="contact-image-container">
        <Image
          src={
            blog?.imageUrl
              ? `http://localhost:5000${blog.imageUrl}`
              : `dummy.jpg`
          }
          alt="Careers Background"
          fill
          priority
          style={{
            objectFit: "cover",
          }}
        />
        <div className="about-overlay"></div>
        <h1 className="about-title">{blog.tag}</h1>
        <div className="scroll-indicator">
          <div className="triangle"></div>
        </div>
      </section>
      <section className="careers-page">
        <div className="careers-container">
          <div className="loading-state">{blog.description}</div>
        </div>
      </section>
    </CommonPage>
  );
}
