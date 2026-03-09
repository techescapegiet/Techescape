"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { GlitchText } from "@/components/ui/GlitchText";
import { KeyRound, ShieldAlert, RefreshCw, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [token, setToken] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState("");
  const { login, isEventLive, checkEventStatus } = useGame();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEventLive) {
      setError("SYSTEM OFFLINE: EVENT NOT STARTED");
      return;
    }

    if (!token.trim()) {
      setError("TOKEN CANNOT BE EMPTY");
      return;
    }

    setIsAuthenticating(true);
    setError("");

    const result = await login(token);

    if (!result.success) {
      setError(result.error || "AUTHENTICATION FAILED");
      setIsAuthenticating(false);
    }
  };

  if (!isEventLive) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full bg-[#110000] border-2 border-[#ff003c] p-10 box-glow text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full border border-[#ff003c] bg-[#ff003c]/10 animate-pulse">
              <ShieldAlert className="w-16 h-16 text-[#ff003c]" />
            </div>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white mb-4">
            <GlitchText text="SYSTEM OFFLINE" />
          </h1>
          <p className="text-sm uppercase tracking-[0.2em] text-[#ff003c] font-bold mb-10 leading-relaxed">
            WAIT FOR THE EVENT<br />MISSION DASHBOARD IS NOT ONLINE
          </p>

          <div className="space-y-4">
            <button
              onClick={() => checkEventStatus()}
              className="w-full bg-[#ff003c] text-white py-4 font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3"
            >
              <RefreshCw className="w-4 h-4" /> RE-CHECK STATUS
            </button>

            <div className="pt-6 border-t border-white/10">
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4 font-bold">Registration Portal is Open</p>
              <button
                onClick={() => router.push("/register")}
                className="w-full bg-[#00ffff] text-black py-4 font-black uppercase tracking-widest text-xs hover:bg-white transition-all flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" /> GET YOUR ACCESS PIN
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

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

          <div className="pt-4 h-12 relative flex flex-col items-center justify-center gap-4">
            {isAuthenticating ? (
              <TerminalText text="AUTHENTICATING..." speed={50} className="text-[#00ffff] font-bold" />
            ) : (
              <>
                <GlowingButton type="submit" className="w-full">
                  AUTHORIZE
                </GlowingButton>
                <button
                  type="button"
                  onClick={() => router.push("/register")}
                  className="text-[10px] text-[#00ff00]/50 hover:text-[#00ff00] transition-colors uppercase tracking-[0.2em] font-bold"
                >
                  New Operative? Register at HQ
                </button>
              </>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
