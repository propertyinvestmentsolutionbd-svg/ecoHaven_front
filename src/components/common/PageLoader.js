"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  // ⏱️ Adjust this to match your GIF duration (ms)
  const GIF_DURATION = 4000;

  // Detect when hydration finishes
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    // Show loader on every route change
    setShow(true);
    const timer = setTimeout(() => setShow(false), GIF_DURATION);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`loader-wrapper ${show ? "show" : "hide"} ${
        hydrated ? "hydrated" : ""
      }`}
    >
      <img
        key={pathname}
        src="/loading.gif"
        alt="Loading..."
        className="loader"
      />
      <style jsx>{`
        .loader-wrapper {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          z-index: 9999;
          opacity: 1;
          width: 100vw;
          height: 100vh;
          /* prevent any initial flicker */
          transform: scale(1);
        }

        /* Only fade after hydration */
        .loader-wrapper.hydrated {
          transition: opacity 0.6s ease;
        }

        .loader-wrapper.hide.hydrated {
          opacity: 0;
          pointer-events: none;
        }

        .loader {
          width: 160px;
          height: auto;
        }
      `}</style>
    </div>
  );
}
