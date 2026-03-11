"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CyberAvatarProps {
  seed: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function CyberAvatar({ seed, className, size = "md" }: CyberAvatarProps) {
  // Simple deterministic hash from string
  const getHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const hash = getHash(seed || "default");
  const color1 = `hsl(${hash % 360}, 70%, 50%)`;
  const color2 = `hsl(${(hash + 60) % 360}, 80%, 40%)`;
  
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-32 h-32"
  };

  return (
    <div className={cn("relative overflow-hidden border border-white/20 rounded-lg bg-black", sizeClasses[size], className)}>
      {/* Glitchy Background */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{ background: `linear-gradient(45deg, ${color1}, ${color2})` }}
        animate={{
          background: [
            `linear-gradient(45deg, ${color1}, ${color2})`,
            `linear-gradient(135deg, ${color2}, ${color1})`,
            `linear-gradient(225deg, ${color1}, ${color2})`,
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Abstract Shapes */}
      <div className="absolute inset-0 flex items-center justify-center p-2">
        <svg viewBox="0 0 100 100" className="w-full h-full text-white/80 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
          <rect 
            x={(hash % 40) + 10} 
            y={(hash % 40) + 10} 
            width="30" 
            height="30" 
            fill="currentColor" 
            className="animate-pulse"
            opacity="0.8"
          />
          <circle 
            cx={((hash >> 2) % 40) + 50} 
            cy={((hash >> 4) % 40) + 50} 
            r="15" 
            fill="currentColor" 
            opacity="0.6"
          />
          <path 
            d={`M 10,90 L 50,${10 + (hash % 20)} L 90,90`} 
            stroke="currentColor" 
            strokeWidth="4" 
            fill="none"
          />
        </svg>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-20" />
      
      {/* Scanline */}
      <motion.div 
        className="absolute inset-0 pointer-events-none border-t-2 border-white/30"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
