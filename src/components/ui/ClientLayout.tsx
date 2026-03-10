"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { PlayerCard } from "./PlayerCard";
import { motion, AnimatePresence } from "framer-motion";

// Pages where the PlayerCard should NOT be shown
const HIDDEN_CARD_PAGES = ["/", "/login", "/register", "/admin", "/failure"];

// Pages where back navigation should be blocked
const NO_BACK_PATTERNS = ["/level/", "/dashboard"];

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { player } = useGame();
    const showCard = !HIDDEN_CARD_PAGES.some(p => pathname === p);

    // Block browser back button on level and dashboard pages
    useEffect(() => {
        const shouldBlock = NO_BACK_PATTERNS.some(p => pathname.startsWith(p));
        if (!shouldBlock) return;

        // Push a duplicate entry so pressing back stays on the same page
        window.history.pushState(null, "", window.location.href);

        const handlePopState = () => {
            window.history.pushState(null, "", window.location.href);
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [pathname]);

    // Prevent accessing wrong levels — can only access current level
    useEffect(() => {
        if (!player) return;

        const levelMatch = pathname.match(/^\/level\/(\d+)$/);
        if (levelMatch) {
            const requestedLevel = parseInt(levelMatch[1], 10);

            if (requestedLevel > player.currentLevel) {
                // Trying to skip ahead: send back to current level
                router.replace(`/level/${player.currentLevel}`);
            } else if (requestedLevel < player.currentLevel) {
                // Trying to go back, OR actively transitioning out after completing a level.
                // Send to the appropriate next phase instead of flashing the next level page.
                if (player.currentLevel > 5) {
                    router.replace("/reconstruct");
                } else {
                    router.replace("/dashboard");
                }
            }
        }
    }, [pathname, player, router]);

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-1 flex flex-col"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
            {showCard && <PlayerCard />}
        </>
    );
}
