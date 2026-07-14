import { getStoreSettings } from "@/lib/api";
import AboutClient from "./AboutClient";

export default async function AboutPage() {
  let stats = [];
  try {
    const settings = await getStoreSettings();
    if (settings && settings.stats && settings.stats.length > 0) {
      stats = settings.stats;
    }
  } catch (error) {
    console.error("[About] Failed to fetch settings:", error);
  }

  return <AboutClient initialStats={stats} />;
}
