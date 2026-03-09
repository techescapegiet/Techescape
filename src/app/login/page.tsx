"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { GlitchText } from "@/components/ui/GlitchText";
import { KeyRound } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [token, setToken] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState("");
  const { login } = useGame();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setError("TOKEN CANNOT BE EMPTY");
      return;
    }

    setIsAuthenticating(true);
    setError("");

    // Simulate network delay for effect
    setTimeout(() => {
      // Allow any token for now (mocked state)
      login(token.toUpperCase());
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-[#001100] border border-[#00ff00]/50 p-8 box-glow relative"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ff00] to-transparent"></div>
        
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full border border-[#00ff00] bg-[#00ff00]/10 box-glow">
            <KeyRound className="w-12 h-12 text-[#00ff00]" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">
          <GlitchText text="SYSTEM LOGIN" />
        </h1>
        <p className="text-center opacity-70 mb-8 border-b border-[#00ff00]/30 pb-4">
          ENTER AUTHORIZED TOKEN TO ACCESS MISSION DASHBOARD
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest mb-2 text-[#00ff00]">
              Access Token
            </label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              disabled={isAuthenticating}
              className="w-full bg-black border border-[#00ff00] p-4 text-[#00ff00] font-mono text-xl uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#00ff00]/50 focus:border-[#00ff00] transition-all"
              placeholder="_ _ _ _ _"
            />
            {error && <p className="text-[#ff003c] text-sm mt-2 animate-pulse">{error}</p>}
          </div>

          <div className="pt-4 h-12 relative flex items-center justify-center">
            {isAuthenticating ? (
              <TerminalText text="AUTHENTICATING..." speed={50} className="text-[#00ffff] font-bold" />
            ) : (
              <GlowingButton type="submit" className="w-full">
                AUTHORIZE
              </GlowingButton>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
