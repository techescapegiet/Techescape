"use client";

import { useState } from "react";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { Shield, Eye, Trash2, Power } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  
  // Mock data representing player states across the 50 computers
  const [players, setPlayers] = useState([
    { id: "P-023", computerInfo: "PC-A01", level: 3, status: "ACTIVE", timeLimit: "48:21" },
    { id: "P-112", computerInfo: "PC-A02", level: 5, status: "ACTIVE", timeLimit: "12:10" },
    { id: "P-443", computerInfo: "PC-B05", level: "COMPLETED", status: "SUCCESS", timeLimit: "--:--" },
    { id: "P-721", computerInfo: "PC-C12", level: "COMPLETED", status: "SUCCESS", timeLimit: "--:--" },
    { id: "P-089", computerInfo: "PC-D04", level: 1, status: "OFFLINE", timeLimit: "00:00" },
    { id: "P-334", computerInfo: "PC-E02", level: 2, status: "ACTIVE", timeLimit: "55:30" },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAdmin(true);
    }
  };

  const kickPlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  if (!isAdmin) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <div className="w-full bg-[#001100] border border-[#ff003c] p-8 box-glow shadow-[#ff003c]/20">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-[#ff003c] animate-pulse glow" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2 text-[#ff003c]">RESTRICTED ACCESS</h1>
          <p className="text-center opacity-70 mb-8 border-b border-[#ff003c]/30 pb-4">
            ADMINISTRATOR OVERRIDE REQUIRED
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-[#ff003c] p-4 text-[#ff003c] font-mono text-xl focus:outline-none focus:border-[#ff003c] box-glow transition-all text-center tracking-[0.3em]"
                placeholder="********"
              />
            </div>
            <GlowingButton variant="danger" type="submit" className="w-full pt-4">
              AUTHENTICATE
            </GlowingButton>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col gap-6 mt-6">
      <header className="flex justify-between items-center border-b border-[#ff003c]/50 pb-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 text-[#ff003c] text-glow-alert">
            <Shield className="w-8 h-8" />
            OMNISCIENT ADMIN DASHBOARD
          </h1>
          <div className="text-[#00ffff] mt-2 font-bold tracking-widest">
            MONITORING EVENT: GIET ESCAPE ROOM
          </div>
        </div>
        <GlowingButton variant="danger" onClick={() => setIsAdmin(false)} className="px-6 py-2 flex items-center gap-2">
          <Power className="w-4 h-4" /> LOCK SYSTEM
        </GlowingButton>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="p-4 border border-[#00ff00]/30 bg-[#002200]">
            <span className="opacity-70 text-sm block mb-1">TOTAL OPERATIVES</span>
            <span className="text-4xl font-bold text-[#00ff00] text-glow">{players.length}</span>
          </div>
          <div className="p-4 border border-[#00ffff]/30 bg-[#001122]">
            <span className="opacity-70 text-sm block mb-1">COMPLETED MISSION</span>
            <span className="text-4xl font-bold text-[#00ffff] text-glow">{players.filter(p => p.level === "COMPLETED").length}</span>
          </div>
          <div className="p-4 border border-[#ff003c]/30 bg-[#220000]">
            <span className="opacity-70 text-sm block mb-1">CRITICAL TIME (&lt;10m)</span>
            <span className="text-4xl font-bold text-[#ff003c] text-glow">1</span>
          </div>
        </div>

        <div className="md:col-span-3 border border-[#00ff00]/30 bg-[#001100] p-6 box-glow">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-[#00ff00]/30 pb-2">
            <Eye className="w-5 h-5 text-[#00ffff]" />
            ACTIVE SESSIONS OVERSIGHT
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#00ffff] tracking-widest uppercase border-b border-[#00ffff]/20">
                  <th className="py-3 px-4">Player ID</th>
                  <th className="py-3 px-4">Computer</th>
                  <th className="py-3 px-4">Current Node</th>
                  <th className="py-3 px-4">Time Left</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map((p) => (
                  <tr key={p.id} className="border-b border-[#00ff00]/10 hover:bg-[#00ff00]/5 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold">{p.id}</td>
                    <td className="py-4 px-4 opacity-70">{p.computerInfo}</td>
                    <td className="py-4 px-4 font-mono">
                      {p.level === "COMPLETED" ? <span className="text-[#00ffff]">RECONSTRUCTED</span> : `NODE ${p.level}`}
                    </td>
                    <td className="py-4 px-4 font-mono">{p.timeLimit}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-bold ${
                        p.status === "ACTIVE" ? "bg-[#00ff00]/20 text-[#00ff00]" :
                        p.status === "SUCCESS" ? "bg-[#00ffff]/20 text-[#00ffff]" : "bg-[#ff003c]/20 text-[#ff003c]"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button onClick={() => kickPlayer(p.id)} className="p-2 text-[#ff003c] hover:bg-[#ff003c]/20 rounded transition-colors" title="Terminate Session">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {players.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 opacity-50 italic">
                      NO ACTIVE SESSIONS FOUND IN DATABASE.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
