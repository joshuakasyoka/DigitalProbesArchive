import DataCommonsGame from "@/components/DataCommonsGame";
import ReturnHome from '@/components/ui/ReturnHome';

export default function DataCommonsGamePage() {
    return (
      <main className="min-h-screen bg-white">
        <DataCommonsGame />
        <ReturnHome/>
      </main>
    );
  }