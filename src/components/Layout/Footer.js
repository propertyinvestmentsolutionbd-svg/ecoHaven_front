"use client";

import Image from "next/image";
import {
  FaWhatsapp,
  FaFacebook,
  FaYoutube,
  FaGooglePlus,
} from "react-icons/fa";
export default function Footer() {
  return (
    <footer
      className="footer relative flex justify-center items-center text-white bg-[#01451E]/85 bg-blend-overlay bg-cover bg-center h-[40vh]"
      style={{
        backgroundImage: "url('/footer.png')",
        backgroundPosition: "center 50%",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#01451E]/30 z-0 pointer-events-none" />

      {/* Footer Content */}
      <div className="relative z-10 flex justify-around items-center w-full max-w-6xl px-10 text-white">
        {/* Left */}
        <div className="w-1/4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="object-contain"
          />
          <p className="mt-4 leading-relaxed text-white text-[18px]">
            Pioneering sustainable and innovative real estate development in
            Bangladesh. We build communities, not just structures.
          </p>
        </div>

        {/* Middle */}
        <div className="w-1/4">
          <h3 className="text-[18px] font-semibold my-[18px]">Quick Links</h3>
          <ul className="ml-[10px] list-disc list-inside  ">
            <li className="mt-[20px]">
              <a href="#" className="hover:underline text-[18px]">
                About Us
              </a>
            </li>
            <li className="mt-[10px]">
              <a href="#" className="hover:underline text-[18px]">
                Our Projects
              </a>
            </li>
            <li className="mt-[10px]">
              <a href="#" className="hover:underline text-[18px]">
                Careers
              </a>
            </li>
            <li className="mt-[10px]">
              <a href="#" className="hover:underline text-[18px]">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className="w-1/4">
          <h3 className="text-[18px] font-semibold mb-4 mt-[30px] mb-[10px]">
            Contact Us
          </h3>
          <p className="text-base my-[10px]">
            <span className="font-medium text-[18px]">Head Office:</span>{" "}
            Jalshiri Abashon
          </p>
          <p className="text-base my-[10px] text-[18px]">+880 17xxxxxxx</p>
          <p className="text-base my-[10px] text-[18px]">
            eco-havenbd@gmail.com
          </p>

          {/* Follow Us Section */}
          <div className="mt-[10px]">
            <h3 className="text-[18px] font-semibold my-[10px]">Follow Us</h3>
            <div className="flex space-x-[12px]">
              <a
                href="#"
                className="text-white hover:text-blue-400 transition-colors duration-200"
                aria-label="Facebook"
              >
                <FaFacebook size={28} />
              </a>
              <a
                href="#"
                className="text-white hover:text-red-500 transition-colors duration-200"
                aria-label="YouTube"
              >
                <FaYoutube size={28} />
              </a>
              <a
                href="#"
                className="text-white hover:text-red-400 transition-colors duration-200"
                aria-label="Google Plus"
              >
                <FaGooglePlus size={28} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
