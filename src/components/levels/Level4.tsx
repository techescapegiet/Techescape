"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { CheckCircle2, XCircle, Bug } from "lucide-react";

export function Level4() {
  const { completeLevel } = useGame();
  
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept either "i < items.length" or the word "BOUNDS" or simple variations
    const a = answer.toLowerCase().replace(/\s+/g, '');
    if (a.includes("i<items.length") || a.includes("outofbounds") || a.includes("bounds") || a.includes("index") || a.includes("item.length")) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        completeLevel("SYNTAX"); // Key Fragment 4
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
        <h2 className="text-4xl font-bold text-[#00ff00] text-glow mb-4">BUG RESOLVED</h2>
        <p className="text-xl mb-6 text-white">CODE WORD RECOVERED:</p>
        <div className="text-5xl font-mono font-bold text-[#00ffff] tracking-widest bg-black p-6 border border-[#00ffff]">
          <TerminalText text="SYNTAX" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full mt-6 gap-6">
      <div className="border border-[#00ff00]/30 bg-black/50 p-6 box-glow flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <Bug className="w-6 h-6 text-[#ff003c]" />
            NODE 4: CORRUPTED LOGIC
          </h2>
          <div className="opacity-80">
            <TerminalText text="Identify the fatal error causing the memory leak in the core loop." speed={20} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="border border-[#ff003c]/50 p-6 flex flex-col bg-[#110000] box-glow shadow-[#ff003c]/20">
          <h3 className="font-bold text-[#ff003c] mb-4 uppercase tracking-widest text-sm border-b border-[#ff003c]/30 pb-2">SOURCE_CODE.JS</h3>
          <div className="font-mono text-sm md:text-base leading-relaxed text-[#ffaaaaaaaa] whitespace-pre-wrap overflow-x-auto">
{`function calculateTotal(items) {
  let total = 0;
  
  // CRITICAL FAILURE AT RUNTIME
  for (let i = 0; i <= items.length; i++) {
    total += items[i].price;
  }
  
  return total;
}`}
          </div>
          <div className="mt-4 p-4 border border-[#ff003c]/50 bg-black text-[#ff003c] animate-pulse font-mono text-sm">
            &gt; ERROR: Uncaught TypeError: Cannot read properties of undefined (reading 'price')<br/>
            &gt; TRACE: at calculateTotal (line 6)
          </div>
        </div>

        <div className="border border-[#00ff00]/30 p-6 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-bold text-[#00ffff] mb-4 uppercase tracking-widest text-sm border-b border-[#00ffff]/30 pb-2">PATCH SUBMISSION</h3>
            <p className="opacity-80 text-sm mb-4">
              Enter the correct for-loop condition or describe the error (e.g., "Out of bounds").
            </p>
            <div>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full bg-black border border-[#00ff00]/50 p-4 text-[#00ff00] font-mono text-xl focus:outline-none focus:border-[#00ffff] box-glow transition-all"
                placeholder="Submit patch code..."
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-[#ff003c] animate-pulse font-bold p-3 bg-[#ff003c]/10 border border-[#ff003c]">
                <XCircle className="w-5 h-5" />
                <span>PATCH REJECTED. COMPILATION FAILED.</span>
              </div>
            )}

            <GlowingButton type="submit" className="w-full mt-4 py-4 text-xl">
              APPLY PATCH
            </GlowingButton>
          </form>
        </div>
      </div>
    </div>
  );
}
