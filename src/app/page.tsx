"use client";

import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { GlitchText } from "@/components/ui/GlitchText";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show the button after the typing animation finishes
    const timer = setTimeout(() => setShowButton(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <ShieldAlert className="w-24 h-24 mx-auto mb-4 text-[#ff003c] animate-pulse" />
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <GlitchText text="TECH ESCAPE ROOM" className="text-glow" />
        </h1>
        <h2 className="text-xl md:text-2xl opacity-80 uppercase tracking-widest text-[#00ffff]">
          Restore the GIET system before time runs out.
        </h2>
      </motion.div>

      <div className="w-full bg-[#001100]/80 border border-[#00ff00]/30 p-6 md:p-8 rounded-sm mb-12 box-glow relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ff00] to-transparent opacity-50"></div>
        <div className="mb-4 text-[#ff003c] font-bold">
          <TerminalText text="SYSTEM BREACH DETECTED. ACCESS LOCKED." speed={30} cursor={false} />
        </div>
        <div className="mb-4">
          <TerminalText text="INITIATING STUDENT RECOVERY PROTOCOL..." delay={1500} speed={30} cursor={false} />
        </div>
        <div className="text-lg leading-relaxed">
          <TerminalText
            text="The central server of Global Institute of Engineering and Technology has been compromised. The master unlock key has been fragmented across 5 security layers. You are selected to recover it."
            delay={3000}
            speed={20}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showButton ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlowingButton onClick={() => router.push("/login")} className="text-xl px-12 py-4">
          START MISSION
        </GlowingButton>
      </motion.div>
    </div>
  );
}
