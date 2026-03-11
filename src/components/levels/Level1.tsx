"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { TerminalText } from '@/components/ui/TerminalText';
import { GlitchText } from '@/components/ui/GlitchText';
import { ShieldAlert, CheckCircle2, Lock, Unlock, Zap, Timer, BrainCircuit, Activity, LayoutGrid, AlertTriangle, List, HelpCircle, Lightbulb } from 'lucide-react';
import { getCrosswordWords, AcademicYear, Department } from '@/lib/questionBank';
import { cn } from "@/lib/utils";

const GRID_SIZE = 9;
const LEVEL_TIME = 420; // 7 minutes in seconds

export function Level1() {
  const { completeLevel, handleMissionFailure, player } = useGame();

  const [grid, setGrid] = useState<string[][]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [errorFlash, setErrorFlash] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(LEVEL_TIME);

  // Dynamically load words based on player's syllabus
  const targetEntries = useMemo(() => {
    if (!player) return [{ word: "ALGORITHM", clue: "A step-by-step procedure for solving a problem." }];
    return getCrosswordWords(player.academicYear as AcademicYear, player.department as Department).slice(0, 6);
  }, [player]);

  const skipLevel = () => {
    setSuccess(true);
    if (!isCompleting) {
      setIsCompleting(true);
      setTimeout(() => completeLevel("SYSTEM"), 1000);
    }
  };

  const initializeGame = useCallback(() => {
    setIsInitializing(true);

    const newGrid: string[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(""));

    targetEntries.forEach(({ word }) => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 500) {
        attempts++;
        const directions = [
          [0, 1],   // right
          [1, 0],   // down
          [0, -1],  // left
          [-1, 0],  // up
          [1, 1],   // down-right
          [-1, -1], // up-left
          [1, -1],  // down-left
          [-1, 1]   // up-right
        ];
        const dir = directions[Math.floor(Math.random() * directions.length)];
        const dr = dir[0];
        const dc = dir[1];

        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);

        const endRow = row + (word.length - 1) * dr;
        const endCol = col + (word.length - 1) * dc;

        if (endRow >= 0 && endRow < GRID_SIZE && endCol >= 0 && endCol < GRID_SIZE) {
          let canPlace = true;
          for (let i = 0; i < word.length; i++) {
            if (newGrid[row + i * dr][col + i * dc] !== "" && newGrid[row + i * dr][col + i * dc] !== word[i]) {
              canPlace = false; break;
            }
          }
          if (canPlace) {
            for (let i = 0; i < word.length; i++) newGrid[row + i * dr][col + i * dc] = word[i];
            placed = true;
          }
        }
      }
    });

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newGrid[r][c] === "") newGrid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }

    setGrid(newGrid);
    setCurrentQuestionIdx(0);
    setSelectedCells([]);
    setFoundWords([]);
    setSuccess(false);
    setErrorFlash(false);
    setShowHint(false);
    setTimeLeft(LEVEL_TIME);
    setTimeout(() => setIsInitializing(false), 800);
  }, [targetEntries]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer logic
  useEffect(() => {
    if (success || isInitializing || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [success, isInitializing, timeLeft]);

  // Fail condition: LOGOUT
  useEffect(() => {
    if (timeLeft === 0 && !success) {
      handleMissionFailure("TIME EXPIRED: SECURITY BREACH FAILED");
    }
  }, [timeLeft, success, handleMissionFailure]);

  const currentEntry = targetEntries[currentQuestionIdx] || { word: "", clue: "" };
  const currentWord = currentEntry.word;
  const currentWordLength = currentWord.length;

  const handleCellClick = (r: number, c: number) => {
    if (success || isInitializing || timeLeft <= 0) return;

    if (selectedCells.some(cell => cell.r === r && cell.c === c)) {
      const idx = selectedCells.findIndex(cell => cell.r === r && cell.c === c);
      setSelectedCells(selectedCells.slice(0, idx));
      return;
    }

    // Enforce Linear Path
    if (selectedCells.length > 0) {
      const last = selectedCells[selectedCells.length - 1];
      const dr = r - last.r;
      const dc = c - last.c;

      // Must be adjacent
      if (Math.abs(dr) > 1 || Math.abs(dc) > 1 || (dr === 0 && dc === 0)) {
        return;
      }

      // If 2+ cells already selected, must follow established direction
      if (selectedCells.length >= 2) {
        const prev = selectedCells[selectedCells.length - 2];
        const prevDr = last.r - prev.r;
        const prevDc = last.c - prev.c;
        if (dr !== prevDr || dc !== prevDc) {
          return;
        }
      }
    }

    const newSelection = [...selectedCells, { r, c }];
    setSelectedCells(newSelection);

    const spelled = newSelection.map(cell => grid[cell.r][cell.c]).join("");

    if (spelled === currentWord) {
      setFoundWords([...foundWords, currentWord]);
      setSelectedCells([]);
      if (currentQuestionIdx < targetEntries.length - 1) {
        setCurrentQuestionIdx(currentQuestionIdx + 1);
        setShowHint(false); // Reset hint when moving to next question
      } else {
        setSuccess(true);
        if (!isCompleting) {
          setIsCompleting(true);
          setTimeout(() => completeLevel("SYSTEM"), 3000);
        }
      }
    } else if (spelled.length >= currentWord.length || !currentWord.startsWith(spelled)) {
      setErrorFlash(true);
      setTimeout(() => {
        setErrorFlash(false);
        setSelectedCells([]);
      }, 500);
    }
  };

  const isSelected = (r: number, c: number) =>
    selectedCells.some(cell => cell.r === r && cell.c === c);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 60) return "text-[#ff0000]";
    if (timeLeft <= 180) return "text-[#ffff00]";
    return "text-[#00ff00]";
  };

  const isCritical = timeLeft <= 30;

  if (isInitializing) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <BrainCircuit className="w-16 h-16 mb-4 animate-spin text-[#00ff00]" />
        <h2 className="text-xl font-mono tracking-widest uppercase text-[#00ff00]">Generating 9x9 Security Matrix...</h2>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-12 mt-12 border-2 border-[#00ff00] bg-[#002200]/50 box-glow text-center rounded-lg">
        <CheckCircle2 className="w-24 h-24 text-[#00ff00] mb-6 animate-pulse" />
        <h2 className="text-4xl font-bold text-[#00ff00] text-glow mb-4">MATRIX BYPASSED</h2>
            <div className="text-5xl font-mono font-bold text-[#00ffff] tracking-[0.5em] bg-black p-8 border-2 border-[#00ffff]">
              SYSTEM
            </div>
        <div className="text-white/40 font-mono mt-4">FRAGMENT RECOVERED: SYSTEM</div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full mt-4 gap-6 max-w-7xl mx-auto w-full transition-all duration-300", isCritical && "animate-pulse")}>
      <div className="border-b-2 border-[#00ff00]/30 pb-4 flex justify-between items-center px-2">
        <div className="flex items-center gap-4">
          <motion.div
            animate={isCritical ? { rotate: [0, -2, 2, -2, 2, 0] } : {}}
            transition={{ repeat: Infinity, duration: 0.2 }}
          >
            <ShieldAlert className={cn("w-10 h-10", getTimerColor(), isCritical && "animate-pulse")} />
          </motion.div>
          <div>
            <h2 className={cn("text-3xl font-black italic tracking-tighter flex items-center gap-3 drop-shadow-[0_0_10px_currentColor]", getTimerColor())}>
              9X9 SECURITY MATRIX
            </h2>
            <p className="text-xs opacity-50 uppercase tracking-widest mt-1">JNTUH {player?.academicYear} {player?.department} CURRICULUM ENCRYPTION</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-right border-r border-white/20 pr-8">
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="w-5 h-5 text-[#00ffff]" />
              <h2 className="text-[#00ffff] font-bold tracking-widest uppercase">Target Syllabus Clues</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-[400px]">
              {targetEntries.map((entry) => {
                const isFound = foundWords.includes(entry.word);
                const isActive = entry.word === currentWord && !isFound;
                return (
                  <div
                    key={entry.word}
                    className={cn(
                      "flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest p-2 rounded-sm text-left truncate",
                      isFound
                        ? "bg-[#00ff00]/10 text-[#00ff00] border border-[#00ff00]"
                        : isActive
                          ? "bg-[#00ffff]/10 text-[#00ffff] border border-[#00ffff] box-glow"
                          : "bg-black/20 text-white/30 border border-white/10"
                    )}
                    title={entry.clue}
                  >
                    {isFound ? <CheckCircle2 className="w-3 h-3 flex-shrink-0" /> : isActive ? <Unlock className="w-3 h-3 flex-shrink-0" /> : <Lock className="w-3 h-3 flex-shrink-0" />}
                    <span className="truncate">{isActive ? entry.clue : isFound ? entry.word : "LOCKED_HASH"}</span>
                  </div>
                );
              })}
            </div>
            <button
              onClick={skipLevel}
              className="bg-white/5 hover:bg-white/10 text-white/30 hover:text-white/60 text-[9px] px-2 py-0.5 mt-2 rounded border border-white/10 transition-colors uppercase font-mono"
            >
              Skip
            </button>
          </div>

          <div className={cn("flex flex-col items-center p-3 border-2 min-w-[140px] box-glow",
            timeLeft <= 60 ? "border-red-500 bg-red-500/10" :
              timeLeft <= 180 ? "border-yellow-500 bg-yellow-500/10" :
                "border-[#00ff00] bg-black")}>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Extraction Time</span>
            <span className={cn("text-4xl font-mono font-black", getTimerColor(), isCritical && "animate-ping")}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCritical && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-600 text-white font-black text-center py-2 flex items-center justify-center gap-4 shadow-[0_0_20px_#ff0000]"
          >
            <AlertTriangle className="animate-bounce" />
            CRITICAL SYSTEM FAILURE IMMINENT: MATRIX DESTABILIZING
            <AlertTriangle className="animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={isCritical ? {
          x: [0, -3, 3, -3, 3, 0],
          y: [0, 2, -2, 2, -2, 0]
        } : {}}
        transition={{ repeat: Infinity, duration: 0.1 }}
        className="flex flex-col lg:flex-row gap-8 items-stretch flex-1"
      >
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#00ff00] font-bold text-xs uppercase tracking-[0.2em] mb-1">
            <LayoutGrid className="w-4 h-4" /> Active Grid
          </div>
          <div
            className={cn(
              "grid grid-cols-9 gap-1.5 p-4 bg-black/80 border-2 border-[#00ff00]/40 box-glow rounded-sm grow aspect-square lg:aspect-auto relative overflow-hidden",
              errorFlash && "border-[#ff003c] bg-[#330000]/30 shadow-[0_0_20px_#ff003c]",
              isCritical && "border-red-600 shadow-[inset_0_0_50px_rgba(255,0,0,0.4)]"
            )}
          >
            {isCritical && (
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,rgba(255,0,0,0.1),rgba(255,0,0,0.1)_1px,transparent_1px,transparent_2px)] animate-pulse" />
            )}

            {grid.map((row, r) => (
              row.map((char, c) => (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={cn(
                    "w-full h-full aspect-square flex items-center justify-center font-mono text-xl font-black border-2 transition-all duration-75 relative group",
                    isSelected(r, c)
                      ? "bg-[#00ffff] text-black border-[#00ffff] shadow-[0_0_15px_#00ffff]"
                      : "bg-[#051105] text-[#00ff00] border-[#00ff00]/20 hover:border-[#00ffff] hover:text-[#00ffff] hover:bg-[#00ffff]/10",
                    isCritical && !isSelected(r, c) && "border-red-900/40 text-red-500/60"
                  )}
                >
                  {char}
                  <div className="absolute inset-0 border-t border-l border-white/10 pointer-events-none group-hover:border-white/30" />
                </button>
              ))
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[450px] flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-[#00ffff] font-bold text-xs uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" /> Search the Matrix for:
              </div>
              <button
                onClick={() => setShowHint(true)}
                className="hover:text-white transition-colors flex items-center gap-1"
                disabled={showHint}
              >
                <Lightbulb className="w-3 h-3" /> Hint
              </button>
            </div>
            <div className={cn("border-2 p-6 box-glow rounded-sm min-h-[160px] flex flex-col justify-center items-center transition-colors relative overflow-hidden",
              isCritical ? "border-red-600 bg-red-950/20" : "border-[#00ffff]/40 bg-[#001122]/60")}>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIdx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="space-y-4 text-center px-4"
                >
                  <p className="text-sm font-mono text-[#00ffff] uppercase tracking-widest mb-2 opacity-70">Decipher Clue:</p>
                  <p className="text-lg md:text-xl font-bold text-white leading-relaxed">
                    "{currentEntry.clue}"
                  </p>
                  {showHint && currentEntry.hint && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-xs font-mono text-[#00ffff] bg-[#00ffff]/10 p-2 border border-[#00ffff]/20 mt-2 italic"
                    >
                      HINT: {currentEntry.hint}
                    </motion.p>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {Array.from({ length: Math.max(1, currentWordLength) }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-8 h-10 border-2 flex items-center justify-center font-mono text-lg font-bold rounded-sm",
                      selectedCells[i]
                        ? "border-[#00ffff] bg-[#00ffff]/20 text-[#00ffff] text-glow shadow-[0_0_10px_#00ffff]"
                        : "border-[#00ffff]/20 bg-black/40 text-[#00ffff]/20"
                    )}
                  >
                    {selectedCells[i] ? grid[selectedCells[i].r][selectedCells[i].c] : "_"}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <div className="flex items-center gap-2 text-[#00ff00] font-bold text-xs uppercase tracking-[0.2em]">
              <List className="w-4 h-4" /> Progress Log ( {currentQuestionIdx + 1} / 6 )
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[350px] pr-2 scrollbar-thin scrollbar-thumb-[#00ff00]/20">
              {targetEntries.map((entry, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-3 border flex items-center justify-between text-[10px] font-mono uppercase tracking-widest",
                    i < currentQuestionIdx
                      ? "border-[#00ff00] bg-[#00ff00]/10 text-[#00ff00] opacity-50"
                      : i === currentQuestionIdx
                        ? "border-[#00ffff] bg-[#00ffff]/10 text-[#00ffff] font-bold box-glow"
                        : "border-white/10 bg-black/20 text-white/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] w-4">{i + 1}.</span>
                    <span>{i < currentQuestionIdx ? entry.word : i === currentQuestionIdx ? "ANALYZING_CLUE..." : "ENCRYPTED_DATA"}</span>
                  </div>
                  {i < currentQuestionIdx && <CheckCircle2 className="w-4 h-4" />}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <div className={cn("p-4 border font-mono uppercase text-[10px]",
              isCritical ? "border-red-600 text-red-500 bg-red-950/20 shadow-[0_0_10px_#ff0000]" : "border-[#00ff00]/20 text-[#00ff00]/60 bg-black/50")}>
              &gt; STATUS: {isCritical ? "BREAKDOWN_DETECTED" : "MATRIX_STABLE"}<br />
              &gt; GAME_OVER_PENALTY: LOGOUT_ON_EXPIRY<br />
              &gt; ENCRYPTION: JNTUH_SYLLABUS_POOL
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
