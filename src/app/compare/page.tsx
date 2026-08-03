"use client";

import { useState, useEffect, useMemo } from "react";
import { useCompare } from "../context/CompareContext";
import { ArrowLeft, Box, X, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useApp } from "../context/AppContext";
import { API_BASE_URL } from "@/lib/constants";
import { ApiProduct } from "@/types/api";

export default function ComparePage() {
  const { selectedProducts, removeProduct } = useCompare();
  const { t, lang, dir } = useApp();
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);
  
  const [data, setData] = useState<ApiProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch data
  useEffect(() => {
    if (selectedProducts.length === 0) {
      setData([]);
      setIsLoading(false);
      return;
    }

    const fetchCompareData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const qs = selectedProducts.map(p => `ids[]=${p.id}`).join("&");
        const res = await fetch(`${API_BASE_URL}/api/site/products/compare?${qs}&locale=${lang}&lang=${lang}`, {
          headers: { "Accept-Language": lang }
        });
        if (!res.ok) throw new Error("Failed to fetch compare data");
        
        const json = await res.json();
        setData(json.data || []);
      } catch (err) {
        console.error("Compare error:", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompareData();
  }, [selectedProducts, lang]);

  const products = data;

  const transformedSpecs = useMemo(() => {
    if (!products.length) return [];

    const groupMap = new Map<string, Map<string, Record<string, string>>>();

    // Helper to safely extract localized string from either object or JSON string
    const getLocalized = (val: any): string => {
      if (!val) return "-";
      if (typeof val === 'string') {
        if (val.startsWith('{') && val.endsWith('}')) {
          try {
            const parsed = JSON.parse(val);
            return parsed[lang] || parsed['en'] || Object.values(parsed)[0] || val;
          } catch (e) {
            return val;
          }
        }
        return val;
      }
      if (typeof val === 'object') {
        return val[lang] || val['en'] || Object.values(val)[0] || "-";
      }
      return String(val);
    };

    // Collect all groups and keys
    products.forEach((product) => {
      const specs = product.specifications || {};
      Object.entries(specs).forEach(([groupNameRaw, groupSpecs]) => {
        const groupName = getLocalized(groupNameRaw);
        
        if (!groupMap.has(groupName)) {
          groupMap.set(groupName, new Map());
        }
        const keyMap = groupMap.get(groupName)!;

        groupSpecs.forEach((spec) => {
          const specKey = getLocalized(spec.key);
          const specVal = getLocalized(spec.value);

          if (!keyMap.has(specKey)) {
            keyMap.set(specKey, {});
          }
          keyMap.get(specKey)![product.id] = specVal;
        });
      });
    });

    const result: Array<{
      group: string;
      keys: Array<{ key: string; values: Record<string, string>; isDifferent: boolean }>;
    }> = [];

    groupMap.forEach((keyMap, groupName) => {
      const keysResult: Array<{ key: string; values: Record<string, string>; isDifferent: boolean }> = [];
      keyMap.forEach((valuesMap, key) => {
        // Check if values are different among the selected products
        let firstValue: string | undefined = undefined;
        let isDifferent = false;
        
        for (const p of products) {
          const val = valuesMap[p.id] || "-";
          if (firstValue === undefined) {
            firstValue = val;
          } else if (firstValue !== val) {
            isDifferent = true;
            break;
          }
        }

        keysResult.push({
          key,
          values: valuesMap,
          isDifferent,
        });
      });

      result.push({ group: groupName, keys: keysResult });
    });

    return result;
  }, [products, lang]);

  if (selectedProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 rounded-full bg-[#1B4F9B]/10 p-6">
          <Box className="h-12 w-12 text-[#1B4F9B]" />
        </div>
        <h1 className="text-3xl font-bold text-[#0A1628] dark:text-white">{t("مقارنة المنتجات", "Compare Products", "بەراوردکردنی بەرهەمەکان")}</h1>
        <p className="mt-2 max-w-md text-[#5A6A85] dark:text-[#7A9BC0]">
          {t("لا توجد منتجات للمقارنة. تصفح الموقع وأضف المنتجات للمقارنة بينها.", "No products to compare. Browse the site and add products to compare.", "هیچ بەرهەمێک نییە بۆ بەراوردکردن. بگەڕێ بەناو ماڵپەڕەکەدا و بەرهەمەکان زیاد بکە.")}
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1B4F9B] px-6 py-3 font-semibold text-white transition-all hover:bg-[#153e7a]"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t("تصفح المنتجات", "Browse Products", "گەڕان بەناو بەرهەمەکان")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 lg:py-16" dir={dir}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-[#5A6A85] dark:text-[#7A9BC0] hover:text-[#1B4F9B] dark:hover:text-[#4B8FE2]">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t("تصفح المنتجات", "Browse Products", "گەڕان بەناو بەرهەمەکان")}
          </Link>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl text-[#0A1628] dark:text-white">{t("مقارنة المنتجات", "Compare Products", "بەراوردکردنی بەرهەمەکان")}</h1>
          <p className="mt-2 text-[#5A6A85] dark:text-[#7A9BC0]">
            {selectedProducts.length} {t("منتجات محددة", "Selected Products", "بەرهەمە دیاریکراوەکان")}
          </p>
        </div>
        
        <label htmlFor="differences" className="flex items-center gap-3 rounded-full border border-[#1B4F9B]/20 bg-[#F5F8FF] dark:bg-[#122040] px-4 py-2 cursor-pointer select-none">
          <div className="relative inline-flex items-center">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={showDifferencesOnly} 
              onChange={(e) => setShowDifferencesOnly(e.target.checked)} 
              id="differences"
            />
            <div className="w-9 h-5 bg-[#C5D3E8] peer-focus:outline-none rounded-full peer dark:bg-[#2A3A55] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1B4F9B]"></div>
          </div>
          <span className="text-sm font-medium text-[#0A1628] dark:text-[#E8F0FF]">
            {t("إبراز الاختلافات", "Highlight differences", "جیاوازییەکان نیشان بدە")}
          </span>
        </label>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {[...Array(selectedProducts.length)].map((_, i) => (
            <div key={i} className="h-64 w-full rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 dark:bg-red-900/20 p-10 text-red-600 dark:text-red-400">
          <AlertCircle className="mb-4 h-10 w-10" />
          <h2 className="font-bold">{t("فشل في تحميل بيانات المقارنة", "Failed to load comparison data", "نەتوانرا داتاکانی بەراوردکردن باربکرێت")}</h2>
          <p className="text-sm opacity-80">{t("يرجى المحاولة مرة أخرى لاحقاً.", "Please try again later.", "تکایە دواتر هەوڵ بدەرەوە.")}</p>
        </div>
      ) : (
        <div className="relative overflow-x-auto pb-10">
          {/* Compare Grid */}
          <div className="min-w-[800px]">
            {/* Sticky Header Row */}
            <div className="sticky top-0 z-40 mb-8 grid auto-cols-fr grid-flow-col gap-4 bg-white/80 dark:bg-[#060D1A]/80 pb-4 pt-2 backdrop-blur-xl md:gap-8 border-b border-[#1B4F9B]/10 dark:border-white/10">
              {products.map((product) => {
                const imgUrl = product.images?.find((img) => img.is_primary)?.url || product.images?.[0]?.url || "";
                return (
                  <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10 bg-white dark:bg-[#0E1A33] p-4 transition-all hover:border-[#1B4F9B]/50 hover:shadow-lg">
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-1.5 text-[#5A6A85] opacity-0 backdrop-blur-md transition-all hover:bg-red-500 hover:text-white group-hover:opacity-100 rtl:right-auto rtl:left-3"
                      aria-label="Remove"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#F5F8FF] dark:bg-[#122040]">
                      {imgUrl ? (
                        <img src={imgUrl} alt={product.name[lang as 'ar' | 'en' | 'ku'] || product.name['en']} className="h-full w-full object-contain p-2" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#C5D3E8]">
                          <Box className="w-10 h-10" />
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-[10px] font-bold tracking-wider text-[#29ABE2]">
                        {product.brand?.name}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold leading-tight line-clamp-2 text-[#0A1628] dark:text-[#E8F0FF]">
                        {product.name[lang as 'ar' | 'en' | 'ku'] || product.name['en']}
                      </h3>
                    </div>
                  </div>
                );
              })}
              {/* Fill empty spots if less than 4 */}
              {Array.from({ length: Math.max(0, 4 - products.length) }).map((_, i) => (
                <div key={`empty-${i}`} className="hidden flex-col items-center justify-center rounded-2xl border border-dashed border-[#1B4F9B]/20 bg-[#F5F8FF]/50 dark:bg-[#122040]/50 p-4 opacity-50 lg:flex">
                  <Box className="mb-2 h-8 w-8 text-[#5A6A85]/30" />
                  <span className="text-xs font-medium text-[#5A6A85]">{t("إضافة منتج", "Add product", "بەرهەم زیاد بکە")}</span>
                </div>
              ))}
            </div>

            {/* Specifications Rows */}
            <div className="flex flex-col gap-8">
              {transformedSpecs.map((group, gIdx) => {
                // Filter keys if showDifferencesOnly is active
                const visibleKeys = group.keys.filter(k => !showDifferencesOnly || k.isDifferent);

                if (visibleKeys.length === 0) return null;

                return (
                  <div key={gIdx} className="overflow-hidden rounded-2xl border border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10 bg-white dark:bg-[#0E1A33]">
                    <div className="bg-[#F5F8FF] dark:bg-[#122040] px-6 py-4">
                      <h3 className="font-bold text-[#0A1628] dark:text-white">{group.group}</h3>
                    </div>
                    <div className="divide-y divide-[#1B4F9B]/5 dark:divide-[#4B8FE2]/10">
                      {visibleKeys.map((keyObj, kIdx) => (
                        <div key={kIdx} className={`grid auto-cols-fr grid-flow-col gap-4 px-6 py-4 md:gap-8 transition-colors ${keyObj.isDifferent ? "bg-amber-50/50 dark:bg-amber-900/10" : ""}`}>
                          {products.map((p) => (
                            <div key={p.id} className="flex flex-col gap-1 border-s border-[#1B4F9B]/10 dark:border-white/10 ps-4 first:border-0 first:ps-0">
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5A6A85] dark:text-[#7A9BC0] lg:hidden">
                                {keyObj.key}
                              </span>
                              <div className="hidden lg:block text-[11px] font-semibold uppercase tracking-wider text-[#5A6A85] dark:text-[#7A9BC0] mb-1">
                                {products[0].id === p.id ? keyObj.key : "\u00A0"}
                              </div>
                              <span className="text-sm font-medium text-[#0A1628] dark:text-[#E8F0FF]">
                                {keyObj.values[p.id] || "—"}
                              </span>
                            </div>
                          ))}
                          {Array.from({ length: Math.max(0, 4 - products.length) }).map((_, i) => (
                            <div key={`empty-val-${i}`} className="hidden lg:block" />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
