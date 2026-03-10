"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";

interface GlowingButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "danger" | "cyan";
}

export function GlowingButton({ children, className, variant = "primary", ...props }: GlowingButtonProps) {
  const isDanger = variant === "danger";

  return (
    <motion.button
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
      className={cn(
        "relative px-6 py-3 font-mono font-bold uppercase tracking-widest transition-all duration-300 border-2 overflow-hidden group btn-sweep cursor-pointer",
        isDanger
          ? "text-[#ff003c] border-[#ff003c] hover:bg-[#ff003c]/20 hover:shadow-[0_0_25px_rgba(255,0,60,0.6)]"
          : variant === "cyan"
            ? "text-[#00ffff] border-[#00ffff] hover:bg-[#00ffff]/20 hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]"
            : "text-[#00ff00] border-[#00ff00] hover:bg-[#00ff00]/20 hover:shadow-[0_0_25px_rgba(0,255,0,0.6)]",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          isDanger ? "bg-[#ff003c]/10" : variant === "cyan" ? "bg-[#00ffff]/10" : "bg-[#00ff00]/10"
        )}
      ></span>
    </motion.button>
  );
}

