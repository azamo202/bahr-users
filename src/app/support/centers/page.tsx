import { fetchApi } from "@/lib/api";
import { ApiMaintenanceCenter } from "@/types/api";
import { CACHE_TTL } from "@/lib/constants";
import CentersClient from "./CentersClient";

export default async function CentersPage() {
  const centers = await fetchApi<ApiMaintenanceCenter[]>("/api/site/maintenance-centers", {
    next: { revalidate: CACHE_TTL.supportData, tags: ["maintenance-centers"] },
  }).catch(() => []);

  return <CentersClient centers={centers || []} />;
}
