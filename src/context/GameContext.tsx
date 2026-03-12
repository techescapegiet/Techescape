"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export interface Player {
  sessionId: string; // The UUID from players table
  id: string; // The PC ID (e.g., PC-01)
  token: string;
  currentLevel: number;
  fragments: string[];
  startTime: number;
  rollNumber: string;
  academicYear: string;
  department: string;
  selectedLanguage?: "C" | "Java" | "Python";
}

interface GameContextType {
  player: Player | null;
  login: (token: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  completeLevel: (fragment: string) => void;
  registerStudent: (details: { name: string; roll: string; email: string; year: string; dept: string }) => Promise<{ success: boolean; pcId?: string; pin?: string; error?: string }>;
  timeRemaining: number;
  isTimeUp: boolean;
  syncOfflineStatus: () => void;
  signInWithGoogle: () => Promise<void>;
  user: any;
  isEventLive: boolean; // Controls access to login
  isGameStarted: boolean; // Controls access to dashboard
  unlockedLevel: number; // Controls progression between levels
  globalStartTime: number | null;
  checkEventStatus: () => Promise<{ isLive: boolean, isStarted: boolean, startTime: number | null, unlockedLevel: number }>;
  erasePlayerData: () => Promise<void>;
  handleMissionFailure: (reason: string) => Promise<void>;
  setPlayerLanguage: (lang: "C" | "Java" | "Python") => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// 60 minutes in seconds
const TOTAL_MISSION_TIME = 60 * 60;

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_MISSION_TIME);
  const [user, setUser] = useState<User | null>(null);
  const [isEventLive, setIsEventLive] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [globalStartTime, setGlobalStartTime] = useState<number | null>(null);
  const router = useRouter();

  // Sync player to Supabase using session history model
  const syncPlayerToSupabase = async (p: Player) => {
    try {
      await supabase.from("players").update({
        current_level: p.currentLevel,
        is_online: true,
        last_seen: new Date().toISOString()
      }).eq("id", p.sessionId);
    } catch (error) {
      console.error("Error syncing player to Supabase:", error);
    }
  };

  const syncOfflineStatus = async () => {
    if (!player) return;
    try {
      await supabase.from("players").update({ is_online: false }).eq("id", player.sessionId);
    } catch (error) {
      console.error("Error syncing offline status:", error);
    }
  };

  useEffect(() => {
    const savedPlayer = localStorage.getItem("escape_room_player");
    if (savedPlayer) {
      const parsed = JSON.parse(savedPlayer);
      setPlayer(parsed);

      const elapsed = Math.floor((Date.now() - parsed.startTime) / 1000);
      const remaining = Math.max(0, TOTAL_MISSION_TIME - elapsed);
      setTimeRemaining(remaining);

      syncPlayerToSupabase(parsed);
    }

    // Auth Listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Event Status Check
    checkEventStatus();

    // Listen for event status changes
    const statusChannel = supabase.channel("realtime-event-status")
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "event_settings",
        filter: "id=eq.1"
      }, (payload) => {
        console.log("EVENT SETTINGS UPDATED:", payload.new);
        setIsEventLive(payload.new.is_live);
        setIsGameStarted(payload.new.game_started || false);
        setUnlockedLevel(payload.new.unlocked_level ?? 1);
        
        // Parse global start time if available
        if (payload.new.game_started && payload.new.maintenance_message?.startsWith("START_TIME:")) {
          const ts = parseInt(payload.new.maintenance_message.split(":")[1]);
          if (!isNaN(ts)) setGlobalStartTime(ts);
        } else {
          setGlobalStartTime(null);
        }
      })
      .subscribe((status) => {
        console.log("Supabase Realtime Status:", status);
      });

    // Heartland keep-alive
    const interval = setInterval(() => {
      if (player) syncPlayerToSupabase(player);
    }, 30000);

