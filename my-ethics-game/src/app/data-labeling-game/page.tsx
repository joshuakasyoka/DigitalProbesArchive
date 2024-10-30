import DataLabelingGame from "@/components/DataLabelingGame";
import ReturnHome from "@/components/ui/ReturnHome";

export default function DataLabelingGamePage() {
    return (
      <main className="min-h-screen bg-white">
        <DataLabelingGame/>
        <ReturnHome/>
      </main>
    );
  }