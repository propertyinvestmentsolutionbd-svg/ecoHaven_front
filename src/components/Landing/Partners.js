"use client";

import Image from "next/image";

export default function Partners() {
  return (
    <div className="partner-background">
      <h2 className="partners-title">Partners</h2>
      <div className="partners-image-container">
        <Image
          src="/partners.png"
          alt="partners"
          width={500}
          height={100}
          className="partners-image"
        />
      </div>
    </div>
  );
}
