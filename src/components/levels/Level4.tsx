"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { CheckCircle2, XCircle, Bug, Clock, LifeBuoy, Code2 } from "lucide-react";
import { motion } from "framer-motion";

type Language = "java" | "python" | "c";

interface DebugQuestion {
  code: string;
  error: string;
  answer: string[]; // Possible correct keywords
  explanation: string;
}

const QUESTION_POOL: Record<Language, DebugQuestion[]> = {
  java: [
    { code: "int x = 10 / 0;", error: "ArithmeticException", answer: ["zero", "0"], explanation: "You cannot divide by zero." },
    { code: "String s = \"test\" if (s == null)", error: "Syntax Error", answer: [";", "semicolon"], explanation: "Every line in Java needs a semicolon (;)." },
    { code: "int x = \"5\";", error: "Type Mismatch", answer: ["5", "int"], explanation: "You cannot put a text string into an integer variable." },
    { code: "System.out.println(hello);", error: "Variable not found", answer: ["\"", "quotes"], explanation: "Text must be inside double quotes like \"hello\"." },
    { code: "int[] a = {1, 2}; int x = a[2];", error: "Out of Bounds", answer: ["1", "index"], explanation: "The last position is 1, not 2 (starts at 0)." },
    { code: "public void main() { }", error: "Missing void static", answer: ["static"], explanation: "Java main methods must be 'public static void'." },
    { code: "if (x = 5)", error: "Assignment instead of Comparison", answer: ["==", "double equal"], explanation: "Use == to check if things are equal." }
  ],
  python: [
    { code: "print \"Hello\"", error: "SyntaxError", answer: ["(", "parentheses"], explanation: "Python 3 needs parentheses: print(\"Hello\")." },
    { code: "if x == 5\n  print(x)", error: "SyntaxError", answer: [":", "colon"], explanation: "If statements need a colon (:) at the end." },
    { code: "x = 5 + \"5\"", error: "TypeError", answer: ["int", "type"], explanation: "You cannot add a number and a text string." },
    { code: "for i in range(5)\nprint(i)", error: "IndentationError", answer: ["space", "indent"], explanation: "Python needs spaces/indents inside loops." },
    { code: "my_list = [1, 2]\nprint(my_list[5])", error: "IndexError", answer: ["range", "small"], explanation: "The list is too small to have a 5th item." },
    { code: "def func()\n  pass", error: "SyntaxError", answer: [":", "colon"], explanation: "Function definitions need a colon (:) at the end." },
    { code: "x = 5 / 0", error: "ZeroDivisionError", answer: ["zero", "0"], explanation: "You cannot divide by zero." }
  ],
  c: [
    { code: "int x = 10 / 0;", error: "Runtime Error", answer: ["zero", "0"], explanation: "You cannot divide by zero." },
    { code: "printf(\"Hello\")", error: "Syntax Error", answer: [";", "semicolon"], explanation: "C lines must end with a semicolon (;)." },
    { code: "int x; scanf(\"%d\", x);", error: "Segmentation Fault", answer: ["&", "address"], explanation: "Scanf needs an & before the variable name." },
    { code: "int main() { return \"done\"; }", error: "Type Mismatch", answer: ["0", "int"], explanation: "Main usually returns an integer like 0." },
    { code: "int arr[2]; arr[2] = 5;", error: "Buffer Overflow", answer: ["1", "index"], explanation: "Index 2 is past the end of a 2-item array." },
    { code: "char c = 'abc';", error: "Overflow", answer: ["1", "single"], explanation: "A 'char' can only hold 1 letter." },
    { code: "float x = 5;", error: "No error", answer: ["fine", "ok"], explanation: "Actually this is fine, but check the semicolon." }
  ]
};

