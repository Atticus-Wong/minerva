"use client";

import { useEffect } from "react";

export function ThemeScript() {
  useEffect(() => {
    // This creates a script element that runs before hydration
    const themeScript = document.createElement("script");
    themeScript.innerHTML = `
      (function() {
        try {
          const theme = localStorage.getItem('theme');
          if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        } catch (e) {}
      })();
    `;
    document.head.appendChild(themeScript);

    return () => {
      document.head.removeChild(themeScript);
    };
  }, []);

  return null;
}