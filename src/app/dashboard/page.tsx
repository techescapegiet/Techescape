"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { GlitchText } from "@/components/ui/GlitchText";
import { WarningAlert } from "@/components/ui/WarningAlert";
import { Shield, Server, Activity, Lock, Database, Cpu, Zap, CheckCircle2, List } from "lucide-react";
import { motion, type Easing } from "framer-motion";
import { cn } from "@/lib/utils";
import { LEVEL_BRIEFINGS } from "@/lib/questionBank";
import { CyberAvatar } from "@/components/ui/CyberAvatar";

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
      return;
    }
    // If all levels done, skip dashboard entirely and go to reconstruction
    if (player.currentLevel > 5) {
      router.push("/reconstruct");
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
    // Safety: never route to /level/6 or beyond
    if (player.currentLevel >= 1 && player.currentLevel <= 5) {
      router.push(`/level/${player.currentLevel}`);
    } else {
      router.push("/reconstruct");
    }
  };

  const briefing = LEVEL_BRIEFINGS[player.currentLevel <= 5 ? player.currentLevel : 6];

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
        <div className="flex items-center gap-4">
          <CyberAvatar seed={player.id} size="lg" className="border-[#00ffff]/50 shadow-[0_0_15px_rgba(0,255,255,0.2)]" />
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3 text-glow animate-flicker">
              <Shield className="w-8 h-8 animate-float" />
              MISSION CONTROL
            </h1>
            <div className="text-[#00ffff] mt-2 font-bold tracking-widest">
              OPERATIVE IDENTIFICATION: <span className="text-white">{player.id.substring(0, 8).toUpperCase()}...</span>
            </div>
            <div className="text-xs text-[#00ff00]/70 font-mono mt-1 opacity-80 uppercase">
              // Digital Soul Imprint Verified
            </div>
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

      {player.currentLevel > 1 && player.currentLevel <= 6 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#00ff00]/10 border border-[#00ff00] p-4 text-center mb-2 box-glow"
        >
          <div className="flex items-center justify-center gap-3 text-[#00ff00] font-bold text-xl uppercase tracking-widest">
            <CheckCircle2 className="w-6 h-6" />
            Node {player.currentLevel - 1} Successfully Bypassed!
          </div>
          <p className="text-[#00ff00]/70 text-sm mt-1">Fragmentation recovery successful for slot {player.currentLevel - 1}.</p>
        </motion.div>
      )}

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
              <span className="text-[#00ffff] font-bold">{player.currentLevel <= 5 ? `NODE ${player.currentLevel} ACTIVE` : 'READY TO RECONSTRUCT'}</span>
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
                animate={{ width: `${Math.min(100, ((player.currentLevel - 1) / 5) * 100)}%` }}
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

          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-2 text-[#00ffff] font-bold tracking-widest uppercase text-sm flex items-center gap-2">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block w-2 h-2 bg-[#00ffff]"
              />
              Current Directive
            </div>
            <h2 className="text-3xl font-bold mb-4 text-glow animate-glitch-text">
              <GlitchText text={briefing.title} />
            </h2>

            <div className="mb-4 text-[#00ff00]/70 font-mono text-sm leading-relaxed">
              &gt; OBJECTIVE: {briefing.objective}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-8 p-6 border border-[#00ffff]/20 bg-black/50 min-h-[160px] relative overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-5 bg-[linear-gradient(transparent_1px,black_1px),linear-gradient(90deg,transparent_1px,black_1px)] bg-[length:20px_20px] pointer-events-none group-hover:opacity-10 transition-opacity" />
              <div className="font-mono text-[#00ffff] text-xs mb-3 flex items-center gap-2">
                <List className="w-3 h-3" />
                MISSION_INSTRUCTIONS_RAW.DAT
              </div>
              <TerminalText
                text={briefing.instruction}
                speed={20}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.4 }}
              className="mt-auto pt-4 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.8)]"
            >
              <GlowingButton onClick={startNextLevel} className="w-full py-5 text-xl tracking-[0.2em] font-black italic">
                {player.currentLevel <= 5 ? "INITIALIZE BREACH PROTOCOL" : "INITIATE RECONSTRUCTION"}
              </GlowingButton>
              <div className="mt-3 text-center text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">
                By Proceeding, You Acknowledge All System Risks
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

