"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useGame } from "@/context/GameContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { TerminalText } from "@/components/ui/TerminalText";
import { Users, UserPlus, Loader2, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OnlinePlayer {
    id: string; // Session UUID
    pc_id: string; // PC Name
    current_level: number;
    assigned_to?: string;
}

interface CollabLobbyProps {
    onJoinSession: (sessionId: string, partnerId: string, role: "host" | "guest", partnerName?: string) => void;
}

export function CollabLobby({ onJoinSession }: CollabLobbyProps) {
    const { player } = useGame();
    const [onlinePlayers, setOnlinePlayers] = useState<OnlinePlayer[]>([]);
    const [loading, setLoading] = useState(true);
    const [incomingRequest, setIncomingRequest] = useState<{ id: string, hostId: string, hostName?: string } | null>(null);
    const [sendingRequestTo, setSendingRequestTo] = useState<{ id: string, name?: string } | null>(null);
    const [declineMessage, setDeclineMessage] = useState<string | null>(null);

    // Refs for real-time listeners to avoid dependency loops
    const incomingRequestRef = useRef(incomingRequest);
    const sendingToRef = useRef(sendingRequestTo);

    useEffect(() => {
        incomingRequestRef.current = incomingRequest;
    }, [incomingRequest]);

    useEffect(() => {
        sendingToRef.current = sendingRequestTo;
    }, [sendingRequestTo]);

    useEffect(() => {
        if (!player) return;

        // Fetch initial online players at Level 3 with their real names
        const fetchPlayers = async () => {
            const { data, error } = await supabase
                .from("players")
                .select(`
                    id, 
                    pc_id,
                    current_level,
                    access_keys (assigned_to)
                `)
                .eq("is_online", true)
                .eq("current_level", 3)
                .neq("id", player.sessionId);

            if (error) {
                console.error("Fetch players error:", error);
                setLoading(false);
                return;
            }

            if (data) {
                const formatted = data.map((p: any) => ({
                    id: p.id,
                    pc_id: p.pc_id,
                    current_level: p.current_level,
                    assigned_to: (Array.isArray(p.access_keys) ? p.access_keys[0]?.assigned_to : p.access_keys?.assigned_to) || "Unknown Operative"
                }));
                setOnlinePlayers(formatted);
            }
            setLoading(false);
        };

        fetchPlayers();

        // Subscribe to player changes
        const playerSubscription = supabase
            .channel("online-players")
            .on("postgres_changes", { event: "*", schema: "public", table: "players" }, () => {
                fetchPlayers();
            })
            .subscribe();

        // Subscribe to collab requests
        const sessionSubscription = supabase
            .channel("collab-requests")
            .on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "collab_sessions",
                filter: `guest_id=eq.${player.sessionId}`
            }, async (payload) => {
                const newReq = payload.new as any;
                if (newReq.status === "pending") {
                    // Fetch the host's PC name for the notification
                    const { data: hostData } = await supabase
                        .from("players")
                        .select("pc_id, access_keys(assigned_to)")
                        .eq("id", newReq.host_id)
                        .single();

                    const hostName = (Array.isArray(hostData?.access_keys) ? hostData.access_keys[0]?.assigned_to : hostData?.access_keys?.assigned_to) || hostData?.pc_id || "Unknown Host";

                    setIncomingRequest({
                        id: newReq.id,
                        hostId: newReq.host_id,
                        hostName: hostName
                    });
                }
            })
            .on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "collab_sessions"
            }, async (payload) => {
                const updated = payload.new as any;
                const currentIncoming = incomingRequestRef.current;
                const currentSending = sendingToRef.current;

                // Handle incoming request status changes for the guest
                if (currentIncoming && updated.id === currentIncoming.id && (updated.status === "declined" || updated.status === "failed")) {
                    setIncomingRequest(null);
                }

                // Handle outgoing request status changes for the host
                if (updated.host_id === player.sessionId) {
                    if (updated.status === "active") {
                        const { data: guestData } = await supabase
                            .from("players")
                            .select("pc_id, access_keys(assigned_to)")
                            .eq("id", updated.guest_id)
                            .single();

                        const guestRaw: any = guestData?.access_keys;
                        const guestName = (Array.isArray(guestRaw) ? guestRaw[0]?.assigned_to : guestRaw?.assigned_to) || (guestData as any)?.pc_id || "Unknown Guest";

                        onJoinSession(updated.id, updated.guest_id, "host", guestName);
                    } else if (updated.status === "declined") {
                        setDeclineMessage("OPERATIVE DECLINED THE LINK.");
                        setSendingRequestTo(null);
                        setTimeout(() => setDeclineMessage(null), 5000);
                    }
                }

                // Handle guest-side acknowledgement of decline
                if (updated.guest_id === player.sessionId && updated.status === "declined") {
                    setIncomingRequest(null);
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(playerSubscription);
            supabase.removeChannel(sessionSubscription);
        };
    }, [player, onJoinSession]);

    const sendRequest = async (targetSessionId: string, name: string) => {
        if (!player) return;
        setSendingRequestTo({ id: targetSessionId, name });
        setDeclineMessage(null);
        const { error } = await supabase
            .from("collab_sessions")
            .insert({
                host_id: player.sessionId,
                guest_id: targetSessionId,
                status: "pending"
            });
        if (error) {
            console.error("Error sending request:", error);
            setSendingRequestTo(null);
        }
    };

    const acceptRequest = async () => {
        if (!incomingRequest) return;
        const { error } = await supabase
            .from("collab_sessions")
            .update({ status: "active" })
            .eq("id", incomingRequest.id);

        if (!error) {
            onJoinSession(incomingRequest.id, incomingRequest.hostId, "guest", incomingRequest.hostName);
        }
    };

    const declineRequest = async () => {
        if (!incomingRequest) return;
        await supabase
            .from("collab_sessions")
            .update({ status: "declined" }) // Changed status to 'declined'
            .eq("id", incomingRequest.id);
        setIncomingRequest(null);
    };

    return (
        <div className="flex flex-col gap-6 p-6 border border-[#00ffff]/30 bg-black/80 box-glow">
            <div className="flex items-center justify-between border-b border-[#00ffff]/20 pb-4">
                <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-[#00ffff]" />
                    <h2 className="text-2xl font-bold text-[#00ffff] text-glow">COLLABORATION TERMINAL</h2>
                </div>
                <AnimatePresence>
                    {declineMessage && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="text-[#ff003c] font-mono text-xs flex items-center gap-2 bg-[#ff003c]/10 px-3 py-1 border border-[#ff003c]/30"
                        >
                            <X className="w-3 h-3" /> {declineMessage}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="min-h-[200px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <Loader2 className="w-8 h-8 animate-spin text-[#00ffff]" />
                        <TerminalText text="SCANNING FOR ONLINE OPERATIVES..." speed={30} />
                    </div>
                ) : onlinePlayers.length === 0 ? (
                    <div className="text-center py-12 opacity-50 italic">
                        <TerminalText text="NO OTHER OPERATIVES DETECTED AT NODE 3. WAIT FOR REINFORCEMENTS OR PROCEED SOLO." speed={30} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {onlinePlayers.map((p) => (
                            <div key={p.id} className="flex items-center justify-between p-4 border border-[#00ff00]/30 bg-[#001100] hover:border-[#00ff00] transition-colors relative group overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#00ff00]/0 via-[#00ff00]/5 to-[#00ff00]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <div className="flex items-center gap-4 relative">
                                    <div className="w-2 h-2 bg-[#00ff00] animate-pulse rounded-full" />
                                    <div className="flex-1">
                                        <div className="font-bold text-white uppercase tracking-wider">{p.assigned_to}</div>
                                        <div className="text-xs text-[#00ff9f]/60 font-mono">NODE: {p.pc_id}</div>
                                    </div>
                                    <span className="text-[10px] text-[#00ffff] border border-[#00ffff]/30 px-2 py-0.5 ml-4">ESTABLISHED</span>
                                </div>
                                <GlowingButton
                                    onClick={() => sendRequest(p.id, p.assigned_to || "Unknown Operative")}
                                    disabled={!!sendingRequestTo}
                                    className="py-2 px-4 text-sm relative"
                                >
                                    {sendingRequestTo?.id === p.id ? "LINKING..." : (
                                        <span className="flex items-center gap-2"><UserPlus className="w-4 h-4" /> RECRUIT</span>
                                    )}
                                </GlowingButton>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {incomingRequest && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-8 right-8 w-80 bg-[#001100] border-2 border-[#00ffff] p-6 box-glow z-50 shadow-[#00ffff]/20 shadow-xl"
                    >
                        <h3 className="text-lg font-bold text-[#00ffff] mb-4 flex items-center gap-2 uppercase">
                            <UserPlus className="w-5 h-5 text-glow" /> Collab Request
                        </h3>
                        <p className="mb-6 font-mono text-sm leading-relaxed">
                            OPERATIVE <span className="text-[#00ffff] font-bold underline underline-offset-4">{incomingRequest.hostName}</span> REQUESTS MISSION PARTNERSHIP.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={acceptRequest}
                                className="flex-1 py-3 bg-[#00ff00]/10 border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/30 transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs"
                            >
                                <Check className="w-4 h-4" /> Accept
                            </button>
                            <button
                                onClick={declineRequest}
                                className="flex-1 py-3 bg-[#ff003c]/10 border border-[#ff003c] text-[#ff003c] hover:bg-[#ff003c]/30 transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs"
                            >
                                <X className="w-4 h-4" /> Decline
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
