"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface Player {
  id: string;
  token: string;
  currentLevel: number;
  fragments: string[];
  startTime: number; // timestamp
}

interface GameContextType {
  player: Player | null;
  login: (token: string) => void;
  logout: () => void;
  completeLevel: (fragment: string) => void;
  timeRemaining: number;
  isTimeUp: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// 60 minutes in seconds
const TOTAL_MISSION_TIME = 60 * 60;

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_MISSION_TIME);
  const router = useRouter();

  useEffect(() => {
    // Load state from localStorage on mount for persistence across reloads
    const savedPlayer = localStorage.getItem("escape_room_player");
    if (savedPlayer) {
      const parsed = JSON.parse(savedPlayer);
      setPlayer(parsed);
      
      const elapsed = Math.floor((Date.now() - parsed.startTime) / 1000);
      const remaining = Math.max(0, TOTAL_MISSION_TIME - elapsed);
      setTimeRemaining(remaining);
    }
  }, []);

  useEffect(() => {
    if (!player) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [player]);

  const login = (token: string) => {
    const newPlayer = {
      id: `P-${Math.floor(100 + Math.random() * 900)}`,
      token,
      currentLevel: 2, // Level 1 disabled for now
      fragments: ["STACK"], // Pre-load Level 1 fragment
      startTime: Date.now(),
    };
    setPlayer(newPlayer);
    localStorage.setItem("escape_room_player", JSON.stringify(newPlayer));
    router.push("/dashboard");
  };

  const logout = () => {
    setPlayer(null);
    localStorage.removeItem("escape_room_player");
    router.push("/");
  };

  const completeLevel = (fragment: string) => {
    if (!player) return;
    const updatedPlayer = {
      ...player,
      currentLevel: player.currentLevel + 1,
      fragments: [...player.fragments, fragment],
    };
    setPlayer(updatedPlayer);
    localStorage.setItem("escape_room_player", JSON.stringify(updatedPlayer));
    
    // Redirect to the dashboard or next level
    if (updatedPlayer.currentLevel > 5) {
      router.push("/reconstruct");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <GameContext.Provider
      value={{
        player,
        login,
        logout,
        completeLevel,
        timeRemaining,
        isTimeUp: timeRemaining === 0,
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
