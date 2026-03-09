"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TerminalTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  cursor?: boolean;
}

export function TerminalText({
  text,
  delay = 0,
  speed = 40,
  className,
  onComplete,
  cursor = true,
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!isTyping && currentIndex === 0) {
      timeoutId = setTimeout(() => {
        setIsTyping(true);
      }, delay);
    } else if (isTyping && currentIndex < text.length) {
      timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed + Math.random() * 20); // Add a slight random delay for realistic typing
    } else if (isTyping && currentIndex >= text.length) {
      setIsTyping(false);
      if (onComplete) onComplete();
    }

    return () => clearTimeout(timeoutId);
  }, [currentIndex, isTyping, delay, speed, text, onComplete]);

  return (
    <span className={cn("font-mono font-medium", className)}>
      {displayedText}
      {cursor && (
        <span
          className={cn(
            "inline-block w-[8px] h-[1em] bg-current align-middle ml-1",
            !isTyping && currentIndex >= text.length ? "animate-pulse" : ""
          )}
        />
      )}
    </span>
  );
}
