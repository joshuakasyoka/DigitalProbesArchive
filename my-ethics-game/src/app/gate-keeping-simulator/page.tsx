import GatekeepingSimulator from "@/components/GatekeepingSimulator";
import ReturnHome from "@/components/ui/ReturnHome";

export default function GatekeepingSimulatorPage() {
    return (
      <main className="min-h-screen bg-white">
        <GatekeepingSimulator/>
        <ReturnHome/>
      </main>
    );
  }