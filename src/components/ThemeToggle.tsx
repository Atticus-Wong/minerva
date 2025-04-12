"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize from localStorage if available, otherwise default to true
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      // Return the stored value if it exists, otherwise default to true
      return stored ? stored === "dark" : true;
    }
    return true;
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}