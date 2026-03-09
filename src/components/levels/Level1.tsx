"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { CheckCircle2, XCircle } from "lucide-react";

export function Level1() {
  const { completeLevel } = useGame();
  
  // A simple 3-word crossword for the prototype
  // 1. Array (Across) - "A data structure consisting of a collection of elements"
  // 2. Node (Down) - "Basic unit of a data structure, such as a linked list or tree"
  // 3. Byte (Across) - "A unit of digital data that most commonly consists of eight bits"
  
  const [answers, setAnswers] = useState({
    word1: "", // ARRAY
    word2: "", // NODE
    word3: "", // BYTE
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (
      answers.word1.toUpperCase() === "ARRAY" &&
      answers.word2.toUpperCase() === "NODE" &&
      answers.word3.toUpperCase() === "BYTE"
    ) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        completeLevel("STACK");
      }, 3000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-12 mt-12 border border-[#00ff00] bg-[#002200]/50 box-glow text-center">
        <CheckCircle2 className="w-24 h-24 text-[#00ff00] mb-6 animate-pulse" />
        <h2 className="text-4xl font-bold text-[#00ff00] text-glow mb-4">LEVEL CLEARED</h2>
        <p className="text-xl mb-6 text-white">CODE WORD RECOVERED:</p>
        <div className="text-5xl font-mono font-bold text-[#00ffff] tracking-widest bg-black p-6 border border-[#00ffff]">
          <TerminalText text="STACK" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full mt-6 gap-6">
      <div className="border border-[#00ff00]/30 bg-black/50 p-6 box-glow">
        <h2 className="text-2xl font-bold mb-2">NODE 1: TERMINOLOGY OVERRIDE</h2>
        <div className="opacity-80">
          <TerminalText text="Decrypt the core concepts to bypass the firewall. Enter the correct terms below." speed={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        <div className="border border-[#00ff00]/30 p-6 flex flex-col justify-center bg-[#001100]">
          <h3 className="font-bold text-[#00ffff] mb-4 uppercase tracking-widest text-sm border-b border-[#00ffff]/30 pb-2">CLUE DATABASE</h3>
          <ul className="space-y-6">
            <li>
              <span className="inline-block bg-[#00ff00] text-black font-bold px-2 py-1 text-xs mr-3">1</span>
              A data structure consisting of a collection of elements identified by index. (5 letters)
            </li>
            <li>
              <span className="inline-block bg-[#00ff00] text-black font-bold px-2 py-1 text-xs mr-3">2</span>
              A basic unit of a data structure, such as a linked list or tree data structure. (4 letters)
            </li>
            <li>
              <span className="inline-block bg-[#00ff00] text-black font-bold px-2 py-1 text-xs mr-3">3</span>
              A unit of digital data that most commonly consists of eight bits. (4 letters)
            </li>
          </ul>
        </div>

        <div className="border border-[#00ff00]/30 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-bold text-[#00ffff] mb-4 uppercase tracking-widest text-sm border-b border-[#00ffff]/30 pb-2">DECRYPTION INPUT</h3>
            
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-[#002200] border border-[#00ff00] flex items-center justify-center font-bold">1</span>
              <input
                type="text"
                maxLength={5}
                value={answers.word1}
                onChange={(e) => setAnswers({ ...answers, word1: e.target.value })}
                className="flex-1 bg-black border border-[#00ff00]/50 p-4 text-[#00ff00] font-mono text-xl uppercase tracking-[0.5em] focus:outline-none focus:border-[#00ff00] box-glow transition-all"
                placeholder="_____"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-[#002200] border border-[#00ff00] flex items-center justify-center font-bold">2</span>
              <input
                type="text"
                maxLength={4}
                value={answers.word2}
                onChange={(e) => setAnswers({ ...answers, word2: e.target.value })}
                className="flex-1 bg-black border border-[#00ff00]/50 p-4 text-[#00ff00] font-mono text-xl uppercase tracking-[0.5em] focus:outline-none focus:border-[#00ff00] box-glow transition-all"
                placeholder="____"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-[#002200] border border-[#00ff00] flex items-center justify-center font-bold">3</span>
              <input
                type="text"
                maxLength={4}
                value={answers.word3}
                onChange={(e) => setAnswers({ ...answers, word3: e.target.value })}
                className="flex-1 bg-black border border-[#00ff00]/50 p-4 text-[#00ff00] font-mono text-xl uppercase tracking-[0.5em] focus:outline-none focus:border-[#00ff00] box-glow transition-all"
                placeholder="____"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-[#ff003c] animate-pulse font-bold mt-4 p-2 bg-[#ff003c]/10 border border-[#ff003c]">
                <XCircle className="w-5 h-5" />
                <span>DECRYPTION FAILED. INCORRECT TERMS.</span>
              </div>
            )}
          </div>

          <GlowingButton onClick={handleSubmit} className="w-full mt-8" disabled={success}>
            SUBMIT TERMINOLOGY
          </GlowingButton>
        </div>
      </div>
    </div>
  );
}
