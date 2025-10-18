"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";

const ImagePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Replace with your actual image path

  useEffect(() => {
    // Check if popup was already closed
    // const popupClosed = localStorage.getItem("popupClosed");
    // if (popupClosed) {
    //   setIsLoading(false);
    //   return;
    // }

    const handlePageLoad = () => {
      setIsLoading(false);

      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
      return () => window.removeEventListener("load", handlePageLoad);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    // localStorage.setItem("popupClosed", "true");
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  // Manage body scroll
  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }

    return () => {
      document.body.classList.remove("popup-open");
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content">
        {/* Close Button */}
        <button
          className="close-button"
          onClick={closePopup}
          aria-label="Close popup"
        >
          <CloseOutlined />
        </button>

        {/* Image Container */}
        <div className="image-container">
          <Image
            src={"/popup.png"}
            alt="Special Offer"
            width={400}
            height={300}
            className="popup-image"
            // placeholder="blur"
            // blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
            onError={(e) => {
              console.error("Image failed to load");
              // Fallback to a colored div if image fails
            }}
          />
          {/* Fallback in case image fails to load */}
          <div className="image-fallback">
            <span>Popup Image</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
