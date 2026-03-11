"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { TerminalText } from "@/components/ui/TerminalText";
import { GlitchText } from "@/components/ui/GlitchText";
import { AlertTriangle, ShieldAlert, Database, Trash2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FailurePage() {
    const { player, erasePlayerData } = useGame();
    const router = useRouter();
    const [stage, setStage] = useState<"signalLoss" | "initial" | "purging" | "complete">("signalLoss");
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [tempId, setTempId] = useState("");

    useEffect(() => {
        if (player) {
            setTempId(player.id);
        } else if (stage === "initial") {
            // If someone visits directly without a session, send back
            router.push("/");
        }
    }, [player, router, stage]);

    useEffect(() => {
        if (stage === "signalLoss") {
            const timer = setTimeout(() => setStage("initial"), 3000);
            return () => clearTimeout(timer);
        }

        if (stage === "initial") {
            const timer = setTimeout(() => setStage("purging"), 3000);
            return () => clearTimeout(timer);
        }

        if (stage === "purging") {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    const next = prev + 1;
                    if (next >= 100) {
                        clearInterval(interval);
                        setStage("complete");
                        return 100;
                    }
                    return next;
                });
            }, 80);

            const logChoices = [
                "ACCESSING DATA ENCLAVE...",
                "IDENTIFYING USER CREDENTIALS...",
                "WIPING ROLL NUMBER DATABASE...",
                "DELETING ENCRYPTED SESSION KEYS...",
                "BREAKING DOWN OPERATIVE METADATA...",
                "RELEASING PC RESOURCE LOCK...",
                "DE-AUTHENTICATING GOOGLE HANDSHAKE...",
                "PURGING LOCAL CACHE...",
                "RESTORING SYSTEM IDLE STATE..."
            ];

            const logInterval = setInterval(() => {
                setLogs((prev) => [...prev, logChoices[Math.floor(Math.random() * logChoices.length)]].slice(-5));
            }, 800);

            return () => {
                clearInterval(interval);
                clearInterval(logInterval);
            };
        }

        if (stage === "complete") {
            const cleanup = async () => {
                await erasePlayerData();
                setTimeout(() => router.push("/"), 3000);
            };
            cleanup();
        }
    }, [stage]);

    return (
        <div className="min-h-screen bg-black text-[#ff003c] flex flex-col items-center justify-center p-6 font-mono overflow-hidden relative">
            {/* Background Glitch Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50 contrast-150 animate-[pulse_0.1s_infinite]" />
            <div className="absolute inset-0 bg-black opacity-40 pointer-events-none mix-blend-overlay" />
            
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

            <AnimatePresence mode="wait">
                {stage === "signalLoss" && (
                    <motion.div
                        key="signalLoss"
                        exit={{ opacity: 0, scale: 0.9, filter: "brightness(0)" }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 flex items-center justify-center bg-black z-50 overflow-hidden"
                    >
                        {/* Static Noise */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-[3] contrast-[2] animate-[pulse_0.05s_infinite] opacity-50 mix-blend-screen pointer-events-none" />
                        
                        {/* Glitching Text Block */}
                        <motion.div
                            initial={{ scale: 1, filter: "brightness(1) contrast(1)", opacity: 1 }}
                            animate={{
                                x: [0, -10, 10, -5, 5, 0],
                                y: [0, 5, -5, 10, -10, 0]
                            }}
                            transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
                            className="bg-black/80 border-y-8 border-white/50 w-full py-12 flex items-center justify-center z-10 backdrop-blur-sm shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                        >
                            <h1 className="text-6xl md:text-[120px] font-black text-white mix-blend-difference tracking-tighter uppercase whitespace-nowrap animate-pulse" style={{ textShadow: "5px 0 0 red, -5px 0 0 blue" }}>
                                NO SIGNAL
                            </h1>
                        </motion.div>

                        <div className="absolute top-10 left-10 text-white font-mono text-xl animate-pulse">AV-1</div>
                        <div className="absolute bottom-10 right-10 text-white font-mono text-xl opacity-50">{new Date().toLocaleTimeString()}</div>
                        
                        {/* SMPTE Color Bars glitching behind */}
                        <motion.div 
                          className="absolute inset-0 flex opacity-20 pointer-events-none"
                          animate={{ x: [0, -20, 20, 0] }}
                          transition={{ duration: 0.1, repeat: Infinity }}
                        >
                            <div className="flex-1 bg-white" />
                            <div className="flex-1 bg-yellow-400" />
                            <div className="flex-1 bg-[#00ffff]" />
                            <div className="flex-1 bg-[#00ff00]" />
                            <div className="flex-1 bg-[#ff00ff]" />
                            <div className="flex-1 bg-[#ff003c]" />
                            <div className="flex-1 bg-blue-600" />
                        </motion.div>
                    </motion.div>
                )}

                {stage === "initial" && (
                    <motion.div
                        key="initial"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center max-w-2xl"
                    >
                        <ShieldAlert className="w-24 h-24 mx-auto mb-8 animate-pulse text-[#ff003c]" />
                        <h1 className="text-5xl font-black mb-6 tracking-tighter">
                            <GlitchText text="MISSION FAILURE" />
                        </h1>
                        <p className="text-xl text-white mb-8 leading-relaxed opacity-80 uppercase tracking-widest">
                            You failed to save the college server. The system has detected a breach and is initiating security protocols.
                        </p>
                        <div className="inline-block border-2 border-[#ff003c] px-6 py-2 bg-[#ff003c]/10 animate-bounce">
                            CRITICAL PROTOCOL: DATA_PURGE_01
                        </div>
                    </motion.div>
                )}

                {stage === "purging" && (
                    <motion.div
                        key="purging"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-xl text-center"
                    >
                        <div className="mb-8 flex items-center justify-center gap-4">
                            <Database className="w-8 h-8 animate-spin" />
                            <h2 className="text-2xl font-bold tracking-widest uppercase">Breaking Down User Data</h2>
                        </div>

                        <div className="bg-[#1a0005] border border-[#ff003c]/30 p-2 mb-6 box-glow">
                            <div
                                className="h-8 bg-[#ff003c] transition-all duration-100 ease-linear flex items-center justify-end px-2"
                                style={{ width: `${progress}%` }}
                            >
                                <span className="text-black font-black text-xs">{progress}%</span>
                            </div>
                        </div>

                        <div className="text-left h-40 bg-black/50 border border-[#ff003c]/20 p-4 overflow-hidden mb-6">
                            {logs.map((log, i) => (
                                <div key={i} className="text-[10px] mb-1 opacity-70">
                                    <span className="text-[#ff003c]/50">[{new Date().toLocaleTimeString()}]</span> {log}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 justify-center text-xs text-white/50 animate-pulse">
                            <AlertTriangle className="w-4 h-4 text-[#00ffff]" />
                            CAUTION: PC {tempId} RETURNING TO IDLE STATUS
                        </div>
                    </motion.div>
                )}

                {stage === "complete" && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <Trash2 className="w-20 h-20 mx-auto mb-6 opacity-30" />
                        <h2 className="text-3xl font-black mb-4 tracking-tighter text-[#00ffff]">
                            CLEANUP COMPLETE
                        </h2>
                        <div className="text-sm text-white/40 uppercase mb-8">
                            Database Sanitized • PC Available • Logged Out
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="text-xs uppercase tracking-widest">Rebooting Terminal...</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorative corners */}
            <div className="fixed top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#ff003c]/30" />
            <div className="fixed top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#ff003c]/30" />
            <div className="fixed bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#ff003c]/30" />
            <div className="fixed bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#ff003c]/30" />
        </div>
    );
}
