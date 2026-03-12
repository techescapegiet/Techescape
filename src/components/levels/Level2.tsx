"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { GlitchText } from "@/components/ui/GlitchText";
import { CheckCircle2, ShieldAlert, Cpu, Timer, Lightbulb, Keyboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { getSemanticBlanks, AcademicYear, Department } from "@/lib/questionBank";

const LEVEL_TIME = 60; // 60 seconds per question

export function Level2() {
  const { completeLevel, logout, handleMissionFailure, player } = useGame();

  const [questions, setQuestions] = useState<{ word: string; hint: string }[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [blanks, setBlanks] = useState<string[]>([]);
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);

  const [timeLeft, setTimeLeft] = useState(LEVEL_TIME);
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCorrectFlash, setIsCorrectFlash] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);



  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize Game
  useEffect(() => {
    if (!player) return;
    const syllabusPool = getSemanticBlanks(player.academicYear as AcademicYear, player.department as Department);
    // Pick 5 random words
    const shuffled = [...syllabusPool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 5);
    setQuestions(selected.map(q => ({ word: q.word || "UNKNOWN", hint: q.hint })));
  }, [player]);

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
    setHintsUsed(0); // Reset hints for the new question

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

  const useHint = () => {
    if (success || timeLeft <= 5 || hintsUsed >= 3) return;
    const currentQData = questions[currentQuestionIdx];
    if (!currentQData) return;
    const word = currentQData.word;
    if (!word) return;

    const unrevealed = word.split("").map((_, i) => i)
      .filter(i => !revealedIndices.includes(i) && blanks[i] !== word[i]);

    if (unrevealed.length > 0) {
      const idx = unrevealed[Math.floor(Math.random() * unrevealed.length)];
      setRevealedIndices(prev => [...prev, idx]);
      setHintsUsed(prev => prev + 1);

      const newBlanks = [...blanks];
      newBlanks[idx] = word[idx];
      setBlanks(newBlanks);

      setTimeLeft(prev => Math.max(1, prev - 5));

      if (newBlanks.every(b => b !== "")) {
        // We delay the check slightly so state updates first
        setTimeout(() => checkAnswer(newBlanks.join("")), 100);
      }
    }
  };

  const checkAnswer = (attempt: string) => {
    const currentQData = questions[currentQuestionIdx];
    if (!currentQData) return;
    const word = currentQData.word;
    if (attempt === word) {
      setIsError(false);
      setIsCorrectFlash(true);
      setTimeout(() => {
        setIsCorrectFlash(false);
        if (currentQuestionIdx < questions.length - 1) {
          setCurrentQuestionIdx(prev => prev + 1);
        } else {
          setSuccess(true);
          if (!isCompleting) {
            setIsCompleting(true);
            setTimeout(() => completeLevel("BINARY"), 3000); // Level 2 codeword
          }
        }
      }, 500);
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
          BINARY
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
          isCorrectFlash ? "border-[#00ff00] bg-[#00ff00]/20 shadow-[inset_0_0_50px_rgba(0,255,0,0.4)]" :
            "border-[#00ffff]/30 bg-[#001122]/80 box-glow"
      )}>

        {isError && (
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(45deg,rgba(255,0,0,0.2),rgba(255,0,0,0.2)_10px,transparent_10px,transparent_20px)]" />
        )}

        <div className="text-center mb-12 relative z-10">
          <button
            onClick={useHint}
            disabled={hintsUsed >= 3 || timeLeft <= 5}
            className={cn("inline-flex items-center gap-2 px-4 py-1.5 border border-[#00ffff]/40 bg-[#00ffff]/10 hover:bg-[#00ffff]/20 transition-all cursor-pointer text-[#00ffff] font-mono text-sm uppercase tracking-widest mb-6 rounded-full", (hintsUsed >= 3 || timeLeft <= 5) ? "opacity-30 cursor-not-allowed grayscale" : "hover:scale-105 active:scale-95")}
            title="Reveal 1 letter (-5 seconds)"
          >
            <Lightbulb className="w-4 h-4" /> Use Hint ({3 - hintsUsed} left, -5s)
          </button>
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
                    : isCorrectFlash
                      ? "bg-[#00ff00]/40 border-[#00ff00] text-white shadow-[0_0_15px_#00ff00]"
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
