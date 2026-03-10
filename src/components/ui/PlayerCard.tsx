"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ChevronUp, ChevronDown, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";

export function PlayerCard() {
    const { player } = useGame();
    const [prevLevel, setPrevLevel] = useState(player?.currentLevel || 1);
    const [isLevelingUp, setIsLevelingUp] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (player && player.currentLevel > prevLevel) {
            setIsLevelingUp(true);
            setExpanded(true);
            setPrevLevel(player.currentLevel);
            const timer = setTimeout(() => {
                setIsLevelingUp(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [player?.currentLevel, prevLevel]);

    if (!player) return null;

    const isMaxLevel = player.currentLevel > 5;
    const levelLabel = isMaxLevel ? "MAX" : `NODE ${player.currentLevel}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
            className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40"
        >
            {/* Collapsed Pill / Toggle */}
            <button
                onClick={() => setExpanded(!expanded)}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 border bg-black/90 backdrop-blur-md font-mono text-[10px] uppercase tracking-widest cursor-pointer transition-all duration-300 hover:bg-black",
                    isLevelingUp
                        ? "border-[#00ffff] text-[#00ffff] shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                        : "border-[#00ff00]/40 text-[#00ff00]/70 hover:border-[#00ff00] hover:text-[#00ff00]"
                )}
            >
                <Fingerprint className="w-3 h-3" />
                <span className="font-bold text-white/80">{player.id}</span>
                <span className="text-white/20">|</span>
                <span>{player.rollNumber || "GHOST"}</span>
                <span className="text-white/20">|</span>
                <span className={cn(isLevelingUp ? "text-[#00ffff] animate-pulse" : "text-[#00ff00]")}>
                    {levelLabel}
                </span>

                {/* Level dots */}
                <div className="flex gap-0.5 ml-1">
                    {[1, 2, 3, 4, 5].map((l) => (
                        <div
                            key={l}
                            className={cn(
                                "w-1.5 h-1.5 rounded-full transition-colors",
                                l < player.currentLevel ? "bg-[#00ff00]" :
                                    l === player.currentLevel ? (isLevelingUp ? "bg-[#00ffff] shadow-[0_0_4px_#00ffff]" : "bg-[#00ffff] animate-pulse") :
                                        "bg-white/15"
                            )}
                        />
                    ))}
                </div>

                {expanded ? <ChevronDown className="w-3 h-3 ml-1" /> : <ChevronUp className="w-3 h-3 ml-1" />}

                {isLevelingUp && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.3, 1] }}
                        className="text-[#00ffff] px-1.5 py-0.5 border border-[#00ffff] text-[7px] font-bold bg-[#00ffff]/20 ml-1"
                    >
                        LVL UP
                    </motion.span>
                )}
            </button>

            {/* Expanded Details */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: 10, height: 0 }}
                        className={cn(
                            "mt-1 border bg-black/95 backdrop-blur-md p-3 overflow-hidden",
                            isLevelingUp ? "border-[#00ffff]/50" : "border-[#00ff00]/30"
                        )}
                    >
                        <div className="flex items-center justify-between gap-6 text-xs font-mono">
                            <div>
                                <div className="text-[8px] text-white/30 uppercase tracking-widest">Terminal</div>
                                <div className="text-white font-bold">{player.id}</div>
                            </div>
                            <div>
                                <div className="text-[8px] text-white/30 uppercase tracking-widest">Operative</div>
                                <div className="text-[#00ff00] font-bold">{player.rollNumber || "GHOST"}</div>
                            </div>
                            <div>
                                <div className="text-[8px] text-white/30 uppercase tracking-widest">Token</div>
                                <div className="text-white/60">***{player.token.slice(-3)}</div>
                            </div>
                            <div>
                                <div className="text-[8px] text-white/30 uppercase tracking-widest flex items-center gap-1">
                                    <Shield className="w-2.5 h-2.5 text-[#00ffff]" /> Clearance
                                </div>
                                <div className={cn("font-bold", isLevelingUp ? "text-[#00ffff]" : "text-[#00ff00]")}>
                                    {levelLabel}
                                </div>
                            </div>
                            <div className="w-24">
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className={cn("h-full", isLevelingUp ? "bg-[#00ffff]" : "bg-[#00ff00]")}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(100, ((player.currentLevel - 1) / 5) * 100)}%` }}
                                        transition={{ duration: 1, type: "spring" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
