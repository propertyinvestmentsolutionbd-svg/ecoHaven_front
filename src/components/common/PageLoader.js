"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  // ⏱️ Adjust to match your GIF duration
  const GIF_DURATION = 2000;

  useEffect(() => {
    // Show on navigation
    setVisible(true);

    // Hide after GIF fully plays
    const timer = setTimeout(() => setVisible(false), GIF_DURATION);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={`loader-overlay ${visible ? "show" : "hide"}`}>
      <img
        key={pathname}
        src="/loading.gif"
        alt="Loading..."
        className="loader-gif"
      />
    </div>
  );
}
