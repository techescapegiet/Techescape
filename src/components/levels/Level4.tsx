"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { CheckCircle2, XCircle, Bug, Clock, LifeBuoy, Code2, Play, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { getDebuggingChallenge, CodeChallenge, AcademicYear, Department } from "@/lib/questionBank";

function normalize(code: string): string {
  return code.replace(/\r\n/g, "\n").replace(/\t/g, "    ").trim();
}

export function Level4() {
  const { completeLevel, handleMissionFailure, player } = useGame();

  const [currentChallenge, setCurrentChallenge] = useState<CodeChallenge | null>(null);
  const [userCode, setUserCode] = useState("");
  const [compileResult, setCompileResult] = useState<"idle" | "success" | "error">("idle");
  const [compileMsg, setCompileMsg] = useState("");
  const [attempts, setAttempts] = useState(3);
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60s for 1 question
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (player?.academicYear && player?.department) {
      const challenge = getDebuggingChallenge(player.academicYear as AcademicYear, player.department as Department);
      setCurrentChallenge(challenge);
      setUserCode(challenge.initialCode);
    }
  }, [player]);

  useEffect(() => {
    if (!currentChallenge || success) return;
    if (timeLeft <= 0) {
      handleMissionFailure("TIME EXPIRED: SECURITY NODE 4 LOCKED");
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentChallenge, success, handleMissionFailure]);

  const handleCompile = () => {
    if (!currentChallenge) return;
    const userNorm = normalize(userCode);

    const isCorrect = Array.isArray(currentChallenge.expectedSolutionSnippet)
      ? currentChallenge.expectedSolutionSnippet.some(s => userNorm.includes(normalize(s)))
      : userNorm.includes(normalize(currentChallenge.expectedSolutionSnippet as string));

    if (isCorrect) {
      setCompileResult("success");
      setCompileMsg("✓ Compilation successful. All tests passed.");
      setSuccess(true);
      setTimeout(() => completeLevel("STACK"), 2000);
    } else {
      const remaining = attempts - 1;
      setAttempts(remaining);
      setCompileResult("error");
      setCompileMsg(`✗ Compilation failed. Syntax or logic error detected.`);
      if (remaining <= 0) {
        setTimeout(() => handleMissionFailure("PATCH CRITICALLY REJECTED: SYSTEM LOCKDOWN"), 1000);
      } else {
        setTimeout(() => setCompileResult("idle"), 2000);
      }
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-8 md:p-12 mt-8 md:mt-12 border border-[#00ff00] bg-[#002200]/50 box-glow text-center rounded-lg">
        <CheckCircle2 className="w-16 h-16 md:w-24 md:h-24 text-[#00ff00] mb-4 md:mb-6 animate-pulse" />
        <h2 className="text-2xl md:text-4xl font-bold text-[#00ff00] text-glow mb-4">ALL BUGS RESOLVED</h2>
        <div className="text-3xl md:text-5xl font-mono font-bold text-[#00ffff] tracking-widest bg-black p-4 md:p-6 border border-[#00ffff]">
          STACK
        </div>
      </div>
    );
  }

  if (!currentChallenge) return null;

  return (
    <div className="flex flex-col h-full mt-4 md:mt-6 gap-3 md:gap-4 w-full max-w-6xl mx-auto">
      {/* Top Bar */}
      <div className="border-2 border-[#00ffff]/20 bg-black/60 p-3 md:p-4 box-glow flex flex-wrap items-center justify-between gap-2 rounded-sm">
        <div className="flex items-center gap-4 md:gap-8">
          <div>
            <div className="text-[10px] text-[#00ffff]/50 uppercase font-mono mb-1">Bug</div>
            <div className="text-lg md:text-xl font-bold flex items-center gap-2">
              <Bug className="w-4 h-4 md:w-5 md:h-5 text-[#ff003c]" />
              <span className="text-[#00ffff]">1</span>
              <span className="text-white/20">/</span>
              <span className="text-white/40">1</span>
            </div>
          </div>

          <div className={cn("px-3 md:px-4 border-l border-white/10", timeLeft < 30 && "animate-pulse")}>
            <div className="text-[10px] text-[#00ffff]/50 uppercase font-mono mb-1">Timer</div>
            <div className={cn("text-lg md:text-xl font-mono font-bold", timeLeft < 30 ? "text-[#ff003c]" : "text-[#00ff9f]")}>
              {timeLeft}s
            </div>
          </div>

          <div className="px-3 md:px-4 border-l border-white/10">
            <div className="text-[10px] text-[#00ffff]/50 uppercase font-mono mb-1">Lives</div>
            <div className="flex gap-1 mt-1">
              {[...Array(3)].map((_, i) => (
                <LifeBuoy key={i} className={cn("w-4 h-4", i < attempts ? "text-[#00ff9f]" : "text-white/10")} />
              ))}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-[#00ffff]/50 uppercase font-mono">Mode</div>
          <div className="text-sm font-mono text-white uppercase tracking-widest font-bold">{currentChallenge.language}</div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 md:gap-4 flex-1 min-h-0">
        {/* Code Editor (3/5) */}
        <div className="lg:col-span-3 border-2 border-[#ff003c]/30 bg-[#0a0a0a] flex flex-col rounded-sm overflow-hidden">
          {/* Editor Toolbar */}
          <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-[#1a1a1a] border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff003c]" />
              <div className="w-3 h-3 rounded-full bg-[#ffaa00]" />
              <div className="w-3 h-3 rounded-full bg-[#00ff00]" />
              <span className="ml-3 text-[10px] text-white/30 font-mono uppercase">main.{currentChallenge.language.toLowerCase() === "python" ? "py" : currentChallenge.language.toLowerCase() === "java" ? "java" : "c"}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHint(true)}
                className="text-[10px] text-[#00ffff] hover:underline uppercase font-bold flex items-center gap-1 cursor-pointer"
              >
                <Lightbulb className="w-3 h-3" /> Hint
              </button>
            </div>
          </div>

          {/* Line numbers + editable code */}
          <div className="flex-1 flex overflow-auto">
            <div className="bg-[#111] text-white/20 font-mono text-xs md:text-sm py-3 px-2 md:px-3 select-none text-right border-r border-white/5 leading-relaxed whitespace-pre">
              {userCode.split("\n").map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              spellCheck={false}
              className="flex-1 bg-transparent text-[#e0e0e0] font-mono text-xs md:text-sm p-3 resize-none focus:outline-none leading-relaxed whitespace-pre overflow-auto"
              style={{ tabSize: 4 }}
            />
          </div>
        </div>

        {/* Right Panel: Console & Info (2/5) */}
        <div className="lg:col-span-2 flex flex-col gap-3 md:gap-4">
          {/* Task Info */}
          <div className="border border-[#00ffff]/20 bg-black/40 p-3 md:p-4 rounded-sm">
            <h3 className="text-[10px] text-[#00ffff]/50 uppercase tracking-widest font-bold mb-2">OBJECTIVE ({currentChallenge.title})</h3>
            <p className="text-sm md:text-base font-bold text-white">Fix the broken code to pass the checks.</p>
          </div>

          {/* Error / Console Output */}
          <div className="border border-[#ff003c]/30 bg-[#110000] p-3 md:p-4 rounded-sm flex-1 flex flex-col min-h-[120px]">
            <h3 className="text-[10px] text-[#ff003c]/60 uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
              <Bug className="w-3 h-3" /> CONSOLE OUTPUT
            </h3>
            <div className="font-mono text-xs text-[#ff6b6b] whitespace-pre-wrap flex-1">
              <span className="text-white/30">&gt; </span>{"Compilation/Logic Error."}
            </div>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 pt-3 border-t border-[#00ffff]/20 text-[#00ffff] font-mono text-xs italic"
              >
                💡 {currentChallenge.errorHint}
              </motion.div>
            )}
          </div>

          {/* Compile Result */}
          <AnimatePresence>
            {compileResult !== "idle" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "border p-3 md:p-4 font-mono text-xs md:text-sm rounded-sm",
                  compileResult === "success"
                    ? "border-[#00ff00]/50 bg-[#002200] text-[#00ff00]"
                    : "border-[#ff003c]/50 bg-[#220000] text-[#ff003c] animate-shake"
                )}
              >
                {compileMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compile Button */}
          <GlowingButton
            onClick={handleCompile}
            className="w-full py-3 md:py-4 uppercase tracking-[0.3em] font-black text-base md:text-lg flex items-center justify-center gap-2"
            disabled={compileResult === "success"}
          >
            <Play className="w-4 h-4 md:w-5 md:h-5" /> COMPILE & RUN
          </GlowingButton>
        </div>
      </div>
    </div>
  );
}
