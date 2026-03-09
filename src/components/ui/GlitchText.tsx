"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  interval?: number;
}

export function GlitchText({ text, className, interval = 3000 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200 + Math.random() * 300);
    }, interval + Math.random() * 2000);

    return () => clearInterval(glitchInterval);
  }, [interval]);

  return (
    <div className={cn("relative inline-block", className)}>
      <span className={cn(isGlitching ? "opacity-0" : "opacity-100")}>{text}</span>
      
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 text-[#00ff00] -translate-x-[2px] opacity-70"
            style={{ clipPath: `inset(${Math.random() * 50}% 0 ${Math.random() * 50}% 0)` }}
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 text-[#ff003c] translate-x-[2px] opacity-70"
            style={{ clipPath: `inset(${Math.random() * 50}% 0 ${Math.random() * 50}% 0)` }}
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 opacity-80"
            style={{ transform: `translateX(${Math.random() > 0.5 ? 2 : -2}px)` }}
          >
            {text}
          </span>
        </>
      )}
    </div>
  );
}
