import { fetchApi, getStoreSettings } from "@/lib/api";
import { ApiDownload, ApiVideo, ApiMaintenanceCenter } from "@/types/api";
import SupportClient from "./SupportClient";
import { Suspense } from "react";
import { CACHE_TTL } from "@/lib/constants";

export default async function SupportPage() {
  const [downloadsResult, videosResult, centersResult, storeSettingsResult] = await Promise.allSettled([
    fetchApi<ApiDownload[]>("/api/site/downloads", {
      next: { revalidate: CACHE_TTL.supportData, tags: ["downloads"] },
    }),
    fetchApi<ApiVideo[]>("/api/site/videos", {
      next: { revalidate: CACHE_TTL.supportData, tags: ["videos"] },
    }),
    fetchApi<ApiMaintenanceCenter[]>("/api/site/maintenance-centers", {
      next: { revalidate: CACHE_TTL.supportData, tags: ["maintenance-centers"] },
    }),
    getStoreSettings(),
  ]);

  const downloads = downloadsResult.status === "fulfilled" ? (downloadsResult.value ?? []) : [];
  const videos = videosResult.status === "fulfilled" ? (videosResult.value ?? []) : [];
  const serviceCenters = centersResult.status === "fulfilled" ? (centersResult.value ?? []) : [];
  const faqs = storeSettingsResult.status === "fulfilled" ? (storeSettingsResult.value.faqs ?? []) : [];

  if (downloadsResult.status === "rejected") {
    console.error("[Support] Failed to fetch downloads:", downloadsResult.reason);
  }
  if (videosResult.status === "rejected") {
    console.error("[Support] Failed to fetch videos:", videosResult.reason);
  }
  if (centersResult.status === "rejected") {
    console.error("[Support] Failed to fetch service centers:", centersResult.reason);
  }
  if (storeSettingsResult.status === "rejected") {
    console.error("[Support] Failed to fetch store settings:", storeSettingsResult.reason);
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#060D1A] flex items-center justify-center">
          <div className="text-[#1B4F9B] dark:text-[#4B8FE2] font-700">Loading support center...</div>
        </div>
      }
    >
      <SupportClient 
        downloads={downloads} 
        videos={videos} 
        serviceCenters={serviceCenters} 
        faqs={faqs as any}
      />
    </Suspense>
  );
}
