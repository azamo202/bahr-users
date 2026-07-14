import { fetchApi } from "@/lib/api";
import { ApiCategory } from "@/types/api";
import { normalizeCategories } from "@/services/normalizers/categoryNormalizer";
import { NavbarClient } from "./NavbarClient";
import { CACHE_TTL } from "@/lib/constants";

export async function Navbar() {
  let categories: ApiCategory[] = [];
  try {
    const categoriesResult = await fetchApi<ApiCategory[]>("/api/site/categories", {
      next: { revalidate: CACHE_TTL.categories, tags: ["categories"] },
    });
    categories = normalizeCategories(categoriesResult || []).filter(cat => !cat.parent_id);
  } catch (error) {
    console.error("[Navbar] Failed to fetch categories:", error);
  }

  return <NavbarClient categories={categories} />;
}