    return () => {
      clearInterval(interval);
      subscription.unsubscribe();
      supabase.removeChannel(statusChannel);
      syncOfflineStatus();
    };
  }, []);

  const checkEventStatus = async () => {
    const { data } = await supabase
      .from("event_settings")
      .select("is_live, game_started, maintenance_message, unlocked_level")
      .eq("id", 1)
      .maybeSingle();

    if (data) {
      setIsEventLive(data.is_live);
      setIsGameStarted(data.game_started || false);
      setUnlockedLevel(data.unlocked_level ?? 1);
      
      let startTime = null;
      if (data.game_started && data.maintenance_message?.startsWith("START_TIME:")) {
        const ts = parseInt(data.maintenance_message.split(":")[1]);
        if (!isNaN(ts)) {
          startTime = ts;
          setGlobalStartTime(ts);
        }
      } else {
        setGlobalStartTime(null);
      }
      
      return { isLive: data.is_live, isStarted: data.game_started || false, startTime, unlockedLevel: data.unlocked_level || 1 };
    }
    return { isLive: false, isStarted: false, startTime: null, unlockedLevel: 1 };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/register"
      }
    });
    if (error) console.error("Login error:", error.message);
  };

  useEffect(() => {
    if (!player) return;

    if (!isGameStarted) {
      // Freeze timer at 1 hr if game hasn't started
      setTimeRemaining(TOTAL_MISSION_TIME);
      return;
    }

    // GAME HAS STARTED
    let currentStartTime = player.startTime;
    const now = Date.now();

    // Reset local start time if it was set way before the game actually started
    // (i.e. they were sitting in the lobby)
    if (!globalStartTime && (player.startTime < now - 1000)) {
      currentStartTime = now;
      const updatedPlayer = { ...player, startTime: now };
      setPlayer(updatedPlayer);
      localStorage.setItem("escape_room_player", JSON.stringify(updatedPlayer));
      syncPlayerToSupabase(updatedPlayer);
    }

    // Use global start time if available, otherwise fallback to local player startTime
    // SAFEGUARD: If globalStartTime is more than 1 hr old, it's stale (from a previous day/event). Ignore it.
    const isGlobalStale = globalStartTime && (now - globalStartTime > TOTAL_MISSION_TIME * 1000);
    const effectiveStartTime = (globalStartTime && !isGlobalStale) ? globalStartTime : currentStartTime;

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - effectiveStartTime) / 1000);
      const remaining = Math.max(0, TOTAL_MISSION_TIME - elapsed);
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        handleMissionFailure("TIME EXPIRED: SYSTEM LOCKDOWN INITIATED");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [player?.id, isGameStarted, globalStartTime]);

  // Dynamic Theme Engine: Updates global CSS variables based on level
  useEffect(() => {
    if (!player) {
      document.documentElement.style.setProperty("--accent-glow", "#00ffff");
      document.documentElement.style.setProperty("--bg-depth", "rgba(0, 17, 34, 0.8)");
      return;
    }

    const themes: Record<number, { glow: string; depth: string }> = {
      1: { glow: "#00ffff", depth: "rgba(0, 17, 34, 0.8)" },  // Cyan
      2: { glow: "#00ff88", depth: "rgba(0, 34, 17, 0.8)" },  // Seafoam
      3: { glow: "#0088ff", depth: "rgba(0, 8, 34, 0.8)" },   // Deep Blue
      4: { glow: "#ff8800", depth: "rgba(34, 17, 0, 0.8)" },   // Amber
      5: { glow: "#ff003c", depth: "rgba(34, 0, 8, 0.8)" },    // Alert Red
      6: { glow: "#ffffff", depth: "rgba(10, 10, 10, 0.9)" },  // White/Black
    };

    const currentTheme = themes[player.currentLevel] || themes[1];
    document.documentElement.style.setProperty("--accent-glow", currentTheme.glow);
    document.documentElement.style.setProperty("--bg-depth", currentTheme.depth);
  }, [player?.currentLevel]);

  const erasePlayerData = async () => {
    if (!player) return;
    try {
      const newPin = Math.floor(100000 + Math.random() * 900000).toString();
      // 1. RENEW PIN only. DO NOT wipe registration details (assigned_to, roll_number, etc.)
      await supabase
        .from("access_keys")
        .update({
          pin: newPin,
          // We keep the student details for the admin to see in the "FAILED" status
          is_assigned: true 
        })
        .eq("pc_id", player.id);

      // 2. Mark session as failed in players table
      await supabase.from("players").update({
        status: 'failed',
        is_online: false,
        last_seen: new Date().toISOString()
      }).eq("id", player.sessionId);

      // 3. Clear local state
      setPlayer(null);
      localStorage.removeItem("escape_room_player");

      console.log(`Session terminated for ${player.id}. Credentials invalidated.`);
    } catch (error) {
      console.error("Error erasing player data:", error);
    }
  };

  const handleMissionFailure = async (reason: string) => {
    console.log("Mission failed:", reason);
    // Just redirect to failure page, let the page handle the cinematic erasure
    router.push("/failure");
  };

  const login = async (token: string) => {
    try {
      const { data, error } = await supabase
        .from("access_keys")
        .select("pc_id, roll_number, academic_year, department")
        .eq("pin", token.toUpperCase())
        .eq("is_assigned", true) // Only allow login if PC is currently registered
        .single();

      if (error || !data) {
        return { success: false, error: "INVALID ACCESS TOKEN" };
      }

      // Fetch the active session for this PC
      const { data: sessionData } = await supabase
        .from("players")
        .select("id, roll_number")
        .eq("pc_id", data.pc_id)
        .eq("status", "active")
        .maybeSingle();

      const newPlayer: Player = {
        sessionId: sessionData?.id || "temp-" + Date.now(),
        id: data.pc_id,
        token: token.toUpperCase(),
        currentLevel: 1,
        fragments: [],
        startTime: Date.now(),
        rollNumber: data.roll_number || sessionData?.roll_number || "",
        academicYear: data.academic_year || "1st Year",
        department: data.department || "cse"
      };

      setPlayer(newPlayer);
      localStorage.setItem("escape_room_player", JSON.stringify(newPlayer));
      await syncPlayerToSupabase(newPlayer);
      router.push("/lobby");
      return { success: true };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, error: "CONNECTION ERROR" };
    }
  };

  const logout = () => {
    syncOfflineStatus();
    setPlayer(null);
    localStorage.removeItem("escape_room_player");
    router.push("/");
  };

  const setPlayerLanguage = (lang: "C" | "Java" | "Python") => {
    if (!player) return;
    const updatedPlayer = { ...player, selectedLanguage: lang };
    setPlayer(updatedPlayer);
    localStorage.setItem("escape_room_player", JSON.stringify(updatedPlayer));
  };

  const completeLevel = async (fragment: string) => {
    if (!player) return;
    
    // 1. Calculate the new state first
    const newFragments = player.fragments.includes(fragment) 
      ? player.fragments 
      : [...player.fragments, fragment];

    const updatedPlayer = {
      ...player,
      currentLevel: player.currentLevel + 1,
      fragments: newFragments,
    };

    // 2. Perform state update
    setPlayer(updatedPlayer);
    
    // 3. Side Effects (Outside of rendering/updating)
    localStorage.setItem("escape_room_player", JSON.stringify(updatedPlayer));
    syncPlayerToSupabase(updatedPlayer);
    
    // Update Level Logs in Supabase
    const levelKey = player.currentLevel.toString();
    supabase.rpc('update_player_level_logs', {
      player_id: updatedPlayer.sessionId,
      level_key: levelKey,
      timestamp: new Date().toISOString()
    });

    // 4. Perform navigation
    if (updatedPlayer.currentLevel > 5) {
      // Entering Reconstruction
      await supabase.from("players").update({
        status: "active",
        last_seen: new Date().toISOString()
      }).eq("id", updatedPlayer.sessionId);
      
      router.push("/reconstruct");
    } else {
      router.push("/dashboard");
    }
  };


  const registerStudent = async (details: { name: string; roll: string; email: string; year: string; dept: string }) => {
    try {
      if (!user) {
        console.error("Registration failed: User not authenticated");
        return { success: false, error: "AUTH REQUIRED" };
      }

      // 0. Check Session Log for Permanent Ban
      const { data: pastAttempts } = await supabase
        .from("players")
        .select("status")
        .or(`user_id.eq.${user.id},roll_number.eq.${details.roll.toUpperCase()}`)
        .in("status", ["failed", "completed"])
        .maybeSingle();

      if (pastAttempts) {
        return { success: false, error: "SYSTEM ALERT: OPERATIVE CREDENTIALS REVOKED. PREVIOUS RECORD OF MISSION FAILURE DETECTED." };
      }

      // 0. Check if this specific user already has a PC assigned
      const { data: userCurrent, error: userCheckError } = await supabase
        .from("access_keys")
        .select("pc_id, pin")
        .eq("user_id", user.id)
        .maybeSingle();

      if (userCheckError) console.error("User check error:", userCheckError);

      if (userCurrent) {
        return { success: true, pcId: userCurrent.pc_id, pin: userCurrent.pin };
      }

      // Roll Number Validation (Format: 2[3,4,5]U61 + 5 chars)
      const roll = details.roll.toUpperCase().trim();
      const rollPattern = /^2[345]U61[A-Z0-9]{5}$/;
      if (roll.length !== 10 || !rollPattern.test(roll)) {
        return { success: false, error: "INVALID ROLL NUMBER FORMAT (EXPECTED 2_U61_____)" };
      }

      // Check if roll number already assigned to ANYone
      const { data: existing, error: rollError } = await supabase
        .from("access_keys")
        .select("pc_id")
        .eq("roll_number", details.roll.toUpperCase())
        .maybeSingle();

      if (rollError) console.error("Roll check error:", rollError);

      if (existing) {
        return { success: false, error: "ROLL NUMBER ALREADY REGISTERED" };
      }

      // 1. Find an unassigned PC
      const { data: pc, error: findError } = await supabase
        .from("access_keys")
        .select("pc_id, pin")
        .eq("is_assigned", false)
        .limit(1)
        .maybeSingle();

      if (findError || !pc) {
        console.error("Find PC error:", findError);
        return { success: false, error: findError ? "DB FIND ERROR" : "NO AVAILABLE PCS REMAINING" };
      }

      // 2. Assign the PC in access_keys (For active session tracking)
      // Use eq("is_assigned", false) to prevent race conditions (Atomic assignment)
      const { error: updateError, count } = await supabase
        .from("access_keys")
        .update({
          is_assigned: true,
          assigned_to: details.name,
          roll_number: details.roll.toUpperCase(),
          email: details.email.toLowerCase(),
          academic_year: details.year,
          department: details.dept,
          user_id: user.id
        }, { count: 'exact' })
        .eq("pc_id", pc.pc_id)
        .eq("is_assigned", false);

      if (updateError || count === 0) {
        console.error("Update PC conflict or error:", updateError);
        // If count is 0, someone else grabbed this PC between our SELECT and UPDATE
        return { success: false, error: "TERMINAL ASSIGNMENT CONFLICT: PLEASE RETRY" };
      }

      // 3. Initialize Session Log (History & Ban System)
      const { data: session, error: sessionError } = await supabase
        .from("players")
        .insert({
          pc_id: pc.pc_id,
          user_id: user.id,
          roll_number: details.roll.toUpperCase(),
          email: details.email.toLowerCase(),
          token: pc.pin,
          status: 'active'
        })
        .select("id")
        .single();

      if (sessionError) {
        console.error("Session creation error:", sessionError);
        return { success: false, error: "SESSION INITIALIZATION FAILED" };
      }

      // 4. Update local state
      const newPlayer: Player = {
        sessionId: session.id,
        id: pc.pc_id,
        token: pc.pin,
        currentLevel: 1,
        fragments: [],
        startTime: Date.now(),
        rollNumber: details.roll.toUpperCase(),
        academicYear: details.year,
        department: details.dept
      };

      setPlayer(newPlayer);
      localStorage.setItem("escape_room_player", JSON.stringify(newPlayer));

      return { success: true, pcId: pc.pc_id, pin: pc.pin };
    } catch (err) {
      console.error("Registration exception:", err);
      return { success: false, error: "CONNECTION ERROR" };
    }
  };

  return (
    <GameContext.Provider
      value={{
        player,
        login,
        logout,
        completeLevel,
        registerStudent,
        timeRemaining,
        isTimeUp: timeRemaining === 0,
        syncOfflineStatus,
        signInWithGoogle,
        user,
        isEventLive,
        isGameStarted,
        unlockedLevel,
        globalStartTime,
        checkEventStatus,
        erasePlayerData,
        handleMissionFailure,
        setPlayerLanguage
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
