import { fetchApi, getStoreSettings } from "@/lib/api";
import { ApiHomeSection, ApiCategory, ApiBrand } from "@/types/api";
import HomePageClient from "./HomePageClient";
import { normalizeProducts } from "@/services/normalizers/productNormalizer";
import { normalizeCategories } from "@/services/normalizers/categoryNormalizer";
import { normalizeBrands } from "@/services/normalizers/brandNormalizer";
import { CACHE_TTL } from "@/lib/constants";

export default async function Home() {
  let sections: ApiHomeSection[] = [];
  let categories: ApiCategory[] = [];
  let brands: ApiBrand[] = [];

  const [sectionsResult, categoriesResult, settingsResult, brandsResult] = await Promise.allSettled([
    fetchApi<ApiHomeSection[]>("/api/site/home-sections", {
      next: { revalidate: CACHE_TTL.homeData, tags: ["home-sections"] },
    }),
    fetchApi<ApiCategory[]>("/api/site/categories", {
      next: { revalidate: CACHE_TTL.categories, tags: ["categories"] },
    }),
    getStoreSettings(),
    fetchApi<ApiBrand[]>("/api/site/brands", {
      next: { revalidate: CACHE_TTL.brands, tags: ["brands"] },
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
    categories = normalizeCategories(categoriesResult.value ?? []).filter(cat => !cat.parent_id);
  } else {
    console.error("[Home] Failed to fetch categories:", categoriesResult.reason);
  }

  if (brandsResult.status === "fulfilled") {
    brands = normalizeBrands(brandsResult.value ?? []);
  } else {
    console.error("[Home] Failed to fetch brands:", brandsResult.reason);
  }

  const settings = settingsResult.status === "fulfilled" ? settingsResult.value : null;
  const stats = settings?.stats || [];

  return <HomePageClient sections={sections} categories={categories} initialStats={stats} initialBrands={brands} />;
}
