"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { GlitchText } from "@/components/ui/GlitchText";
import { WarningAlert } from "@/components/ui/WarningAlert";
import { Shield, Server, Activity, Lock, Database, Cpu, Zap } from "lucide-react";
import { motion, type Easing } from "framer-motion";
import { cn } from "@/lib/utils";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOut } }
};

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
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex-1 w-full max-w-6xl mx-auto flex flex-col gap-6"
    >
      {/* Header */}
      <motion.header
        variants={fadeUp}
        className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#00ff00]/30 pb-4 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 text-glow animate-flicker">
            <Shield className="w-8 h-8 animate-float" />
            MISSION CONTROL
          </h1>
          <div className="text-[#00ffff] mt-2 font-bold tracking-widest">
            OPERATIVE IDENTIFICATION: <span className="text-white">{player.id}</span>
          </div>
        </div>

        <motion.div
          animate={isLowTime ? {
            boxShadow: ["0 0 10px rgba(255,0,60,0.3)", "0 0 30px rgba(255,0,60,0.8)", "0 0 10px rgba(255,0,60,0.3)"],
          } : {}}
          transition={isLowTime ? { repeat: Infinity, duration: 1.5 } : {}}
          className={cn(
            "px-6 py-3 border-2 font-bold text-2xl flex items-center gap-3 transition-colors duration-500",
            isLowTime ? "border-[#ff003c] text-[#ff003c] box-glow" : "border-[#00ff00] text-[#00ff00] box-glow"
          )}
        >
          <Activity className={cn("w-6 h-6", isLowTime && "animate-bounce")} />
          {formatTime(timeRemaining)}
        </motion.div>
      </motion.header>

      {isLowTime && <WarningAlert message="WARNING: MISSION TIME CRITICAL. SERVER SHUTDOWN IMMINENT." />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {/* Left Column: Status */}
        <motion.div
          variants={fadeLeft}
          className="md:col-span-1 border border-[#00ff00]/30 p-6 bg-black/50 flex flex-col gap-6 animate-border-pulse"
        >
          <h2 className="text-xl font-bold border-b border-[#00ff00]/30 pb-2 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#00ffff] animate-float" />
            SYSTEM STATUS
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <motion.div variants={fadeUp} className="flex justify-between items-center group hover:bg-white/5 p-2 -mx-2 transition-colors rounded-sm">
              <span className="opacity-70 flex items-center gap-2"><Server className="w-4 h-4 group-hover:text-[#ff003c] transition-colors" /><span>Mainframe</span></span>
              <span className="text-[#ff003c] font-bold animate-pulse">OFFLINE</span>
            </motion.div>
            <motion.div variants={fadeUp} className="flex justify-between items-center group hover:bg-white/5 p-2 -mx-2 transition-colors rounded-sm">
              <span className="opacity-70 flex items-center gap-2"><Database className="w-4 h-4 group-hover:text-[#ff003c] transition-colors" /><span>Data Core</span></span>
              <span className="text-[#ff003c] font-bold animate-pulse">LOCKED</span>
            </motion.div>
            <motion.div variants={fadeUp} className="flex justify-between items-center group hover:bg-white/5 p-2 -mx-2 transition-colors rounded-sm">
              <span className="opacity-70 flex items-center gap-2"><Lock className="w-4 h-4 group-hover:text-[#00ffff] transition-colors" /><span>Security Node</span></span>
              <span className="text-[#00ffff] font-bold">NODE {player.currentLevel} ACTIVE</span>
            </motion.div>
          </motion.div>

          <div className="mt-auto">
            <h3 className="text-sm opacity-70 mb-2 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-3 h-3 text-[#00ffff]" />
              RECOVERY PROGRESS ({player.currentLevel - 1}/5)
            </h3>
            <div className="h-4 w-full bg-[#002200] border border-[#00ff00]/50 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00ff00] to-[#00ffff]"
                initial={{ width: 0 }}
                animate={{ width: `${((player.currentLevel - 1) / 5) * 100}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              {/* Shimmer overlay */}
              <div className="absolute inset-0 animate-gradient-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" style={{ backgroundSize: "200% 100%" }} />
            </div>

            <div className="mt-4 flex gap-2">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <motion.div
                  key={lvl}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + lvl * 0.1, type: "spring", stiffness: 300 }}
                  className={cn(
                    "flex-1 h-2 transition-colors duration-500",
                    lvl < player.currentLevel ? "bg-[#00ff00]" :
                      lvl === player.currentLevel ? "bg-[#00ffff] animate-pulse" : "bg-[#002200]"
                  )}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Mission Objective */}
        <motion.div
          variants={fadeUp}
          className="md:col-span-2 border border-[#00ff00]/30 p-6 bg-[#001100] box-glow flex flex-col relative overflow-hidden"
        >
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00ffff]/50" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00ffff]/50" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00ffff]/50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00ffff]/50" />

          <div className="relative z-10">
            <div className="mb-2 text-[#00ffff] font-bold tracking-widest uppercase text-sm flex items-center gap-2">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block w-2 h-2 bg-[#00ffff]"
              />
              Current Directive
            </div>
            <h2 className="text-3xl font-bold mb-6 text-glow animate-glitch-text">
              <GlitchText text={player.currentLevel <= 5 ? `BREACH SECURITY NODE ${player.currentLevel}` : "RECONSTRUCT MASTER KEY"} />
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-8 p-4 border border-[#00ff00]/20 bg-black/50 min-h-[150px] relative overflow-hidden"
            >
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 opacity-5 bg-[linear-gradient(transparent_1px,black_1px),linear-gradient(90deg,transparent_1px,black_1px)] bg-[length:20px_20px] pointer-events-none" />
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="flex flex-col gap-4"
            >
              <GlowingButton onClick={startNextLevel} className="w-full py-4 text-xl">
                {player.currentLevel <= 5 ? "INITIALIZE BREACH PROTOCOL" : "INITIATE RECONSTRUCTION"}
              </GlowingButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

