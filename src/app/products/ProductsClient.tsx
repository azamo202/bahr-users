"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Search, Filter, Grid3X3, List, X, ChevronDown, GitCompare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useCompare } from '../context/CompareContext';
import { ApiCategory, ApiBrand, ApiProduct } from "@/types/api";
import { fetchApi } from "@/lib/api";
import { normalizeProducts } from "@/services/normalizers/productNormalizer";



function WhatsAppButton({ productName, productNameEn, small = false }: { productName: string; productNameEn: string; small?: boolean }) {
  const { t, whatsapp } = useApp();
  const message = encodeURIComponent(t(
    `مرحباً، أريد الاستفسار عن: ${productName}`,
    `Hello, I'd like to inquire about: ${productNameEn}`
  ));
  return (
    <a
      href={`https://wa.me/${whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20BA58] text-white rounded-xl font-600 transition-all shadow-md shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:scale-105 ${small ? 'text-xs px-3 py-1.5' : 'text-sm px-4 py-2.5'}`}
    >
      <svg viewBox="0 0 24 24" className={`fill-current flex-shrink-0 ${small ? 'w-3 h-3' : 'w-4 h-4'}`}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      {t('اسأل عبر واتساب', 'Ask on WhatsApp', 'پرسیار بکە لە ڕێگەی واتسئەپ')}
    </a>
  );
}

