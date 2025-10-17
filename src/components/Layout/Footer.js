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
            width={120}
            height={40}
            className="object-contain"
          />
          <p className="mt-4 leading-relaxed text-white text-sm">
            Pioneering sustainable and innovative real estate development in
            Bangladesh. We build communities, not just structures.
          </p>
        </div>

        {/* Middle */}
        <div className="w-1/4">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Our Projects
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className="w-1/4">
          <h3 className="text-xl font-semibold mb-4 mt-[30px]">Contact Us</h3>
          <p className="text-base mb-3">
            <span className="font-medium">Head Office:</span> Jalshiri Abashon
          </p>
          <p className="text-base mb-3">+880 17xxxxxxx</p>
          <p className="text-base mb-6">eco-havenbd@gmail.com</p>

          {/* Follow Us Section */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold my-[10px]">Follow Us</h3>
            <div className="flex space-x-[10px]">
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
