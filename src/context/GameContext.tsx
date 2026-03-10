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
  user: User | null;
  isEventLive: boolean;
  isGameStarted: boolean;
  checkEventStatus: () => Promise<{ isLive: boolean, isStarted: boolean }>;
  erasePlayerData: () => Promise<void>;
  handleMissionFailure: (reason: string) => Promise<void>;
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
    const { data, error } = await supabase
      .from("event_settings")
      .select("is_live, game_started")
      .eq("id", 1)
      .maybeSingle();

    if (data && !error) {
      setIsEventLive(data.is_live);
      setIsGameStarted(data.game_started || false);
      return { isLive: data.is_live, isStarted: data.game_started || false };
    }
    return { isLive: false, isStarted: false };
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

    // When game is started, sync local start time so the 60 min countdown begins perfectly across all devices
    const savedPlayer = localStorage.getItem("escape_room_player");
    let currentStartTime = player.startTime;

    // If the timer was frozen (i.e., they logged in early), we override their local start time to NOW
    if (savedPlayer) {
      const parsed = JSON.parse(savedPlayer);
      if (parsed.startTime < Date.now() - 3600000 && timeRemaining === TOTAL_MISSION_TIME) {
        // It's a stale start time from an earlier login, reset it.
        const newTime = Date.now();
        currentStartTime = newTime;
        const updatedPlayer = { ...parsed, startTime: newTime };
        setPlayer(updatedPlayer);
        localStorage.setItem("escape_room_player", JSON.stringify(updatedPlayer));
      }
    }

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - currentStartTime) / 1000);
      const remaining = Math.max(0, TOTAL_MISSION_TIME - elapsed);
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        handleMissionFailure("TIME EXPIRED: SYSTEM LOCKDOWN INITIATED");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [player, isGameStarted]);

  const erasePlayerData = async () => {
    if (!player) return;
    try {
      // 0. Generate a NEW PIN to invalidate the old one
      const newPin = Math.floor(100000 + Math.random() * 900000).toString();

      // 1. Release PC assignment and change PIN
      await supabase
        .from("access_keys")
        .update({
          pin: newPin,
          assigned_to: null,
          roll_number: null,
          email: null,
          academic_year: null,
          department: null,
          user_id: null,
          is_assigned: false
        })
        .eq("pc_id", player.id);

      // 2. Mark session as failed in players table (THE PERMANENT BAN)
      await supabase.from("players").update({
        status: 'failed',
        pc_id: null,
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

  const handleMissionFailure = async (_reason: string) => {
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
        department: data.department || "Computer Science"
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

  const completeLevel = async (fragment: string) => {
    if (!player) return;
    const updatedPlayer = {
      ...player,
      currentLevel: player.currentLevel + 1,
      fragments: [...player.fragments, fragment],
    };
    setPlayer(updatedPlayer);
    localStorage.setItem("escape_room_player", JSON.stringify(updatedPlayer));
    await syncPlayerToSupabase(updatedPlayer);

    if (updatedPlayer.currentLevel > 5) {
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
      const { error: updateError } = await supabase
        .from("access_keys")
        .update({
          is_assigned: true,
          assigned_to: details.name,
          roll_number: details.roll.toUpperCase(),
          email: details.email.toLowerCase(),
          academic_year: details.year,
          department: details.dept,
          user_id: user.id
        })
        .eq("pc_id", pc.pc_id);

      if (updateError) {
        console.error("Update PC error details:", updateError);
        return { success: false, error: "ASSIGNMENT FAILED: " + updateError.message };
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
        checkEventStatus,
        erasePlayerData,
        handleMissionFailure
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
