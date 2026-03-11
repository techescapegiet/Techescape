"use client";

import { useState, useEffect } from "react";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { Shield, Eye, Trash2, Power, RefreshCw, Zap, AlertTriangle, Users, Download, Archive, Filter, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { exportToCSV, exportToPDF } from "@/lib/exportUtils";
import { CyberAvatar } from "@/components/ui/CyberAvatar";

interface LivePlayer {
  id: string; // Session UUID
  pc_id: string;
  name: string;
  roll_number: string;
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
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [globalStartTime, setGlobalStartTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPurging, setIsPurging] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [isAuthWiping, setIsAuthWiping] = useState(false);
  const [sortField, setSortField] = useState<keyof LivePlayer>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "ACTIVE" | "COMPLETED" | "FAILED">("ALL");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAdmin(true);
    }
  };

  const fetchLiveStatus = async () => {
    const { data } = await supabase
      .from("event_settings")
      .select("is_live, game_started, maintenance_message")
      .eq("id", 1)
      .maybeSingle();
    if (data) {
      setIsLive(data.is_live);
      setIsGameStarted(data.game_started || false);
      
      if (data.game_started && data.maintenance_message?.startsWith("START_TIME:")) {
        const ts = parseInt(data.maintenance_message.split(":")[1]);
        if (!isNaN(ts)) setGlobalStartTime(ts);
      } else {
        setGlobalStartTime(null);
      }
    }
  };

  const toggleEventLive = async () => {
    const newStatus = !isLive;
    const { error } = await supabase
      .from("event_settings")
      .update({ is_live: newStatus })
      .eq("id", 1);

    if (!error) setIsLive(newStatus);
    else {
      console.error(error);
      alert("FAILED TO TOGGLE LIVE STATUS: " + error.message);
    }
  };

  const initiateProtocol = async () => {
    if (!isLive) {
      alert("Event must be online (GO LIVE) before initiating the protocol.");
      return;
    }
    const msg = isGameStarted
      ? "End the current game session? (This does NOT wipe data, just stops the global timer)"
      : "This will pull ALL waiting operatives from the lobby into Level 1 and sync their 60-minute timers. PROCEED?";

    if (!confirm(msg)) return;

    const newStatus = !isGameStarted;
    const updateData: { game_started: boolean; maintenance_message?: string } = { game_started: newStatus };
    
    if (newStatus) {
      // Starting the game: Set global start time
      updateData.maintenance_message = `START_TIME:${Date.now()}`;
    } else {
      // Ending the game: Reset maintenance message to default
      updateData.maintenance_message = "WAIT FOR THE EVENT - SYSTEM IS NOT ONLINE";
    }

    const { error } = await supabase
      .from("event_settings")
        .update(updateData)
      .eq("id", 1);

    if (!error) {
      setIsGameStarted(newStatus);
      if (newStatus) setGlobalStartTime(Date.now());
      else setGlobalStartTime(null);
    } else {
      console.error(error);
      alert("PROTOCOL FAILURE: " + error.message);
    }
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
      const formatted: LivePlayer[] = (data as unknown as Record<string, any>[]).map((p) => {
        // Calculate time remaining (60 mins from global start if started, else registration time)
        const start = globalStartTime || new Date(p.created_at).getTime();
        const now = Date.now();
        const elapsed = Math.floor((now - start) / 1000);
        const remaining = Math.max(0, 3600 - elapsed);
        const mins = Math.floor(remaining / 60);
        const secs = remaining % 60;

        return {
          id: p.id,
          pc_id: p.pc_id || "N/A",
          name: (Array.isArray(p.access_keys) ? p.access_keys[0]?.assigned_to : p.access_keys?.assigned_to) || "Unknown",
          roll_number: (Array.isArray(p.access_keys) ? p.access_keys[0]?.roll_number : p.access_keys?.roll_number) || "",
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

  const globalPurge = async (skipConfirm = false) => {
    if (!skipConfirm && !confirm("CRITICAL WARNING: This will DELETE all player data and reset all PC assignments. Are you absolutely sure?")) return;

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

  const finalizeBatch = async () => {
    if (players.length === 0) {
      const confirmEmpty = confirm("No active players found. Proceed with resetting all stations and starting a new batch?");
      if (!confirmEmpty) return;
    } else {
      if (!confirm("This will ARCHIVE current player results into the database and reset all PC stations for a new batch. Proceed?")) return;
    }

    setIsFinalizing(true);
    try {
      const { error } = await supabase.rpc('archive_and_purge_batch');
      if (error) throw error;
      alert("Batch Finalized & Archived Successfully.");
      fetchPlayers();
    } catch (e: any) {
      console.error(e);
      alert("Finalization failed: " + e.message);
    } finally {
      setIsFinalizing(false);
    }
  };

  const wipeAuthUsers = async () => {
    if (!confirm("CRITICAL: This will permanently delete all Google-authenticated player accounts from the Supabase Auth list. This is usually done AFTER the entire event is over. Proceed?")) return;

    setIsAuthWiping(true);
    try {
      const { error } = await supabase.rpc('delete_non_admin_users');
      if (error) throw error;
      alert("Auth list cleared successfully.");
    } catch (e: any) {
      console.error(e);
      alert("Auth Wipe Failed: " + e.message + "\n\nNote: Ensure you have run the database_setup.sql in Supabase Dashboard.");
    } finally {
      setIsAuthWiping(false);
    }
  };

  const downloadFullArchive = async () => {
    const { data, error } = await supabase
      .from("player_archives")
      .select("*")
      .order("archived_at", { ascending: false });

    if (error) {
      alert("Failed to fetch archives: " + error.message);
      return;
    }

    if (!data || data.length === 0) {
      alert("No archived data found.");
      return;
    }

    const formatted = (data as unknown as { academic_year: string, operative_name: string, final_node: string, status: string, archived_at: string, id: string }[]).map(d => ({
      id: d.id,
      pc_id: d.academic_year || "N/A", // Reusing field for export
      name: d.operative_name,
      level: d.final_node,
      status: d.status,
      timeRemaining: new Date(d.archived_at).toLocaleString()
    }));

    exportToCSV(formatted, `techescape-master-archive-${new Date().toISOString().split('T')[0]}.csv`);
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

  const handleSort = (field: keyof LivePlayer) => {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sortedPlayers = [...players].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (sortField === "level") {
      const getLexLevel = (l: string | number) => l === "TERMINATED" ? -1 : l === "RECONSTRUCTED" ? 99 : Number(l) || 0;
      aVal = getLexLevel(a.level) as unknown as string;
      bVal = getLexLevel(b.level) as unknown as string;
    }
    if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
    return 0;
  }).filter(p => {
    if (filterStatus === "ALL") return true;
    return p.status === filterStatus;
  });

  // Calculate Node Distribution
  const activePlayers = players.filter(p => p.status === 'ACTIVE');
  const distribution = activePlayers.reduce((acc, p) => {
    const lvl = p.level.toString();
    acc[lvl] = (acc[lvl] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
            <div className={`w-2 h-2 rounded-full ${isLive ? "bg-[#ff003c] animate-pulse" : "bg-gray-500"}`} />
            <div className="text-xs font-mono opacity-50 uppercase">{isLive ? "Live Feed Active" : "Offline / Locked"}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          <button onClick={() => exportToCSV(sortedPlayers)} className="px-4 py-2 border border-[#00ffff]/40 bg-[#00ffff]/10 text-[#00ffff] hover:bg-[#00ffff]/20 transition-all font-mono text-xs uppercase flex items-center gap-2">
            <Download className="w-4 h-4" /> CSV
          </button>
          <button onClick={() => exportToPDF(sortedPlayers)} className="px-4 py-2 border border-[#00ffff]/40 bg-[#00ffff]/10 text-[#00ffff] hover:bg-[#00ffff]/20 transition-all font-mono text-xs uppercase flex items-center gap-2">
            <Download className="w-4 h-4" /> PDF
          </button>

          <GlowingButton
            variant={isGameStarted ? "danger" : "cyan"}
            onClick={initiateProtocol}
            className="flex-1 md:flex-none py-2 px-6 shadow-[0_0_20px_#00ffff]"
          >
            <Power className="w-4 h-4 mr-2" />
            {isGameStarted ? "HALT EVENT PROTOCOL" : "INITIATE PROTOCOL (START GAME)"}
          </GlowingButton>

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
          <div className="p-4 border border-[#00ff00]/30 bg-[#002200]/50 box-glow">
            <div className="flex items-center justify-between mb-1">
              <span className="opacity-70 text-[10px] uppercase tracking-widest">Active Operatives</span>
              <Users className="w-3 h-3 text-[#00ff00]" />
            </div>
            <span className="text-3xl font-bold text-[#00ff00] text-glow">{players.filter(p => p.status === 'ACTIVE').length}</span>
          </div>

          <div className="p-4 border border-[#00ffff]/30 bg-[#001122]/50 box-glow">
            <div className="flex items-center justify-between mb-1">
              <span className="opacity-70 text-[10px] uppercase tracking-widest">Mission Success</span>
              <Zap className="w-3 h-3 text-[#00ffff]" />
            </div>
            <span className="text-3xl font-bold text-[#00ffff] text-glow">{players.filter(p => p.status === 'COMPLETED').length}</span>
          </div>

          <div className="p-4 border border-[#ff003c]/50 bg-[#220000]/80 box-glow">
            <div className="flex items-center justify-between mb-1">
              <span className="opacity-70 text-[10px] uppercase tracking-widest text-[#ffaaa]">Terminated</span>
              <Trash2 className="w-3 h-3 text-[#ff003c]" />
            </div>
            <span className="text-3xl font-bold text-[#ff003c] text-glow">{players.filter(p => p.status === 'FAILED').length}</span>
          </div>

          <div className="p-4 border border-[#ff003c]/30 bg-black box-glow mt-auto">
            <h3 className="text-[10px] font-bold text-[#ff003c] uppercase mb-3 flex items-center gap-2">
              <AlertTriangle className="w-3 h-3" /> Danger Zone
            </h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={finalizeBatch}
                disabled={isFinalizing || isPurging}
                className="w-full py-3 border border-yellow-500 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all font-bold uppercase tracking-tighter text-sm flex items-center justify-center gap-2"
              >
                {isFinalizing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Archive className="w-4 h-4" />}
                Finalize Batch & Archive
              </button>
              <button
                onClick={downloadFullArchive}
                className="w-full py-2 border border-[#00ffff] bg-[#00ffff]/10 text-[#00ffff] hover:bg-[#00ffff] hover:text-white transition-all font-bold uppercase tracking-tighter text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download History
              </button>
              <button
                onClick={wipeAuthUsers}
                disabled={isAuthWiping}
                className="w-full py-2 border border-purple-500 bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white transition-all font-bold uppercase tracking-tighter text-xs flex items-center justify-center gap-2"
              >
                {isAuthWiping ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Shield className="w-3 h-3" />}
                Wipe Google Auth List
              </button>
              <button
                onClick={() => globalPurge(false)}
                disabled={isPurging || isFinalizing}
                className="w-full py-2 border border-[#ff003c] bg-[#ff003c]/10 text-[#ff003c] hover:bg-[#ff003c] hover:text-white transition-all font-bold uppercase tracking-tighter text-[10px] flex items-center justify-center gap-2"
              >
                <Trash2 className="w-3 h-3" /> Emergency Wipe
              </button>
            </div>
            <p className="text-[10px] opacity-40 mt-3 text-center uppercase tracking-widest">Resets all stations for next round</p>
          </div>
        </div>

        <div className="md:col-span-3 border border-[#00ff00]/20 bg-black/80 p-4 md:p-6 box-glow overflow-hidden flex flex-col">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-[#00ff00]/10 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#00ffff]" />
              <span className="text-glow-cyan uppercase tracking-wider">Live Session Oversight</span>
            </h2>

            <div className="flex flex-wrap items-center gap-2">
              {(["ALL", "ACTIVE", "COMPLETED", "FAILED"] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 text-[10px] font-bold uppercase font-mono border transition-all ${filterStatus === status
                    ? "bg-white text-black border-white shadow-[0_0_10px_white]"
                    : "bg-transparent text-white/50 border-white/20 hover:border-white/50 hover:text-white"
                    }`}
                >
                  <Filter className="w-3 h-3 inline-block mr-1 opacity-50" />
                  {status}
                </button>
              ))}
              <div className="w-[1px] h-6 bg-white/20 mx-2" />
              <button onClick={fetchPlayers} className="p-1 hover:bg-white/5 rounded transition-all ml-auto">
                <RefreshCw className={`w-4 h-4 opacity-50 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-[10px] font-bold text-[#00ff00] uppercase mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Operative Deployment Density
            </h3>
            <div className="grid grid-cols-5 gap-1 h-32 items-end border-b border-[#00ff00]/20 pb-2">
              {[1, 2, 3, 4, 5].map(lvl => {
                const count = distribution[lvl.toString()] || 0;
                const height = activePlayers.length > 0 ? (count / activePlayers.length) * 100 : 0;
                const colors = ["#00ffff", "#00ff88", "#0088ff", "#ff8800", "#ff003c"];
                return (
                  <div key={lvl} className="relative group flex flex-col items-center flex-1">
                    <div 
                      className="w-full transition-all duration-1000 ease-out box-glow" 
                      style={{ 
                        height: `${Math.max(2, height)}%`, 
                        backgroundColor: colors[lvl-1],
                        boxShadow: `0 0 15px ${colors[lvl-1]}44`
                      }} 
                    />
                    <div className="absolute -top-6 text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Node {lvl}: {count}
                    </div>
                    <div className="text-[8px] font-mono mt-2 opacity-50 uppercase tracking-tighter">N{lvl}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left font-mono">
              <thead>
                <tr className="text-[#00ffff] text-[10px] tracking-[0.2em] uppercase border-b border-[#00ffff]/20">
                  <th className="py-4 px-4 cursor-pointer hover:bg-white/5" onClick={() => handleSort("name")}>Operative {sortField === "name" && (sortDir === "asc" ? "↑" : "↓")}</th>
                  <th className="py-4 px-4 cursor-pointer hover:bg-white/5" onClick={() => handleSort("pc_id")}>Terminal {sortField === "pc_id" && (sortDir === "asc" ? "↑" : "↓")}</th>
                  <th className="py-4 px-4 cursor-pointer hover:bg-white/5" onClick={() => handleSort("level")}>Node {sortField === "level" && (sortDir === "asc" ? "↑" : "↓")}</th>
                  <th className="py-4 px-4 cursor-pointer hover:bg-white/5" onClick={() => handleSort("timeRemaining")}>ETA {sortField === "timeRemaining" && (sortDir === "asc" ? "↑" : "↓")}</th>
                  <th className="py-4 px-4 cursor-pointer hover:bg-white/5" onClick={() => handleSort("status")}>Status {sortField === "status" && (sortDir === "asc" ? "↑" : "↓")}</th>
                  <th className="py-4 px-4 text-right"> Purge</th>
                </tr>
              </thead>
              <tbody>
                {sortedPlayers.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-4 font-bold text-white uppercase flex items-center gap-3">
                      <CyberAvatar seed={p.id} size="sm" />
                      <div className="flex flex-col">
                        <span>{p.name}</span>
                        {p.roll_number && <span className="text-[10px] opacity-50 font-mono tracking-wider">{p.roll_number}</span>}
                      </div>
                    </td>
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
                    <td className="py-4 px-4 text-right flex justify-end">
                      <button
                        onClick={() => kickPlayer(p.id, p.pc_id)}
                        className="p-1 text-[#ff003c]/40 hover:text-white hover:bg-[#ff003c] border border-transparent hover:border-[#ff003c] transition-all opacity-0 group-hover:opacity-100"
                        title="Force Terminate"
                      >
                        <Zap className="w-3 h-3" />
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
