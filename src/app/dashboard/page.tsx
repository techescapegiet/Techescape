"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { GlitchText } from "@/components/ui/GlitchText";
import { WarningAlert } from "@/components/ui/WarningAlert";
import { Shield, Server, Activity, Lock, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { player, timeRemaining, isTimeUp } = useGame();
  const router = useRouter();

  useEffect(() => {
    if (!player) {
      router.push("/login");
    }
  }, [player, router]);

  if (!player) return null;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const isLowTime = timeRemaining < 300; // less than 5 minutes

  const startNextLevel = () => {
    if (player.currentLevel <= 5) {
      router.push(`/level/${player.currentLevel}`);
    } else {
      router.push("/reconstruct");
    }
  };

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col gap-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#00ff00]/30 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 text-glow">
            <Shield className="w-8 h-8" />
            MISSION CONTROL
          </h1>
          <div className="text-[#00ffff] mt-2 font-bold tracking-widest">
            OPERATIVE IDENTIFICATION: <span className="text-white">{player.id}</span>
          </div>
        </div>

        <div
          className={`px-6 py-3 border-2 font-bold text-2xl flex items-center gap-3 ${
            isLowTime ? "border-[#ff003c] text-[#ff003c] animate-pulse box-glow" : "border-[#00ff00] text-[#00ff00] box-glow"
          }`}
        >
          <Activity className="w-6 h-6" />
          {formatTime(timeRemaining)}
        </div>
      </header>

      {isLowTime && <WarningAlert message="WARNING: MISSION TIME CRITICAL. SERVER SHUTDOWN IMMINENT." />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {/* Left Column: Status */}
        <div className="md:col-span-1 border border-[#00ff00]/30 p-6 bg-black/50 flex flex-col gap-6">
          <h2 className="text-xl font-bold border-b border-[#00ff00]/30 pb-2">SYSTEM STATUS</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="opacity-70 flex items-center gap-2"><Server className="w-4 h-4"/> Mainframe</span>
              <span className="text-[#ff003c] font-bold animate-pulse">OFFLINE</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-70 flex items-center gap-2"><Database className="w-4 h-4"/> Data Core</span>
              <span className="text-[#ff003c] font-bold animate-pulse">LOCKED</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-70 flex items-center gap-2"><Lock className="w-4 h-4"/> Security Node</span>
              <span className="text-[#00ffff] font-bold">NODE {player.currentLevel} ACTIVE</span>
            </div>
          </div>

          <div className="mt-auto">
            <h3 className="text-sm opacity-70 mb-2 uppercase tracking-widest">RECOVERY PROGRESS ({player.currentLevel - 1}/5)</h3>
            <div className="h-4 w-full bg-[#002200] border border-[#00ff00]/50 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#00ff00]"
                initial={{ width: 0 }}
                animate={{ width: `${((player.currentLevel - 1) / 5) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            
            <div className="mt-4 flex gap-2">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <div 
                  key={lvl} 
                  className={`flex-1 h-2 ${
                    lvl < player.currentLevel ? "bg-[#00ff00]" : 
                    lvl === player.currentLevel ? "bg-[#00ffff] animate-pulse" : "bg-[#002200]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Mission Objective */}
        <div className="md:col-span-2 border border-[#00ff00]/30 p-6 bg-[#001100] box-glow flex flex-col">
          <div className="relative z-10">
            <div className="mb-2 text-[#00ffff] font-bold tracking-widest uppercase text-sm flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#00ffff] animate-pulse" />
              Current Directive
            </div>
            <h2 className="text-3xl font-bold mb-6 text-glow">
              <GlitchText text={player.currentLevel <= 5 ? `BREACH SECURITY NODE ${player.currentLevel}` : "RECONSTRUCT MASTER KEY"} />
            </h2>
            
            <div className="mb-8 p-4 border border-[#00ff00]/20 bg-black/50 min-h-[150px]">
              <TerminalText 
                text={
                  player.currentLevel === 1 ? "The hacker has hidden the first key fragment within the mainframe's terminology database. Solve the Crossword to extract it." :
                  player.currentLevel === 2 ? "Node 2 is protected by cryptographic hints. Identify the core computer science concepts to proceed." :
                  player.currentLevel === 3 ? "A dual-authentication lock is active. You must interface with the MCQ system to bypass this node." :
                  player.currentLevel === 4 ? "The hacker left corrupted logic in the system. Debug the faulty code syntax to find the hidden fragment." :
                  player.currentLevel === 5 ? "Final security layer. A complex mashup puzzle stands between you and the final key fragment." :
                  "All fragments recovered. Proceed to the master reconstruction interface to restore the GIET server."
                }
                speed={25}
              />
            </div>

            <div className="flex flex-col gap-4">
              <GlowingButton onClick={startNextLevel} className="w-full py-4 text-xl">
                {player.currentLevel <= 5 ? "INITIALIZE BREACH PROTOCOL" : "INITIATE RECONSTRUCTION"}
              </GlowingButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
