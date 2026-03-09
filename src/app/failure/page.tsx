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
    const [stage, setStage] = useState<"initial" | "purging" | "complete">("initial");
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
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50 contrast-150" />

            <AnimatePresence mode="wait">
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
