import type { Metadata } from "next";
import { SettingsPage } from "@/components/dashboard/settings/SettingsPage";

export const metadata: Metadata = {
  title: "Settings — VALENCE",
  description: "Manage your Valence account settings.",
};

export default function SettingsRoute() {
  return <SettingsPage />;
}
