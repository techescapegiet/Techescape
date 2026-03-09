"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  {
    id: 1,
    question: "Which of the following sorting algorithms has the best average-case time complexity?",
    options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
    correct: 2, // Merge Sort (0-indexed)
  },
  {
    id: 2,
    question: "In the context of database management, what does ACID stand for?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Array, Constant, Integer, Decimal",
      "Asynchronous, Concurrent, Isolated, Dynamic",
      "Allocation, Cache, Index, Data",
    ],
    correct: 0,
  },
  {
    id: 3,
    question: "Which network protocol is used to translate domain names to IP addresses?",
    options: ["HTTP", "TCP", "DNS", "FTP"],
    correct: 2,
  },
];

export function Level3() {
  const { completeLevel } = useGame();
  
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);
  const [errorFlash, setErrorFlash] = useState(false);

  const handleNext = () => {
    if (selected === null) return;

    if (selected === QUESTIONS[currentQ].correct) {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
      } else {
        setSuccess(true);
        setTimeout(() => {
          completeLevel("BINARY"); // Key Fragment 3
        }, 3000);
      }
    } else {
      // Wrong answer
      setErrorFlash(true);
      setTimeout(() => setErrorFlash(false), 800);
      // Restart the MCQ
      setTimeout(() => {
        setCurrentQ(0);
        setSelected(null);
      }, 1000);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-12 mt-12 border border-[#00ff00] bg-[#002200]/50 box-glow text-center">
        <CheckCircle2 className="w-24 h-24 text-[#00ff00] mb-6 animate-pulse" />
        <h2 className="text-4xl font-bold text-[#00ff00] text-glow mb-4">AUTHENTICATION SUCCESSFUL</h2>
        <p className="text-xl mb-6 text-white">CODE WORD RECOVERED:</p>
        <div className="text-5xl font-mono font-bold text-[#00ffff] tracking-widest bg-black p-6 border border-[#00ffff]">
          <TerminalText text="BINARY" />
        </div>
      </div>
    );
  }

  const q = QUESTIONS[currentQ];

  return (
    <div className="flex flex-col h-full mt-6 gap-6">
      <div className="border border-[#00ff00]/30 bg-black/50 p-6 box-glow">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-[#ff003c] animate-pulse" />
          NODE 3: MULTI-FACTOR AUTHENTICATION
        </h2>
        <div className="opacity-80">
          <TerminalText text="You must pass the strict theoretical knowledge verification sequence. Any failure triggers a reset." speed={20} />
        </div>
      </div>

      <div className={cn("border border-[#00ff00]/30 p-8 flex flex-col bg-[#001100] transition-colors duration-300", errorFlash ? "border-[#ff003c] bg-[#330000]" : "")}>
        <div className="flex justify-between items-center mb-6">
          <span className="text-[#00ffff] font-bold tracking-widest uppercase">
            VERIFICATION STEP {currentQ + 1} OF {QUESTIONS.length}
          </span>
          <div className="flex gap-2">
            {QUESTIONS.map((_, idx) => (
              <div key={idx} className={cn("w-3 h-3 rounded-full border border-[#00ff00]", idx === currentQ ? "bg-[#00ff00] animate-pulse" : idx < currentQ ? "bg-[#002200]" : "")} />
            ))}
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-8 min-h-[80px]">
          {errorFlash ? <span className="text-[#ff003c]">AUTHENTICATION FAILED. RESTARTING PROTOCOL...</span> : q.question}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              disabled={errorFlash}
              onClick={() => setSelected(idx)}
              className={cn(
                "p-4 text-left border transition-all duration-200 uppercase",
                selected === idx 
                  ? "border-[#00ffff] bg-[#00ffff]/20 text-[#00ffff]" 
                  : "border-[#00ff00]/30 hover:bg-[#00ff00]/10 hover:border-[#00ff00]"
              )}
            >
              <span className="inline-block w-8 h-8 text-center bg-black border border-current mr-3 leading-8">{String.fromCharCode(65 + idx)}</span>
              {opt}
            </button>
          ))}
        </div>

        <div className="flex justify-end mt-auto">
          <GlowingButton onClick={handleNext} disabled={selected === null || errorFlash} className="px-12">
            CONFIRM
          </GlowingButton>
        </div>
      </div>
    </div>
  );
}
