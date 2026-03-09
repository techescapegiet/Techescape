"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { CheckCircle2, XCircle, Cpu, Zap, Search, ShieldCheck, Bug, Binary, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Stage = 1 | 2 | 3 | 4 | 5;

export function Level5() {
  const { completeLevel, handleMissionFailure } = useGame();

  const [stage, setStage] = useState<Stage>(1);
  const [attempts, setAttempts] = useState(3);
  const [success, setSuccess] = useState(false);
  const [errorFlash, setErrorFlash] = useState(false);
  const [answer, setAnswer] = useState("");

  // Data Pools for the Mashup (SIMPLIFIED)
  const L1_POOL = [
    { q: "BRAIN OF THE COMPUTER", a: "CPU", h: "Short for Central Processing Unit" },
    { q: "VOLATILE MEMORY", a: "RAM", h: "Random Access Memory" },
    { q: "8 BITS MAKE ONE...", a: "BYTE", h: "Unit larger than a bit" }
  ];
  const L2_POOL = [
    { h: "A function that calls itself", w: "RECURSION", hint: "R_C_RSION" },
    { h: "Checking code for errors", w: "DEBUG", hint: "D_B_G" },
    { h: "Step-by-step math steps", w: "ALGO", hint: "A_G_" }
  ];
  const L3_POOL = [
    { q: "Which data structure is LIFO?", o: ["Queue", "Stack"], c: 1, h: "Last In First Out" },
    { q: "Standard Database Language?", o: ["SQL", "HTML"], c: 0, h: "Structured Query Language" },
    { q: "Protocol for Websites?", o: ["HTTP", "FTP"], c: 0, h: "HyperText Transfer Protocol" }
  ];
  const L4_POOL = [
    { c: "int x = 10 / 0", e: "Arithmetic Error", a: "zero", h: "You cannot divide by this number" },
    { c: "print \"Hi\"", e: "Syntax Error", a: "(", h: "Python 3 needs parentheses" },
    { c: "if (x = 5)", e: "Logical Error", a: "==", h: "Use double equals for comparison" }
  ];

  const [currentL1, setCurrentL1] = useState<any>(null);
  const [currentL2, setCurrentL2] = useState<any>(null);
  const [currentL3, setCurrentL3] = useState<any>(null);
  const [currentL4, setCurrentL4] = useState<any>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setCurrentL1(L1_POOL[Math.floor(Math.random() * L1_POOL.length)]);
    setCurrentL2(L2_POOL[Math.floor(Math.random() * L2_POOL.length)]);
    setCurrentL3(L3_POOL[Math.floor(Math.random() * L3_POOL.length)]);
    setCurrentL4(L4_POOL[Math.floor(Math.random() * L4_POOL.length)]);
  }, []);

  const handleStageSuccess = () => {
    if (stage < 5) {
      setStage((stage + 1) as Stage);
      setAnswer("");
      setErrorFlash(false);
      setShowHint(false);
    } else {
      setSuccess(true);
      setTimeout(() => completeLevel("SYSTEM"), 3000);
    }
  };

  const handleStageFailure = () => {
    const remaining = attempts - 1;
    setAttempts(remaining);
    setErrorFlash(true);
    if (remaining <= 0) {
      handleMissionFailure("HYPER-MASHUP OVERLOAD: SYSTEM PURGE INITIATED");
    } else {
      setTimeout(() => setErrorFlash(false), 1500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const a = answer.toUpperCase().trim();

    if (stage === 1) {
      if (a === currentL1.a) handleStageSuccess();
      else handleStageFailure();
    } else if (stage === 2) {
      if (a === currentL2.w) handleStageSuccess();
      else handleStageFailure();
    } else if (stage === 4) {
      if (answer.toLowerCase().includes(currentL4.a.toLowerCase())) handleStageSuccess();
      else handleStageFailure();
    } else if (stage === 5) {
      if (a === "SYSTEM") handleStageSuccess();
      else handleStageFailure();
    }
  };

  const handleMCQSelect = (idx: number) => {
    if (idx === currentL3.c) handleStageSuccess();
    else handleStageFailure();
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-12 mt-12 border-2 border-[#00ff00] bg-[#002200]/50 box-glow text-center">
        <CheckCircle2 className="w-24 h-24 text-[#00ff00] mb-6 animate-pulse" />
        <h2 className="text-4xl font-bold text-[#00ff00] text-glow mb-4">ULTIMATE BYPASS COMPLETE</h2>
        <p className="text-xl mb-6 text-white">FINAL CODE WORD RECOVERED:</p>
        <div className="text-5xl font-mono font-bold text-[#00ffff] tracking-widest bg-black p-6 border border-[#00ffff]">
          <TerminalText text="SYSTEM" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full mt-6 gap-4 max-w-4xl mx-auto w-full">
      {/* Header Info */}
      <div className="border border-[#ff003c]/30 bg-black/60 p-4 box-glow flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#ff003c] font-bold uppercase tracking-widest">Gauntlet Mode</span>
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#00ffff] animate-pulse" />
              STAGE {stage}<span className="text-white/20">/</span>5
            </div>
          </div>
          <div className="h-10 w-[1px] bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[10px] text-[#ff003c] font-bold uppercase tracking-widest">Integrity</span>
            <div className={cn("text-2xl font-mono font-bold", attempts === 1 ? "text-[#ff003c] animate-pulse" : "text-[#00ff9f]")}>
              {attempts} LIVES
            </div>
          </div>
        </div>
        <div className="text-right">
          <Cpu className="w-8 h-8 text-[#ff003c] ml-auto mb-1 opacity-50" />
          <span className="text-[10px] text-white/40 font-mono">NODE_5_MASHUP</span>
        </div>
      </div>

      {/* Dynamic Stage UI */}
      <div className={cn("flex-1 border-2 p-8 box-glow min-h-[400px] flex flex-col justify-center transition-all duration-300",
        errorFlash ? "border-[#ff003c] bg-[#220000]/50" : "border-[#00ffff]/40 bg-black/40")}>

        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full"
          >
            {!currentL1 || !currentL2 || !currentL3 || !currentL4 ? (
              <div className="flex items-center justify-center p-12">
                <Cpu className="w-12 h-12 text-[#00ffff] animate-spin" />
              </div>
            ) : (
              <>
                {stage === 1 && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-[#00ff9f]/20 pb-2">
                      <div className="flex items-center gap-3 text-[#00ff9f]">
                        <Search className="w-5 h-5" />
                        <h3 className="uppercase tracking-[0.3em] font-bold">Level 1: Encryption Query</h3>
                      </div>
                      <button onClick={() => setShowHint(true)} className="text-[10px] text-[#00ff9f] hover:underline uppercase font-bold flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" /> Get Hint
                      </button>
                    </div>
                    <p className="text-3xl font-bold text-white text-center italic">"{currentL1.q}"</p>
                    {showHint && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 border border-[#00ff9f]/30 bg-[#00ff9f]/5 text-[#00ff9f] font-mono text-xs italic text-center">
                        &gt; ADVISORY: {currentL1.h}
                      </motion.div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        autoFocus
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full bg-black border-2 border-[#00ff9f]/40 p-4 text-[#00ff9f] text-center font-mono text-3xl uppercase tracking-widest focus:outline-none focus:border-[#00ff9f] box-glow"
                        placeholder="ANSWER_"
                      />
                      <GlowingButton type="submit" className="w-full py-4 text-xl">VALIDATE FRAGMENT</GlowingButton>
                    </form>
                  </div>
                )}

                {stage === 2 && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-[#00ffff]/20 pb-2">
                      <div className="flex items-center gap-3 text-[#00ffff]">
                        <Binary className="w-5 h-5" />
                        <h3 className="uppercase tracking-[0.3em] font-bold">Level 2: Semantic Recovery</h3>
                      </div>
                      <button onClick={() => setShowHint(true)} className="text-[10px] text-[#00ffff] hover:underline uppercase font-bold flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" /> Get Hint
                      </button>
                    </div>
                    <div className="p-6 bg-[#001122] border border-[#00ffff]/30">
                      <p className="text-xs text-[#00ffff]/60 uppercase mb-2 font-mono">DEFINITION_LEAK:</p>
                      <p className="text-2xl font-bold text-white leading-relaxed">"{currentL2.h}"</p>
                    </div>
                    {showHint && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 border border-[#00ffff]/30 bg-[#00ffff]/5 text-[#00ffff] font-mono text-sm tracking-[0.5em] text-center font-bold">
                        &gt; PARTIAL_RECOVERY: {currentL2.hint}
                      </motion.div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="flex justify-center gap-2">
                        {currentL2.w.split("").map((char: string, i: number) => (
                          <div key={i} className="w-10 h-12 border-2 border-[#00ffff]/30 bg-black flex items-center justify-center font-mono text-2xl text-[#00ffff]">
                            {answer[i]?.toUpperCase() || "_"}
                          </div>
                        ))}
                      </div>
                      <input
                        autoFocus
                        type="text"
                        value={answer}
                        maxLength={currentL2.w.length}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="opacity-0 absolute"
                      />
                      <GlowingButton type="submit" variant="cyan" className="w-full py-4 text-xl mt-4">RECONSTRUCT SYNTAX</GlowingButton>
                    </form>
                  </div>
                )}

                {stage === 3 && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-[#00ff00]/20 pb-2">
                      <div className="flex items-center gap-3 text-[#00ff00]">
                        <ShieldCheck className="w-5 h-5" />
                        <h3 className="uppercase tracking-[0.3em] font-bold">Level 3: Protocol Knowledge</h3>
                      </div>
                      <button onClick={() => setShowHint(true)} className="text-[10px] text-[#00ff00] hover:underline uppercase font-bold flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" /> Get Hint
                      </button>
                    </div>
                    <p className="text-2xl font-bold text-white text-center leading-relaxed">"{currentL3.q}"</p>
                    {showHint && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 border border-[#00ff00]/30 bg-[#00ff00]/5 text-[#00ff00] font-mono text-xs italic text-center">
                        &gt; ADVISORY: {currentL3.h}
                      </motion.div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentL3.o.map((opt: string, i: number) => (
                        <button
                          key={i}
                          onClick={() => handleMCQSelect(i)}
                          className="p-4 border-2 border-[#00ff00]/20 bg-black/40 hover:border-[#00ff00] hover:bg-[#00ff00]/10 text-left font-mono transition-all text-[#00ff00]"
                        >
                          <span className="opacity-40 mr-3">[{String.fromCharCode(65 + i)}]</span> {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {stage === 4 && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-[#ff003c]/20 pb-2">
                      <div className="flex items-center gap-3 text-[#ff003c]">
                        <Bug className="w-5 h-5" />
                        <h3 className="uppercase tracking-[0.3em] font-bold">Level 4: Critical Patching</h3>
                      </div>
                      <button onClick={() => setShowHint(true)} className="text-[10px] text-[#ff003c] hover:underline uppercase font-bold flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" /> Get Hint
                      </button>
                    </div>
                    <div className="font-mono text-sm p-4 bg-[#110000] border border-[#ff003c]/40 text-[#ffaaaa]">
                      {currentL4.c}
                      <div className="mt-4 text-[#ff003c] text-[10px] animate-pulse uppercase">
                        &gt; RUNTIME_ERR: {currentL4.e}
                      </div>
                    </div>
                    {showHint && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 border border-[#ff003c]/30 bg-[#ff003c]/5 text-[#ff003c] font-mono text-xs italic text-center">
                        &gt; ADVISORY: {currentL4.h}
                      </motion.div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        autoFocus
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full bg-black border-2 border-[#ff003c]/40 p-4 text-[#ff003c] font-mono text-xl focus:outline-none focus:border-[#ff003c] box-glow"
                        placeholder="Enter patch keyword..."
                      />
                      <GlowingButton type="submit" variant="danger" className="w-full py-4 uppercase">APPLY_HOTFIX</GlowingButton>
                    </form>
                  </div>
                )}

                {stage === 5 && (
                  <div className="space-y-8 text-center">
                    <div className="flex items-center justify-between border-b border-[#00ffff]/20 pb-2 mb-8">
                      <h3 className="uppercase tracking-[0.5em] font-bold text-2xl lg:text-3xl text-glow text-[#00ffff]">FINAL BYPASS KEY</h3>
                      <button onClick={() => setShowHint(true)} className="text-[10px] text-[#00ffff] hover:underline uppercase font-bold flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" /> Get Hint
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 blur-3xl bg-[#00ffff]/10 animate-pulse" />
                      <p className="text-sm opacity-50 font-mono uppercase mb-8 tracking-widest">Invert the logic to find the exit path.</p>
                      <div className="bg-black/80 border-2 border-[#00ffff] p-12 box-glow-cyan relative z-10">
                        <span className="text-6xl font-black tracking-[0.5em] text-white opacity-20 select-none">SYST_M</span>
                      </div>
                    </div>
                    {showHint && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 border border-[#00ffff]/30 bg-[#00ffff]/5 text-[#00ffff] font-mono text-xs italic">
                        &gt; FINAL ADVISORY: The missing character is 'E'. Type the full word.
                      </motion.div>
                    )}
                    <form onSubmit={handleSubmit} className="mt-12 space-y-4">
                      <input
                        autoFocus
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full bg-black border-2 border-[#00ffff] p-6 text-[#00ffff] text-center font-mono text-4xl uppercase tracking-[0.4em] focus:outline-none box-glow-cyan"
                        placeholder="???????"
                      />
                      <GlowingButton type="submit" variant="cyan" className="w-full py-6 text-2xl font-black tracking-widest uppercase">TERMINATE GHOST CONNECTION</GlowingButton>
                    </form>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="text-center font-mono text-[10px] opacity-40 uppercase tracking-[0.2em] flex items-center justify-center gap-4">
        <span>Sub-Node Sync: Active</span>
        <div className="w-1 h-1 bg-white/20 rounded-full" />
        <span>Failure Penalty: Terminal Erasure</span>
      </div>
    </div>
  );
}
