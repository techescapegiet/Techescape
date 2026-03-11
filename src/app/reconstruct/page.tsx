"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import {
  CheckCircle2, XCircle, DatabaseBackup, Trophy, Clock,
  Shield, Cpu, Loader2, Star, AlertTriangle, User, Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const CORRECT_ORDER = ["SYSTEM", "BINARY", "LOGIC", "STACK", "SYNTAX"];
const SLOT_LABELS = [
  { num: "01", hint: "Architecture" },
  { num: "02", hint: "Data Representation" },
  { num: "03", hint: "Processing" },
  { num: "04", hint: "Memory" },
  { num: "05", hint: "Rules" },
];
const MAX_ATTEMPTS = 3;

interface LeaderboardEntry {
  id: string;
  name: string;
  rollNumber: string;
  time: string;
  score: number;
  current?: boolean;
}

function Confetti() {
  const colors = ["#00ff00", "#00ffff", "#ff003c", "#ffaa00", "#ffffff"];
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {Array.from({ length: 80 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            background: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            top: `-10px`,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, Math.random() * 720 - 360],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            delay: Math.random() * 1.5,
            ease: "easeIn",
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

export default function ReconstructPage() {
  const { player, logout, erasePlayerData } = useGame();
  const router = useRouter();

  const [slots, setSlots] = useState(["", "", "", "", ""]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loadingLb, setLoadingLb] = useState(false);
  const [dragSource, setDragSource] = useState<string | null>(null);
  const [dragFromSlot, setDragFromSlot] = useState<number | null>(null);

  // Computed player stats
  const timeTakenSecs = player ? Math.floor((Date.now() - player.startTime) / 1000) : 0;
  const timeTakenMins = Math.floor(timeTakenSecs / 60);
  const timeTakenSecsRem = timeTakenSecs % 60;
  const score = Math.max(0, 10000 - timeTakenSecs * 2);

  useEffect(() => {
    if (!player) { router.push("/login"); return; }
    const frags = player.fragments.length === 5
      ? [...player.fragments]
      : ["SYSTEM", "BINARY", "LOGIC", "STACK", "SYNTAX"];
    // Shuffle the available words
    setAvailableWords(frags.sort(() => 0.5 - Math.random()));
  }, [player, router]);

  const fetchLeaderboard = async () => {
    setLoadingLb(true);
    const { data } = await supabase
      .from("players")
      .select(`id, created_at, completed_at, last_seen, roll_number, access_keys(assigned_to)`)
      .eq("status", "completed")
      .order("completed_at", { ascending: true });

    if (data) {
      const formatted: LeaderboardEntry[] = data.map((p: any) => {
        const start = new Date(p.created_at).getTime();
        const end = p.completed_at ? new Date(p.completed_at).getTime() : new Date(p.updated_at || p.last_seen).getTime();
        const dur = Math.floor((end - start) / 1000);
        const m = Math.floor(dur / 60);
        const s = dur % 60;
        return {
          id: p.id,
          name: (Array.isArray(p.access_keys) ? p.access_keys[0]?.assigned_to : p.access_keys?.assigned_to) || "Unknown",
          rollNumber: p.roll_number || "—",
          time: `${m}:${s.toString().padStart(2, "0")}`,
          score: Math.max(0, 10000 - dur * 2),
          current: player?.sessionId === p.id,
        };
      });
      setLeaderboard(formatted.sort((a, b) => b.score - a.score));
    }
    setLoadingLb(false);
  };

  // --- Drag & Drop Handlers ---
  const handleDragStartWord = (word: string) => {
    setDragSource(word);
    setDragFromSlot(null);
  };
  const handleDragStartSlot = (idx: number) => {
    setDragSource(slots[idx]);
    setDragFromSlot(idx);
  };
  const handleDropOnSlot = (idx: number) => {
    if (!dragSource) return;
    const newSlots = [...slots];
    const newAvailable = [...availableWords];

    // If dragging FROM a slot, clear source slot
    if (dragFromSlot !== null) {
      newSlots[dragFromSlot] = "";
    } else {
      // Remove from available words
      const wi = newAvailable.indexOf(dragSource);
      if (wi !== -1) newAvailable.splice(wi, 1);
    }

    // If target slot already has a word, put it back to available
    if (newSlots[idx]) {
      if (dragFromSlot !== null) {
        newSlots[dragFromSlot] = newSlots[idx];
      } else {
        newAvailable.push(newSlots[idx]);
      }
    }

    newSlots[idx] = dragSource;
    setSlots(newSlots);
    setAvailableWords(newAvailable);
    setDragSource(null);
    setDragFromSlot(null);
  };
  const handleDropOnPool = () => {
    if (!dragSource || dragFromSlot === null) return;
    const newSlots = [...slots];
    newSlots[dragFromSlot] = "";
    setSlots(newSlots);
    setAvailableWords(prev => [...prev, dragSource!]);
    setDragSource(null);
    setDragFromSlot(null);
  };
  const removeFromSlot = (idx: number) => {
    if (!slots[idx]) return;
    setAvailableWords(prev => [...prev, slots[idx]]);
    const newSlots = [...slots];
    newSlots[idx] = "";
    setSlots(newSlots);
  };

  // --- Submit Handler ---
  const handleSubmit = async () => {
    if (slots.includes("")) return;
    if (JSON.stringify(slots) === JSON.stringify(CORRECT_ORDER)) {
      setSuccess(true);
      setError(false);
      
      // Stop the timer by updating status and completed_at in DB
      if (player?.sessionId) {
        await supabase.from("players").update({
          status: "completed",
          completed_at: new Date().toISOString()
        }).eq("id", player.sessionId);
      }

      await fetchLeaderboard();
    } else {
      const rem = attemptsLeft - 1;
      setAttemptsLeft(rem);
      setError(true);
      if (rem <= 0) {
        setErrorMsg("SEQUENCE CORRUPTED. TERMINAL ERASURE INITIATED.");
        setFailed(true);
        setTimeout(async () => {
          await erasePlayerData();
          router.push("/");
        }, 4000);
      } else {
        setErrorMsg(`INCORRECT SEQUENCE. ${rem} ATTEMPT${rem !== 1 ? "S" : ""} REMAINING.`);
        setTimeout(() => setError(false), 2500);
      }
    }
  };

  // --- FAILED SCREEN ---
  if (failed) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 gap-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
          <XCircle className="w-24 h-24 text-[#ff003c] mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl font-black text-[#ff003c] mb-4 tracking-widest">MISSION FAILED</h1>
          <p className="text-white/60 font-mono text-lg">{errorMsg}</p>
          <p className="text-white/30 font-mono text-sm mt-4 animate-pulse">Erasing operative credentials...</p>
        </motion.div>
      </div>
    );
  }

  // --- SUCCESS SCREEN ---
  if (success) {
    return (
      <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col mt-4 gap-6 p-4 pb-16">
        <Confetti />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8 border border-[#00ff00]/40 bg-[#001a00]/80 backdrop-blur-sm box-glow relative overflow-hidden rounded-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#00ff00]/5 to-transparent pointer-events-none" />
          <DatabaseBackup className="w-20 h-20 mx-auto mb-4 text-[#00ff00] animate-pulse drop-shadow-[0_0_20px_#00ff00]" />
          <h1 className="text-4xl md:text-6xl font-black text-[#00ff00] text-glow mb-2 tracking-tight">
            SERVER RESTORED
          </h1>
          <p className="text-lg text-[#00ffff] uppercase tracking-[0.3em] opacity-80">
            MASTER KEY RECONSTRUCTION SUCCESSFUL
          </p>
          <div className="mt-4 text-white/40 font-mono text-sm">
            <TerminalText text="GIET Global Server Infrastructure: PROTECTED. Threat eliminated." speed={30} />
          </div>
        </motion.div>

        {/* Player Performance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="border-2 border-[#00ffff]/40 bg-black/70 p-6 rounded-sm backdrop-blur-sm box-glow"
        >
          <h2 className="text-xs text-[#00ffff]/60 uppercase tracking-[0.4em] font-bold mb-4 flex items-center gap-2">
            <User className="w-3 h-3" /> Operative Performance Report
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 border border-white/10 p-4 rounded-sm text-center">
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Operative</div>
              <div className="text-base font-bold text-white truncate">{player?.id || "—"}</div>
            </div>
            <div className="bg-black/60 border border-white/10 p-4 rounded-sm text-center">
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Roll No.</div>
              <div className="text-base font-bold text-white font-mono">{player?.rollNumber || "—"}</div>
            </div>
            <div className="bg-black/60 border border-[#00ffff]/20 p-4 rounded-sm text-center">
              <div className="text-[10px] text-[#00ffff]/60 uppercase tracking-widest mb-1 flex items-center justify-center gap-1">
                <Clock className="w-3 h-3" /> Time
              </div>
              <div className="text-xl font-mono font-black text-[#00ffff]">
                {timeTakenMins}:{timeTakenSecsRem.toString().padStart(2, "0")}
              </div>
            </div>
            <div className="bg-black/60 border border-[#00ff00]/20 p-4 rounded-sm text-center">
              <div className="text-[10px] text-[#00ff00]/60 uppercase tracking-widest mb-1 flex items-center justify-center gap-1">
                <Star className="w-3 h-3" /> Score
              </div>
              <div className="text-xl font-mono font-black text-[#00ff00]">{score.toLocaleString()}</div>
            </div>
          </div>

          {/* Fragments collected */}
          <div className="mt-4">
            <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Shield className="w-3 h-3" /> Recovered Fragments
            </div>
            <div className="flex flex-wrap gap-2">
              {CORRECT_ORDER.map((frag, i) => (
                <div key={frag} className="flex items-center gap-2 px-3 py-1.5 border border-[#00ff00]/40 bg-[#00ff00]/5 rounded-sm">
                  <CheckCircle2 className="w-3 h-3 text-[#00ff00]" />
                  <span className="font-mono text-xs font-bold text-[#00ff00]">NODE_{i + 1}: {frag}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Live Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border border-[#00ff00]/30 bg-[#001100]/80 p-6 rounded-sm backdrop-blur-sm"
        >
          <h2 className="text-sm font-bold text-[#00ff00] uppercase tracking-[0.3em] mb-4 flex items-center gap-2 border-b border-[#00ff00]/20 pb-3">
            <Trophy className="w-4 h-4" /> Mission Debrief — Top Operatives
          </h2>

          {loadingLb ? (
            <div className="flex items-center justify-center py-12 gap-3 text-white/40">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-xs font-mono uppercase tracking-widest">Fetching rankings...</span>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {/* Column headers */}
              <div className="grid grid-cols-12 text-[10px] font-bold text-[#00ffff]/40 tracking-[0.2em] uppercase px-3 pb-2">
                <div className="col-span-1">Rank</div>
                <div className="col-span-5">Operative</div>
                <div className="col-span-3">Roll No.</div>
                <div className="col-span-2 text-center">Time</div>
                <div className="col-span-1 text-right">Score</div>
              </div>
              {leaderboard.slice(0, 10).map((entry, idx) => (
                <div
                  key={entry.id}
                  className={cn(
                    "grid grid-cols-12 items-center px-3 py-3 border transition-all",
                    entry.current
                      ? "border-[#00ffff] bg-[#00ffff]/10 shadow-[0_0_15px_rgba(0,255,255,0.15)]"
                      : "border-[#00ff00]/15 bg-black/30 hover:border-[#00ff00]/40"
                  )}
                >
                  <div className={cn("col-span-1 font-black text-lg", idx < 3 ? "text-[#ffd700]" : "text-white/20")}>
                    {idx + 1}
                  </div>
                  <div className="col-span-5">
                    <div className="font-bold text-sm uppercase truncate">{entry.name}</div>
                    {entry.current && <div className="text-[9px] text-[#00ffff] tracking-widest font-bold">◄ YOU</div>}
                  </div>
                  <div className="col-span-3 font-mono text-xs text-white/50">{entry.rollNumber}</div>
                  <div className="col-span-2 text-center font-mono text-sm text-[#00ffff]">{entry.time}</div>
                  <div className="col-span-1 text-right font-mono text-sm font-bold text-[#00ff00]">{entry.score.toLocaleString()}</div>
                </div>
              ))}
              {leaderboard.length === 0 && (
                <div className="text-center py-8 text-white/20 italic text-sm">No successful missions on record yet.</div>
              )}
            </div>
          )}
        </motion.div>

        <div className="flex justify-center pb-4">
          <GlowingButton
            onClick={() => { logout(); router.push("/"); }}
            className="px-16 py-4 text-lg font-black tracking-[0.2em]"
          >
            TERMINATE SESSION
          </GlowingButton>
        </div>
      </div>
    );
  }

  // --- MAIN PUZZLE SCREEN ---
  const allSlotsFilled = !slots.includes("");

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col mt-6 gap-6 p-4">
      {/* Header */}
      <div className="border border-[#00ffff]/30 bg-black/50 p-6 box-glow text-center rounded-sm">
        <div className="flex items-center justify-center gap-3 mb-3">
          <DatabaseBackup className="w-8 h-8 text-[#00ffff]" />
          <h2 className="text-2xl md:text-3xl font-black text-[#00ffff] text-glow uppercase tracking-tight">
            Master Key Reconstruction
          </h2>
        </div>
        <div className="opacity-70 text-sm">
          <TerminalText
            text="Arrange the recovered fragments in the correct architectural hierarchy: System → Data Representation → Processing → Memory → Rules."
            speed={25}
          />
        </div>

        {/* Attempts indicator */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Integrity Cycles</span>
          <div className="flex gap-1.5">
            {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-3 h-3 rounded-full border transition-all",
                  i < attemptsLeft
                    ? "bg-[#00ff00] border-[#00ff00] shadow-[0_0_6px_#00ff00]"
                    : "bg-transparent border-white/20"
                )}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-[#00ff00]">{attemptsLeft}/{MAX_ATTEMPTS}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* Available fragments pool */}
        <div
          className="border border-[#00ff00]/30 p-6 bg-[#001100]/80 rounded-sm flex flex-col gap-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropOnPool}
        >
          <h3 className="font-bold text-[#00ffff] uppercase tracking-[0.3em] text-xs border-b border-[#00ffff]/20 pb-2 flex items-center gap-2">
            <Zap className="w-3 h-3" /> Recovered Fragments
          </h3>
          <div className="flex flex-wrap gap-3 min-h-[80px]">
            {availableWords.map((word) => (
              <motion.div
                key={word}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                draggable
                onDragStart={() => handleDragStartWord(word)}
                className="px-5 py-3 bg-black border-2 border-[#00ff00] text-[#00ff00] font-mono text-lg font-black cursor-grab active:cursor-grabbing hover:bg-[#00ff00]/10 transition-all shadow-[0_0_8px_rgba(0,255,0,0.3)] select-none rounded-sm"
              >
                {word}
              </motion.div>
            ))}
            {availableWords.length === 0 && (
              <div className="opacity-30 text-sm italic py-4 w-full text-center">All fragments deployed to sequence</div>
            )}
          </div>
        </div>

        {/* Assembly slots */}
        <div className="border border-[#00ff00]/30 p-6 bg-[#001100]/80 flex flex-col gap-4 rounded-sm">
          <h3 className="font-bold text-[#00ffff] uppercase tracking-[0.3em] text-xs border-b border-[#00ffff]/20 pb-2 flex items-center gap-2">
            <Cpu className="w-3 h-3" /> Assembly Sequence
          </h3>

          <div className="flex flex-col gap-3">
            {slots.map((slot, index) => (
              <div
                key={index}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDropOnSlot(index)}
                className="flex items-center gap-3"
              >
                <div className="text-[10px] font-mono text-[#00ffff]/40 w-6 shrink-0">{SLOT_LABELS[index].num}</div>
                <div
                  draggable={!!slot}
                  onDragStart={() => slot && handleDragStartSlot(index)}
                  onClick={() => removeFromSlot(index)}
                  className={cn(
                    "flex-1 h-14 border-2 border-dashed flex items-center justify-between px-4 font-mono text-lg font-black transition-all rounded-sm",
                    slot
                      ? "border-[#00ff00] bg-[#00ff00]/10 text-[#00ff00] cursor-grab active:cursor-grabbing hover:bg-[#00ff00]/20"
                      : "border-[#00ff00]/25 text-[#00ff00]/25 bg-black/50 cursor-default"
                  )}
                >
                  <span>{slot || `DROP FRAGMENT HERE`}</span>
                  {slot && <span className="text-[10px] text-[#00ff00]/40 font-normal cursor-pointer hover:text-[#ff003c]">✕</span>}
                </div>
                <div className="text-[9px] text-white/20 uppercase tracking-wider w-20 text-right shrink-0">{SLOT_LABELS[index].hint}</div>
              </div>
            ))}
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-[#ff003c] font-bold p-3 bg-[#ff003c]/10 border border-[#ff003c] text-sm rounded-sm"
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <GlowingButton
            onClick={handleSubmit}
            disabled={!allSlotsFilled}
            className="w-full mt-2 py-4 text-lg font-black tracking-[0.2em]"
          >
            INITIATE RESTORATION
          </GlowingButton>
        </div>
      </div>
    </div>
  );
}
