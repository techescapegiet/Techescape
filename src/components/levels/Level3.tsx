"use client";

import { useState, useEffect, useCallback } from "react";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { CheckCircle2, ShieldAlert, Users, SplitSquareVertical, AlertCircle, Loader2, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { CollabLobby } from "./CollabLobby";
import { supabase } from "@/lib/supabase";

import { getMCQs, AcademicYear, Department, MCQQuestion } from "@/lib/questionBank";

interface OnlinePlayer {
  id: string; // Session UUID
  pc_id: string; // PC name
  current_level: number;
  assigned_to?: string;
}

export function Level3() {
  const { completeLevel, player, handleMissionFailure } = useGame();
  const [mode, setMode] = useState<"choice" | "solo" | "collab">("choice");
  const [session, setSession] = useState<{ id: string, partnerId: string, role: "host" | "guest", partnerName?: string } | null>(null);

  // Dynamic state for collab
  const [currentStep, setCurrentStep] = useState(0);
  const [attempts, setAttempts] = useState(3);
  const [hostAnswered, setHostAnswered] = useState(false);
  const [guestAnswered, setGuestAnswered] = useState(false);
  const [status, setStatus] = useState<"active" | "completed" | "failed">("active");

  // Local state
  const [selected, setSelected] = useState<number | null>(null);
  const [partnerSelection, setPartnerSelection] = useState<number | null>(null);
  const [pingedIndex, setPingedIndex] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);
  const [errorFlash, setErrorFlash] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Dynamic Syllabus Questions
  const [myQuestions, setMyQuestions] = useState<MCQQuestion[]>([]);
  const [partnerQuestions, setPartnerQuestions] = useState<MCQQuestion[]>([]);

  // Setup My Questions
  useEffect(() => {
    if (player?.academicYear && player?.department) {
      if (mode === "collab" && session?.id) {
        const myOffset = session.role === "host" ? 0 : 3;
        setMyQuestions(getMCQs(
          player.academicYear as AcademicYear,
          player.department as Department,
          session.id,
          myOffset
        ));
      } else {
        // Solo or choice mode
        setMyQuestions(getMCQs(player.academicYear as AcademicYear, player.department as Department));
      }
    }
  }, [player, mode, session?.id, session?.role]);

  // Setup Partner Questions
  useEffect(() => {
    if (mode === "collab" && session?.partnerId && session?.id) {
      const fetchPartnerData = async () => {
        const { data, error } = await supabase
          .from("players")
          .select("id, access_keys(academic_year, department)")
          .eq("id", session.partnerId)
          .single();

        if (error) {
          console.error("Partner details fetch error", error);
          setPartnerQuestions(getMCQs("1st Year", "Computer Science"));
          return;
        }

        const keys: any = Array.isArray(data?.access_keys) ? data?.access_keys[0] : data?.access_keys;
        const pYear = keys?.academic_year || "1st Year";
        const pDept = keys?.department || "Computer Science";

        // Partner uses the REVERSE offset
        const partnerOffset = session.role === "host" ? 3 : 0;
        setPartnerQuestions(getMCQs(
          pYear as AcademicYear,
          pDept as Department,
          session.id,
          partnerOffset
        ));
      };
      fetchPartnerData();
    }
  }, [mode, session?.id, session?.partnerId, session?.role]);

  const skipLevel = async () => {
    if (mode === "collab" && session) {
      await supabase.from("collab_sessions").update({
        status: "completed"
      }).eq("id", session.id);
    } else {
      setSuccess(true);
      setTimeout(() => completeLevel("BINARY"), 1000);
    }
  };

  useEffect(() => {
    if (mode !== "collab" || !session) return;

    const channel = supabase
      .channel(`session-${session.id}`)
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "collab_sessions",
        filter: `id=eq.${session.id}`
      }, (payload) => {
        const data = payload.new;
        setCurrentStep(data.current_step);
        setAttempts(data.attempts_left);
        setHostAnswered(data.host_answered);
        setGuestAnswered(data.guest_answered);
        setStatus(data.status);

        if (data.status === "completed") {
          setSuccess(true);
          setTimeout(() => completeLevel("BINARY"), 3000);
        } else if (data.status === "failed") {
          handleMissionFailure("SHIELD REJECTION: COLLABORATION FAILED");
        }
      })
      .on("broadcast", { event: "selection" }, ({ payload }) => {
        if (payload.sessionId !== player?.sessionId) {
          setPartnerSelection(payload.index);
        }
      })
      .on("broadcast", { event: "ping" }, ({ payload }) => {
        if (payload.sessionId !== player?.sessionId) {
          setPingedIndex(payload.index);
          setTimeout(() => setPingedIndex(null), 2000);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [mode, session, player?.sessionId, completeLevel]);

  // Broadcast selection when it changes
  useEffect(() => {
    if (mode === "collab" && session && selected !== null) {
      const channel = supabase.channel(`session-${session.id}`);
      channel.send({
        type: "broadcast",
        event: "selection",
        payload: { sessionId: player?.sessionId, index: selected }
      });
    }
  }, [selected, mode, session, player?.sessionId]);

  const handleJoinCollab = useCallback((sessionId: string, partnerId: string, role: "host" | "guest", partnerName?: string) => {
    setSession({ id: sessionId, partnerId, role, partnerName });
    setMode("collab");
    setPartnerSelection(null);
    setPingedIndex(null);
  }, []);

  const sendPing = (index: number) => {
    if (mode === "collab" && session) {
      const channel = supabase.channel(`session-${session.id}`);
      channel.send({
        type: "broadcast",
        event: "ping",
        payload: { sessionId: player?.sessionId, index }
      });
    }
  };

  const submitAnswer = async () => {
    if (selected === null) return;

    if (mode === "solo") {
      const isCorrect = selected === myQuestions[currentStep].correct;
      if (isCorrect) {
        if (currentStep < 2) {
          setCurrentStep(currentStep + 1);
          setSelected(null);
          setShowHint(false);
        } else {
          setSuccess(true);
          setTimeout(() => completeLevel("BINARY"), 3000);
        }
      } else {
        setErrorFlash(true);
        handleMissionFailure("SOLO INFILTRATION DETECTED AND NEUTRALIZED");
      }
      return;
    }

    if (!session) return;
    // Handle collaborative answer submission
    const isCorrect = selected === myQuestions[currentStep].correct;

    if (!isCorrect) {
      // Wrong answer resets BOTH for that step and subtracts attempt
      const newAttempts = attempts - 1;
      const newStatus = newAttempts <= 0 ? "failed" : "active";

      await supabase.from("collab_sessions").update({
        attempts_left: newAttempts,
        host_answered: false,
        guest_answered: false,
        status: newStatus
      }).eq("id", session.id);

      setErrorFlash(true);
      setTimeout(() => setErrorFlash(false), 800);
      setSelected(null);
      return;
    }

    // Correct answer - update our flag
    const update: any = session.role === "host" ? { host_answered: true } : { guest_answered: true };

    // Check if both answered correct after this update
    const bothAnswered = (session.role === "host" ? true : hostAnswered) &&
      (session.role === "guest" ? true : guestAnswered);

    if (bothAnswered) {
      if (currentStep < 2) {
        // Go to next question
        await supabase.from("collab_sessions").update({
          ...update,
          current_step: currentStep + 1,
          host_answered: false,
          guest_answered: false
        }).eq("id", session.id);
        setShowHint(false);
      } else {
        // Finish level
        await supabase.from("collab_sessions").update({
          ...update,
          status: "completed"
        }).eq("id", session.id);
      }
    } else {
      await supabase.from("collab_sessions").update(update).eq("id", session.id);
    }

    setSelected(null);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-12 mt-12 border border-[#00ff00] bg-[#002200]/50 box-glow text-center">
        <CheckCircle2 className="w-24 h-24 text-[#00ff00] mb-6 animate-pulse" />
        <h2 className="text-4xl font-bold text-[#00ff00] text-glow mb-4">AUTHENTICATION SUCCESSFUL</h2>
        <p className="text-xl mb-6 text-white">{session ? "COLLAB" : "SOLO"} CODE WORD RECOVERED:</p>
        <div className="text-5xl font-mono font-bold text-[#00ffff] tracking-widest bg-black p-6 border border-[#00ffff]">
          <TerminalText text="BINARY" />
        </div>
      </div>
    );
  }

  if (mode === "choice") {
    return (
      <div className="flex flex-col h-full mt-6 gap-8">
        <div className="border border-[#00ff00]/30 bg-black/50 p-6 box-glow">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-[#ff003c] animate-pulse" />
            NODE 3: MULTI-FACTOR AUTHENTICATION
          </h2>
          <TerminalText text="Warning: This node requires high-level theoretical clearance. Collaboration recommended." speed={20} />
        </div>

        <button
          onClick={skipLevel}
          className="bg-white/5 hover:bg-white/10 text-white/20 hover:text-white/40 text-[10px] px-2 py-1 rounded border border-white/10 transition-colors self-center"
        >
          DEBUG: SKIP
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
          <div className="border border-[#00ff00]/30 p-8 flex flex-col bg-[#001100] group hover:border-[#00ff00] transition-colors">
            <SplitSquareVertical className="w-16 h-16 text-[#00ff00] mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-2xl font-bold mb-4">SOLO INFILTRATION</h3>
            <p className="opacity-70 mb-8 flex-1 text-lg">Attempt to bypass Node 3 protocols alone. Failure results in immediate session reset.</p>
            <GlowingButton onClick={() => setMode("solo")} className="w-full">INITIALIZE SOLO</GlowingButton>
          </div>

          <div className="border border-[#00ffff]/30 p-8 flex flex-col bg-[#000811] group hover:border-[#00ffff] transition-colors">
            <Users className="w-16 h-16 text-[#00ffff] mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-2xl font-bold mb-4 text-[#00ffff]">TACTICAL PARTNERSHIP</h3>
            <p className="opacity-70 mb-8 flex-1 text-lg text-[#00ffff]/80">Collaborate with another online operative. Solve dual algorithms simultaneously to proceed.</p>
            <GlowingButton onClick={() => setMode("collab")} variant="cyan" className="w-full">CONTACT REINFORCEMENTS</GlowingButton>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "collab" && !session) {
    return (
      <div className="mt-6 flex flex-col gap-6">
        <button onClick={() => setMode("choice")} className="text-[#00ff00] hover:underline flex items-center gap-2">← ABORT AND RETURN</button>
        <CollabLobby onJoinSession={handleJoinCollab} />
      </div>
    );
  }

  const q = myQuestions[currentStep];

  if (!q) return null;

  const amIAnswered = mode === "collab" ? (session?.role === "host" ? hostAnswered : guestAnswered) : false;
  const partnerAnswered = mode === "collab" ? (session?.role === "host" ? guestAnswered : hostAnswered) : false;

  return (
    <div className="flex flex-col h-full mt-6 gap-6">
      <div className="flex justify-between items-center bg-black/80 border border-[#00ffff]/30 p-4 box-glow">
        <div className="flex items-center gap-4">
          <div className="p-2 border border-[#00ffff] rounded">
            <Users className="w-6 h-6 text-[#00ffff]" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-tighter text-[#00ffff] font-bold">Partnership Active</div>
            <div className="font-mono text-sm uppercase">YOU + {session?.partnerName || `OPERATIVE ${session?.partnerId}`}</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-xs uppercase text-[#ff003c] font-bold">Shield Stability</div>
            <div className={cn("font-mono text-xl", attempts === 1 ? "text-[#ff003c] animate-pulse" : "text-[#00ff00]")}>
              {attempts}/3 CYCLES REMAINING
            </div>
          </div>
          <div className="h-10 w-[2px] bg-white/10" />
          <div className="text-right">
            <div className="text-xs uppercase text-[#00ffff] font-bold">Synchrony</div>
            <div className="font-mono text-xl">STEP {currentStep + 1}/3</div>
          </div>
        </div>
      </div>

      <div className={cn("grid gap-6 flex-1", mode === "solo" ? "grid-cols-1 max-w-3xl mx-auto w-full" : "grid-cols-1 md:grid-cols-2")}>
        {/* Left Side: My Terminal */}
        <div className={cn(
          "border-2 p-6 flex flex-col bg-black transition-all",
          errorFlash ? "border-[#ff003c] animate-shake" : amIAnswered ? "border-[#00ff00]/50 opacity-80" : "border-[#00ffff]"
        )}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#00ffff] tracking-widest uppercase">My Interface</h3>
            <div className="flex items-center gap-4">
              {!amIAnswered && (
                <button onClick={() => setShowHint(true)} className="text-[10px] text-[#00ffff]/60 hover:text-[#00ffff] uppercase font-bold">Hint</button>
              )}
              {amIAnswered && <CheckCircle2 className="w-6 h-6 text-[#00ff00] animate-bounce" />}
            </div>
          </div>

          {!amIAnswered ? (
            <>
              <p className="text-xl font-bold mb-4 min-h-[80px] leading-relaxed italic border-l-2 border-[#00ffff] pl-4">
                "{q.question}"
              </p>
              {showHint && (
                <div className="mb-6 p-2 bg-[#00ffff]/5 border border-[#00ffff]/20 text-[#00ffff] text-xs italic animate-pulse">
                  HINT: {q.explanation || "Try to think about the core concept."}
                </div>
              )}
              <div className="grid grid-cols-1 gap-4">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelected(idx)}
                    className={cn(
                      "p-4 text-left border font-mono transition-all relative overflow-hidden",
                      selected === idx ? "border-[#00ffff] bg-[#00ffff]/20 text-[#00ffff]" : "border-[#00ffff]/20 hover:bg-[#00ffff]/10",
                      pingedIndex === idx && "animate-pulse border-[#ff003c] bg-[#ff003c]/10"
                    )}
                  >
                    {pingedIndex === idx && (
                      <div className="absolute top-0 right-0 bg-[#ff003c] text-white text-[8px] px-2 py-0.5 font-bold animate-bounce">
                        LOOK HERE!
                      </div>
                    )}
                    <span className="mr-4 opacity-50">[{String.fromCharCode(65 + idx)}]</span> {opt}
                  </button>
                ))}
              </div>
              <button
                onClick={submitAnswer}
                disabled={selected === null}
                className="mt-8 py-3 bg-[#00ffff] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
              >
                Transmit Response
              </button>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
              <Loader2 className="w-12 h-12 text-[#00ff00] animate-spin" />
              <p className="text-[#00ff00] font-mono animate-pulse uppercase tracking-widest">Response Stored. Awaiting Synchrony...</p>
            </div>
          )}
        </div>

        {/* Right Side: Partner Terminal */}
        {mode !== "solo" && (
          <div className={cn(
            "border-2 p-6 flex flex-col bg-[#000508]/80 transition-all border-dashed",
            partnerAnswered ? "border-[#00ff00]/50" : "border-white/20"
          )}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold opacity-50 tracking-widest uppercase">Partner Feed ({session?.partnerName || session?.partnerId})</h3>
              {partnerAnswered && <CheckCircle2 className="w-6 h-6 text-[#00ff00]" />}
            </div>

            <div className="flex-1 flex flex-col gap-4">
              {partnerAnswered ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black/40 text-center gap-6">
                  <div className="w-20 h-20 border-2 border-[#00ff00] rounded-full flex items-center justify-center border-t-transparent animate-spin" />
                  <p className="text-[#00ff00] font-mono tracking-widest uppercase">Partner Secured Fragment</p>
                </div>
              ) : (
                <div className="flex flex-col flex-1">
                  <p className="text-sm opacity-50 italic mb-4">"{partnerQuestions[currentStep]?.question || "..."}"</p>
                  <div className="grid grid-cols-1 gap-2 flex-1">
                    {partnerQuestions[currentStep]?.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendPing(idx)}
                        className={cn(
                          "p-3 text-left border text-xs font-mono transition-all group relative",
                          partnerSelection === idx ? "border-[#00ff00] bg-[#00ff00]/10 text-[#00ff00]" : "border-white/5 hover:border-white/20"
                        )}
                      >
                        <span className="opacity-30 group-hover:opacity-100 transition-opacity absolute right-2 text-[8px] uppercase">Click to Suggest</span>
                        <span className="mr-2 opacity-30">[{String.fromCharCode(65 + idx)}]</span> {opt}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-mono opacity-50 animate-pulse">
                    <Activity className="w-3 h-3 text-[#00ffff]" />
                    SYNCING LIVE ACTIONS...
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 p-4 border border-white/5 bg-black/20 text-[10px] font-mono opacity-30 uppercase">
              Interactive link established. Click partner options to highlight them on their screen.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
