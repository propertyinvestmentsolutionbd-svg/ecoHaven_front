import Image from "next/image";
import React from "react";

export default function CommonPage({ children }) {
  return (
    <div className="commonPage-wrapper">
      <div className="commonPage-content">{children}</div>

      {/* Background image at bottom-right */}
      <div className="commonPage-bg-image">
        <Image
          src={"/partnerB.png"}
          alt="Background decoration"
          fill
          className="bg-img"
          priority
        />
      </div>
    </div>
  );
}
