"use client";

import Image from "next/image";
import CommonPage from "../common/CommonPage";

export default function Partners() {
  return (
    <CommonPage>
      <h2 className="partners-title">Partners</h2>
      <div className="partners-image-container">
        <div>
          <Image
            src="/partners.png"
            alt="partners"
            width={500}
            height={100}
            className=""
          />
        </div>
      </div>
    </CommonPage>
  );
}
