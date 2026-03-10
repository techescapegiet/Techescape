"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { CheckCircle2, XCircle, Bug, Clock, LifeBuoy, Code2, Play, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Language = "java" | "python" | "c";

interface DebugChallenge {
  brokenCode: string;   // The buggy code the player sees and edits
  fixedCode: string;    // The correct version to compare against
  error: string;        // The error message shown
  hint: string;         // A hint about what's wrong
  description: string;  // Brief description of the task
}

const QUESTION_POOL: Record<Language, DebugChallenge[]> = {
  java: [
    {
      brokenCode: `public class Main {\n  public static void main(String[] args) {\n    int x = 10\n    System.out.println(x);\n  }\n}`,
      fixedCode: `public class Main {\n  public static void main(String[] args) {\n    int x = 10;\n    System.out.println(x);\n  }\n}`,
      error: "';' expected at line 3",
      hint: "Every statement in Java must end with a semicolon.",
      description: "Fix the missing semicolon"
    },
    {
      brokenCode: `public class Main {\n  public static void main(String[] args) {\n    String msg = "Hello"\n    System.out.println(msg)\n  }\n}`,
      fixedCode: `public class Main {\n  public static void main(String[] args) {\n    String msg = "Hello";\n    System.out.println(msg);\n  }\n}`,
      error: "';' expected at line 3 and line 4",
      hint: "Two lines are missing semicolons.",
      description: "Fix the missing semicolons"
    },
    {
      brokenCode: `public class Main {\n  public static void main(String[] args) {\n    if (5 = 5) {\n      System.out.println("Equal");\n    }\n  }\n}`,
      fixedCode: `public class Main {\n  public static void main(String[] args) {\n    if (5 == 5) {\n      System.out.println("Equal");\n    }\n  }\n}`,
      error: "Assignment instead of comparison at line 3",
      hint: "Use == for comparison, not = for assignment.",
      description: "Fix the comparison operator"
    },
    {
      brokenCode: `public class Main {\n  public void main(String[] args) {\n    System.out.println("Hello");\n  }\n}`,
      fixedCode: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}`,
      error: "Main method must be static",
      hint: "The main method signature requires the 'static' keyword.",
      description: "Fix the main method signature"
    },
    {
      brokenCode: `public class Main {\n  public static void main(String[] args) {\n    int[] arr = {1, 2, 3};\n    System.out.println(arr[3]);\n  }\n}`,
      fixedCode: `public class Main {\n  public static void main(String[] args) {\n    int[] arr = {1, 2, 3};\n    System.out.println(arr[2]);\n  }\n}`,
      error: "ArrayIndexOutOfBoundsException: Index 3",
      hint: "Array indices start from 0. The last valid index is length-1.",
      description: "Fix the array index"
    },
    {
      brokenCode: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World")\n  }\n}`,
      fixedCode: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}`,
      error: "';' expected at line 3",
      hint: "Don't forget the semicolon at the end of the print statement.",
      description: "Fix the missing semicolon"
    },
  ],
  python: [
    {
      brokenCode: `def greet(name)\n    print("Hello, " + name)\n\ngreet("World")`,
      fixedCode: `def greet(name):\n    print("Hello, " + name)\n\ngreet("World")`,
      error: "SyntaxError: expected ':'",
      hint: "Function definitions in Python need a colon after the parameters.",
      description: "Fix the function definition"
    },
    {
      brokenCode: `for i in range(5)\n    print(i)`,
      fixedCode: `for i in range(5):\n    print(i)`,
      error: "SyntaxError: expected ':'",
      hint: "For loops in Python need a colon at the end.",
      description: "Fix the for loop syntax"
    },
    {
      brokenCode: `x = 10\nif x > 5:\nprint("Big number")`,
      fixedCode: `x = 10\nif x > 5:\n    print("Big number")`,
      error: "IndentationError: expected an indented block",
      hint: "Code inside if blocks must be indented with spaces.",
      description: "Fix the indentation"
    },
    {
      brokenCode: `my_list = [1, 2, 3]\nprint(my_list[3])`,
      fixedCode: `my_list = [1, 2, 3]\nprint(my_list[2])`,
      error: "IndexError: list index out of range",
      hint: "List indices start from 0. The last element is at index length-1.",
      description: "Fix the list index"
    },
    {
      brokenCode: `def add(a, b):\n    return a + b\n\nresult = add(5, "3")\nprint(result)`,
      fixedCode: `def add(a, b):\n    return a + b\n\nresult = add(5, 3)\nprint(result)`,
      error: "TypeError: unsupported operand type(s) for +: 'int' and 'str'",
      hint: "You cannot add an integer and a string. Remove the quotes.",
      description: "Fix the type mismatch"
    },
    {
      brokenCode: `x = 5\nif x == 5\n    print("Five!")`,
      fixedCode: `x = 5\nif x == 5:\n    print("Five!")`,
      error: "SyntaxError: expected ':'",
      hint: "If statements need a colon after the condition.",
      description: "Fix the if statement"
    },
  ],
  c: [
    {
      brokenCode: `#include <stdio.h>\n\nint main() {\n    int x = 10\n    printf("%d", x);\n    return 0;\n}`,
      fixedCode: `#include <stdio.h>\n\nint main() {\n    int x = 10;\n    printf("%d", x);\n    return 0;\n}`,
      error: "error: expected ';' before 'printf'",
      hint: "Every statement in C must end with a semicolon.",
      description: "Fix the missing semicolon"
    },
    {
      brokenCode: `#include <stdio.h>\n\nint main() {\n    int x;\n    scanf("%d", x);\n    printf("%d", x);\n    return 0;\n}`,
      fixedCode: `#include <stdio.h>\n\nint main() {\n    int x;\n    scanf("%d", &x);\n    printf("%d", x);\n    return 0;\n}`,
      error: "Segmentation fault (core dumped)",
      hint: "scanf needs the address-of operator (&) before the variable.",
      description: "Fix the scanf call"
    },
    {
      brokenCode: `#include <stdio.h>\n\nint main() {\n    int arr[3] = {1, 2, 3};\n    printf("%d", arr[3]);\n    return 0;\n}`,
      fixedCode: `#include <stdio.h>\n\nint main() {\n    int arr[3] = {1, 2, 3};\n    printf("%d", arr[2]);\n    return 0;\n}`,
      error: "Buffer overflow: accessing index 3 of array size 3",
      hint: "Array indices start at 0. The last valid index is size-1.",
      description: "Fix the array index"
    },
    {
      brokenCode: `#include <stdio.h>\n\nint main() {\n    printf("Hello World")\n    return 0;\n}`,
      fixedCode: `#include <stdio.h>\n\nint main() {\n    printf("Hello World");\n    return 0;\n}`,
      error: "error: expected ';' before 'return'",
      hint: "The printf line is missing a semicolon.",
      description: "Fix the missing semicolon"
    },
    {
      brokenCode: `#include <stdio.h>\n\nint main() {\n    if (5 = 5) {\n        printf("Equal");\n    }\n    return 0;\n}`,
      fixedCode: `#include <stdio.h>\n\nint main() {\n    if (5 == 5) {\n        printf("Equal");\n    }\n    return 0;\n}`,
      error: "error: lvalue required as left operand of assignment",
      hint: "Use == for comparison, = is for assignment.",
      description: "Fix the comparison operator"
    },
    {
      brokenCode: `#include <stdio.h>\n\nint main() {\n    char c = 'AB';\n    printf("%c", c);\n    return 0;\n}`,
      fixedCode: `#include <stdio.h>\n\nint main() {\n    char c = 'A';\n    printf("%c", c);\n    return 0;\n}`,
      error: "warning: multi-character character constant",
      hint: "A char can only hold a single character.",
      description: "Fix the char value"
    },
  ]
};

