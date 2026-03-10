"use client";

import { useState, useEffect } from "react";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { Shield, Eye, Trash2, Power, RefreshCw, Zap, AlertTriangle, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface LivePlayer {
  id: string; // Session UUID
  pc_id: string;
  name: string;
  level: number | string;
  status: string;
  timeRemaining: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [players, setPlayers] = useState<LivePlayer[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPurging, setIsPurging] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAdmin(true);
    }
  };

  const fetchLiveStatus = async () => {
    const { data } = await supabase
      .from("event_settings")
      .select("is_live")
      .eq("id", 1)
      .maybeSingle();
    if (data) setIsLive(data.is_live);
  };

  const toggleEventLive = async () => {
    const newStatus = !isLive;
    const { error } = await supabase
      .from("event_settings")
      .update({ is_live: newStatus })
      .eq("id", 1);

    if (!error) setIsLive(newStatus);
  };

  const fetchPlayers = async () => {
    const { data, error } = await supabase
      .from("players")
      .select(`
        id, 
        pc_id, 
        current_level, 
        status,
        created_at,
        access_keys (assigned_to)
      `)
      .order("created_at", { ascending: false });

    if (data && !error) {
      const formatted: LivePlayer[] = data.map((p: any) => {
        // Calculate time remaining (roughly 60 mins from creation)
        const start = new Date(p.created_at).getTime();
        const now = Date.now();
        const elapsed = Math.floor((now - start) / 1000);
        const remaining = Math.max(0, 3600 - elapsed);
        const mins = Math.floor(remaining / 60);
        const secs = remaining % 60;

        return {
          id: p.id,
          pc_id: p.pc_id || "N/A",
          name: (Array.isArray(p.access_keys) ? p.access_keys[0]?.assigned_to : p.access_keys?.assigned_to) || "Unknown",
          level: p.status === 'failed' ? "TERMINATED" : p.status === 'completed' ? "RECONSTRUCTED" : p.current_level,
          status: p.status.toUpperCase(),
          timeRemaining: `${mins}:${secs.toString().padStart(2, '0')}`
        };
      });
      setPlayers(formatted);
    }
    setLoading(false);
  };

  const kickPlayer = async (sessionId: string, pcId: string | null) => {
    if (!confirm("Are you sure you want to terminate this session? This will release the PC and wipe progress.")) return;

    // 1. Mark as failed
    await supabase.from("players").update({ status: 'failed', is_online: false }).eq("id", sessionId);

    // 2. Clear PC assignment if exists
    if (pcId) {
      await supabase.from("access_keys").update({
        is_assigned: false,
        assigned_to: null,
        roll_number: null,
        email: null,
        user_id: null
      }).eq("pc_id", pcId);
    }

    fetchPlayers();
  };

  const globalPurge = async () => {
    if (!confirm("CRITICAL WARNING: This will DELETE all player data and reset all PC assignments. Are you absolutely sure?")) return;

    setIsPurging(true);
    try {
      // Direct SQL via supabase might need a function for truncation if client lacks permissions
      // For now we do bulk updates
      await supabase.from("collab_sessions").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      await supabase.from("players").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      await supabase.from("access_keys").update({
        is_assigned: false,
        assigned_to: null,
        roll_number: null,
        email: null,
        academic_year: null,
        department: null,
        user_id: null
      }).neq("pc_id", "RESET");

      alert("System Purged Successfully.");
      fetchPlayers();
    } catch (e) {
      console.error(e);
      alert("Purge failed. Check database permissions.");
    } finally {
      setIsPurging(false);
    }
  };

  const clearFailedPlayers = async () => {
    if (!confirm("Are you sure you want to permanently delete all FAILED sessions from the database?")) return;
    setIsPurging(true);
    try {
      await supabase.from("players").delete().eq("status", "failed");
      alert("Failed players cleared.");
      fetchPlayers();
    } catch (e) {
      console.error(e);
      alert("Clear failed. Check database permissions.");
    } finally {
      setIsPurging(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchLiveStatus();
      fetchPlayers();

      // Real-time subscriptions
      const playerSub = supabase.channel("admin-players")
        .on("postgres_changes", { event: "*", schema: "public", table: "players" }, () => fetchPlayers())
        .subscribe();

      const statusSub = supabase.channel("admin-status")
        .on("postgres_changes", { event: "UPDATE", schema: "public", table: "event_settings" }, () => fetchLiveStatus())
        .subscribe();

      const interval = setInterval(fetchPlayers, 30000); // 30s fallback

      return () => {
        supabase.removeChannel(playerSub);
        supabase.removeChannel(statusSub);
        clearInterval(interval);
      };
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full p-4">
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
                autoFocus
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
    <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-6 p-4 md:p-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#ff003c]/50 pb-6 whitespace-nowrap">
        <div className="flex-1">
          <h1 className="text-3xl font-bold flex items-center gap-3 text-[#ff003c] text-glow-alert uppercase">
            <Shield className="w-8 h-8" />
            Host Oversight Terminal
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="text-[#00ffff] font-bold tracking-widest text-sm uppercase">Event: GIET Escape Room</div>
            <div className="w-2 h-2 rounded-full bg-[#ff003c] animate-pulse" />
            <div className="text-xs font-mono opacity-50 uppercase">Live Feed Active</div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <GlowingButton
            variant={isLive ? "cyan" : "danger"}
            onClick={toggleEventLive}
            className="flex-1 md:flex-none py-2 px-6"
          >
            <Power className="w-4 h-4 mr-2" />
            {isLive ? "SUSPEND EVENT" : "GO LIVE"}
          </GlowingButton>
          <GlowingButton onClick={() => setIsAdmin(false)} className="px-6 py-2">
            LOCK
          </GlowingButton>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="p-6 border border-[#00ff00]/30 bg-[#002200]/50 box-glow">
            <div className="flex items-center justify-between mb-2">
              <span className="opacity-70 text-xs uppercase tracking-widest">Active Operatives</span>
              <Users className="w-4 h-4 text-[#00ff00]" />
            </div>
            <span className="text-5xl font-bold text-[#00ff00] text-glow">{players.filter(p => p.status === 'ACTIVE').length}</span>
          </div>

          <div className="p-6 border border-[#00ffff]/30 bg-[#001122]/50 box-glow">
            <div className="flex items-center justify-between mb-2">
              <span className="opacity-70 text-xs uppercase tracking-widest">Mission Success</span>
              <Zap className="w-4 h-4 text-[#00ffff]" />
            </div>
            <span className="text-5xl font-bold text-[#00ffff] text-glow">{players.filter(p => p.status === 'COMPLETED').length}</span>
          </div>

          <div className="p-6 border border-[#ff003c]/30 bg-[#220000]/50 box-glow">
            <h3 className="text-xs font-bold text-[#ff003c] uppercase mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Danger Zone
            </h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={globalPurge}
                disabled={isPurging}
                className="w-full py-3 border border-[#ff003c] bg-[#ff003c]/10 text-[#ff003c] hover:bg-[#ff003c] hover:text-white transition-all font-bold uppercase tracking-tighter text-sm flex items-center justify-center gap-2"
              >
                {isPurging ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Emergency Purge
              </button>
              <button
                onClick={clearFailedPlayers}
                disabled={isPurging}
                className="w-full py-2 border border-orange-500 bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white transition-all font-bold uppercase tracking-tighter text-xs flex items-center justify-center gap-2"
              >
                {isPurging ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                Clear Failed
              </button>
            </div>
            <p className="text-[10px] opacity-40 mt-3 text-center uppercase tracking-widest">Resets all stations for next round</p>
          </div>
        </div>

        <div className="md:col-span-3 border border-[#00ff00]/20 bg-black/80 p-6 box-glow overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-[#00ff00]/10 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#00ffff]" />
              <span className="text-glow-cyan uppercase tracking-wider">Live Session Oversight</span>
            </h2>
            <button onClick={fetchPlayers} className="p-2 hover:bg-white/5 rounded-full transition-all">
              <RefreshCw className={`w-4 h-4 opacity-50 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left font-mono">
              <thead>
                <tr className="text-[#00ffff] text-[10px] tracking-[0.2em] uppercase border-b border-[#00ffff]/20">
                  <th className="py-4 px-4">Operative</th>
                  <th className="py-4 px-4">Terminal</th>
                  <th className="py-4 px-4">Node</th>
                  <th className="py-4 px-4">ETA</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-right"> Purge</th>
                </tr>
              </thead>
              <tbody>
                {players.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-4 font-bold text-white uppercase">{p.name}</td>
                    <td className="py-4 px-4 opacity-70 text-xs">{p.pc_id}</td>
                    <td className="py-4 px-4 font-bold text-[#00ffff] shadow-inner">
                      {p.level === "RECONSTRUCTED" ?
                        <span className="text-[#00ff9f]/80 italic">√ Success</span> :
                        p.level === "TERMINATED" ?
                          <span className="text-[#ff003c]/80">× Purged</span> :
                          `[NODE-0${p.level}]`
                      }
                    </td>
                    <td className="py-4 px-4 text-[#ff003c] font-bold">{p.timeRemaining}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-sm border ${p.status === "ACTIVE" ? "border-[#00ff00] text-[#00ff00] bg-[#00ff00]/10" :
                        p.status === "COMPLETED" ? "border-[#00ffff] text-[#00ffff] bg-[#00ffff]/10" :
                          "border-[#ff003c] text-[#ff003c] bg-[#ff003c]/10"
                        }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => kickPlayer(p.id, p.pc_id)}
                        className="p-2 text-[#ff003c]/30 hover:text-[#ff003c] hover:bg-[#ff003c]/20 rounded transition-all opacity-0 group-hover:opacity-100"
                        title="Force Terminate"
                      >
                        <Zap className="w-4 h-4 fill-[#ff003c]/20" />
                      </button>
                    </td>
                  </tr>
                ))}
                {players.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="text-center py-16 opacity-30 italic uppercase tracking-widest text-sm">
                      No active sessions detected on the grid.
                    </td>
                  </tr>
                )}
                {loading && (
                  <tr>
                    <td colSpan={6} className="text-center py-16 opacity-30 italic uppercase tracking-widest text-sm">
                      Scanning signal frequencies...
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