export function Level4() {
  const { completeLevel, handleMissionFailure } = useGame();

  const [language, setLanguage] = useState<Language | null>(null);
  const [questions, setQuestions] = useState<DebugQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showHint, setShowHint] = useState(false);

  // Timer logic
  useEffect(() => {
    if (!language || success) return;
    if (timeLeft <= 0) {
      handleMissionFailure("TIME EXPIRED: SECURITY NODE 4 LOCKED");
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, language, success, handleMissionFailure]);

  const selectLanguage = (lang: Language) => {
    const shuffled = [...QUESTION_POOL[lang]].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 7));
    setLanguage(lang);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentQ = questions[currentIdx];
    const a = answer.toLowerCase().trim();

    // Check if the answer word is in our keyword list
    const isCorrect = currentQ.answer.some(keyword => a.includes(keyword.toLowerCase()));

    if (isCorrect) {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(currentIdx + 1);
        setAnswer("");
        setError(false);
        setShowHint(false);
      } else {
        setSuccess(true);
        setTimeout(() => completeLevel("SYNTAX"), 2000);
      }
    } else {
      const remaining = attempts - 1;
      setAttempts(remaining);
      setError(true);
      if (remaining <= 0) {
        handleMissionFailure("PATCH CRITICALLY REJECTED: SYSTEM LOCKDOWN");
      } else {
        setTimeout(() => setError(false), 1500);
      }
    }
  };

  if (!language) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-[#00ffff] tracking-[0.2em] uppercase text-glow">NODE_4_DEBUGGER</h2>
          <p className="text-[#00ff9f]/60 font-mono">SELECT A LANGUAGE TO START SCANNING</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          {(["java", "python", "c"] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => selectLanguage(lang)}
              className="group relative p-8 border border-[#00ffff]/20 bg-black hover:border-[#00ffff] transition-all duration-300 transform hover:-translate-y-2 box-glow"
            >
              <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-100 transition-opacity">
                <Code2 className="w-8 h-8 text-[#00ffff]" />
              </div>
              <h3 className="text-2xl font-mono font-bold text-white mb-2 uppercase">{lang}</h3>
              <p className="text-[10px] text-[#00ff9f]/40 uppercase tracking-widest group-hover:text-[#00ff9f]">Start Environment</p>
            </button>
          ))}
        </div>

        <div className="text-[#ff003c] text-xs font-mono animate-pulse border-t border-[#ff003c]/20 pt-4 flex items-center gap-2">
          <Clock className="w-4 h-4" /> 60 SECONDS REMAINING
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-12 mt-12 border border-[#00ff00] bg-[#002200]/50 box-glow text-center rounded-lg">
        <CheckCircle2 className="w-24 h-24 text-[#00ff00] mb-6 animate-pulse" />
        <h2 className="text-4xl font-bold text-[#00ff00] text-glow mb-4">BUG RESOLVED</h2>
        <div className="text-5xl font-mono font-bold text-[#00ffff] tracking-widest bg-black p-6 border border-[#00ffff]">
          SYNTAX
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full mt-6 gap-4 w-full max-w-5xl mx-auto">
      <div className="border-2 border-[#00ffff]/20 bg-black/60 p-4 box-glow flex items-center justify-between rounded-sm">
        <div className="flex items-center gap-8">
          <div>
            <div className="text-[10px] text-[#00ffff]/50 uppercase font-mono mb-1">Infiltration</div>
            <div className="text-xl font-bold flex items-center gap-2">
              <Bug className="w-5 h-5 text-[#ff003c]" />
              <span className="text-[#00ffff]">{currentIdx + 1}</span>
              <span className="text-white/20">/</span>
              <span className="text-white/40">7</span>
            </div>
          </div>

          <div className={`px-4 border-l border-white/10 ${timeLeft < 15 ? 'animate-pulse' : ''}`}>
            <div className="text-[10px] text-[#00ffff]/50 uppercase font-mono mb-1">Global Timer</div>
            <div className={`text-xl font-mono font-bold ${timeLeft < 15 ? 'text-[#ff003c]' : 'text-[#00ff9f]'}`}>
              {timeLeft}s
            </div>
          </div>

          <div className="px-4 border-l border-white/10">
            <div className="text-[10px] text-[#00ffff]/50 uppercase font-mono mb-1">Security Shield</div>
            <div className="flex gap-1 mt-1">
              {[...Array(3)].map((_, i) => (
                <LifeBuoy key={i} className={`w-4 h-4 ${i < attempts ? 'text-[#00ff9f]' : 'text-white/10'}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-[#00ffff]/50 uppercase font-mono">Mode</div>
          <div className="text-sm font-mono text-white uppercase tracking-widest font-bold">{language}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-hidden">
        <div className="border-2 border-[#ff003c]/30 p-6 flex flex-col bg-[#110000] box-glow overflow-y-auto rounded-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#ff003c] uppercase tracking-widest text-xs">Vulnerability_Leak</h3>
            <button
              onClick={() => setShowHint(true)}
              className="text-[10px] text-[#00ffff] hover:underline uppercase font-bold flex items-center gap-1"
            >
              <LifeBuoy className="w-3 h-3" /> Get Hint
            </button>
          </div>

          <div className="font-mono text-lg leading-relaxed text-[#ffaaaa] bg-black/40 p-4 border border-[#ff003c]/10 rounded mb-4">
            {questions[currentIdx]?.code}
          </div>

          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 border border-[#00ffff]/30 bg-[#00ffff]/5 text-[#00ffff] font-mono text-xs italic"
            >
              &gt; ADVISORY: {questions[currentIdx]?.explanation}
            </motion.div>
          )}

          <div className="mt-auto p-3 border border-[#ff003c]/30 bg-black text-[#ff003c] font-mono text-[10px] uppercase">
            &gt; STACK_TRACE: {questions[currentIdx]?.error}
          </div>
        </div>

        <div className="border-2 border-[#00ffff]/20 p-8 flex flex-col justify-center bg-black/40 rounded-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-bold text-[#00ffff] mb-2 uppercase tracking-widest text-xs border-b border-[#00ffff]/20 pb-1">Input Patch Keyword</h3>
            <p className="opacity-60 text-[10px] font-mono mb-4 uppercase">
              Identify the missing or bad element.
            </p>
            <div>
              <input
                autoFocus
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full bg-black border-2 border-[#00ffff]/30 p-6 text-[#00ff9f] font-mono text-2xl focus:outline-none focus:border-[#00ffff] box-glow transition-all"
                placeholder="KEYWORD_"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-[#ff003c] animate-pulse font-mono text-[10px] p-3 bg-[#ff003c]/10 border border-[#ff003c]">
                <XCircle className="w-5 h-5" />
                <span>INCORRECT FIX. SHIELD COLLAPSE IN {attempts} CYCLES.</span>
              </div>
            )}

            <GlowingButton type="submit" className="w-full py-5 uppercase tracking-[0.4em] font-black text-xl">
              EXECUTE_REPAIR
            </GlowingButton>
          </form>
        </div>
      </div>
    </div>
  );
}
