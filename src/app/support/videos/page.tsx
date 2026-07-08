import { fetchApi } from "@/lib/api";
import { ApiVideo } from "@/types/api";
import { CACHE_TTL } from "@/lib/constants";
import VideosClient from "./VideosClient";

export default async function VideosPage() {
  const videos = await fetchApi<ApiVideo[]>("/api/site/videos", {
    next: { revalidate: CACHE_TTL.supportData, tags: ["videos"] },
  }).catch(() => []);

  return <VideosClient videos={videos || []} />;
}
