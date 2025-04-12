"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeToggle";

export default function Section1() {
  const [isVisible, setIsVisible] = useState(false);

  // Store animation state in a ref that persists across theme changes
  useEffect(() => {
    // Only run the animation once after initial render
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 0);

    return () => clearTimeout(timer);
    // Empty dependency array means this only runs once after mount
  }, []);

  return (
    <div className="w-full flex justify-center mt-10 h-[40vh]">
      <div
        // Use the stored animation state, not one that changes with theme
        className={`flex items-center justify-center max-w-[1440px] transition-opacity duration-1000 ease-in-out
          ${isVisible ? "opacity-100" : "opacity-0"}
          ${isVisible ? "translate-y-0" : "translate-y-8"}`}
        // Don't reapply the animation classes on theme change
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
          transition: 'opacity 1000ms ease-in-out, transform 1000ms ease-in-out'
        }}
      >
        <h1>Minerva: A chess consulting agent</h1>
      </div>
    </div>
  );
}