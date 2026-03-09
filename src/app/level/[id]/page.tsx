import { Level1 } from "@/components/levels/Level1";
import { Level2 } from "@/components/levels/Level2";
import { Level3 } from "@/components/levels/Level3";
import { Level4 } from "@/components/levels/Level4";
import { Level5 } from "@/components/levels/Level5";
import { notFound } from "next/navigation";

export default async function LevelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const levelId = parseInt(id, 10);

  if (isNaN(levelId) || levelId < 1 || levelId > 5) {
    notFound();
  }

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col">
      {levelId === 1 && <Level1 />}
      {levelId === 2 && <Level2 />}
      {levelId === 3 && <Level3 />}
      {levelId === 4 && <Level4 />}
      {levelId === 5 && <Level5 />}
    </div>
  );
}
