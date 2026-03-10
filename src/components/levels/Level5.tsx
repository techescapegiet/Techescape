"use client";

import { useState, useEffect, useRef } from "react";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { CheckCircle2, Cpu, Zap, Search, ShieldCheck, Bug, Binary, Lightbulb, Keyboard, LayoutGrid, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Data Pools
const S1_POOL = [
  { answer: "BYTE", question: "8 BITS MAKE ONE...", hint: "Unit larger than a bit" },
  { answer: "CPU", question: "BRAIN OF THE COMPUTER", hint: "Central Processing Unit" },
  { answer: "RAM", question: "VOLATILE MEMORY", hint: "Random Access Memory" }
];

const S2_POOL = [
  { word: "DEBUG", hint: "Checking code for errors" },
  { word: "ALGO", hint: "Step-by-step math steps" },
  { word: "ARRAY", hint: "Contiguous memory block for items" }
];

const S3_POOL = [
  { question: "Which data structure is LIFO?", options: ["Queue", "Stack", "Heap", "Tree"], correct: 1, hint: "Last In First Out" },
  { question: "Standard Database Language?", options: ["Java", "HTML", "SQL", "C++"], correct: 2, hint: "Structured Query Language" },
  { question: "Protocol for secure Websites?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], correct: 2, hint: "S stands for Secure" }
];

const S4_POOL = [
  {
    brokenCode: `def greet():\n    print("Hello")\n\ngreet`,
    fixedCode: `def greet():\n    print("Hello")\n\ngreet()`,
    error: "Function not called",
    hint: "Add parentheses to call the function.",
    description: "Fix the function call",
    lang: "python"
  },
  {
    brokenCode: `int x = 5\nprintf("%d", x);`,
    fixedCode: `int x = 5;\nprintf("%d", x);`,
    error: "';' expected",
    hint: "Missing semicolon.",
    description: "Fix the syntax error",
    lang: "c"
  },
  {
    brokenCode: `String s = "Hi"\nSystem.out.println(s);`,
    fixedCode: `String s = "Hi";\nSystem.out.println(s);`,
    error: "';' expected",
    hint: "Missing semicolon.",
    description: "Fix the syntax error",
    lang: "java"
  }
];

function normalize(code: string): string {
  return code.replace(/\r\n/g, "\n").replace(/\t/g, "    ").trim();
}

export function Level5() {
  const { completeLevel, handleMissionFailure } = useGame();

  const [stage, setStage] = useState<number>(1);
  const [attempts, setAttempts] = useState(3);
  const [success, setSuccess] = useState(false);
  const [errorFlash, setErrorFlash] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Stage 1 (Crossword)
  const [s1Data, setS1Data] = useState<any>(null);
  const [grid, setGrid] = useState<string[][]>([]);
  const [selectedCells, setSelectedCells] = useState<{ r: number, c: number }[]>([]);

  // Stage 2 (Blanks)
  const [s2Data, setS2Data] = useState<any>(null);
  const [blanks, setBlanks] = useState<string[]>([]);
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const s2InputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Stage 3 (MCQ)
  const [s3Data, setS3Data] = useState<any>(null);

  // Stage 4 (Debug)
  const [s4Data, setS4Data] = useState<any>(null);
  const [userCode, setUserCode] = useState("");
  const [compileResult, setCompileResult] = useState<"idle" | "success" | "error">("idle");
  const [compileMsg, setCompileMsg] = useState("");

  useEffect(() => {
    // Init all stages data
    const d1 = S1_POOL[Math.floor(Math.random() * S1_POOL.length)];
    const d2 = S2_POOL[Math.floor(Math.random() * S2_POOL.length)];
    const d3 = S3_POOL[Math.floor(Math.random() * S3_POOL.length)];
    const d4 = S4_POOL[Math.floor(Math.random() * S4_POOL.length)];

    setS1Data(d1); setS2Data(d2); setS3Data(d3); setS4Data(d4);
    setUserCode(d4.brokenCode);

    // Build grid for S1 (6x6)
    const newGrid: string[][] = Array(6).fill(null).map(() => Array(6).fill(""));
    const word = d1.answer;
    let placed = false;
    let limit = 0;
    while (!placed && limit < 150) {
      limit++;
      const dir = [[0, 1], [1, 0], [1, 1], [0, -1], [-1, 0], [-1, -1]][Math.floor(Math.random() * 6)];
      const r = Math.floor(Math.random() * 6);
      const c = Math.floor(Math.random() * 6);
      const er = r + (word.length - 1) * dir[0];
      const ec = c + (word.length - 1) * dir[1];
      if (er >= 0 && er < 6 && ec >= 0 && ec < 6) {
        let ok = true;
        for (let i = 0; i < word.length; i++) {
          if (newGrid[r + i * dir[0]][c + i * dir[1]] !== "") { ok = false; break; }
        }
        if (ok) {
          for (let i = 0; i < word.length; i++) newGrid[r + i * dir[0]][c + i * dir[1]] = word[i];
          placed = true;
        }
      }
    }
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        if (newGrid[r][c] === "") newGrid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
    setGrid(newGrid);

    // Build blanks for S2
    const len = d2.word.length;
    const numReveal = Math.max(1, Math.floor(len * 0.4));
    const rev: number[] = [];
    while (rev.length < numReveal) {
      const ri = Math.floor(Math.random() * len);
      if (!rev.includes(ri)) rev.push(ri);
    }
    setRevealedIndices(rev);
    setBlanks(d2.word.split("").map((ch, i) => rev.includes(i) ? ch : ""));
  }, []);

  const handleStageSuccess = () => {
    if (stage < 4) {
      setStage(stage + 1);
      setShowHint(false);
      setErrorFlash(false);
    } else {
      setSuccess(true);
      setTimeout(() => completeLevel("SYSTEM"), 3000);
    }
  };

  const handleStageFailure = (msg?: string) => {
    const rem = attempts - 1;
    setAttempts(rem);
    setErrorFlash(true);
    if (rem <= 0) {
      setTimeout(() => handleMissionFailure("HYPER-MASHUP OVERLOAD: SYSTEM PURGE"), 1000);
    } else {
      setTimeout(() => setErrorFlash(false), 1000);
    }
  };

  // S1 logic
  const handleCellClick = (r: number, c: number) => {
    if (stage !== 1) return;

    // Toggle logic
    const idx = selectedCells.findIndex(cell => cell.r === r && cell.c === c);
    let newSel;
    if (idx >= 0) {
      newSel = selectedCells.slice(0, idx);
    } else {
      newSel = [...selectedCells, { r, c }];
    }
    setSelectedCells(newSel);

    const spelled = newSel.map(cell => grid[cell.r][cell.c]).join("");
    if (spelled === s1Data.answer) {
      handleStageSuccess();
    } else if (spelled.length >= s1Data.answer.length || !s1Data.answer.startsWith(spelled)) {
      handleStageFailure();
      setSelectedCells([]);
    }
  };

  // S2 logic
  const handleS2Input = (index: number, value: string) => {
    if (stage !== 2 || revealedIndices.includes(index)) return;
    const char = value.toUpperCase().slice(-1);
    const nb = [...blanks];
    nb[index] = char;
    setBlanks(nb);
    setErrorFlash(false);

    if (char !== "") {
      const nextEmpty = nb.findIndex((b, i) => b === "" && i > index);
      if (nextEmpty !== -1) s2InputRefs.current[nextEmpty]?.focus();
      else {
        const first = nb.findIndex(b => b === "");
        if (first !== -1) s2InputRefs.current[first]?.focus();
      }
    }

    if (nb.every(b => b !== "")) {
      if (nb.join("") === s2Data.word) {
        handleStageSuccess();
      } else {
        handleStageFailure();
      }
    }
  };

  const handleS2KeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && blanks[index] === "") {
      const prev = [...blanks].reverse().findIndex((b, i) =>
        !revealedIndices.includes(blanks.length - 1 - i) && (blanks.length - 1 - i) < index
      );
      if (prev !== -1) {
        s2InputRefs.current[blanks.length - 1 - prev]?.focus();
      }
    }
  };

  // S3 logic
  const handleS3Select = (idx: number) => {
    if (idx === s3Data.correct) handleStageSuccess();
    else handleStageFailure();
  };

  // S4 logic
  const handleS4Compile = () => {
    const u = normalize(userCode);
    const f = normalize(s4Data.fixedCode);
    if (u === f) {
      setCompileResult("success");
      setCompileMsg("✓ Compilation success.");
      setTimeout(() => handleStageSuccess(), 1000);
    } else {
      setCompileResult("error");
      setCompileMsg(`✗ Compilation failed. ${s4Data.error}`);
      handleStageFailure();
      setTimeout(() => setCompileResult("idle"), 2000);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-12 mt-12 border-2 border-[#00ff00] bg-[#002200]/50 box-glow text-center rounded-lg">
        <CheckCircle2 className="w-24 h-24 text-[#00ff00] mb-6 animate-pulse" />
        <h2 className="text-4xl font-bold text-[#00ff00] text-glow mb-4">ULTIMATE GAUNTLET COMPLETE</h2>
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
      <div className="border border-[#ff003c]/30 bg-black/60 p-4 box-glow flex items-center justify-between rounded-sm">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#ff003c] font-bold uppercase tracking-widest">Gauntlet Mode</span>
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#00ffff] animate-pulse" />
              STAGE {stage}<span className="text-white/20">/</span>4
            </div>
          </div>
          <div className="h-10 w-[1px] bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[10px] text-[#ff003c] font-bold uppercase tracking-widest">Integrity</span>
            <div className={cn("text-2xl font-mono font-bold flex gap-1", attempts === 1 ? "text-[#ff003c] animate-pulse" : "text-[#00ff9f]")}>
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
      <div className={cn("flex-1 border-2 p-6 md:p-8 box-glow min-h-[400px] flex flex-col justify-center transition-all duration-300 rounded-sm",
        errorFlash ? "border-[#ff003c] bg-[#220000]/50" : "border-[#00ffff]/40 bg-black/40")}>

        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full flex justify-center items-center"
          >
            {!s1Data || !s2Data || !s3Data || !s4Data ? (
              <Cpu className="w-12 h-12 text-[#00ffff] animate-spin" />
            ) : (
              <div className="w-full max-w-2xl">

                {/* STAGE 1: CROSSWORD */}
                {stage === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#00ff9f]/20 pb-2">
                      <div className="flex items-center gap-3 text-[#00ff9f]">
                        <Search className="w-5 h-5" />
                        <h3 className="uppercase tracking-[0.2em] font-bold">Level 1: Encryption Query</h3>
                      </div>
                      <button onClick={() => setShowHint(true)} className="text-[10px] text-[#00ff9f] hover:underline uppercase font-bold flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" /> Get Hint
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-xl md:text-2xl font-bold text-white italic">"{s1Data.question}"</p>
                      {showHint && (
                        <div className="mt-2 text-sm text-[#00ff9f] font-mono italic animate-pulse">
                          💡 Hint: {s1Data.hint}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center">
                      <div className="grid grid-cols-6 gap-1 bg-black/80 p-2 border border-[#00ff9f]/40 box-glow rounded-sm w-fit">
                        {grid.map((row, r) => (
                          row.map((char, c) => {
                            const selected = selectedCells.some(cell => cell.r === r && cell.c === c);
                            return (
                              <button
                                key={`${r}-${c}`}
                                onClick={() => handleCellClick(r, c)}
                                className={cn(
                                  "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-mono text-xl font-black border transition-colors",
                                  selected
                                    ? "bg-[#00ffff] text-black border-[#00ffff] shadow-[0_0_10px_#00ffff]"
                                    : "bg-[#051105] text-[#00ff00] border-[#00ff00]/20 hover:border-[#00ffff] hover:text-[#00ffff]"
                                )}
                              >
                                {char}
                              </button>
                            );
                          })
                        ))}
                      </div>
                    </div>

                    <div className="text-center mt-4 h-12 flex items-center justify-center">
                      {selectedCells.length > 0 && (
                        <div className="text-2xl font-mono font-bold tracking-[0.5em] text-[#00ffff] uppercase bg-black px-4 py-2 border border-[#00ffff]/30">
                          {selectedCells.map(cell => grid[cell.r][cell.c]).join("")}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STAGE 2: BLANKS */}
                {stage === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#00ffff]/20 pb-2">
                      <div className="flex items-center gap-3 text-[#00ffff]">
                        <Binary className="w-5 h-5" />
                        <h3 className="uppercase tracking-[0.2em] font-bold">Level 2: Semantic Recovery</h3>
                      </div>
                      <button onClick={() => setShowHint(true)} className="text-[10px] text-[#00ffff] hover:underline uppercase font-bold flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" /> Get Hint
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-xl md:text-2xl font-bold text-white italic">"{s2Data.hint}"</p>
                      {showHint && (
                        <div className="mt-2 text-sm text-[#00ffff] font-mono italic animate-pulse">
                          💡 Word Length: {s2Data.word.length} letters
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 py-8">
                      {blanks.map((char, index) => {
                        const isRevealed = revealedIndices.includes(index);
                        return (
                          <input
                            key={index}
                            ref={el => { s2InputRefs.current[index] = el; }}
                            type="text"
                            maxLength={1}
                            value={char}
                            readOnly={isRevealed}
                            onChange={(e) => handleS2Input(index, e.target.value)}
                            onKeyDown={(e) => handleS2KeyDown(index, e)}
                            className={cn(
                              "w-12 h-16 md:w-16 md:h-20 text-center text-3xl font-mono font-black border-b-4 focus:outline-none transition-all uppercase",
                              isRevealed
                                ? "bg-transparent border-[#00ff00]/50 text-[#00ff00] cursor-not-allowed"
                                : "bg-[#002244]/50 border-[#00ffff] text-white focus:bg-[#00ffff]/10 focus:border-white focus:shadow-[0_4px_15px_#00ffff]"
                            )}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STAGE 3: MCQ */}
                {stage === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#00ff00]/20 pb-2">
                      <div className="flex items-center gap-3 text-[#00ff00]">
                        <ShieldCheck className="w-5 h-5" />
                        <h3 className="uppercase tracking-[0.2em] font-bold">Level 3: Protocol Knowledge</h3>
                      </div>
                      <button onClick={() => setShowHint(true)} className="text-[10px] text-[#00ff00] hover:underline uppercase font-bold flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" /> Get Hint
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-xl md:text-2xl font-bold text-white mb-6">"{s3Data.question}"</p>
                      {showHint && (
                        <div className="mb-6 mx-auto w-fit p-2 border border-[#00ff00]/30 bg-[#00ff00]/5 text-[#00ff00] font-mono text-sm italic">
                          💡 Hint: {s3Data.hint}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {s3Data.options.map((opt: string, i: number) => (
                        <button
                          key={i}
                          onClick={() => handleS3Select(i)}
                          className="p-4 border-2 border-[#00ff00]/20 bg-black/40 hover:border-[#00ff00] hover:bg-[#00ff00]/10 text-left font-mono transition-all text-[#00ff00]"
                        >
                          <span className="opacity-40 mr-3">[{String.fromCharCode(65 + i)}]</span> {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STAGE 4: DEBUG CONSOLE */}
                {stage === 4 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#ff003c]/20 pb-2">
                      <div className="flex items-center gap-3 text-[#ff003c]">
                        <Bug className="w-5 h-5" />
                        <h3 className="uppercase tracking-[0.2em] font-bold">Level 4: Critical Patching</h3>
                      </div>
                      <button onClick={() => setShowHint(true)} className="text-[10px] text-[#ff003c] hover:underline uppercase font-bold flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" /> Get Hint
                      </button>
                    </div>

                    <div className="border border-[#00ffff]/20 bg-black/40 p-3 rounded-sm">
                      <h3 className="text-[10px] text-[#00ffff]/50 uppercase tracking-widest font-bold mb-1">OBJECTIVE</h3>
                      <p className="text-sm font-bold text-white">{s4Data.description}</p>
                    </div>

                    {showHint && (
                      <div className="p-2 border border-[#ff003c]/30 bg-[#ff003c]/5 text-[#ff003c] font-mono text-xs italic">
                        💡 Hint: {s4Data.hint}
                      </div>
                    )}

                    <div className="border border-[#ff003c]/30 bg-[#0a0a0a] flex flex-col rounded-sm overflow-hidden h-[180px]">
                      <div className="flex items-center justify-between px-3 p-1.5 bg-[#1a1a1a] border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#ff003c]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#ffaa00]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#00ff00]" />
                          <span className="ml-2 text-[10px] text-white/30 font-mono uppercase">main.{s4Data.lang}</span>
                        </div>
                      </div>
                      <div className="flex-1 flex overflow-auto">
                        <div className="bg-[#111] text-white/20 font-mono text-xs py-3 px-2 select-none text-right border-r border-white/5 leading-relaxed whitespace-pre">
                          {userCode.split("\n").map((_, i) => (
                            <div key={i}>{i + 1}</div>
                          ))}
                        </div>
                        <textarea
                          value={userCode}
                          onChange={(e) => setUserCode(e.target.value)}
                          spellCheck={false}
                          className="flex-1 bg-transparent text-[#e0e0e0] font-mono text-xs md:text-sm p-3 resize-none focus:outline-none leading-relaxed whitespace-pre outline-none"
                          style={{ tabSize: 4 }}
                        />
                      </div>
                    </div>

                    <AnimatePresence>
                      {compileResult !== "idle" && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className={cn(
                            "border p-3 font-mono text-xs md:text-sm rounded-sm",
                            compileResult === "success"
                              ? "border-[#00ff00]/50 bg-[#002200] text-[#00ff00]"
                              : "border-[#ff003c]/50 bg-[#220000] text-[#ff003c] animate-shake"
                          )}
                        >
                          {compileMsg}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <GlowingButton
                      onClick={handleS4Compile}
                      disabled={compileResult === "success"}
                      className="w-full py-4 uppercase tracking-[0.2em] font-black text-sm md:text-base flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4 md:w-5 md:h-5" /> COMPILE & RUN
                    </GlowingButton>
                  </div>
                )}

              </div>
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
