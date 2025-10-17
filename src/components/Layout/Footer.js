"use client";

import Image from "next/image";
import {
  FaWhatsapp,
  FaFacebook,
  FaYoutube,
  FaGooglePlus,
} from "react-icons/fa";
import "./footer.css"; // We'll create this CSS file

export default function Footer() {
  return (
    <footer className="footer-vanilla">
      {/* Background */}
      <div
        className="footer-background"
        style={{
          backgroundImage: "url('/footer.png')",
        }}
      />

      {/* Overlay */}
      <div className="footer-overlay" />

      {/* Footer Content */}
      <div className="footer-content-container">
        <div className="footer-content">
          {/* Left */}
          <div className="footer-left">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="footer-logo"
            />
            <p className="footer-mission">
              Pioneering sustainable and innovative real estate development in
              Bangladesh. We build communities, not just structures.
            </p>
          </div>

          {/* Middle */}
          <div className="footer-middle">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Our Projects
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Right */}
          <div className="footer-right">
            <h3 className="footer-heading">Contact Us</h3>
            <p className="footer-contact">
              <span className="contact-label">Head Office:</span> Jalshiri
              Abashon
            </p>
            <p className="footer-contact">+880 17xxxxxxx</p>
            <p className="footer-contact">eco-havenbd@gmail.com</p>

            {/* Follow Us Section */}
            <div className="footer-social">
              <h3 className="footer-heading">Follow Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon" aria-label="Facebook">
                  <FaFacebook size={28} />
                </a>
                <a href="#" className="social-icon" aria-label="YouTube">
                  <FaYoutube size={28} />
                </a>
                <a href="#" className="social-icon" aria-label="Google Plus">
                  <FaGooglePlus size={28} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom" style={{ marginTop: "20px" }}>
        <hr className="footer-divider" />
        <p className="footer-copyright">All Rights Reserved By ©Eco-Haven</p>
      </div>

      {/* WhatsApp Floating */}
      <a
        href="https://wa.me/8801993517649"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        <FaWhatsapp size={28} />
      </a>
    </footer>
  );
}
