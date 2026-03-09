"use client";

import { useState, useEffect, useCallback } from "react";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { CheckCircle2, XCircle, HelpCircle, Cpu, RefreshCcw, LayoutGrid, List, AlertTriangle, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// 30 VERY EASY Questions for JNTUH 1st/2nd Year CSE with Hints
const QUESTION_POOL = [
  { question: "The brain of the computer.", answer: "CPU", hint: "Central Processing Unit" },
  { question: "Volatile memory used for active programs.", answer: "RAM", hint: "Random Access Memory" },
  { question: "Read-only memory.", answer: "ROM", hint: "Permanent storage for BIOS" },
  { question: "Smallest unit of data (0 or 1).", answer: "BIT", hint: "Binary Digit" },
  { question: "8 bits make one...", answer: "BYTE", hint: "Standard unit of storage" },
  { question: "Base-2 numbering system.", answer: "BINARY", hint: "Uses only 0s and 1s" },
  { question: "Language used to style web pages.", answer: "CSS", hint: "Cascading Style Sheets" },
  { question: "Standard markup language for web pages.", answer: "HTML", hint: "HyperText Markup Language" },
  { question: "Popular OOP language with 'Write Once, Run Anywhere'.", answer: "JAVA", hint: "Coffee logo" },
  { question: "Data type storing whole numbers.", answer: "INT", hint: "Short for Integer" },
  { question: "Data type for characters.", answer: "CHAR", hint: "Short for Character" },
  { question: "Data type for true/false values.", answer: "BOOL", hint: "Named after George Boole" },
  { question: "A sequence of characters.", answer: "STRING", hint: "Text data enclosed in quotes" },
  { question: "Collection of data in contiguous memory.", answer: "ARRAY", hint: "Elements accessed by index" },
  { question: "LIFO data structure.", answer: "STACK", hint: "Last In, First Out (like plates)" },
  { question: "FIFO data structure.", answer: "QUEUE", hint: "First In, First Out (like a line)" },
  { question: "A blueprint for creating objects in OOP.", answer: "CLASS", hint: "Defines properties and methods" },
  { question: "An instance of a class.", answer: "OBJECT", hint: "A real-world entity in code" },
  { question: "A variable storing a memory address.", answer: "POINTER", hint: "Used heavily in C/C++" },
  { question: "A function that calls itself.", answer: "RECURSION", hint: "Requires a base case to stop" },
  { question: "Standard language for databases.", answer: "SQL", hint: "Structured Query Language" },
  { question: "Command to retrieve data in SQL.", answer: "SELECT", hint: "The most common SQL keyword" },
  { question: "Translates high-level code to machine code.", answer: "COMPILER", hint: "Translates the whole program at once" },
  { question: "A mistake in the code.", answer: "BUG", hint: "Grace Hopper found a real moth" },
  { question: "Loop that runs a specific number of times.", answer: "FOR", hint: "Initialization, Condition, Increment" },
  { question: "Loop that runs while a condition is true.", answer: "WHILE", hint: "Entry-controlled loop" },
  { question: "Network of networks.", answer: "INTERNET", hint: "Global system of interconnected computers" },
  { question: "Protocol for sending emails.", answer: "SMTP", hint: "Simple Mail Transfer Protocol" },
  { question: "Protocol for secure web browsing.", answer: "HTTPS", hint: "Secure version of HTTP" },
  { question: "Software used to view web pages.", answer: "BROWSER", hint: "Chrome, Firefox, Safari" },
];

const GRID_SIZE = 9;
const LEVEL_TIME = 360; // 6 minutes in seconds

export function Level1() {
  const { completeLevel, logout, handleMissionFailure } = useGame();

  const [questions, setQuestions] = useState<typeof QUESTION_POOL>([]);
  const [grid, setGrid] = useState<string[][]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [errorFlash, setErrorFlash] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [timeLeft, setTimeLeft] = useState(LEVEL_TIME);

  const skipLevel = () => {
    setSuccess(true);
    setTimeout(() => completeLevel("STACK"), 1000);
  };

  const initializeGame = useCallback(() => {
    setIsInitializing(true);
    const shuffledPool = [...QUESTION_POOL].sort(() => Math.random() - 0.5);
    const selected = shuffledPool.slice(0, 7);
    setQuestions(selected);

    const newGrid: string[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(""));

    selected.forEach((q) => {
      const word = q.answer.toUpperCase();
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 150) {
        attempts++;
        const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);

        if (direction === 'horizontal' && col + word.length <= GRID_SIZE) {
          let canPlace = true;
          for (let i = 0; i < word.length; i++) {
            if (newGrid[row][col + i] !== "" && newGrid[row][col + i] !== word[i]) {
              canPlace = false; break;
            }
          }
          if (canPlace) {
            for (let i = 0; i < word.length; i++) newGrid[row][col + i] = word[i];
            placed = true;
          }
        } else if (direction === 'vertical' && row + word.length <= GRID_SIZE) {
          let canPlace = true;
          for (let i = 0; i < word.length; i++) {
            if (newGrid[row + i][col] !== "" && newGrid[row + i][col] !== word[i]) {
              canPlace = false; break;
            }
          }
          if (canPlace) {
            for (let i = 0; i < word.length; i++) newGrid[row + i][col] = word[i];
            placed = true;
          }
        }
      }
    });

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newGrid[r][c] === "") newGrid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }

    setGrid(newGrid);
    setCurrentQuestionIdx(0);
    setSelectedCells([]);
    setFoundWords([]);
    setSuccess(false);
    setErrorFlash(false);
    setTimeLeft(LEVEL_TIME);
    setTimeout(() => setIsInitializing(false), 800);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer logic
  useEffect(() => {
    if (success || isInitializing || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [success, isInitializing, timeLeft]);

  // Fail condition: LOGOUT
  useEffect(() => {
    if (timeLeft === 0 && !success) {
      handleMissionFailure("TIME EXPIRED: SECURITY BREACH FAILED");
    }
  }, [timeLeft, success, handleMissionFailure]);

  const currentWord = questions[currentQuestionIdx]?.answer || "";

  const handleCellClick = (r: number, c: number) => {
    if (success || isInitializing || timeLeft <= 0) return;

    if (selectedCells.some(cell => cell.r === r && cell.c === c)) {
      const idx = selectedCells.findIndex(cell => cell.r === r && cell.c === c);
      setSelectedCells(selectedCells.slice(0, idx));
      return;
    }

    const newSelection = [...selectedCells, { r, c }];
    setSelectedCells(newSelection);

    const spelled = newSelection.map(cell => grid[cell.r][cell.c]).join("");

    if (spelled === currentWord) {
      setFoundWords([...foundWords, currentWord]);
      setSelectedCells([]);
      if (currentQuestionIdx < questions.length - 1) {
        setCurrentQuestionIdx(currentQuestionIdx + 1);
      } else {
        setSuccess(true);
        setTimeout(() => completeLevel("STACK"), 3000);
      }
    } else if (spelled.length >= currentWord.length || !currentWord.startsWith(spelled)) {
      setErrorFlash(true);
      setTimeout(() => { setErrorFlash(false); setSelectedCells([]); }, 500);
    }
  };

  const isSelected = (r: number, c: number) =>
    selectedCells.some(cell => cell.r === r && cell.c === c);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 60) return "text-[#ff0000]"; // Red under 1 min
    if (timeLeft <= 180) return "text-[#ffff00]"; // Yellow under 3 mins
    return "text-[#00ff00]"; // Green
  };

  const isCritical = timeLeft <= 30;

  if (isInitializing) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <RefreshCcw className="w-16 h-16 mb-4 animate-spin text-[#00ff00]" />
        <h2 className="text-xl font-mono tracking-widest uppercase text-[#00ff00]">Bypassing 9x9 Encryption Layer...</h2>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-12 mt-12 border-2 border-[#00ff00] bg-[#002200]/50 box-glow text-center rounded-lg">
        <CheckCircle2 className="w-24 h-24 text-[#00ff00] mb-6 animate-pulse" />
        <h2 className="text-4xl font-bold text-[#00ff00] text-glow mb-4">NODE 1 BYPASSED</h2>
        <div className="text-5xl font-mono font-bold text-[#00ffff] tracking-[0.5em] bg-black p-8 border-2 border-[#00ffff]">
          STACK
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full mt-4 gap-6 max-w-7xl mx-auto w-full transition-all duration-300", isCritical && "animate-pulse")}>
      {/* Header */}
      <div className="border-b-2 border-[#00ff00]/30 pb-4 flex justify-between items-center px-2">
        <div className="flex items-center gap-4">
          <motion.div
            animate={isCritical ? { rotate: [0, -2, 2, -2, 2, 0] } : {}}
            transition={{ repeat: Infinity, duration: 0.2 }}
          >
            <Cpu className={cn("w-10 h-10", getTimerColor(), isCritical && "animate-pulse")} />
          </motion.div>
          <div>
            <h2 className={cn("text-3xl font-black italic tracking-tighter flex items-center gap-3 drop-shadow-[0_0_10px_currentColor]", getTimerColor())}>
              9X9 SECURITY MATRIX
            </h2>
            <p className="text-xs opacity-50 uppercase tracking-widest mt-1">JNTUH YEAR 01-02 CURRICULUM ENCRYPTION</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-right border-r border-white/20 pr-8">
            <span className="text-xs opacity-50 block uppercase text-white/40">Encryption Strength</span>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-[#00ffff]">EASY_MODE</span>
              <button
                onClick={skipLevel}
                className="bg-white/5 hover:bg-white/10 text-white/30 hover:text-white/60 text-[9px] px-2 py-0.5 rounded border border-white/10 transition-colors uppercase font-mono"
              >
                Skip
              </button>
            </div>
          </div>

          <div className={cn("flex flex-col items-center p-3 border-2 min-w-[140px] box-glow",
            timeLeft <= 60 ? "border-red-500 bg-red-500/10" :
              timeLeft <= 180 ? "border-yellow-500 bg-yellow-500/10" :
                "border-[#00ff00] bg-black")}>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Extraction Time</span>
            <span className={cn("text-4xl font-mono font-black", getTimerColor(), isCritical && "animate-ping")}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCritical && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-600 text-white font-black text-center py-2 flex items-center justify-center gap-4 shadow-[0_0_20px_#ff0000]"
          >
            <AlertTriangle className="animate-bounce" />
            CRITICAL SYSTEM FAILURE IMMINENT: MATRIX DESTABILIZING
            <AlertTriangle className="animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={isCritical ? {
          x: [0, -3, 3, -3, 3, 0],
          y: [0, 2, -2, 2, -2, 0]
        } : {}}
        transition={{ repeat: Infinity, duration: 0.1 }}
        className="flex flex-col lg:flex-row gap-8 items-stretch flex-1"
      >
        {/* LEFT: 9x9 CROSSWORD GRID */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#00ff00] font-bold text-xs uppercase tracking-[0.2em] mb-1">
            <LayoutGrid className="w-4 h-4" /> Active Grid
          </div>
          <div
            className={cn(
              "grid grid-cols-9 gap-1.5 p-4 bg-black/80 border-2 border-[#00ff00]/40 box-glow rounded-sm grow aspect-square lg:aspect-auto relative overflow-hidden",
              errorFlash && "border-[#ff003c] bg-[#330000]/30 shadow-[0_0_20px_#ff003c]",
              isCritical && "border-red-600 shadow-[inset_0_0_50px_rgba(255,0,0,0.4)]"
            )}
          >
            {/* Scanned Lines / Glitch Effect for Critical State */}
            {isCritical && (
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,rgba(255,0,0,0.1),rgba(255,0,0,0.1)_1px,transparent_1px,transparent_2px)] animate-pulse" />
            )}

            {grid.map((row, r) => (
              row.map((char, c) => (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={cn(
                    "w-full h-full aspect-square flex items-center justify-center font-mono text-xl font-black border-2 transition-all duration-75 relative group",
                    isSelected(r, c)
                      ? "bg-[#00ffff] text-black border-[#00ffff] shadow-[0_0_15px_#00ffff]"
                      : "bg-[#051105] text-[#00ff00] border-[#00ff00]/20 hover:border-[#00ffff] hover:text-[#00ffff] hover:bg-[#00ffff]/10",
                    isCritical && !isSelected(r, c) && "border-red-900/40 text-red-500/60"
                  )}
                >
                  {char}
                  <div className="absolute inset-0 border-t border-l border-white/10 pointer-events-none group-hover:border-white/30" />
                </button>
              ))
            ))}
          </div>
        </div>

        {/* RIGHT: QUESTION & ACTIVE ANSWER */}
        <div className="w-full lg:w-[450px] flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#00ffff] font-bold text-xs uppercase tracking-[0.2em]">
              <HelpCircle className="w-4 h-4" /> Active Query
            </div>
            <div className={cn("border-2 p-6 box-glow rounded-sm min-h-[160px] flex flex-col justify-between transition-colors relative overflow-hidden",
              isCritical ? "border-red-600 bg-red-950/20" : "border-[#00ffff]/40 bg-[#001122]/60")}>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <p className="text-xl font-bold text-white leading-relaxed">
                    {questions[currentQuestionIdx]?.question}
                  </p>

                  {/* Hint Section */}
                  <div className="flex items-start gap-2 text-[#00ffff] bg-black/40 p-3 border border-[#00ffff]/20 rounded-sm">
                    <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" />
                    <p className="text-sm font-mono opacity-80 italic">
                      Hint: {questions[currentQuestionIdx]?.hint}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex flex-wrap gap-2">
                {currentWord.split("").map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-10 h-12 border-2 flex items-center justify-center font-mono text-xl font-bold",
                      selectedCells[i]
                        ? "border-[#00ffff] bg-[#00ffff]/20 text-[#00ffff] text-glow"
                        : "border-[#00ffff]/20 bg-black/40 text-[#00ffff]/20"
                    )}
                  >
                    {selectedCells[i] ? grid[selectedCells[i].r][selectedCells[i].c] : "?"}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <div className="flex items-center gap-2 text-[#00ff00] font-bold text-xs uppercase tracking-[0.2em]">
              <List className="w-4 h-4" /> Progress Log ( {currentQuestionIdx + 1} / 7 )
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[350px] pr-2 scrollbar-thin scrollbar-thumb-[#00ff00]/20">
              {questions.map((q, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-3 border flex items-center justify-between text-xs font-mono uppercase tracking-widest",
                    i < currentQuestionIdx
                      ? "border-[#00ff00] bg-[#00ff00]/10 text-[#00ff00] opacity-50"
                      : i === currentQuestionIdx
                        ? "border-[#00ffff] bg-[#00ffff]/10 text-[#00ffff] font-bold box-glow"
                        : "border-white/10 bg-black/20 text-white/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] w-4">{i + 1}.</span>
                    <span>{i < currentQuestionIdx ? q.answer : i === currentQuestionIdx ? "EXECUTING..." : "PENDING"}</span>
                  </div>
                  {i < currentQuestionIdx && <CheckCircle2 className="w-4 h-4" />}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <div className={cn("p-4 border font-mono uppercase text-[10px]",
              isCritical ? "border-red-600 text-red-500 bg-red-950/20 shadow-[0_0_10px_#ff0000]" : "border-[#00ff00]/20 text-[#00ff00]/60 bg-black/50")}>
              &gt; STATUS: {isCritical ? "BREAKDOWN_DETECTED" : "MATRIX_STABLE"}<br />
              &gt; GAME_OVER_PENALTY: LOGOUT_ON_EXPIRY<br />
              &gt; ENCRYPTION: 30_EASY_MODE_POOL
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