function normalize(code: string): string {
  return code.replace(/\r\n/g, "\n").replace(/\t/g, "    ").trim();
}

export function Level4() {
  const { completeLevel, handleMissionFailure } = useGame();

  const [language, setLanguage] = useState<Language | null>(null);
  const [challenges, setChallenges] = useState<DebugChallenge[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [compileResult, setCompileResult] = useState<"idle" | "success" | "error">("idle");
  const [compileMsg, setCompileMsg] = useState("");
  const [attempts, setAttempts] = useState(3);
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [showHint, setShowHint] = useState(false);

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
    const selected = shuffled.slice(0, 5);
    setChallenges(selected);
    setUserCode(selected[0].brokenCode);
    setLanguage(lang);
  };

  const handleCompile = () => {
    const current = challenges[currentIdx];
    const userNorm = normalize(userCode);
    const fixedNorm = normalize(current.fixedCode);

    if (userNorm === fixedNorm) {
      setCompileResult("success");
      setCompileMsg("✓ Compilation successful. All tests passed.");

      setTimeout(() => {
        if (currentIdx < challenges.length - 1) {
          const nextIdx = currentIdx + 1;
          setCurrentIdx(nextIdx);
          setUserCode(challenges[nextIdx].brokenCode);
          setCompileResult("idle");
          setCompileMsg("");
          setShowHint(false);
        } else {
          setSuccess(true);
          setTimeout(() => completeLevel("SYNTAX"), 2000);
        }
      }, 1500);
    } else {
      const remaining = attempts - 1;
      setAttempts(remaining);
      setCompileResult("error");
      setCompileMsg(`✗ Compilation failed. ${current.error}`);
      if (remaining <= 0) {
        setTimeout(() => handleMissionFailure("PATCH CRITICALLY REJECTED: SYSTEM LOCKDOWN"), 1000);
      } else {
        setTimeout(() => setCompileResult("idle"), 2000);
      }
    }
  };

  // Language selection screen
  if (!language) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-3 md:space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#00ffff] tracking-[0.2em] uppercase text-glow">NODE_4_DEBUGGER</h2>
          <p className="text-[#00ff9f]/60 font-mono text-xs md:text-sm">SELECT A LANGUAGE TO START DEBUGGING</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl">
          {(["java", "python", "c"] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => selectLanguage(lang)}
              className="group relative p-6 md:p-8 border border-[#00ffff]/20 bg-black hover:border-[#00ffff] transition-all duration-300 transform hover:-translate-y-2 box-glow cursor-pointer"
            >
              <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-100 transition-opacity">
                <Code2 className="w-6 h-6 md:w-8 md:h-8 text-[#00ffff]" />
              </div>
              <h3 className="text-xl md:text-2xl font-mono font-bold text-white mb-2 uppercase">{lang}</h3>
              <p className="text-[10px] text-[#00ff9f]/40 uppercase tracking-widest group-hover:text-[#00ff9f]">Start Environment</p>
            </button>
          ))}
        </div>

        <div className="text-[#ff003c] text-xs font-mono animate-pulse border-t border-[#ff003c]/20 pt-4 flex items-center gap-2">
          <Clock className="w-4 h-4" /> 120 SECONDS UPON SELECTION
        </div>
      </div>
    );
  }

  // Success screen
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-8 md:p-12 mt-8 md:mt-12 border border-[#00ff00] bg-[#002200]/50 box-glow text-center rounded-lg">
        <CheckCircle2 className="w-16 h-16 md:w-24 md:h-24 text-[#00ff00] mb-4 md:mb-6 animate-pulse" />
        <h2 className="text-2xl md:text-4xl font-bold text-[#00ff00] text-glow mb-4">ALL BUGS RESOLVED</h2>
        <div className="text-3xl md:text-5xl font-mono font-bold text-[#00ffff] tracking-widest bg-black p-4 md:p-6 border border-[#00ffff]">
          SYNTAX
        </div>
      </div>
    );
  }

  const currentChallenge = challenges[currentIdx];

  return (
    <div className="flex flex-col h-full mt-4 md:mt-6 gap-3 md:gap-4 w-full max-w-6xl mx-auto">
      {/* Top Bar */}
      <div className="border-2 border-[#00ffff]/20 bg-black/60 p-3 md:p-4 box-glow flex flex-wrap items-center justify-between gap-2 rounded-sm">
        <div className="flex items-center gap-4 md:gap-8">
          <div>
            <div className="text-[10px] text-[#00ffff]/50 uppercase font-mono mb-1">Bug</div>
            <div className="text-lg md:text-xl font-bold flex items-center gap-2">
              <Bug className="w-4 h-4 md:w-5 md:h-5 text-[#ff003c]" />
              <span className="text-[#00ffff]">{currentIdx + 1}</span>
              <span className="text-white/20">/</span>
              <span className="text-white/40">{challenges.length}</span>
            </div>
          </div>

          <div className={cn("px-3 md:px-4 border-l border-white/10", timeLeft < 30 && "animate-pulse")}>
            <div className="text-[10px] text-[#00ffff]/50 uppercase font-mono mb-1">Timer</div>
            <div className={cn("text-lg md:text-xl font-mono font-bold", timeLeft < 30 ? "text-[#ff003c]" : "text-[#00ff9f]")}>
              {timeLeft}s
            </div>
          </div>

          <div className="px-3 md:px-4 border-l border-white/10">
            <div className="text-[10px] text-[#00ffff]/50 uppercase font-mono mb-1">Lives</div>
            <div className="flex gap-1 mt-1">
              {[...Array(3)].map((_, i) => (
                <LifeBuoy key={i} className={cn("w-4 h-4", i < attempts ? "text-[#00ff9f]" : "text-white/10")} />
              ))}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-[#00ffff]/50 uppercase font-mono">Mode</div>
          <div className="text-sm font-mono text-white uppercase tracking-widest font-bold">{language}</div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 md:gap-4 flex-1 min-h-0">
        {/* Code Editor (3/5) */}
        <div className="lg:col-span-3 border-2 border-[#ff003c]/30 bg-[#0a0a0a] flex flex-col rounded-sm overflow-hidden">
          {/* Editor Toolbar */}
          <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-[#1a1a1a] border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff003c]" />
              <div className="w-3 h-3 rounded-full bg-[#ffaa00]" />
              <div className="w-3 h-3 rounded-full bg-[#00ff00]" />
              <span className="ml-3 text-[10px] text-white/30 font-mono uppercase">main.{language === "python" ? "py" : language === "java" ? "java" : "c"}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHint(true)}
                className="text-[10px] text-[#00ffff] hover:underline uppercase font-bold flex items-center gap-1 cursor-pointer"
              >
                <Lightbulb className="w-3 h-3" /> Hint
              </button>
            </div>
          </div>

          {/* Line numbers + editable code */}
          <div className="flex-1 flex overflow-auto">
            <div className="bg-[#111] text-white/20 font-mono text-xs md:text-sm py-3 px-2 md:px-3 select-none text-right border-r border-white/5 leading-relaxed whitespace-pre">
              {userCode.split("\n").map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              spellCheck={false}
              className="flex-1 bg-transparent text-[#e0e0e0] font-mono text-xs md:text-sm p-3 resize-none focus:outline-none leading-relaxed whitespace-pre overflow-auto"
              style={{ tabSize: 4 }}
            />
          </div>
        </div>

        {/* Right Panel: Console & Info (2/5) */}
        <div className="lg:col-span-2 flex flex-col gap-3 md:gap-4">
          {/* Task Info */}
          <div className="border border-[#00ffff]/20 bg-black/40 p-3 md:p-4 rounded-sm">
            <h3 className="text-[10px] text-[#00ffff]/50 uppercase tracking-widest font-bold mb-2">OBJECTIVE</h3>
            <p className="text-sm md:text-base font-bold text-white">{currentChallenge.description}</p>
          </div>

          {/* Error / Console Output */}
          <div className="border border-[#ff003c]/30 bg-[#110000] p-3 md:p-4 rounded-sm flex-1 flex flex-col min-h-[120px]">
            <h3 className="text-[10px] text-[#ff003c]/60 uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
              <Bug className="w-3 h-3" /> CONSOLE OUTPUT
            </h3>
            <div className="font-mono text-xs text-[#ff6b6b] whitespace-pre-wrap flex-1">
              <span className="text-white/30">&gt; </span>{currentChallenge.error}
            </div>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 pt-3 border-t border-[#00ffff]/20 text-[#00ffff] font-mono text-xs italic"
              >
                💡 {currentChallenge.hint}
              </motion.div>
            )}
          </div>

          {/* Compile Result */}
          <AnimatePresence>
            {compileResult !== "idle" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "border p-3 md:p-4 font-mono text-xs md:text-sm rounded-sm",
                  compileResult === "success"
                    ? "border-[#00ff00]/50 bg-[#002200] text-[#00ff00]"
                    : "border-[#ff003c]/50 bg-[#220000] text-[#ff003c] animate-shake"
                )}
              >
                {compileMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compile Button */}
          <GlowingButton
            onClick={handleCompile}
            className="w-full py-3 md:py-4 uppercase tracking-[0.3em] font-black text-base md:text-lg flex items-center justify-center gap-2"
            disabled={compileResult === "success"}
          >
            <Play className="w-4 h-4 md:w-5 md:h-5" /> COMPILE & RUN
          </GlowingButton>
        </div>
      </div>
    </div>
  );
}
