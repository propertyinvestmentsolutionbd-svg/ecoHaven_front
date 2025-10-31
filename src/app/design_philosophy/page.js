import CommonPage from "@/components/common/CommonPage";
import Image from "next/image";
import React from "react";
import "./philosophy.css";
export default function page() {
  return (
    <CommonPage>
      <section className="philosophy-container">
        <div
          className=""
          style={
            {
              // width: "100vw",
              // minHeight: "auto",
            }
          }
        >
          <Image
            src="/design.png" // replace with your actual image path
            alt="About Us Background"
            fill
            // width={1800}
            // height={1000}
            priority
            // className="about-image"
            style={{
              objectFit: "cover",

              // cover, contain, none
            }}
          />
          <div className="about-overlay"></div>
          <h1 className="about-title">Design Philosophy</h1>
          <div className="scroll-indicator">
            <div className="triangle"></div>
          </div>{" "}
        </div>
      </section>
    </CommonPage>
  );
}
