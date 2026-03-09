"use client";

import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { Trophy, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LeaderboardPage() {
  const { player, logout, timeRemaining } = useGame();
  const router = useRouter();

  // Mocked leaderboard data
  const mockLeaderboard = [
    { id: "P-721", time: "52:14", score: 5000 },
    { id: "P-443", time: "48:30", score: 4850 },
    { id: player?.id || "P-023", time: `${Math.floor((3600 - timeRemaining) / 60)}:${((3600 - timeRemaining) % 60).toString().padStart(2, '0')}`, score: 4500, current: true },
    { id: "P-112", time: "41:10", score: 4200 },
    { id: "P-889", time: "39:55", score: 4100 },
  ].sort((a, b) => b.score - a.score);

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col mt-6 gap-6">
      <div className="text-center mb-8">
        <Trophy className="w-20 h-20 mx-auto mb-4 text-[#00ff00] glow" />
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[#00ffff] text-glow">MISSION DEBRIEF</h1>
        <div className="opacity-80">
          <TerminalText text="GLOBAL INSTITUTE OF ENGINEERING AND TECHNOLOGY SERVER SECURED." speed={30} />
        </div>
      </div>

      <div className="border border-[#00ff00]/50 bg-[#001100] p-8 box-glow mb-8">
        <h2 className="text-2xl font-bold border-b border-[#00ff00]/30 pb-4 mb-6 flex items-center justify-between">
          <span>TOP OPERATIVES</span>
          <Clock className="w-6 h-6 text-[#00ffff]" />
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex text-sm font-bold text-[#00ffff] tracking-widest uppercase border-b border-[#00ffff]/20 pb-2 px-4">
            <div className="flex-1">RANK & ID</div>
            <div className="flex-[0.5] text-center">COMPLETION TIME</div>
            <div className="flex-[0.5] text-right">SCORE</div>
          </div>

          {mockLeaderboard.map((entry, idx) => (
            <div 
              key={entry.id}
              className={`flex items-center px-4 py-4 border transition-colors ${
                entry.current 
                ? "border-[#00ffff] bg-[#00ffff]/10 text-[#00ffff] font-bold" 
                : "border-[#00ff00]/20 bg-black text-[#00ff00]"
              }`}
            >
              <div className="flex-1 flex gap-4 items-center">
                <span className="text-2xl opacity-50 w-8">{idx + 1}</span>
                <span className="text-xl tracking-wider">{entry.id} {entry.current && "(YOU)"}</span>
              </div>
              <div className="flex-[0.5] text-center font-mono text-lg">{entry.time}</div>
              <div className="flex-[0.5] text-right font-mono text-lg">{entry.score}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <GlowingButton onClick={() => { logout(); router.push("/"); }} className="px-12 py-4 text-xl">
          TERMINATE SESSION
        </GlowingButton>
      </div>
    </div>
  );
}
