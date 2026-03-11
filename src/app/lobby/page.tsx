"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { TerminalText } from "@/components/ui/TerminalText";
import { GlitchText } from "@/components/ui/GlitchText";
import { Users, ShieldAlert, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function LobbyPage() {
    const { player, isGameStarted } = useGame();
    const router = useRouter();
    const [onlinePlayers, setOnlinePlayers] = useState<string[]>([]);

    useEffect(() => {
        // If game has already started, instantly push to dashboard to start playing
        if (isGameStarted) {
            router.push("/dashboard");
        }
    }, [isGameStarted, router]);

    useEffect(() => {
        if (!player) {
            router.push("/login");
            return;
        }

        const fetchPlayers = async () => {
            const { data } = await supabase
                .from("players")
                .select("pc_id")
                .eq("status", "active")
                .eq("is_online", true);

            if (data) {
                setOnlinePlayers(data.map((p: any) => p.pc_id || "UNKNOWN"));
            }
        };

        fetchPlayers();

        const sub = supabase.channel("lobby-players")
            .on("postgres_changes", { event: "*", schema: "public", table: "players" }, () => fetchPlayers())
            .subscribe();

        return () => {
            supabase.removeChannel(sub);
        };
    }, [player, router]);

    if (!player) return null;

    return (
        <div className="flex-1 w-full flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl w-full bg-[#001100] border-2 border-[#00ffff] p-8 md:p-12 box-glow relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#00ffff]/5 to-transparent pointer-events-none" />

                <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full border border-[#00ffff] bg-[#00ffff]/10 animate-pulse box-glow text-[#00ffff]">
                        <ShieldAlert className="w-12 h-12" />
                    </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-center text-[#00ffff] mb-4">
                    <GlitchText text="AWAITING HOST PERMISSION" />
                </h1>

                <div className="text-center mb-10">
                    <TerminalText text="OPERATIVE CREDENTIALS VERIFIED. PLEASE STAND BY..." className="text-[#00ffff]/70 font-mono tracking-widest text-sm" />
                    <p className="mt-2 text-[10px] text-[#00ff00] font-bold tracking-[0.3em] uppercase animate-pulse">
                        Event will begin globally when command dictates.
                    </p>
                </div>

                <div className="border border-[#00ffff]/30 bg-black/50 p-6">
                    <div className="flex items-center justify-between border-b border-[#00ffff]/20 pb-4 mb-4">
                        <h3 className="text-[#00ffff] font-bold flex items-center gap-2 uppercase tracking-widest text-sm">
                            <Users className="w-4 h-4" /> Connected Operatives
                        </h3>
                        <span className="text-[#00ffff] font-mono font-bold">{onlinePlayers.length} ONLINE</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                        {onlinePlayers.map((pcId, i) => (
                            <div key={i} className="flex items-center gap-2 px-3 py-2 bg-[#00ffff]/5 border border-[#00ffff]/20 rounded-sm">
                                <Cpu className="w-3 h-3 text-[#00ff00]" />
                                <span className="text-white text-xs font-mono font-bold tracking-wider">{pcId}</span>
                            </div>
                        ))}
                        {onlinePlayers.length === 0 && (
                            <div className="col-span-full text-center py-4 text-[#00ffff]/40 text-xs tracking-widest font-mono">
                                Scanning for signals...
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4">
                    <div className="w-full max-w-md bg-black/40 border border-[#00ffff]/10 p-2 rounded text-[8px] font-mono text-[#00ff00]/40 overflow-hidden h-12 flex flex-col">
                        <div className="animate-[scroll_10s_linear_infinite]">
                            {`> INITIALIZING NEURAL UPLINK...
> ENCRYPTING DATA STREAMS...
> BYPASSING FIREWALL NODES...
> SYNCHRONIZING WITH GLOBAL COMMAND...
> WAITING FOR CLEARANCE...
> SIGNAL STRENGTH: OPTIMAL...
> TERMINAL ${player.id.slice(0, 8)} IDENTIFIED...
> STAND BY FOR MISSION START...`}
                        </div>
                    </div>
                    <div className="inline-block px-4 py-2 border border-[#00ffff]/20 bg-[#00ffff]/5 rounded text-[#00ffff] text-[10px] font-mono">
                        Your Terminal: {player.id}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
