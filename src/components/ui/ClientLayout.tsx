"use client";

import { usePathname } from "next/navigation";
import { PlayerCard } from "./PlayerCard";
import { motion, AnimatePresence } from "framer-motion";

// Pages where the PlayerCard should NOT be shown
const HIDDEN_CARD_PAGES = ["/", "/login", "/register", "/admin", "/failure"];

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const showCard = !HIDDEN_CARD_PAGES.some(p => pathname === p);

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
