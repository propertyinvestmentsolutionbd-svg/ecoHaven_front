"use client";
import { useGetBlogsQuery } from "@/redux/api/blogsApi";
import { ArrowRightOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Blogs() {
  const { data } = useGetBlogsQuery();
  const blogs = data?.data || [];
  const router = useRouter();
  if (!blogs.length) {
    return (
      <section className="blogs-section">
        <div className="blogs-container">
          <div className="blogs-header">
            <h2 className="blogs-title">Articles</h2>
          </div>
          <div className="no-blogs-message">
            <p>No blog articles available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="blogs-section">
      <div className="blogs-container">
        <div className="blogs-header">
          <h2 className="blogs-title">Articles</h2>
        </div>

        {blogs.map((blog) => (
          <div key={blog.id} className="blog-slide">
            <div className="blog-card">
              <div className="blog-image-wrapper">
                <Image
                  src={`http://localhost:5000${blog.imageUrl}` || "/dummy.jpg"}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  // className here targets the Next wrapper, not the img itself
                />

                <div className="blog-overlay">
                  <div className="overlay-content">
                    <div className="overlay-bottom-row">
                      <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
                        {blog.title}
                      </h3>

                      <p style={{ margin: "1rem 0" }}>
                        {blog.description?.slice(0, 200)}...
                      </p>
                      <button
                        className="explore-btn"
                        onClick={() => {
                          router.push(`/blogs/${blog.id}`);
                        }}
                      >
                        Read More <ArrowRightOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .blogs-section {
          padding: 60px 0;
          background: #fff;
        }
        .blogs-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .blogs-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 40px auto;
        }
        .blogs-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #333;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .blog-card {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
          border: 1px solid #e8e8e8;
          margin: 1rem auto;
          box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
            rgba(0, 0, 0, 0.22) 0px 15px 12px;
        }
        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        .blog-image-wrapper {
          position: relative;
          width: 100%;
          height: 400px;
          overflow: hidden;
        }
        /* TARGET the generated img inside the Next <Image /> using :global */
        .blog-image-wrapper :global(img) {
          transition: transform 0.45s ease;
          transform-origin: center center;
          will-change: transform;
          /* ensure image fills area */
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        /* Scale the internal img on hover */
        .blog-card:hover .blog-image-wrapper :global(img) {
          transform: scale(1.06);
        }

        /* Overlay: allow pointer events only for .overlay-content (so button clickable) */
        .blog-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.7) 100%
          );
          display: flex;
          align-items: flex-end;
          padding: 30px;
          color: white;
          pointer-events: none; /* don't block hover on card */
        }
        .overlay-content {
          width: 100%;
          pointer-events: auto;
        } /* allow clicking inside content (button) */

        .blog-main-title {
          font-size: 0.7rem;
          color: white;
          margin: 0 0 12px 0;
          line-height: 1.3;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .explore-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          color: #333;
          font-weight: 600;
          cursor: pointer;
          padding: 12px 24px;
          border-radius: 6px;
          transition: all 0.3s ease;
          text-transform: uppercase;
          font-size: 0.7rem;
          letter-spacing: 0.5px;
        }
        .explore-btn:hover {
          background: white;
          gap: 12px;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
        }
        .no-blogs-message {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }

        @media (max-width: 768px) {
          .blogs-header {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
          .blogs-title {
            font-size: 2rem;
          }
          .blog-image-wrapper {
            height: 350px;
          }
          .blog-overlay {
            padding: 20px;
          }
          .blog-main-title {
            font-size: 1.5rem;
          }
        }
        @media (max-width: 480px) {
          .blogs-title {
            font-size: 1.75rem;
          }
          .blog-image-wrapper {
            height: 300px;
          }
          .blog-overlay {
            padding: 15px;
          }
          .blog-main-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  );
}
