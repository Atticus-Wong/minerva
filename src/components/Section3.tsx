// filepath: src/components/Section3.tsx
'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Section3() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay animation slightly more than Section2
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex justify-center py-16 bg-secondary/50 mt-10">
      <div
        className={`max-w-[1440px] text-center px-4 transition-opacity duration-1000 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isVisible ? "translate-y-0" : "translate-y-8"}`}
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
          transition: 'opacity 1000ms ease-in-out, transform 1000ms ease-in-out'
        }}
      >
        <h2 className="mb-4">Ready to Elevate Your Game?</h2>
        <p className="mb-6 text-lg text-muted-foreground max-w-xl mx-auto">
          Join Minerva today and unlock personalized insights, targeted training, and AI-powered coaching to reach your full chess potential.
        </p>
        <Link href="/login" passHref>
          <Button size="lg">Get Started Now</Button>
        </Link>
      </div>
    </div>
  );
}