function CategoryDropdown({ categories, selectedCategory, onChange, t, lang }: { categories: ApiCategory[], selectedCategory: string, onChange: (slug: string) => void, t: any, lang: string }) {
  const [open, setOpen] = useState(false);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rootCategories = categories.filter((c: any) => !c.parent_id);

  const getCategoryName = (slug: string) => {
    if (!slug) return t('كل الفئات', 'All Categories', 'هەموو پۆلەکان');
    const findCat = (cats: ApiCategory[]): ApiCategory | undefined => {
      for (const cat of cats) {
        if (cat.slug === slug) return cat;
        if (cat.children && cat.children.length > 0) {
          const found = findCat(cat.children);
          if (found) return found;
        }
      }
      return undefined;
    };
    const cat = findCat(rootCategories);
    return cat ? (cat.name[lang as 'ar' | 'en' | 'ku'] || cat.name.en) : t('كل الفئات', 'All Categories', 'هەموو پۆلەکان');
  };

  const toggleExpand = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpandedCat(expandedCat === id ? null : id);
  };

  return (
    <div className="relative min-w-[200px]" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full ps-3 pe-3 py-2.5 text-sm rounded-xl bg-[#F5F8FF] dark:bg-[#060D1A] border border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10 text-[#0A1628] dark:text-[#E8F0FF] focus:outline-none focus:ring-2 focus:ring-[#1B4F9B]/30"
      >
        <span className="truncate max-w-[150px]">{getCategoryName(selectedCategory)}</span>
        <ChevronDown size={14} className={`text-[#5A6A85] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full min-w-[240px] bg-white dark:bg-[#0E1A33] border border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10 rounded-xl shadow-xl max-h-96 overflow-y-auto py-2 top-full start-0">
          <button
            onClick={() => { onChange(''); setOpen(false); }}
            className={`w-full text-start px-4 py-2 text-sm hover:bg-[#F5F8FF] dark:hover:bg-[#122040] transition-colors ${!selectedCategory ? 'text-[#1B4F9B] dark:text-[#4B8FE2] font-bold bg-[#F5F8FF] dark:bg-[#122040]' : 'text-[#5A6A85] dark:text-[#7A9BC0]'}`}
          >
            {t('كل الفئات', 'All Categories', 'هەموو پۆلەکان')}
          </button>

          {rootCategories.map((cat: any) => (
            <div key={cat.id}>
              <div className={`flex items-center justify-between w-full hover:bg-[#F5F8FF] dark:hover:bg-[#122040] transition-colors ${selectedCategory === cat.slug ? 'bg-[#F5F8FF] dark:bg-[#122040]' : ''}`}>
                <button
                  onClick={(e) => {
                    if (cat.children && cat.children.length > 0 && expandedCat !== cat.id) {
                      toggleExpand(e, cat.id);
                    } else {
                      onChange(cat.slug);
                      setOpen(false);
                    }
                  }}
                  className={`flex-1 text-start px-4 py-2 text-sm ${selectedCategory === cat.slug ? 'text-[#1B4F9B] dark:text-[#4B8FE2] font-bold' : 'text-[#0A1628] dark:text-[#E8F0FF]'}`}
                >
                  {cat.name[lang as 'ar' | 'en' | 'ku'] || cat.name.en}
                </button>
                {cat.children && cat.children.length > 0 && (
                  <button onClick={(e) => toggleExpand(e, cat.id)} className="px-3 py-2 text-[#5A6A85] hover:text-[#1B4F9B] dark:hover:text-[#4B8FE2] transition-colors">
                    <ChevronDown size={14} className={`transition-transform duration-300 ${expandedCat === cat.id ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
              {cat.children && cat.children.length > 0 && expandedCat === cat.id && (
                <div className="bg-[#F5F8FF]/40 dark:bg-[#060D1A]/40 pb-1">
                  {cat.children.map((subCat: any) => (
                    <button
                      key={subCat.id}
                      onClick={() => { onChange(subCat.slug); setOpen(false); }}
                      className={`w-full text-start px-8 py-2 text-sm hover:bg-[#1B4F9B]/5 dark:hover:bg-[#4B8FE2]/10 transition-colors flex items-center gap-2 ${selectedCategory === subCat.slug ? 'text-[#1B4F9B] dark:text-[#4B8FE2] font-bold' : 'text-[#5A6A85] dark:text-[#7A9BC0]'}`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1B4F9B]/30 dark:bg-[#4B8FE2]/30" />
                      <span className="truncate">{subCat.name[lang as 'ar' | 'en' | 'ku'] || subCat.name.en}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BrandDropdown({ brands, selectedBrand, onChange, t }: { brands: ApiBrand[], selectedBrand: string, onChange: (id: string) => void, t: any }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getBrandName = (id: string) => {
    if (!id) return t('كل الماركات', 'All Brands', 'هەموو براندەکان');
    const brand = brands.find(b => b.id.toString() === id);
    return brand ? brand.name : t('كل الماركات', 'All Brands', 'هەموو براندەکان');
  };

  return (
    <div className="relative min-w-[160px]" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full ps-3 pe-3 py-2.5 text-sm rounded-xl bg-[#F5F8FF] dark:bg-[#060D1A] border border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10 text-[#0A1628] dark:text-[#E8F0FF] focus:outline-none focus:ring-2 focus:ring-[#1B4F9B]/30"
      >
        <span className="truncate max-w-[120px]">{getBrandName(selectedBrand)}</span>
        <ChevronDown size={14} className={`text-[#5A6A85] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full min-w-[200px] bg-white dark:bg-[#0E1A33] border border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10 rounded-xl shadow-xl max-h-96 overflow-y-auto py-2 top-full start-0">
          <button
            onClick={() => { onChange(''); setOpen(false); }}
            className={`w-full text-start px-4 py-2 text-sm hover:bg-[#F5F8FF] dark:hover:bg-[#122040] transition-colors ${!selectedBrand ? 'text-[#1B4F9B] dark:text-[#4B8FE2] font-bold bg-[#F5F8FF] dark:bg-[#122040]' : 'text-[#5A6A85] dark:text-[#7A9BC0]'}`}
          >
            {t('كل الماركات', 'All Brands', 'هەموو براندەکان')}
          </button>

          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => { onChange(brand.id.toString()); setOpen(false); }}
              className={`w-full text-start px-4 py-2 text-sm hover:bg-[#F5F8FF] dark:hover:bg-[#122040] transition-colors ${selectedBrand === brand.id.toString() ? 'text-[#1B4F9B] dark:text-[#4B8FE2] font-bold bg-[#F5F8FF] dark:bg-[#122040]' : 'text-[#0A1628] dark:text-[#E8F0FF]'}`}
            >
              {brand.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductsPageContent({ initialCategories, initialBrands }: { initialCategories: ApiCategory[], initialBrands: ApiBrand[] }) {
  const { t, lang } = useApp();
  const { toggleProduct, isCompared } = useCompare();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category') || '';
    setSelectedCategory(cat);
    const search = searchParams.get('search') || '';
    setSearchQuery(search);
  }, [searchParams]);

  const allBrands = initialBrands;
  const categories = initialCategories;

  const [filtered, setFiltered] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState<{
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  } | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, searchQuery]);

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
        params.append("page", currentPage.toString());

        const res = await fetchApi<any>(`/api/site/products?${params.toString()}`, { unwrap: false });
        const rawList = res?.data || [];
        setFiltered(normalizeProducts(rawList));

        if (res?.meta) {
          setPaginationMeta({
            current_page: res.meta.current_page || 1,
            last_page: res.meta.last_page || 1,
            total: res.meta.total || 0,
            per_page: res.meta.per_page || 12,
          });
        } else {
          setPaginationMeta(null);
        }
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
  }, [selectedCategory, selectedBrand, searchQuery, lang, currentPage]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setSearchQuery('');
  };

  const activeFiltersCount = [selectedCategory, selectedBrand, searchQuery].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#060D1A]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B4F9B] to-[#29ABE2] pt-28 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-5xl font-900 mb-3">{t('كتالوج المنتجات', 'Product Catalog', 'کەتەلۆگی بەرهەمەکان')}</h1>
          <p className="text-white/80 text-sm">{t('اكتشف مجموعتنا الواسعة من الأجهزة المنزلية', 'Discover our wide range of home appliances', 'کۆمەڵە بەرفراوانەکەمان لە ئامێرەکانی ناوماڵ بدۆزەرەوە')}</p>
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
                placeholder={t('ابحث عن منتج أو ماركة...', 'Search product or brand...', 'بەدوای بەرهەمێک یان براندێکدا بگەڕێ...')}
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
            <CategoryDropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onChange={setSelectedCategory}
              t={t}
              lang={lang}
            />

            {/* Brand Filter */}
            <BrandDropdown
              brands={allBrands}
              selectedBrand={selectedBrand}
              onChange={setSelectedBrand}
              t={t}
            />

            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-[#1B4F9B] dark:text-[#4B8FE2] bg-[#1B4F9B]/8 hover:bg-[#1B4F9B]/15 rounded-xl transition-colors"
              >
                <X size={14} />
                {t('مسح الفلاتر', 'Clear Filters', 'سڕینەوەی فلتەرەکان')}
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
            {t(
              `${paginationMeta?.total ?? filtered.length} منتج`,
              `${paginationMeta?.total ?? filtered.length} products`,
              `${paginationMeta?.total ?? filtered.length} بەرهەم`
            )}
          </p>
          {selectedCategory && (
            <div className="flex items-center gap-2 text-sm text-[#1B4F9B] dark:text-[#4B8FE2] font-600">
              <Filter size={14} />
              {categories.find(c => c.slug === selectedCategory)?.name[lang as 'ar' | 'en' | 'ku'] ?? categories.find(c => c.slug === selectedCategory)?.name.en}
            </div>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <h3 className="text-lg font-700 text-[#0A1628] dark:text-[#E8F0FF] mb-2">{t('جاري التحميل...', 'Loading...', 'خەریکی بارکردنە...')}</h3>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-700 text-[#0A1628] dark:text-[#E8F0FF] mb-2">{t('لا توجد نتائج', 'No Results Found', 'هیچ ئەنجامێک نەدۆزرایەوە')}</h3>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                onClick={() => router.push(`/products/${product.id}`)}
                className="group bg-white dark:bg-[#0E1A33] rounded-2xl overflow-hidden border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 hover:shadow-xl hover:shadow-[#1B4F9B]/10 transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
              >
                <div className="relative h-52 overflow-hidden bg-[#F5F8FF] dark:bg-[#0E1A33] flex items-center justify-center">
                  {product.images?.[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name[lang as 'ar' | 'en' | 'ku'] ?? product.name.en}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#C5D3E8] dark:text-[#2A3A55]">
                      <svg viewBox="0 0 24 24" className="w-16 h-16 fill-current"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-xs text-[#29ABE2] font-700 mb-1">{product.brand?.name || '---'}</div>
                  <h3 className="text-sm font-700 text-[#0A1628] dark:text-[#E8F0FF] mb-1 line-clamp-2 min-h-[40px]">
                    {product.name[lang as 'ar' | 'en' | 'ku'] ?? product.name.en}
                  </h3>
                  {product.model_number && (
                    <div className="text-xs text-[#5A6A85] dark:text-[#7A9BC0] font-500 mb-2 font-mono bg-[#F5F8FF] dark:bg-[#122040] px-2 py-0.5 rounded-lg inline-block w-fit">
                      {product.model_number}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1 mb-3 mt-auto h-[48px] overflow-hidden">
                    {(product.features || []).slice(0, 2).map((spec, si) => (
                      <span key={si} className="text-xs bg-[#EBF0FA] dark:bg-[#122040] text-[#5A6A85] dark:text-[#7A9BC0] px-2 py-0.5 rounded-full truncate max-w-full block">
                        {typeof spec === 'string' ? spec : (spec as any)?.[lang as 'ar' | 'en' | 'ku'] ?? (spec as any)?.en ?? ''}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <span
                      className="flex-1 text-center py-2 text-xs font-600 text-[#1B4F9B] dark:text-[#4B8FE2] bg-[#1B4F9B]/8 hover:bg-[#1B4F9B]/15 rounded-xl transition-colors"
                    >
                      {t('التفاصيل', 'Details', 'وردەکارییەکان')}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleProduct({
                          id: product.id,
                          name: product.name,
                          image: product.images?.[0]?.url || '',
                          brand: product.brand?.name || '---',
                          category: product.category?.name || { en: '---' }
                        });
                      }}
                      className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all ${isCompared(product.id) ? 'bg-[#1B4F9B] text-white shadow-md shadow-[#1B4F9B]/20' : 'bg-[#EBF0FA] dark:bg-[#122040] text-[#5A6A85] dark:text-[#7A9BC0] hover:bg-[#1B4F9B]/15 dark:hover:bg-[#4B8FE2]/15'}`}
                      title={t('مقارنة', 'Compare', 'بەراورد')}
                    >
                      <GitCompare size={14} />
                    </button>
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
                onClick={() => router.push(`/products/${product.id}`)}
                className="group bg-white dark:bg-[#0E1A33] rounded-2xl overflow-hidden border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 hover:shadow-lg hover:shadow-[#1B4F9B]/8 transition-all cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-40 sm:h-auto sm:w-48 flex-shrink-0 overflow-hidden bg-[#F5F8FF] dark:bg-[#0E1A33] flex items-center justify-center">
                    {product.images?.[0]?.url ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name[lang as 'ar' | 'en' | 'ku'] ?? product.name.en}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#C5D3E8] dark:text-[#2A3A55]">
                        <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-[#29ABE2] font-700">{product.brand?.name || '---'}</span>
                        <span className="text-xs text-[#5A6A85] dark:text-[#7A9BC0]">
                          · {product.category?.name[lang as 'ar' | 'en' | 'ku'] ?? product.category?.name.en}
                        </span>
                      </div>
                      <h3 className="text-base font-700 text-[#0A1628] dark:text-[#E8F0FF] mb-1">
                        {product.name[lang as 'ar' | 'en' | 'ku'] ?? product.name.en}
                      </h3>
                      {product.model_number && (
                        <div className="text-xs text-[#5A6A85] dark:text-[#7A9BC0] font-500 mb-2 font-mono bg-[#F5F8FF] dark:bg-[#122040] px-2.5 py-1 rounded-lg inline-block">
                          {product.model_number}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {(product.features || []).map((spec, si) => (
                          <span key={si} className="text-xs bg-[#EBF0FA] dark:bg-[#122040] text-[#5A6A85] dark:text-[#7A9BC0] px-2.5 py-1 rounded-full">
                            {typeof spec === 'string' ? spec : (spec as any)?.[lang as 'ar' | 'en' | 'ku'] ?? (spec as any)?.en ?? ''}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-auto">
                      <span
                        className="px-5 py-2 text-sm font-600 text-[#1B4F9B] dark:text-[#4B8FE2] bg-[#1B4F9B]/8 hover:bg-[#1B4F9B]/15 rounded-xl transition-colors"
                      >
                        {t('عرض التفاصيل', 'View Details', 'نیشاندانی وردەکارییەکان')}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleProduct({
                            id: product.id,
                            name: product.name,
                            image: product.images?.[0]?.url || '',
                            brand: product.brand?.name || '---',
                            category: product.category?.name || { en: '---' }
                          });
                        }}
                        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${isCompared(product.id) ? 'bg-[#1B4F9B] text-white shadow-md shadow-[#1B4F9B]/20' : 'bg-[#EBF0FA] dark:bg-[#122040] text-[#5A6A85] dark:text-[#7A9BC0] hover:bg-[#1B4F9B]/15 dark:hover:bg-[#4B8FE2]/15'}`}
                        title={t('مقارنة', 'Compare', 'بەراورد')}
                      >
                        <GitCompare size={18} />
                      </button>
                      <WhatsAppButton productName={product.name?.ar ?? ''} productNameEn={product.name?.en ?? ''} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {paginationMeta && paginationMeta.last_page > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 pb-6">
            <button
              onClick={() => {
                setCurrentPage(prev => Math.max(prev - 1, 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage === 1}
              className="px-4 py-2.5 rounded-xl border border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10 bg-white dark:bg-[#0E1A33] text-[#0A1628] dark:text-[#E8F0FF] text-sm font-600 hover:bg-[#F5F8FF] dark:hover:bg-[#122040] disabled:opacity-50 disabled:pointer-events-none transition-all"
            >
              {t('السابق', 'Previous', 'پێشوو')}
            </button>

            {Array.from({ length: paginationMeta.last_page }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-10 h-10 rounded-xl text-sm font-700 transition-all ${currentPage === page
                    ? 'bg-[#1B4F9B] text-white shadow-md shadow-[#1B4F9B]/20'
                    : 'border border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10 bg-white dark:bg-[#0E1A33] text-[#0A1628] dark:text-[#E8F0FF] hover:bg-[#F5F8FF] dark:hover:bg-[#122040]'
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => {
                setCurrentPage(prev => Math.min(prev + 1, paginationMeta.last_page));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage === paginationMeta.last_page}
              className="px-4 py-2.5 rounded-xl border border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10 bg-white dark:bg-[#0E1A33] text-[#0A1628] dark:text-[#E8F0FF] text-sm font-600 hover:bg-[#F5F8FF] dark:hover:bg-[#122040] disabled:opacity-50 disabled:pointer-events-none transition-all"
            >
              {t('التالي', 'Next', 'دواتر')}
            </button>
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
