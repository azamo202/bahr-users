"use client";
import React from "react";

import Link from "next/link";
import { ApiProduct } from "@/types/api";
import { ArrowRight, GitCompare, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCompare } from "@/hooks/use-compare";
import { useI18n } from "@/i18n/I18nProvider";

interface Props {
  product: ApiProduct;
  className?: string;
}

export const ProductCard = ({ product, className }: Props) => {
  const { toggleProduct, isCompared } = useCompare();
  const { lang, t } = useI18n();
  const compared = isCompared(product.id);

  const primaryImage = React.useMemo(() => {
    if (!product.images || product.images.length === 0) {
      return "https://placehold.co/600x400/f3f4f6/6b7280?text=No+Image";
    }

    const primary = product.images.find(img => img.is_primary);

    return (primary || product.images[0]).url;
  }, [product.images]);

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleProduct({
      id: product.id,
      name: product.name,
      image: primaryImage,
      brand: product.brand?.name || "",
      category: product.category.name,
    });
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border/40 bg-card shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_-12px_rgba(27,79,160,0.2)] hover:border-primary/40",
        className
      )}
    >
      <div className="relative w-full shrink-0 aspect-[4/3] sm:aspect-square overflow-hidden bg-gradient-to-br from-white to-muted/30 dark:from-zinc-900 dark:to-zinc-950 p-6 flex items-center justify-center">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
        
        <img
          src={primaryImage}
          alt={product.name[lang] || product.name['en']}
          loading="lazy"
          className="relative z-10 h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-700 group-hover:scale-110 drop-shadow-sm"
        />
        
        <div className="absolute start-3 top-3 z-20 flex gap-2">
          {product.brand?.name && (
            <span className={cn(
              "rounded-full bg-gradient-hero px-3 py-1.5 text-[10px] font-bold font-display text-white shadow-md flex items-center gap-1",
              lang === "en" ? "tracking-wider" : "tracking-normal"
            )}>
              <Sparkles className="w-3 h-3 text-secondary" />
              {product.brand.name}
            </span>
          )}
        </div>
        
        <button
          onClick={handleCompare}
          className={cn(
            "absolute end-3 top-3 z-20 rounded-full p-2.5 transition-all duration-300 hover:scale-110",
            compared
              ? "bg-secondary text-white shadow-[0_4px_12px_rgba(232,92,16,0.3)]"
              : "bg-white/80 dark:bg-black/50 text-muted-foreground opacity-0 backdrop-blur-md hover:bg-secondary hover:text-white group-hover:opacity-100 shadow-sm"
          )}
          aria-label={compared ? "Remove from compare" : "Add to compare"}
        >
          <GitCompare className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex flex-1 flex-col p-5 sm:p-6 text-start bg-card relative">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {product.brand?.logo && (
              <img
                src={product.brand.logo}
                alt={product.brand.name}
                className="h-5 w-auto object-contain opacity-80"
              />
            )}
            <p className={cn(
              "text-[10px] sm:text-xs font-bold text-muted-foreground uppercase",
              lang === "en" ? "tracking-widest" : "tracking-normal"
            )}>
              {product.brand?.name}
            </p>
          </div>
        </div>
        
        <h3 className="font-display text-base sm:text-lg font-bold leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {product.name[lang] || product.name['en']}
        </h3>
        
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
          {product.description?.[lang] || product.description?.['en']}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 rtl:translate-x-4 rtl:group-hover:translate-x-0">
            {t("cta.viewDetails") || "View Details"}
          </span>
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/5 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(27,79,160,0.4)] group-hover:rotate-45 rtl:group-hover:-rotate-45">
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </div>
        </div>
      </div>
    </Link>
  );
};
