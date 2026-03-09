"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { CheckCircle2, XCircle, Cpu } from "lucide-react";

export function Level5() {
  const { completeLevel } = useGame();
  
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toUpperCase() === "SYSTEM") {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        completeLevel("SYSTEM"); // Key Fragment 5
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
        <h2 className="text-4xl font-bold text-[#00ff00] text-glow mb-4">FINAL NODE BYPASSED</h2>
        <p className="text-xl mb-6 text-white">CODE WORD RECOVERED:</p>
        <div className="text-5xl font-mono font-bold text-[#00ffff] tracking-widest bg-black p-6 border border-[#00ffff]">
          <TerminalText text="SYSTEM" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full mt-6 gap-6">
      <div className="border border-[#00ff00]/30 bg-black/50 p-6 box-glow">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-glow-alert text-[#ff003c]">
          <Cpu className="w-6 h-6 text-[#ff003c] animate-pulse" />
          NODE 5: HYPER-MASHUP ANOMALY
        </h2>
        <div className="opacity-80">
          <TerminalText text="Final security layer. Decode the raw data sequence to bypass." speed={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        <div className="border border-[#00ff00]/30 p-6 flex flex-col justify-start bg-[#001100]">
          <h3 className="font-bold text-[#00ffff] mb-4 uppercase tracking-widest text-sm border-b border-[#00ffff]/30 pb-2">ENCRYPTED PAYLOAD</h3>
          <div className="space-y-6">
            <div className="p-4 border border-[#00ff00]/20 bg-black text-sm">
              <span className="text-xs text-[#00ff00] block mb-2">// LOGIC GATE 01</span>
              <span>Condition: (1 AND 0) OR (NOT 0 AND 1)</span>
              <br/>
              <span className="opacity-50">Output determines active cipher.</span>
            </div>
            <div className="p-4 border border-[#00ff00]/20 bg-black text-sm overflow-x-auto">
              <span className="text-xs text-[#00ff00] block mb-2">// ASCII CIPHER SEQUENCE</span>
              <span className="font-mono text-lg tracking-widest text-white">
                83 89 83 84 69 77
              </span>
            </div>
            <div className="p-4 border border-[#00ff00]/20 bg-black opacity-80 text-sm">
              <span className="text-xs text-[#00ff00] block mb-2">// INSTRUCTION SET</span>
              <TerminalText text="IF Output == 1 THEN Decode ASCII Sequence to String." speed={20} />
            </div>
          </div>
        </div>

        <div className="border border-[#00ff00]/30 p-6 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-bold text-[#00ffff] mb-4 uppercase tracking-widest text-sm border-b border-[#00ffff]/30 pb-2">RAW OUTPUT UPLOAD</h3>
            <div>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full bg-black border border-[#00ff00]/50 p-6 text-[#00ff00] text-center font-mono text-3xl uppercase tracking-[0.5em] focus:outline-none focus:border-[#00ffff] box-glow transition-all"
                placeholder="DECODED_"
              />
            </div>

            {error && (
              <div className="flex items-center justify-center gap-2 text-[#ff003c] animate-pulse font-bold p-3 bg-[#ff003c]/10 border border-[#ff003c]">
                <XCircle className="w-5 h-5" />
                <span>INCORRECT RESULT. DECRYPTION FAILED.</span>
              </div>
            )}

            <GlowingButton variant="danger" type="submit" className="w-full mt-4 py-4 text-xl">
              INITIATE FINAL BYPASS
            </GlowingButton>
          </form>
        </div>
      </div>
    </div>
  );
}
