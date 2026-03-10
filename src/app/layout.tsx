import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import { ClientLayout } from "@/components/ui/ClientLayout";

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "TECH ESCAPE ROOM",
  description: "Restore the GIET system before time runs out.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${shareTechMono.variable} antialiased bg-[#050505] text-[#00ff00] min-h-screen relative`}
      >
        <div className="crt pointer-events-none fixed inset-0 z-50"></div>
        <div className="crt-scanline pointer-events-none fixed inset-0 z-49"></div>
        <GameProvider>
          <main className="relative z-10 min-h-screen flex flex-col p-4 md:p-8">
            <ClientLayout>
              {children}
            </ClientLayout>
          </main>
        </GameProvider>
      </body>
    </html>
  );
}
