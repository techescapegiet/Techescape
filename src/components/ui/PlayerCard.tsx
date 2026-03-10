"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import { motion, AnimatePresence } from "framer-motion";
import { User, Shield, Hash, Fingerprint, Lock, Zap } from "lucide-react";
import { GlitchText } from "./GlitchText";
import { cn } from "@/lib/utils";

export function PlayerCard() {
    const { player } = useGame();
    const [prevLevel, setPrevLevel] = useState(player?.currentLevel || 1);
    const [isLevelingUp, setIsLevelingUp] = useState(false);

    useEffect(() => {
        if (player && player.currentLevel > prevLevel) {
            setIsLevelingUp(true);
            setPrevLevel(player.currentLevel);

            const timer = setTimeout(() => {
                setIsLevelingUp(false);
            }, 3000); // Glitch/flash duration

            return () => clearTimeout(timer);
        }
    }, [player?.currentLevel, prevLevel]);

    // Ensure card is only shown when player is logged in and not failed
    if (!player) return null;

    const isMaxLevel = player.currentLevel > 5;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={cn(
                    "fixed top-4 right-4 md:top-6 md:right-6 z-40 w-72 md:w-80",
                    "border-2 p-4 bg-black/90 backdrop-blur-md transition-colors duration-500",
                    isLevelingUp ? "border-[#00ffff] shadow-[0_0_30px_#00ffff]" : "border-[#00ff00]/40 shadow-[0_4px_20px_rgba(0,255,0,0.15)] hover:border-[#00ff00]"
                )}
            >
                {/* Animated grid background */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(transparent_1px,black_1px),linear-gradient(90deg,transparent_1px,black_1px)] bg-[length:10px_10px] [background-position:center_center] pointer-events-none" />

                {isLevelingUp && (
                    <div className="absolute inset-0 bg-[#00ffff]/10 animate-pulse pointer-events-none" />
                )}

                <div className="relative z-10">
                    {/* Header Row */}
                    <div className="flex justify-between items-start mb-4 border-b border-white/20 pb-3">
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "p-2 rounded-sm border transition-colors",
                                isLevelingUp ? "border-[#00ffff] bg-[#00ffff]/20 text-[#00ffff]" : "border-[#00ff00]/50 bg-[#00ff00]/10 text-[#00ff00]"
                            )}>
                                <Fingerprint className="w-5 h-5 animate-pulse" />
                            </div>
                            <div>
                                <div className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Terminal Assign</div>
                                <div className="font-mono font-bold text-white text-sm tracking-widest">{player.id}</div>
                            </div>
                        </div>
                        {isLevelingUp && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1.2, 1] }}
                                className="text-[#00ffff] px-2 py-0.5 border border-[#00ffff] text-[8px] font-bold tracking-widest uppercase bg-[#00ffff]/20"
                            >
                                LEVEL UP
                            </motion.div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <User className="w-4 h-4 text-white/40" />
                            <div className="flex-1">
                                <div className="text-[10px] uppercase text-white/30 tracking-widest">Operative Tag</div>
                                <div className="font-mono text-sm text-[#00ff00] font-bold line-clamp-1">{player.rollNumber || "GHOST"}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Lock className="w-4 h-4 text-white/40" />
                            <div className="flex-1">
                                <div className="text-[10px] uppercase text-white/30 tracking-widest">Auth Token</div>
                                <div className="font-mono text-xs text-white/80 tracking-widest">***{player.token.slice(-3)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Clearance Level Indicator */}
                    <div className="mt-5 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] uppercase text-white/50 tracking-wides font-bold flex items-center gap-1">
                                <Shield className="w-3 h-3 text-[#00ffff]" /> Clearance
                            </span>
                            <span className={cn(
                                "font-mono font-bold text-sm",
                                isLevelingUp ? "text-[#00ffff] animate-pulse" : "text-[#00ff00]"
                            )}>
                                {isMaxLevel ? "MAX / MASTER" : `NODE 0${player.currentLevel}`}
                            </span>
                        </div>

                        <div className="h-1.5 w-full bg-white/10 relative overflow-hidden rounded-full">
                            <motion.div
                                className={cn("absolute top-0 left-0 h-full", isLevelingUp ? "bg-[#00ffff]" : "bg-[#00ff00]")}
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, (player.currentLevel / 6) * 100)}%` }}
                                transition={{ duration: 1, type: "spring" }}
                            />
                        </div>

                        {/* Level segments */}
                        <div className="flex justify-between mt-1 px-1">
                            {[1, 2, 3, 4, 5, 6].map((l) => (
                                <div
                                    key={l}
                                    className={cn(
                                        "w-1 h-1 rounded-full",
                                        l <= player.currentLevel ? (isLevelingUp && l === player.currentLevel ? "bg-[#00ffff] shadow-[0_0_5px_#00ffff]" : "bg-[#00ff00]") : "bg-white/20"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
