import { fetchApi } from "@/lib/api";
import { ApiHomeSection, ApiCategory } from "@/types/api";
import HomePageClient from "./HomePageClient";
import { normalizeProducts } from "@/services/normalizers/productNormalizer";
import { normalizeCategories } from "@/services/normalizers/categoryNormalizer";
import { CACHE_TTL } from "@/lib/constants";

export default async function Home() {
  let sections: ApiHomeSection[] = [];
  let categories: ApiCategory[] = [];

  const [sectionsResult, categoriesResult] = await Promise.allSettled([
    fetchApi<ApiHomeSection[]>("/api/site/home-sections", {
      next: { revalidate: CACHE_TTL.homeData, tags: ["home-sections"] },
    }),
    fetchApi<ApiCategory[]>("/api/site/categories", {
      next: { revalidate: CACHE_TTL.categories, tags: ["categories"] },
    }),
  ]);

  if (sectionsResult.status === "fulfilled") {
    sections = (sectionsResult.value ?? []).map(section => ({
      ...section,
      products: normalizeProducts(section.products)
    }));
  } else {
    console.error("[Home] Failed to fetch home sections:", sectionsResult.reason);
  }

  if (categoriesResult.status === "fulfilled") {
    categories = normalizeCategories(categoriesResult.value ?? []);
  } else {
    console.error("[Home] Failed to fetch categories:", categoriesResult.reason);
  }

  return <HomePageClient sections={sections} categories={categories} />;
}
