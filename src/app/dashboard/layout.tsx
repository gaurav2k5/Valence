import type { Metadata } from "next";
import { FloatingDock } from "@/components/dashboard/FloatingDock";

export const metadata: Metadata = {
  title: "Dashboard — VALENCE",
  description: "Your personalized Valence dashboard.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-black">
      <FloatingDock />

      {/* Main content area — centered for dock layout */}
      <main className="pt-10 pb-32 lg:pb-32 w-full max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
