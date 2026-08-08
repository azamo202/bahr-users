"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import {
  ArrowRight, ArrowLeft, ChevronRight, ChevronLeft, CheckCircle, Star, Shield, Truck, Wrench,
  Headphones, Award, Users, Package,
  Refrigerator, Wind, Flame, Waves, Home, Snowflake, Radio, Thermometer,
  ChefHat, Droplets, Airplay, GitCompare
} from 'lucide-react';
import { useApp } from './context/AppContext';
import { useCompare } from './context/CompareContext';

import { ApiHomeSection, ApiCategory, ApiProduct, ApiBrand } from "@/types/api";



function ProductCarousel({ products }: { products: ApiProduct[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t, lang, dir } = useApp();
  const { toggleProduct, isCompared } = useCompare();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const isScrollable = products.length > 4;

  return (
    <div className="relative group/carousel">
      <div 
        ref={scrollRef}
        className={`flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-none ${!isScrollable ? 'md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : ''}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product, i) => (
          <motion.div
            key={`${product.id}-${i}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] snap-start group bg-white dark:bg-[#0E1A33] rounded-2xl overflow-hidden border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 hover:shadow-xl hover:shadow-[#1B4F9B]/10 transition-all duration-300 hover:-translate-y-2 flex flex-col ${!isScrollable ? 'md:w-full lg:w-full xl:w-full flex-shrink' : ''}`}
          >
            <div className="relative h-56 overflow-hidden bg-[#F5F8FF] dark:bg-[#0E1A33] flex items-center justify-center">
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 start-3 end-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300">
                <Link href={`/products/${product.id}`}
                  className="block text-center py-2 bg-white/90 dark:bg-[#0E1A33]/90 backdrop-blur-sm rounded-xl text-[#1B4F9B] dark:text-[#4B8FE2] text-xs font-700 hover:bg-white transition-colors"
                >
                  {t('عرض التفاصيل', 'View Details', 'نیشاندانی وردەکارییەکان')}
                </Link>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="text-xs text-[#29ABE2] font-700 mb-1">{product.brand?.name || '---'}</div>
              <h3 className="text-sm font-700 text-[#0A1628] dark:text-[#E8F0FF] mb-1 line-clamp-2 leading-snug min-h-[40px]">
                {product.name[lang as 'ar' | 'en' | 'ku'] ?? product.name.en}
              </h3>
              {product.model_number && (
                <div className="text-xs text-[#5A6A85] dark:text-[#7A9BC0] font-500 mb-2 font-mono bg-[#F5F8FF] dark:bg-[#122040] px-2 py-0.5 rounded-lg inline-block w-fit">
                  {product.model_number}
                </div>
              )}
              <div className="flex flex-wrap gap-1 mb-4 mt-auto">
                {(product.features || []).slice(0, 3).map((spec, si) => (
                  <span key={si} className="text-[11px] bg-[#EBF0FA] dark:bg-[#122040] text-[#5A6A85] dark:text-[#7A9BC0] px-2 py-0.5 rounded-full truncate max-w-full block">
                    {typeof spec === 'string' ? spec : (spec as any)?.[lang as 'ar' | 'en' | 'ku'] ?? (spec as any)?.en ?? ''}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 w-full mt-auto">
                <WhatsAppButton
                  productName={product.name?.ar ?? ''}
                  productNameEn={product.name?.en ?? ''}
                  productNameKu={product.name?.ku ?? ''}
                  productId={String(product.id)}
                  modelNumber={product.model_number}
                  className="flex-1 py-2.5"
                />
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
                  className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all flex-shrink-0 ${isCompared(product.id) ? 'bg-[#1B4F9B] text-white shadow-md shadow-[#1B4F9B]/20' : 'bg-[#EBF0FA] dark:bg-[#122040] text-[#5A6A85] dark:text-[#7A9BC0] hover:bg-[#1B4F9B]/15 dark:hover:bg-[#4B8FE2]/15'}`}
                  title={t('مقارنة', 'Compare', 'بەراورد')}
                >
                  <GitCompare size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isScrollable && (
        <>
          <button 
            onClick={() => scroll(dir === 'rtl' ? 'right' : 'left')}
            className="absolute top-1/2 -start-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-[#0E1A33] shadow-lg hidden md:flex items-center justify-center text-[#1B4F9B] dark:text-[#4B8FE2] opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-110 disabled:opacity-0 z-10 border border-[#1B4F9B]/10"
          >
            {dir === 'rtl' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          <button 
            onClick={() => scroll(dir === 'rtl' ? 'left' : 'right')}
            className="absolute top-1/2 -end-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-[#0E1A33] shadow-lg hidden md:flex items-center justify-center text-[#1B4F9B] dark:text-[#4B8FE2] opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-110 disabled:opacity-0 z-10 border border-[#1B4F9B]/10"
          >
            {dir === 'rtl' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </>
      )}
    </div>
  );
}

function WhatsAppButton({ productName, productNameEn, productNameKu, productId, modelNumber, className = '' }: { productName: string; productNameEn: string; productNameKu?: string; productId: string; modelNumber?: string; className?: string }) {
  const { t, whatsapp } = useApp();
  const [productUrl, setProductUrl] = useState('');

  useEffect(() => {
    setProductUrl(`${window.location.origin}/products/${productId}`);
  }, [productId]);

  const message = encodeURIComponent(t(
    `مرحباً، أريد الاستفسار عن: ${productName}\nرقم الموديل: ${modelNumber || 'غير متوفر'}\nرابط المنتج: ${productUrl}`,
    `Hello, I'd like to inquire about: ${productNameEn}\nModel Number: ${modelNumber || 'N/A'}\nProduct Link: ${productUrl}`,
    `سڵاو، دەمەوێت پرسیار بکەم دەربارەی: ${productNameKu || productNameEn}\nژمارەی مۆدێل: ${modelNumber || 'نەزانراو'}\nبەستەری بەرهەم: ${productUrl}`
  ));
  return (
    <a
      href={`https://wa.me/${whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA58] text-white rounded-xl font-600 text-sm transition-all shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/45 hover:scale-105 active:scale-95 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      {t('اسأل عبر واتساب', 'Ask on WhatsApp', 'پرسیار بکە لە ڕێگەی واتسئەپ')}
    </a>
  );
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function SectionTitle({ ar, en, ku, subtitleAr, subtitleEn, subtitleKu }: { ar: string; en: string; ku?: string; subtitleAr?: string; subtitleEn?: string; subtitleKu?: string }) {
  const { t } = useApp();
  return (
    <div className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-800 text-[#0A1628] dark:text-[#E8F0FF] mb-3">
          {t(ar, en, ku)}
        </h2>
        {subtitleAr && subtitleEn && (
          <p className="text-[#5A6A85] dark:text-[#7A9BC0] max-w-xl mx-auto text-sm leading-relaxed">
            {t(subtitleAr, subtitleEn, subtitleKu)}
          </p>
        )}
      </motion.div>
    </div>
  );
}

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  refrigerators: Refrigerator,
  'washing-machines': Waves,
  'air-conditioners': Wind,
  ovens: Flame,
  cooktops: ChefHat,
  hoods: Airplay,
  dishwashers: Droplets,
  microwaves: Radio,
  'water-heaters': Thermometer,
  freezers: Snowflake,
  'small-appliances': Home,
  other: Home,
};

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1920&h=1080&fit=crop&auto=format',
    headlineAr: 'أجهزة منزلية\nبمعايير عالمية',
    headlineEn: 'Home Appliances\nWith World-Class Standards',
    headlineKu: 'ئامێری ناوماڵ\nبە پێوەری جیهانی',
    subAr: 'نوفر أفضل الأجهزة المنزلية من أشهر العلامات التجارية العالمية بضمان رسمي وخدمة احترافية',
    subEn: 'We provide the best home appliances from the world\'s most renowned brands with official warranty and professional service',
    subKu: 'باشترین ئامێرەکانی ناوماڵ لە بەناوبانگترین براندە جیهانییەکان بە زەمانەتی فەرمی و خزمەتگوزاری پیشەگەرانە دەستەبەر دەکەین',
  },
  {
    image: 'https://images.unsplash.com/photo-1778731525496-3e7bd4807e55?w=1920&h=1080&fit=crop&auto=format',
    headlineAr: 'جودة لا تُضاهى\nفي كل منتج',
    headlineEn: 'Unmatched Quality\nIn Every Product',
    headlineKu: 'کوالێتی بێهاوتا\nلە هەموو بەرهەمێکدا',
    subAr: 'شريكك الموثوق في اختيار أجهزة المطبخ والمنزل بأفضل الأسعار وأعلى معايير الجودة',
    subEn: 'Your trusted partner in choosing kitchen and home appliances at the best prices with the highest quality standards',
    subKu: 'هاوبەشی متمانەپێکراوت لە هەڵبژاردنی ئامێری چێشتخانە و ناوماڵ بە باشترین نرخ و بەرزترین پێوەری کوالێتی',
  },
  {
    image: 'https://images.unsplash.com/photo-1758448755927-e5c5ae14790c?w=1920&h=1080&fit=crop&auto=format',
    headlineAr: 'اكتشف عالم\nالأجهزة المتطورة',
    headlineEn: 'Discover the World\nof Advanced Appliances',
    headlineKu: 'جیهانی\nئامێرە پێشکەوتووەکان بدۆزەرەوە',
    subAr: 'مجموعة واسعة من أحدث الأجهزة المنزلية الذكية لحياة أكثر راحة وأناقة',
    subEn: 'A wide range of the latest smart home appliances for a more comfortable and elegant life',
    subKu: 'کۆمەڵەیەکی بەرفراوان لە نوێترین ئامێرە زیرەکەکانی ناوماڵ بۆ ژیانێکی ئاسوودەتر و کەشخەتر',
  },
];

export default function HomePageClient({ sections, categories, initialStats, initialBrands = [] }: { sections: ApiHomeSection[]; categories: ApiCategory[]; initialStats?: any[]; initialBrands?: ApiBrand[] }) {
  const { t, lang, dir, whatsapp } = useApp();
  const [heroIndex, setHeroIndex] = useState(0);
  const [liveStats, setLiveStats] = useState<any[] | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(i => (i + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Fetch fresh stats from API on client-side to bypass SSR cache
  useEffect(() => {
    fetch('/api/site/store-settings')
      .then(r => r.json())
      .then(json => {
        const settings = json?.data?.settings ?? json?.settings ?? null;
        const stats = settings?.stats;
        if (Array.isArray(stats)) {
          setLiveStats(stats);
        }
      })
      .catch(() => {});
  }, []);

  const whyChooseUs = [
    { icon: CheckCircle, ar: 'منتجات أصلية 100%', en: '100% Genuine Products', ku: '١٠٠٪ بەرهەمی ڕەسەن', color: '#1B4F9B' },
    { icon: Shield, ar: 'ضمان رسمي معتمد', en: 'Official Certified Warranty', ku: 'زەمانەتی فەرمی باوەڕپێکراو', color: '#29ABE2' },
    { icon: Award, ar: 'جودة عالية مضمونة', en: 'Guaranteed High Quality', ku: 'کوالێتی بەرزی زەمانەتکراو', color: '#F7941D' },
    { icon: Users, ar: 'حلول تنافسية للمشاريع', en: 'Competitive Project Solutions', ku: 'چارەسەری کێبڕکێکار بۆ پڕۆژەکان', color: '#1B4F9B' },
  ];


  const defaultStats = [
    { valueAr: '+500', valueEn: '500+', labelAr: 'منتج متاح', labelEn: 'Products Available', labelKu: 'بەرهەمی بەردەست' },
    { valueAr: '+50', valueEn: '50+', labelAr: 'علامة تجارية', labelEn: 'Brands', labelKu: 'براند' },
    { valueAr: '+10,000', valueEn: '10,000+', labelAr: 'عميل راضٍ', labelEn: 'Satisfied Customers', labelKu: 'کڕیاری ڕازی' },
    { valueAr: '+15', valueEn: '15+', labelAr: 'سنة خبرة', labelEn: 'Years Experience', labelKu: 'ساڵ ئەزموون' },
  ];

  // Priority: 1. live stats from API (bypasses cache), 2. SSR stats, 3. defaults
  const displayStats = liveStats ?? (initialStats ? initialStats : defaultStats);


  return (
    <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#060D1A]">

      {/* ─── HERO ─── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === heroIndex ? 1 : 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={t(slide.headlineAr, slide.headlineEn, slide.headlineKu)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/85 via-[#1B4F9B]/50 to-transparent dark:from-[#060D1A]/90 dark:via-[#1B4F9B]/40" />
          </motion.div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <div className="max-w-2xl">
              <motion.div
                key={heroIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-white text-xs font-500">{t('وكيل معتمد للعلامات العالمية', 'Authorized Dealer for Global Brands', 'بریکاری ڕێگەپێدراوی براندە جیهانییەکان')}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-900 text-white leading-tight mb-6 whitespace-pre-line">
                  {t(heroSlides[heroIndex].headlineAr, heroSlides[heroIndex].headlineEn, heroSlides[heroIndex].headlineKu)}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-xl leading-relaxed">
                  {t(heroSlides[heroIndex].subAr, heroSlides[heroIndex].subEn, heroSlides[heroIndex].subKu)}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/products"
                    className="flex items-center gap-2 px-8 py-4 bg-[#1B4F9B] hover:bg-[#163d7a] text-white rounded-2xl font-700 text-sm transition-all shadow-xl shadow-[#1B4F9B]/40 hover:shadow-[#1B4F9B]/60 hover:scale-105"
                  >
                    {t('تصفح المنتجات', 'Browse Products', 'سەیرکردنی بەرهەمەکان')}
                    {dir === 'rtl' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                  </Link>
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20BA58] text-white rounded-2xl font-700 text-sm transition-all shadow-xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-105"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t('تواصل معنا', 'Contact Us', 'پەیوەندیمان پێوە بکە')}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Hero dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`h-1 rounded-full transition-all duration-500 ${i === heroIndex ? 'w-8 bg-[#F7941D]' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
          <span className="text-white/60 text-xs" style={{ writingMode: 'vertical-rl' }}>
            {t('اسحب للأسفل', 'Scroll down', 'ڕابکێشە بۆ خوارەوە')}
          </span>
        </div>
      </section>

      {/* ─── STATS ─── */}
      {displayStats && displayStats.length > 0 && (
        <section className="bg-[#1B4F9B] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#29ABE2] blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#F7941D] blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className={`grid gap-8 ${displayStats.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : displayStats.length === 2 ? 'grid-cols-2 max-w-2xl mx-auto' : displayStats.length === 3 ? 'grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto' : 'grid-cols-2 lg:grid-cols-4'}`}>
            {displayStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl font-900 text-white mb-1">
                  {t(stat.valueAr, stat.valueEn, stat.valueAr)}
                </div>
                <div className="text-[#A8D4F0] text-sm font-500">{t(stat.labelAr, stat.labelEn, stat.labelKu)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ─── CATEGORIES ─── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            ar="فئات المنتجات"
            en="Product Categories"
            ku="پۆلەکانی بەرهەم"
            subtitleAr="اكتشف مجموعتنا الواسعة من الأجهزة المنزلية لكل احتياجات منزلك"
            subtitleEn="Discover our wide range of home appliances for all your home needs"
            subtitleKu="کۆمەڵە فراوانەکەمان لە ئامێری ناوماڵ بۆ هەموو پێداویستییەکانی ماڵەکەت بدۆزەرەوە"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((cat, i) => {
              const catSlug = cat.slug;
              return (
                <motion.div
                  key={`${cat.id}-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <Link href={`/products?category=${catSlug}`}
                    className="group block bg-white dark:bg-[#0E1A33] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-[#1B4F9B]/15 transition-all duration-500 hover:-translate-y-2 border border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10"
                  >
                    <div className="relative aspect-[4/3] sm:aspect-[3/2] overflow-hidden bg-[#EBF0FA] dark:bg-[#122040] flex items-center justify-center">
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name[lang as 'ar' | 'en' | 'ku'] ?? cat.name.en}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="text-[#C5D3E8] dark:text-[#2A3A55]">
                          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 via-[#0A1628]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-4 sm:p-5 text-center bg-white dark:bg-[#0E1A33] relative z-10">
                      <div className="text-sm md:text-base font-800 text-[#0A1628] dark:text-[#E8F0FF] mb-1 line-clamp-1 group-hover:text-[#1B4F9B] dark:group-hover:text-[#4B8FE2] transition-colors">
                        {cat.name[lang as 'ar' | 'en' | 'ku'] ?? cat.name.en}
                      </div>
                      <div className="text-xs md:text-sm text-[#5A6A85] dark:text-[#7A9BC0] group-hover:text-[#29ABE2] transition-colors">
                        {t('عرض المنتجات', 'View Products', 'بینینی بەرهەمەکان')}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── DYNAMIC HOME SECTIONS ─── */}
      {sections.map((section, sectionIdx) => {
        if (!section.products || section.products.length === 0) return null;
        const bgClass = sectionIdx % 2 === 0 
          ? "bg-white dark:bg-[#0E1A33]" 
          : "bg-[#F5F8FF] dark:bg-[#060D1A]";
          
        return (
          <section key={section.id} className={`py-20 px-4 sm:px-6 ${bgClass}`}>
            <div className="max-w-7xl mx-auto">
              <SectionTitle
                ar={section.title?.ar ?? 'قسم المنتجات'}
                en={section.title?.en ?? 'Products Section'}
                ku={section.title?.ku ?? 'بەشی بەرهەمەکان'}
              />
              <ProductCarousel products={section.products} />

              {sectionIdx === sections.length - 1 && (
                <div className="text-center mt-12">
                  <Link href="/products"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#1B4F9B] hover:bg-[#163d7a] text-white rounded-2xl font-700 text-sm transition-all shadow-lg shadow-[#1B4F9B]/25 hover:shadow-[#1B4F9B]/40 hover:scale-105"
                  >
                    {t('عرض جميع المنتجات', 'View All Products', 'نیشاندانی هەموو بەرهەمەکان')}
                    {dir === 'rtl' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                  </Link>
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            ar="لماذا تختارنا؟"
            en="Why Choose Us?"
            ku="بۆچی ئێمە هەڵدەبژێریت؟"
            subtitleAr="نقدم أكثر من مجرد منتجات — نقدم تجربة شراء متكاملة ومريحة"
            subtitleEn="We offer more than just products — we offer a complete and comfortable buying experience"
            subtitleKu="زیاتر لە تەنها بەرهەم پێشکەش دەکەین — ئەزموونێکی کڕینی گشتگیر و ئاسوودەت پێشکەش دەکەین"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {whyChooseUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group flex flex-col items-center justify-center bg-white dark:bg-[#0E1A33] rounded-2xl p-6 text-center border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 hover:shadow-xl hover:shadow-[#1B4F9B]/10 hover:-translate-y-2 transition-all duration-300"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Icon size={26} style={{ color: item.color }} />
                  </div>
                  <p className="text-sm font-700 text-[#0A1628] dark:text-[#E8F0FF]">{t(item.ar, item.en, item.ku)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BRANDS ─── */}
      {initialBrands.length > 0 && (
        <section className="py-16 px-4 sm:px-6 bg-white dark:bg-[#0E1A33] overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <SectionTitle ar="علاماتنا التجارية" en="Our Brands" ku="براندەکانمان" />
            <div className="relative">
              <div className="flex gap-8 items-center justify-center flex-wrap pb-4">
                {initialBrands.map((brand) => (
                  <div
                    key={brand.id}
                    className="flex-shrink-0 w-32 h-20 bg-[#F5F8FF] dark:bg-[#060D1A] rounded-2xl border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 hover:border-[#1B4F9B]/30 hover:shadow-lg transition-all group cursor-pointer flex items-center justify-center p-4 overflow-hidden"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {brand.logo ? (
                        <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                      ) : (
                        <span className="font-800 text-[#5A6A85] dark:text-[#7A9BC0] group-hover:text-[#1B4F9B] dark:group-hover:text-[#4B8FE2] transition-colors text-sm text-center">
                          {brand.name}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── PROMOTIONAL BANNER ─── */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1B4F9B] via-[#1a5fc7] to-[#29ABE2] p-8 md:p-12"
          >
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/8 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#F7941D]/20 translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="text-white/70 text-sm font-600 mb-2">
                  {t('عرض خاص للمشاريع', 'Special Offer for Projects', 'ئۆفەری تایبەت بۆ پڕۆژەکان')}
                </div>
                <h3 className="text-2xl md:text-4xl font-900 text-white mb-3">
                  {t('حلول متكاملة للمشاريع السكنية', 'Complete Solutions for Residential Projects', 'چارەسەری گشتگیر بۆ پڕۆژە نیشتەجێبوونەکان')}
                </h3>
                <p className="text-white/80 text-sm max-w-lg">
                  {t('نوفر أسعاراً تنافسية خاصة للمقاولين والمطورين العقاريين مع خدمة تركيب شاملة', 'We offer special competitive prices for contractors and real estate developers with comprehensive installation service', 'نرخی کێبڕکێکاری تایبەت بۆ بەڵێندەران دەستەبەر دەکەین بە خزمەتگوزاری دانانی تەواوەتی')}
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(t('أريد الاستفسار عن حلول المشاريع', 'I want to inquire about project solutions', 'دەمەوێت پرسیار بکەم دەربارەی چارەسەری پڕۆژەکان'))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 bg-white text-[#1B4F9B] rounded-2xl font-800 text-sm hover:bg-[#F5F8FF] transition-all shadow-xl hover:scale-105"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t('تواصل الآن', 'Contact Now', 'ئێستا پەیوەندی بکە')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ─── CTA SECTION ─── */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F8FF] to-[#E8F4FD] dark:from-[#060D1A] dark:to-[#0E1A33]" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 start-10 w-40 h-40 rounded-full bg-[#1B4F9B] blur-3xl" />
          <div className="absolute bottom-10 end-10 w-56 h-56 rounded-full bg-[#29ABE2] blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          <Package size={48} className="mx-auto mb-6 text-[#1B4F9B] dark:text-[#4B8FE2]" />
          <h2 className="text-3xl md:text-4xl font-900 text-[#0A1628] dark:text-[#E8F0FF] mb-4">
            {t('هل تحتاج إلى مساعدة في الاختيار؟', 'Need Help Choosing?', 'پێویستت بە یارمەتییە لە هەڵبژاردندا؟')}
          </h2>
          <p className="text-[#5A6A85] dark:text-[#7A9BC0] text-base mb-8 leading-relaxed">
            {t('فريقنا المتخصص جاهز للمساعدة في اختيار الجهاز المناسب لاحتياجاتك. تواصل معنا عبر واتساب الآن.', 'Our specialized team is ready to help you choose the right appliance for your needs. Contact us via WhatsApp now.', 'تیمی تایبەتمەندمان ئامادەیە بۆ یارمەتیدان لە هەڵبژاردنی ئامێری گونجاو. پەیوەندیمان پێوە بکە لە ڕێگەی واتسئەپەوە.')}
          </p>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#25D366] hover:bg-[#20BA58] text-white rounded-2xl font-800 text-base transition-all shadow-2xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-105"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t('ابدأ المحادثة الآن', 'Start Conversation Now', 'ئێستا دەست بکە بە گفتوگۆ')}
          </a>
        </motion.div>
      </section>
    </div>
  );
}
