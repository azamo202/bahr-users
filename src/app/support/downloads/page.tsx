import { fetchApi } from "@/lib/api";
import { ApiDownload } from "@/types/api";
import { CACHE_TTL } from "@/lib/constants";
import DownloadsClient from "./DownloadsClient";

export default async function DownloadsPage() {
  const downloads = await fetchApi<ApiDownload[]>("/api/site/downloads", {
    next: { revalidate: CACHE_TTL.supportData, tags: ["downloads"] },
  }).catch(() => []);

  return <DownloadsClient downloads={downloads || []} />;
}
