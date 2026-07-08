import { fetchApi } from "@/lib/api";
import { ApiProduct, ApiCategory } from "@/types/api";
import { normalizeProduct, normalizeProducts } from "@/services/normalizers/productNormalizer";
import { normalizeCategories } from "@/services/normalizers/categoryNormalizer";
import { CACHE_TTL } from "@/lib/constants";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: PageProps) {
  const { id } = await params;
  
  if (!/^\d{1,10}$/.test(id)) {
    notFound();
  }

  const lang = "ar"; // Or detect from cookies/headers if you add i18n support later

  let product: ApiProduct;
  try {
    product = await fetchApi<ApiProduct>(
      `/api/site/products/${id}?locale=${lang}&lang=${lang}`,
      {
        next: { revalidate: CACHE_TTL.products, tags: [`product-${id}`, "products"] },
      }
    ).then(normalizeProduct);
  } catch (error) {
    console.error(`[ProductDetail] Failed to fetch product ${id}:`, error);
    notFound();
  }

  const [relatedResult, categoriesResult] = await Promise.allSettled([
    product.category?.slug
      ? fetchApi<ApiProduct[]>(
        `/api/site/products?category_slug=${product.category.slug}&per_page=5&locale=${lang}&lang=${lang}`,
        {
          next: { revalidate: CACHE_TTL.products, tags: ["products"] },
        }
      )
      : Promise.resolve([] as ApiProduct[]),
    fetchApi<ApiCategory[]>("/api/site/categories", {
      next: { revalidate: CACHE_TTL.categories, tags: ["categories"] },
    })
  ]);

  let related: ApiProduct[] = [];
  if (relatedResult.status === "fulfilled") {
    const list = relatedResult.value;
    const rawList: ApiProduct[] = Array.isArray(list) ? list : (list as any)?.data ?? [];
    related = normalizeProducts(rawList.filter((p) => String(p.id) !== id).slice(0, 4));
  }

  let categories: ApiCategory[] = [];
  if (categoriesResult.status === "fulfilled") {
    categories = normalizeCategories(categoriesResult.value ?? []);
  }

  return (
    <ProductDetailClient 
      product={product} 
      related={related} 
      categories={categories}
    />
  );
}
