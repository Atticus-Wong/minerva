"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Section2() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay the animation to start after Section1 animation (which takes 1000ms)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // 1200ms = Section1's 1000ms + 200ms buffer

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="justify-center flex items-center">
      <div
        className={`max-w-[1440px] flex items-center py-10 justify-center gap-3 ${isVisible
          ? "animate-in fade-in slide-in-from-bottom-2 duration-1000 ease-in-out"
          : "opacity-0"
          }`}
      >
        <div>
          <Card className="w-96 h-80">
            <CardHeader>
              <CardTitle><h3>Master your unique style</h3></CardTitle>
            </CardHeader>
            <CardContent>
              <p>Analyze your playing style—openings, mid-game, and endgame—to identify strengths and refine your strategy. Gain insights tailored to your unique repertoire.</p>
            </CardContent>
            <CardFooter>
              <p>[Explore Your Style]</p>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="w-96 h-80">
            <CardHeader>
              <CardTitle><h3>Precision Opening Analysis</h3></CardTitle>
            </CardHeader>
            <CardContent>
              <p>Evaluate performance by opening variation with proficiency scores. Identify strengths and weaknesses to optimize your preparation and results.</p>
            </CardContent>
            <CardFooter>
              <p>[Analyze Your Openings]</p>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="w-96 h-80">
            <CardHeader>
              <CardTitle><h3>Tailored Training & Guidance</h3></CardTitle>
            </CardHeader>
            <CardContent>
              <p>Sharpen your repertoire with custom Stockfish puzzles and Minerva, your AI chess coach, for personalized advice to boost your Elo and dominate the board.
              </p>
            </CardContent>
            <CardFooter>
              <p>[Start Your Journey]</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}