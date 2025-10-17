"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="footer relative text-white bg-[#01451E]/85 bg-blend-overlay bg-cover bg-center h-[40vh]"
      style={{
        backgroundImage: "url('/footer.png')",
        backgroundPosition: "center 50%",
      }}
    >
      <div className="absolute inset-0 bg-[#01451E]/30 z-0" />
      <div className=" flex justify-around items-center">
        <div className="">
          <Image src="/logo.png" alt="Logo" width={120} height={40} />
          <p className=" mt-4 text-white !text-white leading-relaxed ">
            Pioneering sustainable and innovative real estate development in
            Bangladesh. We build communities, not just structures.
          </p>
        </div>
        {/* Middle */}
        <div className="">
          <h3 className="text-lg font-semibold mb-3 text-white !text-white">
            Quick Links
          </h3>
          <ul className="list-disc list-inside text-sm text-white !text-white space-y-2">
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Our Projects</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        {/* Right */}
        <div className="">
          <h3 className="text-lg font-semibold mb-3 text-white !text-white">
            Contact Us
          </h3>
          <p className="text-white !text-white text-sm">
            <span className="font-medium">Head Office:</span> Jalshiri Abashon
          </p>
          <p className="text-white !text-white text-sm mt-2">+880 17xxxxxxx</p>
          <p className="text-white !text-white text-sm">
            eco-havenbd@gmail.com
          </p>
        </div>
      </div>

      {/* WhatsApp Floating */}
      <a
        href="https://wa.me/88017xxxxxxx"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[10000] bg-[#25D366] hover:bg-[#22bb58] text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110"
      >
        <FaWhatsapp size={28} />
      </a>
    </footer>
  );
}
