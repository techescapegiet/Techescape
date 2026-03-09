"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { Trophy, Clock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface LeaderboardEntry {
  id: string;
  name: string;
  time: string;
  score: number;
  current?: boolean;
}

export default function LeaderboardPage() {
  const { player, logout } = useGame();
  const router = useRouter();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from("players")
      .select(`
        id,
        created_at,
        updated_at,
        access_keys (assigned_to)
      `)
      .eq("status", "completed")
      .order("updated_at", { ascending: true });

    if (data && !error) {
      const formatted: LeaderboardEntry[] = data.map((p: any) => {
        const start = new Date(p.created_at).getTime();
        const end = new Date(p.updated_at).getTime();
        const durationSecs = Math.floor((end - start) / 1000);

        const mins = Math.floor(durationSecs / 60);
        const secs = durationSecs % 60;

        // Score calculation: Base 10,000 - 2 pts per second taken
        const score = Math.max(0, 10000 - (durationSecs * 2));

        return {
          id: p.id,
          name: (Array.isArray(p.access_keys) ? p.access_keys[0]?.assigned_to : p.access_keys?.assigned_to) || "Unknown Operative",
          time: `${mins}:${secs.toString().padStart(2, '0')}`,
          score: score,
          current: player?.sessionId === p.id
        };
      });

      // Sort by score descending (highest first)
      setEntries(formatted.sort((a, b) => b.score - a.score));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaderboard();

    const channel = supabase.channel("leaderboard-updates")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "players", filter: "status=eq.completed" }, () => fetchLeaderboard())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [player?.sessionId]);

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col mt-6 gap-6 p-4">
      <div className="text-center mb-8">
        <Trophy className="w-20 h-20 mx-auto mb-4 text-[#00ff00] glow" />
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[#00ffff] text-glow uppercase tracking-tighter">Mission Debrief</h1>
        <div className="opacity-80 py-2">
          <TerminalText text="GLOBAL INSTITUTE OF ENGINEERING AND TECHNOLOGY SERVER SECURED." speed={30} />
        </div>
      </div>

      <div className="border border-[#00ff00]/50 bg-[#001100]/80 p-6 md:p-10 box-glow mb-8 backdrop-blur-sm">
        <h2 className="text-2xl font-bold border-b border-[#00ff00]/30 pb-6 mb-8 flex items-center justify-between uppercase tracking-widest">
          <span className="text-[#00ff00]">Top Ranking Operatives</span>
          <Clock className="w-6 h-6 text-[#00ffff] animate-pulse" />
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-[#00ffff] animate-spin" />
            <div className="text-xs font-mono opacity-50 uppercase tracking-[0.3em]">Decrypting Rankings...</div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex text-[10px] font-bold text-[#00ffff] tracking-[0.3em] uppercase border-b border-[#00ffff]/20 pb-3 px-6">
              <div className="flex-1">Rank & ID Name</div>
              <div className="flex-[0.5] text-center">Infiltration Time</div>
              <div className="flex-[0.5] text-right">Data Points</div>
            </div>

            {entries.map((entry, idx) => (
              <div
                key={entry.id}
                className={`flex items-center px-6 py-5 border transition-all hover:scale-[1.01] duration-300 ${entry.current
                    ? "border-[#00ffff] bg-[#00ffff]/10 text-white font-bold shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                    : "border-[#00ff00]/20 bg-black/40 text-[#a0ffa0]"
                  }`}
              >
                <div className="flex-1 flex gap-5 items-center">
                  <span className={`text-2xl font-black w-8 ${idx < 3 ? 'text-[#ffd700]' : 'opacity-30'}`}>
                    {idx + 1}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xl tracking-wider uppercase font-bold">{entry.name}</span>
                    {entry.current && <span className="text-[10px] text-[#00ffff] font-black tracking-widest">[YOU ARE HERE]</span>}
                  </div>
                </div>
                <div className="flex-[0.5] text-center font-mono text-xl text-[#00ffff]">{entry.time}</div>
                <div className="flex-[0.5] text-right font-mono text-xl font-bold tracking-tighter">{entry.score.toLocaleString()}</div>
              </div>
            ))}

            {entries.length === 0 && (
              <div className="text-center py-16 border border-dashed border-white/10 opacity-30 italic uppercase tracking-widest">
                No successful missions recorded in this session.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center pb-12">
        <GlowingButton onClick={() => { logout(); router.push("/"); }} className="px-16 py-5 text-xl font-black tracking-[0.2em] uppercase">
          Terminate Session
        </GlowingButton>
      </div>
    </div>
  );
}
