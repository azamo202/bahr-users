"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { Search, Filter, Grid3X3, List, X, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ApiCategory, ApiBrand, ApiProduct } from "@/types/api";
import { fetchApi } from "@/lib/api";
import { normalizeProducts } from "@/services/normalizers/productNormalizer";

const WHATSAPP_NUMBER = '966500000000';

function WhatsAppButton({ productName, productNameEn, small = false }: { productName: string; productNameEn: string; small?: boolean }) {
  const { t } = useApp();
  const message = encodeURIComponent(t(
    `مرحباً، أريد الاستفسار عن: ${productName}`,
    `Hello, I'd like to inquire about: ${productNameEn}`
  ));
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20BA58] text-white rounded-xl font-600 transition-all shadow-md shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:scale-105 ${small ? 'text-xs px-3 py-1.5' : 'text-sm px-4 py-2.5'}`}
    >
      <svg viewBox="0 0 24 24" className={`fill-current flex-shrink-0 ${small ? 'w-3 h-3' : 'w-4 h-4'}`}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      {t('اسأل عبر واتساب', 'Ask on WhatsApp')}
    </a>
  );
}

function ProductsPageContent({ initialCategories, initialBrands }: { initialCategories: ApiCategory[], initialBrands: ApiBrand[] }) {
  const { t, lang } = useApp();
  const searchParams = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category') || '';
    setSelectedCategory(cat);
  }, [searchParams]);

  const allBrands = initialBrands;
  const categories = initialCategories;

  const [filtered, setFiltered] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory) params.append("category_slug", selectedCategory);
        if (selectedBrand) params.append("brand_id", selectedBrand);
        if (searchQuery) params.append("search", searchQuery);
        params.append("locale", lang);
        params.append("lang", lang);
        params.append("per_page", "100");

        const res = await fetchApi<any>(`/api/site/products?${params.toString()}`);
        setFiltered(normalizeProducts(res.data || []));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(() => {
      fetchFilteredProducts();
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedBrand, searchQuery, lang]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setSearchQuery('');
  };

  const activeFiltersCount = [selectedCategory, selectedBrand, searchQuery].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#060D1A]" style={{ fontFamily: 'Cairo, sans-serif' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B4F9B] to-[#29ABE2] pt-28 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-5xl font-900 mb-3">{t('كتالوج المنتجات', 'Product Catalog')}</h1>
          <p className="text-white/80 text-sm">{t('اكتشف مجموعتنا الواسعة من الأجهزة المنزلية', 'Discover our wide range of home appliances')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search & Controls */}
        <div className="bg-white dark:bg-[#0E1A33] rounded-2xl p-4 shadow-sm border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="flex-1 min-w-[200px] relative">
              <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-[#5A6A85]" />
              <input
                type="text"
                placeholder={t('ابحث عن منتج أو ماركة...', 'Search product or brand...')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full ps-9 pe-3 py-2.5 text-sm rounded-xl bg-[#F5F8FF] dark:bg-[#060D1A] border border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10 text-[#0A1628] dark:text-[#E8F0FF] placeholder-[#5A6A85] focus:outline-none focus:ring-2 focus:ring-[#1B4F9B]/30"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute end-3 top-1/2 -translate-y-1/2">
                  <X size={14} className="text-[#5A6A85]" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="appearance-none ps-3 pe-8 py-2.5 text-sm rounded-xl bg-[#F5F8FF] dark:bg-[#060D1A] border border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10 text-[#0A1628] dark:text-[#E8F0FF] focus:outline-none focus:ring-2 focus:ring-[#1B4F9B]/30"
              >
                <option value="">{t('كل الفئات', 'All Categories')}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.slug}>{cat.name[lang as 'ar' | 'en'] ?? cat.name.en}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute end-2.5 top-1/2 -translate-y-1/2 text-[#5A6A85] pointer-events-none" />
            </div>

            {/* Brand Filter */}
            <div className="relative">
              <select
                value={selectedBrand}
                onChange={e => setSelectedBrand(e.target.value)}
                className="appearance-none ps-3 pe-8 py-2.5 text-sm rounded-xl bg-[#F5F8FF] dark:bg-[#060D1A] border border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10 text-[#0A1628] dark:text-[#E8F0FF] focus:outline-none focus:ring-2 focus:ring-[#1B4F9B]/30"
              >
                <option value="">{t('كل الماركات', 'All Brands')}</option>
                {allBrands.map(brand => (
                  <option key={brand.id} value={brand.id.toString()}>{brand.name}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute end-2.5 top-1/2 -translate-y-1/2 text-[#5A6A85] pointer-events-none" />
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-[#1B4F9B] dark:text-[#4B8FE2] bg-[#1B4F9B]/8 hover:bg-[#1B4F9B]/15 rounded-xl transition-colors"
              >
                <X size={14} />
                {t('مسح الفلاتر', 'Clear Filters')}
              </button>
            )}

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-[#F5F8FF] dark:bg-[#060D1A] rounded-xl p-1 border border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-[#1B4F9B] text-white' : 'text-[#5A6A85] hover:text-[#1B4F9B]'}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-[#1B4F9B] text-white' : 'text-[#5A6A85] hover:text-[#1B4F9B]'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-[#5A6A85] dark:text-[#7A9BC0]">
            {t(`${filtered.length} منتج`, `${filtered.length} products`)}
          </p>
          {selectedCategory && (
            <div className="flex items-center gap-2 text-sm text-[#1B4F9B] dark:text-[#4B8FE2] font-600">
              <Filter size={14} />
              {categories.find(c => c.slug === selectedCategory)?.name[lang as 'ar' | 'en'] ?? categories.find(c => c.slug === selectedCategory)?.name.en}
            </div>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <h3 className="text-lg font-700 text-[#0A1628] dark:text-[#E8F0FF] mb-2">{t('جاري التحميل...', 'Loading...')}</h3>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-700 text-[#0A1628] dark:text-[#E8F0FF] mb-2">{t('لا توجد نتائج', 'No Results Found')}</h3>
            <p className="text-[#5A6A85] dark:text-[#7A9BC0] text-sm mb-6">{t('جرب كلمات بحث مختلفة أو أزل الفلاتر', 'Try different search terms or remove filters')}</p>
            <button onClick={clearFilters} className="px-6 py-3 bg-[#1B4F9B] text-white rounded-xl text-sm font-600">
              {t('مسح الفلاتر', 'Clear Filters')}
            </button>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group bg-white dark:bg-[#0E1A33] rounded-2xl overflow-hidden border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 hover:shadow-xl hover:shadow-[#1B4F9B]/10 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative h-52 overflow-hidden bg-[#EBF0FA] dark:bg-[#122040]">
                  <img
                    src={product.images?.[0]?.url || ''}
                    alt={product.name[lang as 'ar' | 'en'] ?? product.name.en}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-xs text-[#29ABE2] font-700 mb-1">{product.brand?.name || '---'}</div>
                  <h3 className="text-sm font-700 text-[#0A1628] dark:text-[#E8F0FF] mb-2 line-clamp-2 min-h-[40px]">
                    {product.name[lang as 'ar' | 'en'] ?? product.name.en}
                  </h3>
                  <div className="flex flex-wrap gap-1 mb-3 mt-auto h-[48px] overflow-hidden">
                    {(product.features || []).slice(0, 2).map((spec, si) => (
                      <span key={si} className="text-xs bg-[#EBF0FA] dark:bg-[#122040] text-[#5A6A85] dark:text-[#7A9BC0] px-2 py-0.5 rounded-full truncate max-w-full block">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Link href={`/products/${product.id}`}
                      className="flex-1 text-center py-2 text-xs font-600 text-[#1B4F9B] dark:text-[#4B8FE2] bg-[#1B4F9B]/8 hover:bg-[#1B4F9B]/15 rounded-xl transition-colors"
                    >
                      {t('التفاصيل', 'Details')}
                    </Link>
                    <WhatsAppButton productName={product.name?.ar ?? ''} productNameEn={product.name?.en ?? ''} small />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="group bg-white dark:bg-[#0E1A33] rounded-2xl overflow-hidden border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 hover:shadow-lg hover:shadow-[#1B4F9B]/8 transition-all"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-40 sm:h-auto sm:w-48 flex-shrink-0 overflow-hidden bg-[#EBF0FA] dark:bg-[#122040]">
                    <img
                      src={product.images?.[0]?.url || ''}
                      alt={product.name[lang as 'ar' | 'en'] ?? product.name.en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-[#29ABE2] font-700">{product.brand?.name || '---'}</span>
                        <span className="text-xs text-[#5A6A85] dark:text-[#7A9BC0]">
                          · {product.category?.name[lang as 'ar' | 'en'] ?? product.category?.name.en}
                        </span>
                      </div>
                      <h3 className="text-base font-700 text-[#0A1628] dark:text-[#E8F0FF] mb-2">
                        {product.name[lang as 'ar' | 'en'] ?? product.name.en}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {(product.features || []).map((spec, si) => (
                          <span key={si} className="text-xs bg-[#EBF0FA] dark:bg-[#122040] text-[#5A6A85] dark:text-[#7A9BC0] px-2.5 py-1 rounded-full">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-auto">
                      <Link href={`/products/${product.id}`}
                        className="px-5 py-2 text-sm font-600 text-[#1B4F9B] dark:text-[#4B8FE2] bg-[#1B4F9B]/8 hover:bg-[#1B4F9B]/15 rounded-xl transition-colors"
                      >
                        {t('عرض التفاصيل', 'View Details')}
                      </Link>
                      <WhatsAppButton productName={product.name?.ar ?? ''} productNameEn={product.name?.en ?? ''} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsClient({ initialCategories, initialBrands }: { initialCategories: ApiCategory[], initialBrands: ApiBrand[] }) {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#F5F8FF] dark:bg-[#060D1A]" />}>
      <ProductsPageContent initialCategories={initialCategories} initialBrands={initialBrands} />
    </React.Suspense>
  );
}
