"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { CheckCircle2, XCircle, DatabaseBackup } from "lucide-react";
import { motion } from "framer-motion";

const CORRECT_ORDER = ["SYSTEM", "BINARY", "LOGIC", "STACK", "SYNTAX"];

export default function ReconstructPage() {
  const { player } = useGame();
  const router = useRouter();
  
  const [slots, setSlots] = useState(["", "", "", "", ""]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!player) {
      router.push("/login");
      return;
    }
    // Only 5 words should be collected by now
    if (player.fragments.length === 5) {
      setAvailableWords([...player.fragments]);
    } else {
       // fallback for testing
      setAvailableWords(["STACK", "LOGIC", "BINARY", "SYNTAX", "SYSTEM"]);
    }
  }, [player, router]);

  const handleDragStart = (e: React.DragEvent, word: string) => {
    e.dataTransfer.setData("text/plain", word);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const word = e.dataTransfer.getData("text/plain");
    
    // Check if slot already has a word and move it back
    const newSlots = [...slots];
    const oldWord = newSlots[index];
    
    newSlots[index] = word;
    setSlots(newSlots);

    const newAvailable = availableWords.filter(w => w !== word);
    if (oldWord) newAvailable.push(oldWord);
    setAvailableWords(newAvailable);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeWord = (index: number) => {
    if (!slots[index]) return;
    const word = slots[index];
    const newSlots = [...slots];
    newSlots[index] = "";
    setSlots(newSlots);
    setAvailableWords([...availableWords, word]);
  };

  const handleSubmit = () => {
    if (slots.join() === CORRECT_ORDER.join()) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        router.push("/leaderboard");
      }, 5000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (success) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <DatabaseBackup className="w-32 h-32 mx-auto mb-8 text-[#00ff00] animate-pulse glow" />
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#00ffff] text-glow">
            SERVER RESTORED
          </h1>
          <p className="text-xl md:text-2xl opacity-80 uppercase tracking-widest text-[#00ff00] mb-8">
            MASTER KEY RECONSTRUCTION SUCCESSFUL. YOU HAVE SAVED GIET.
          </p>
          <div className="opacity-70 mt-4">
            <TerminalText text="Proceeding to Mission Debrief..." speed={50} />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col mt-6 gap-6">
      <div className="border border-[#00ffff]/30 bg-black/50 p-6 box-glow text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3 text-[#00ffff] text-glow">
          <DatabaseBackup className="w-8 h-8" />
          MASTER KEY RECONSTRUCTION
        </h2>
        <div className="opacity-80">
          <TerminalText text="Arrange the recovered fragments in the correct architectural hierarchy: System -> Data Representation -> Processing -> Memory -> Rules." speed={30} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 mt-8">
        <div className="border border-[#00ff00]/30 p-6 bg-[#001100]">
          <h3 className="font-bold text-[#00ffff] mb-6 uppercase tracking-widest text-sm border-b border-[#00ffff]/30 pb-2">RECOVERED FRAGMENTS</h3>
          <div className="flex flex-wrap gap-4">
            {availableWords.map((word, i) => (
              <div
                key={i}
                draggable
                onDragStart={(e) => handleDragStart(e, word)}
                className="px-6 py-4 bg-black border-2 border-[#00ff00] text-[#00ff00] font-mono text-xl font-bold cursor-grab active:cursor-grabbing hover:bg-[#00ff00]/20 transition-colors shadow-[#00ff00]/50 shadow-[0_0_10px]"
              >
                {word}
              </div>
            ))}
            {availableWords.length === 0 && (
              <div className="opacity-50 text-sm italic py-4">All fragments deployed...</div>
            )}
          </div>
        </div>

        <div className="border border-[#00ff00]/30 p-6 bg-[#001100] flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[#00ffff] mb-6 uppercase tracking-widest text-sm border-b border-[#00ffff]/30 pb-2">ASSEMBLY SEQUENCE</h3>
            
            <div className="space-y-4">
              {slots.map((slot, index) => (
                <div
                  key={index}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragOver={handleDragOver}
                  onClick={() => removeWord(index)}
                  className={`w-full h-16 border-2 border-dashed flex items-center justify-center font-mono text-xl font-bold transition-all ${
                    slot 
                      ? "border-[#00ff00] bg-[#00ff00]/10 text-[#00ff00] cursor-pointer" 
                      : "border-[#00ff00]/30 text-[#00ff00]/30 bg-black"
                  }`}
                >
                  {slot || `SLOT 0${index + 1}`}
                </div>
              ))}
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-[#ff003c] animate-pulse font-bold mt-6 p-3 bg-[#ff003c]/10 border border-[#ff003c]">
                <XCircle className="w-5 h-5" />
                <span>INCORRECT SEQUENCE. SYSTEM LOCKOUT PREVENTED.</span>
              </div>
            )}
          </div>

          <GlowingButton 
            onClick={handleSubmit} 
            disabled={slots.includes("")}
            className="w-full mt-8 py-4 text-xl"
          >
            INITIATE RESTORATION
          </GlowingButton>
        </div>
      </div>
    </div>
  );
}
