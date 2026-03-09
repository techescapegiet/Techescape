"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { GlitchText } from "@/components/ui/GlitchText";
import { CheckCircle2, XCircle, Search } from "lucide-react";

export function Level2() {
  const { completeLevel } = useGame();
  
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toUpperCase() === "ALGORITHM") {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        completeLevel("LOGIC"); // Key Fragment 2
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
        <h2 className="text-4xl font-bold text-[#00ff00] text-glow mb-4">NODE 2 BYPASSED</h2>
        <p className="text-xl mb-6 text-white">CODE WORD RECOVERED:</p>
        <div className="text-5xl font-mono font-bold text-[#00ffff] tracking-widest bg-black p-6 border border-[#00ffff]">
          <TerminalText text="LOGIC" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full mt-6 gap-6">
      <div className="border border-[#00ff00]/30 bg-black/50 p-6 box-glow">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <Search className="w-6 h-6 text-[#00ffff]" />
          NODE 2: HASH COLLISION
        </h2>
        <div className="opacity-80">
          <TerminalText text="Identify the missing core component based on the datastream fragments." speed={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        <div className="border border-[#00ff00]/30 p-6 flex flex-col justify-start bg-[#001100]">
          <h3 className="font-bold text-[#00ffff] mb-4 uppercase tracking-widest text-sm border-b border-[#00ffff]/30 pb-2">DATASTREAM FRAGMENTS</h3>
          <div className="space-y-4">
            <div className="p-4 border border-[#00ff00]/20 bg-black">
              <span className="text-xs text-[#00ff00] mb-1 block">Fragment 1 [0x0A]:</span>
              I am a finite sequence of rigorous instructions.
            </div>
            <div className="p-4 border border-[#00ff00]/20 bg-black">
              <span className="text-xs text-[#00ff00] mb-1 block">Fragment 2 [0x0B]:</span>
              I am used to solve a class of specific problems or to perform a computation.
            </div>
            <div className="p-4 border border-[#00ff00]/20 bg-black opacity-80">
              <span className="text-xs text-[#00ff00] mb-1 block">Fragment 3 [0x0C] (Corrupted):</span>
              <GlitchText text="Big O notation describes my efficiency..." interval={2000} />
            </div>
          </div>
        </div>

        <div className="border border-[#00ff00]/30 p-6 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-bold text-[#00ffff] mb-4 uppercase tracking-widest text-sm border-b border-[#00ffff]/30 pb-2">INJECT IDENTIFIER</h3>
            <div>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full bg-black border border-[#00ff00]/50 p-6 text-[#00ff00] text-center font-mono text-3xl uppercase tracking-[0.5em] focus:outline-none focus:border-[#00ffff] box-glow transition-all"
                placeholder="_________"
                maxLength={9}
              />
            </div>

            {error && (
              <div className="flex items-center justify-center gap-2 text-[#ff003c] animate-pulse font-bold p-3 bg-[#ff003c]/10 border border-[#ff003c]">
                <XCircle className="w-5 h-5" />
                <span>INVALID IDENTIFIER. TRY AGAIN.</span>
              </div>
            )}

            <GlowingButton type="submit" className="w-full mt-4 py-4 text-xl">
              SUBMIT
            </GlowingButton>
          </form>
        </div>
      </div>
    </div>
  );
}
