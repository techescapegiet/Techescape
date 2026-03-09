"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { GlitchText } from "@/components/ui/GlitchText";
import { CheckCircle2, ShieldAlert, Cpu, Timer, Lightbulb, Keyboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Dictionary of 30 Computer Science words with hints
const WORD_POOL = [
  { word: "ALGORITHM", hint: "Step-by-step instructions to solve a problem" },
  { word: "RECURSION", hint: "A function that calls itself" },
  { word: "DATABASE", hint: "An organized collection of structured information" },
  { word: "FRAMEWORK", hint: "A platform for developing software applications" },
  { word: "INTERFACE", hint: "A shared boundary across which two components exchange information" },
  { word: "COMPILER", hint: "Translates high-level source code to machine code" },
  { word: "VARIABLE", hint: "A storage location paired with an associated symbolic name" },
  { word: "DEBUGGING", hint: "The process of identifying and removing errors" },
  { word: "ENCRYPTION", hint: "Process of converting information into a secret code" },
  { word: "FRONTEND", hint: "The graphical user interface of a website" },
  { word: "BACKEND", hint: "The data access layer and server-side logic" },
  { word: "PROTOCOL", hint: "A set of rules for data communication (e.g., HTTP)" },
  { word: "OPERATING", hint: "Prefix for 'System' - manages hardware and software" },
  { word: "INHERITANCE", hint: "OOP concept where a class derives from another" },
  { word: "POLYMORPHISM", hint: "OOP concept meaning 'many forms'" },
  { word: "ENCAPSULATION", hint: "Binding data and functions into a single unit" },
  { word: "DICTIONARY", hint: "Data structure storing key-value pairs (Python)" },
  { word: "LINKEDLIST", hint: "Linear data structure where elements point to the next" },
  { word: "PROCESSOR", hint: "The electronic circuitry that executes instructions (CPU)" },
  { word: "BANDWIDTH", hint: "Maximum rate of data transfer across a given path" },
  { word: "ITERATION", hint: "Repetition of a computational procedure (looping)" },
  { word: "REPOSITORY", hint: "A central location in which data is stored and managed (Git)" },
  { word: "EXCEPTION", hint: "An event that disrupts normal code flow (Error handling)" },
  { word: "PARAMETER", hint: "A variable used to pass information into a function" },
  { word: "ATTRIBUTE", hint: "A specification that defines a property of an object" },
  { word: "FUNCTIONS", hint: "Blocks of organized, reusable code" },
  { word: "BOOLEAN", hint: "A data type with only true or false values" },
  { word: "SYNTAX", hint: "The set of rules that defines combinations of symbols" },
  { word: "SEMANTICS", hint: "The meaning or logic behind code" },
  { word: "TERMINAL", hint: "A text-based interface to the operating system" },
];

const LEVEL_TIME = 60; // 60 seconds per question

export function Level2() {
  const { completeLevel, logout, handleMissionFailure } = useGame();

  const [questions, setQuestions] = useState<typeof WORD_POOL>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [blanks, setBlanks] = useState<string[]>([]);
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);

  const [timeLeft, setTimeLeft] = useState(LEVEL_TIME);
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const skipLevel = () => {
    setSuccess(true);
    setTimeout(() => completeLevel("LOGIC"), 1000);
  };

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize Game
  useEffect(() => {
    // Pick 5 random words
    const shuffled = [...WORD_POOL].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 5);
    setQuestions(selected.map(q => ({ word: q.word || "UNKNOWN", hint: q.hint })));
  }, []);

  // Setup current question
  useEffect(() => {
    const currentQData = questions[currentQuestionIdx];
    if (!currentQData || success) return;

    const word = currentQData.word;
    if (!word) return;

    const length = word.length;
    // Determine how many letters to reveal (roughly 30-40%)
    const numToReveal = Math.max(1, Math.floor(length * 0.35));
    const indicesToReveal: number[] = [];

    while (indicesToReveal.length < numToReveal) {
      const randIdx = Math.floor(Math.random() * length);
      if (!indicesToReveal.includes(randIdx)) {
        indicesToReveal.push(randIdx);
      }
    }

    setRevealedIndices(indicesToReveal);

    if (!word) return;
    const initialBlanks = word.split("").map((char, i) =>
      indicesToReveal.includes(i) ? char : ""
    );

    setBlanks(initialBlanks);
    setTimeLeft(LEVEL_TIME); // Reset timer for new question

    // Focus first empty input
    setTimeout(() => {
      const firstEmpty = initialBlanks.findIndex(b => b === "");
      if (firstEmpty !== -1 && inputRefs.current[firstEmpty]) {
        inputRefs.current[firstEmpty]?.focus();
      }
    }, 100);

  }, [currentQuestionIdx, questions, success]);

  // Timer logic
  useEffect(() => {
    if (success || questions.length === 0 || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [success, questions, timeLeft]);

  // Fail condition
  useEffect(() => {
    if (timeLeft === 0 && !success) {
      handleMissionFailure("TIME EXPIRED: SECURITY NODE 2 LOCKED");
    }
  }, [timeLeft, success, handleMissionFailure]);

  const handleInputChange = (index: number, value: string) => {
    if (revealedIndices.includes(index) || success) return;

    const char = value.toUpperCase().slice(-1); // Only take last char
    const newBlanks = [...blanks];
    newBlanks[index] = char;
    setBlanks(newBlanks);
    setIsError(false);

    // Auto-advance focus to next empty blank
    if (char !== "") {
      const nextEmpty = newBlanks.findIndex((b, i) => b === "" && i > index);
      if (nextEmpty !== -1) {
        inputRefs.current[nextEmpty]?.focus();
      } else {
        // If no empty blanks after, wrap around to find any first empty blank
        const firstEmpty = newBlanks.findIndex(b => b === "");
        if (firstEmpty !== -1) {
          inputRefs.current[firstEmpty]?.focus();
        }
      }
    }

    // Check answer if all filled
    if (newBlanks.every(b => b !== "")) {
      checkAnswer(newBlanks.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && blanks[index] === "") {
      // Move focus back on backspace if current is empty
      const prevEmpty = [...blanks].reverse().findIndex((b, i) =>
        !revealedIndices.includes(blanks.length - 1 - i) && (blanks.length - 1 - i) < index
      );

      if (prevEmpty !== -1) {
        const targetIdx = blanks.length - 1 - prevEmpty;
        inputRefs.current[targetIdx]?.focus();
      }
    }
  };

  const checkAnswer = (attempt: string) => {
    const currentQData = questions[currentQuestionIdx];
    if (!currentQData) return;
    const word = currentQData.word;
    if (attempt === word) {
      if (currentQuestionIdx < questions.length - 1) {
        setCurrentQuestionIdx(prev => prev + 1);
      } else {
        setSuccess(true);
        setTimeout(() => completeLevel("LOGIC"), 3000); // Level 2 codeword
      }
    } else {
      setIsError(true);
      // Don't auto-clear, let user correct it
    }
  };

  if (questions.length === 0) return null;

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-12 mt-12 border-2 border-[#00ff00] bg-[#002200]/50 box-glow text-center rounded-lg">
        <CheckCircle2 className="w-24 h-24 text-[#00ff00] mb-6 animate-pulse" />
        <h2 className="text-4xl font-bold text-[#00ff00] text-glow mb-4">NODE 2 BYPASSED</h2>
        <div className="text-5xl font-mono font-bold text-[#00ffff] tracking-[0.5em] bg-black p-8 border-2 border-[#00ffff]">
          LOGIC
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIdx];
  const isCriticalTime = timeLeft <= 15;

  return (
    <div className="flex flex-col h-full mt-6 gap-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="border border-[#00ff00]/40 bg-black/60 p-6 box-glow rounded-sm">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-[#00ff00]">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
              NODE 2: LEXICAL RECONSTRUCTION
            </h2>
            <div className="opacity-70 text-sm font-mono">
              <TerminalText text="Warning: Filesystem corrupted. Reconstruct the missing syntax to proceed." speed={15} />
            </div>
          </div>

          <button
            onClick={skipLevel}
            className="bg-white/5 hover:bg-white/10 text-white/30 hover:text-white/60 text-[9px] px-2 py-0.5 rounded border border-white/10 transition-colors uppercase font-mono self-center"
          >
            Skip
          </button>

          <div className={cn("px-6 py-3 border-2 flex items-center gap-3",
            isCriticalTime ? "border-red-500 text-red-500 bg-red-500/10 box-glow animate-pulse" : "border-[#00ffff] text-[#00ffff] bg-black"
          )}>
            <Timer className="w-6 h-6" />
            <span className="text-3xl font-mono font-black">{timeLeft}s</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-[#00ff00] font-mono mb-2 uppercase tracking-widest">
            <span>Query Progress</span>
            <span>{currentQuestionIdx + 1} / 5</span>
          </div>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn("h-2 flex-1 transition-colors",
                  i < currentQuestionIdx ? "bg-[#00ff00]" :
                    i === currentQuestionIdx ? "bg-[#00ffff] animate-pulse" : "bg-[#002200]"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Challenge Area */}
      <div className={cn("border-2 p-8 md:p-12 relative overflow-hidden transition-colors duration-300",
        isError ? "border-red-500 bg-red-950/20 shadow-[inset_0_0_50px_rgba(255,0,0,0.2)]" :
          "border-[#00ffff]/30 bg-[#001122]/80 box-glow"
      )}>

        {isError && (
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(45deg,rgba(255,0,0,0.2),rgba(255,0,0,0.2)_10px,transparent_10px,transparent_20px)]" />
        )}

        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#00ffff]/40 bg-[#00ffff]/10 text-[#00ffff] font-mono text-sm uppercase tracking-widest mb-6 rounded-full">
            <Lightbulb className="w-4 h-4" /> Hint Provided
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
            "{currentQ.hint}"
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 relative z-10">
          {blanks.map((char, index) => {
            const isRevealed = revealedIndices.includes(index);
            return (
              <input
                key={`${currentQuestionIdx}-${index}`}
                ref={el => { inputRefs.current[index] = el; }}
                type="text"
                maxLength={1}
                value={char}
                readOnly={isRevealed}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={cn(
                  "w-12 h-16 md:w-16 md:h-20 text-center text-3xl md:text-4xl font-mono font-black border-b-4 focus:outline-none transition-all",
                  isRevealed
                    ? "bg-transparent border-[#00ff00]/50 text-[#00ff00] cursor-not-allowed"
                    : isError
                      ? "bg-red-900/40 border-red-500 text-red-500 focus:border-red-400"
                      : "bg-[#002244]/50 border-[#00ffff] text-white focus:bg-[#00ffff]/10 focus:border-white focus:shadow-[0_4px_15px_#00ffff]"
                )}
              />
            );
          })}
        </div>

        {isError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8 text-red-500 font-bold tracking-widest uppercase animate-pulse"
          >
            INCORRECT SYNTAX. CHECK YOUR spelling AND TRY AGAIN.
          </motion.div>
        )}
      </div>

      <div className="text-center opacity-50 text-sm font-mono flex justify-center items-center gap-2">
        <Keyboard className="w-4 h-4" />
        Type letters to fill blanks. Backspace to clear.
      </div>
    </div >
  );
}
