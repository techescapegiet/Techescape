"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { GlitchText } from "@/components/ui/GlitchText";
import { UserPlus, Monitor, Key, ArrowRight, Printer, Mail, Hash, BookOpen, Building2, LogIn, LogOut, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        roll: "",
        email: "",
        year: "1st Year",
        dept: "Computer Science"
    });
    const [isRegistering, setIsRegistering] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [error, setError] = useState("");
    const [assignment, setAssignment] = useState<{ pcId: string; pin: string } | null>(null);
    const [copied, setCopied] = useState(false);
    const { registerStudent, user, signInWithGoogle } = useGame();
    const router = useRouter();

    useEffect(() => {
        const checkExisting = async () => {
            if (!user) {
                setIsChecking(false);
                return;
            }

            const { data, error } = await supabase
                .from("access_keys")
                .select("pc_id, pin")
                .eq("user_id", user.id)
                .single();

            if (data && !error) {
                setAssignment({ pcId: data.pc_id, pin: data.pin });
            }
            setIsChecking(false);
        };

        checkExisting();
    }, [user]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Roll Number Validation (Format: 2[3,4,5]U61 + 5 chars)
        const roll = formData.roll.toUpperCase().trim();
        const rollPattern = /^2[345]U61[A-Z0-9]{5}$/;

        if (roll.length !== 10 || !rollPattern.test(roll)) {
            setError("INVALID FORMAT: MUST BE 10 CHARACTERS STARTING WITH 23U61, 24U61, OR 25U61");
            return;
        }

        if (!formData.name.trim() || !formData.roll.trim() || !formData.email.trim()) {
            setError("PLEASE FILL ALL REQUIRED FIELDS");
            return;
        }

        setIsRegistering(true);
        setError("");

        const result = await registerStudent(formData);

        if (result.success && result.pcId && result.pin) {
            setAssignment({ pcId: result.pcId, pin: result.pin });
        } else {
            setError(result.error || "REGISTRATION FAILED");
        }
        setIsRegistering(false);
    };

    if (isChecking) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <TerminalText text="ACCESSING LAB DATABASE..." className="text-[#00ffff] font-bold" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full bg-black/40 backdrop-blur-xl border border-[#00ffff]/30 p-10 box-glow text-center"
                >
                    <div className="flex justify-center mb-6">
                        <div className="p-4 rounded-full border border-[#00ffff] bg-[#00ffff]/10">
                            <LogIn className="w-12 h-12 text-[#00ffff]" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-black italic tracking-tighter text-white mb-2">
                        <GlitchText text="AUTH REQUIRED" />
                    </h1>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#00ffff]/60 font-bold mb-8">Sign in with Google to begin enrollment</p>

                    <button
                        onClick={signInWithGoogle}
                        className="w-full bg-white text-black py-4 font-black uppercase tracking-widest text-sm hover:bg-[#00ffff] transition-all flex items-center justify-center gap-3"
                    >
                        <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                        Sign in with Google
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full p-4 md:p-8">
            <AnimatePresence mode="wait">
                {!assignment ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full bg-black/40 backdrop-blur-xl border border-[#00ff00]/30 p-6 md:p-10 box-glow relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff00]/50 to-transparent"></div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-xl border border-[#00ff00]/50 bg-[#00ff00]/10">
                                <UserPlus className="w-8 h-8 text-[#00ff00]" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter text-white">
                                    <GlitchText text="OPERATIVE ENROLLMENT" />
                                </h1>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-[#00ff00]/60 font-bold">Secure Data Uplink Required</p>
                            </div>
                        </div>

                        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#00ff00]/70 flex items-center gap-2">
                                    <UserPlus className="w-3 h-3" /> Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black/60 border border-[#00ff00]/20 p-3 text-[#00ff00] font-mono focus:border-[#00ff00] outline-none transition-all"
                                    placeholder="EX: JOHN DOE"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#00ff00]/70 flex items-center gap-2">
                                    <Hash className="w-3 h-3" /> Roll Number
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.roll}
                                    onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                                    className="w-full bg-black/60 border border-[#00ff00]/20 p-3 text-[#00ff00] font-mono focus:border-[#00ff00] outline-none transition-all"
                                    placeholder="EX: 2024CS001"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#00ff00]/70 flex items-center gap-2">
                                    <Mail className="w-3 h-3" /> Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-black/60 border border-[#00ff00]/20 p-3 text-[#00ff00] font-mono focus:border-[#00ff00] outline-none transition-all"
                                    placeholder="OPERATIVE@INSTITUTION.EDU"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#00ff00]/70 flex items-center gap-2">
                                    <BookOpen className="w-3 h-3" /> Academic Year
                                </label>
                                <select
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    className="w-full bg-black/60 border border-[#00ff00]/20 p-3 text-[#00ff00] font-mono focus:border-[#00ff00] outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option>1st Year</option>
                                    <option>2nd Year</option>
                                    <option>3rd Year</option>
                                    <option>4th Year</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#00ff00]/70 flex items-center gap-2">
                                    <Building2 className="w-3 h-3" /> Department
                                </label>
                                <select
                                    value={formData.dept}
                                    onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                                    className="w-full bg-black/60 border border-[#00ff00]/20 p-3 text-[#00ff00] font-mono focus:border-[#00ff00] outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option>Computer Science</option>
                                    <option>Information Tech</option>
                                    <option>Electronics</option>
                                    <option>Mechanical</option>
                                    <option>Civil</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 pt-4">
                                {error && <p className="text-[#ff003c] text-xs mb-4 animate-pulse font-bold tracking-widest text-center">!! {error} !!</p>}

                                <div className="h-16 relative flex items-center justify-center">
                                    {isRegistering ? (
                                        <TerminalText text="SYNCHRONIZING WITH LAB GRID..." speed={30} className="text-[#00ffff] font-bold text-sm" />
                                    ) : (
                                        <GlowingButton type="submit" className="w-full h-full text-lg font-black tracking-tighter">
                                            INITIALIZE SEQUENCE
                                        </GlowingButton>
                                    )}
                                </div>
                            </div>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full bg-[#001100] border-2 border-[#00ffff] p-8 md:p-12 box-glow relative overflow-hidden text-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#00ffff]/5 to-transparent pointer-events-none" />

                        <motion.div
                            initial={{ rotate: -10, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block p-5 rounded-3xl bg-[#00ffff]/10 mb-6 border border-[#00ffff]/30"
                        >
                            <Monitor className="w-20 h-20 text-[#00ffff]" />
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-black text-[#00ffff] text-glow mb-2 uppercase tracking-tighter italic">Assignment Locked</h2>
                        <p className="opacity-60 font-mono text-xs tracking-[0.4em] uppercase mb-10">Verification ID: {user?.id.slice(0, 8)}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <div className="bg-black/80 border border-[#00ffff]/40 p-8 rounded-sm">
                                <p className="text-[10px] text-[#00ffff]/60 font-bold uppercase tracking-widest mb-4">Terminal Identifier</p>
                                <p className="text-6xl font-black text-white tracking-widest">{assignment.pcId}</p>
                            </div>
                            <div className="bg-black/80 border border-[#00ff00]/40 p-8 rounded-sm relative group">
                                <p className="text-[10px] text-[#00ff00]/60 font-bold uppercase tracking-widest mb-4">Secure Access PIN</p>
                                <div className="flex items-center justify-center gap-4">
                                    <p className="text-6xl font-black text-[#00ff00] tracking-widest">{assignment.pin}</p>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(assignment.pin);
                                            setCopied(true);
                                            setTimeout(() => setCopied(false), 2000);
                                        }}
                                        className="p-3 bg-[#00ff00]/10 hover:bg-[#00ff00]/20 border border-[#00ff00]/30 rounded-lg transition-all"
                                        title="Copy PIN"
                                    >
                                        {copied ? <Check className="w-6 h-6 text-[#00ff00]" /> : <Copy className="w-6 h-6 text-[#00ff00]" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#00ffff]/5 border border-[#00ffff]/20 p-6 rounded-sm text-left mb-10 space-y-4">
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-[#00ffff] text-black flex items-center justify-center font-bold text-xs shrink-0 mt-1">1</div>
                                <p className="text-sm opacity-80 leading-relaxed font-mono italic">Locate your designated terminal <span className="text-white font-bold underline">[{assignment.pcId}]</span> in the main lab area.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-[#00ffff] text-black flex items-center justify-center font-bold text-xs shrink-0 mt-1">2</div>
                                <p className="text-sm opacity-80 leading-relaxed font-mono italic">Input your secure 6-digit PIN <span className="text-white font-bold underline">[{assignment.pin}]</span> on the login interface.</p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={() => router.push("/login")}
                                className="w-full max-w-md bg-[#00ffff] text-black py-4 font-black uppercase tracking-widest text-sm hover:bg-white transition-all flex items-center justify-center gap-3"
                            >
                                Redirect to Start Mission <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mt-10 font-mono text-[8px] opacity-30 uppercase tracking-[0.5em]">
                            Clearance Level 4 // ID-{assignment.pcId}-{Date.now().toString().slice(-4)}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
