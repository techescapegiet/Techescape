"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface WarningAlertProps {
  message?: string;
  className?: string;
}

export function WarningAlert({
  message = "WARNING: MISSION TIME CRITICAL",
  className,
}: WarningAlertProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 border border-[#ff003c] bg-[#ff003c]/10 text-[#ff003c] font-mono animate-pulse",
        "box-glow shadow-[#ff003c]/50",
        className
      )}
    >
      <AlertTriangle className="w-6 h-6 shrink-0" />
      <div className="flex flex-col">
        <span className="font-bold tracking-widest uppercase text-glow-alert">SYSTEM ALERT</span>
        <span className="text-sm opacity-90">{message}</span>
      </div>
    </div>
  );
}
