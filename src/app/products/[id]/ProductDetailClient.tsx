"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Share2, ChevronRight, ZoomIn } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ApiProduct, ApiCategory } from "@/types/api";

const WHATSAPP_NUMBER = '9647504454864';

export default function ProductDetailClient({ product, related, categories }: { product: ApiProduct, related: ApiProduct[], categories: ApiCategory[] }) {
  const { t, lang, dir } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'description'>('description');
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const productName = product.name[lang as 'ar' | 'en' | 'ku'] ?? product.name.en;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          url: url
        });
        return;
      } catch (err) {
        // If user aborts or share fails, fallback to copy if we want, but usually we just ignore aborts.
        // For AbortError we can just return.
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => console.error('Clipboard failed', err));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#060D1A] flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-700 text-[#0A1628] dark:text-[#E8F0FF] mb-4">{t('المنتج غير موجود', 'Product Not Found', 'بەرهەمەکە بوونی نییە')}</h2>
          <Link href="/products" className="px-6 py-3 bg-[#1B4F9B] text-white rounded-xl text-sm font-600">
            {t('العودة للمنتجات', 'Back to Products', 'گەڕانەوە بۆ بەرهەمەکان')}
          </Link>
        </div>
      </div>
    );
  }

  const allImages = product.images?.map(img => img.url) || [];
  if (allImages.length === 0) {
    // Fallback if no images
    allImages.push('');
  }

  const relatedProducts = related;
  const categoryName = product.category;

  const [productUrl, setProductUrl] = useState('');
  
  useEffect(() => {
    setProductUrl(window.location.href);
  }, []);

  const waMessage = encodeURIComponent(t(
    `مرحباً، أريد الاستفسار عن: ${product.name?.ar || ''}\nرابط المنتج: ${productUrl}`,
    `Hello, I'd like to inquire about: ${product.name?.en || ''}\nProduct Link: ${productUrl}`,
    `سڵاو، دەمەوێت پرسیار بکەم دەربارەی: ${product.name?.ku || product.name?.en || ''}\nبەستەری بەرهەم: ${productUrl}`
  ));

  const ArrowBack = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const tabs = [
    { id: 'description', ar: 'الوصف', en: 'Description' },
    { id: 'features', ar: 'المميزات', en: 'Features' },
    { id: 'specs', ar: 'المواصفات', en: 'Specifications' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#060D1A]">
      <div className="pt-24 pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#5A6A85] dark:text-[#7A9BC0] mb-6">
            <Link href="/" className="hover:text-[#1B4F9B] dark:hover:text-[#4B8FE2] transition-colors">{t('الرئيسية', 'Home', 'سەرەکی')}</Link>
            <ChevronRight size={14} className={dir === 'rtl' ? 'rotate-180' : ''} />
            <Link href="/products" className="hover:text-[#1B4F9B] dark:hover:text-[#4B8FE2] transition-colors">{t('المنتجات', 'Products', 'بەرهەمەکان')}</Link>
            <ChevronRight size={14} className={dir === 'rtl' ? 'rotate-180' : ''} />
            <span className="text-[#0A1628] dark:text-[#E8F0FF] font-600 line-clamp-1">
              {product.name[lang as 'ar' | 'en' | 'ku'] ?? product.name.en}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Images */}
            <div>
              <div 
                className="relative bg-white dark:bg-[#0E1A33] rounded-2xl overflow-hidden shadow-md border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 aspect-square mb-3 cursor-zoom-in"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
              >

                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: isHovered ? 2.5 : 1 }}
                  transition={{ duration: 0.4 }}
                  src={allImages[selectedImage]}
                  alt={product.name[lang as 'ar' | 'en' | 'ku'] ?? product.name.en}
                  style={{ transformOrigin: `${mousePos.x}% ${mousePos.y}%` }}
                  className="w-full h-full object-cover"
                />
                <button className="absolute bottom-4 end-4 w-8 h-8 rounded-lg bg-white/80 dark:bg-[#0E1A33]/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors pointer-events-none">
                  <ZoomIn size={16} className="text-[#1B4F9B]" />
                </button>
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === selectedImage ? 'border-[#1B4F9B] shadow-md shadow-[#1B4F9B]/20' : 'border-[#1B4F9B]/15 hover:border-[#1B4F9B]/40'}`}
                    >
                      <img src={img} alt={`${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-700 text-[#29ABE2]">{product.brand?.name || '---'}</span>
                <span className="w-1 h-1 rounded-full bg-[#5A6A85]" />
                <span className="text-xs text-[#5A6A85] dark:text-[#7A9BC0]">
                  {categoryName?.name[lang as 'ar' | 'en' | 'ku'] ?? categoryName?.name.en}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-900 text-[#0A1628] dark:text-[#E8F0FF] mb-5 leading-snug">
                {product.name[lang as 'ar' | 'en' | 'ku'] ?? product.name.en}
              </h1>

              {/* Quick specs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(product.features || []).slice(0, 3).map((spec, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-sm bg-[#EBF0FA] dark:bg-[#122040] text-[#5A6A85] dark:text-[#7A9BC0] px-3 py-1.5 rounded-xl">
                    <Check size={12} className="text-[#1B4F9B] dark:text-[#4B8FE2]" />
                    {typeof spec === 'string' ? spec : (spec as any)?.[lang as 'ar' | 'en' | 'ku'] ?? (spec as any)?.en ?? ''}
                  </span>
                ))}
              </div>

              {/* No Price Notice */}
              <div className="bg-gradient-to-r from-[#EBF0FA] to-[#E8F4FD] dark:from-[#122040] dark:to-[#0E1A33] rounded-2xl p-5 mb-6 border border-[#1B4F9B]/10">
                <p className="text-sm text-[#5A6A85] dark:text-[#7A9BC0] mb-4">
                  {t('للاستفسار عن السعر والتوافر وخيارات التسليم، تواصل مع فريق المبيعات مباشرة.', 'For price, availability, and delivery options, contact our sales team directly.', 'بۆ پرسیارکردن دەربارەی نرخ و بەردەستبوون، پەیوەندی بکە بە تیمی فرۆشتنەوە.')}
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 bg-[#25D366] hover:bg-[#20BA58] text-white rounded-2xl font-800 text-base transition-all shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/45 hover:scale-[1.02]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t('اسأل عبر واتساب', 'Ask on WhatsApp', 'پرسیار بکە لە ڕێگەی واتسئەپ')}
                </a>
              </div>

              {/* Share */}
              <div className="flex gap-2">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-[#5A6A85] dark:text-[#7A9BC0] bg-[#EBF0FA] dark:bg-[#122040] rounded-xl hover:bg-[#1B4F9B]/10 transition-colors min-w-[100px] justify-center"
                >
                  {copied ? <Check size={14} className="text-[#25D366]" /> : <Share2 size={14} />}
                  {copied ? t('تم النسخ', 'Copied', 'کۆپی کرا') : t('مشاركة', 'Share', 'هاوبەشکردن')}
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <div className="flex gap-1 border-b border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10 mb-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-700 rounded-t-xl transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-[#1B4F9B] text-[#1B4F9B] dark:text-[#4B8FE2] dark:border-[#4B8FE2]'
                      : 'border-transparent text-[#5A6A85] dark:text-[#7A9BC0] hover:text-[#1B4F9B] dark:hover:text-[#4B8FE2]'
                  }`}
                >
                  {t(tab.ar, tab.en)}
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-[#0E1A33] rounded-2xl p-6 border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10">
              {activeTab === 'description' && (
                <div 
                  className="text-[#5A6A85] dark:text-[#7A9BC0] leading-relaxed text-sm prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description[lang as 'ar' | 'en' | 'ku'] ?? product.description.en ?? '' }}
                />
              )}
              {activeTab === 'specs' && (
                <div className="space-y-6">
                  {Object.entries(product.specifications || {}).map(([groupJson, specs], idx) => {
                    let groupName = groupJson;
                    try {
                      const parsed = JSON.parse(groupJson);
                      groupName = parsed[lang as 'ar' | 'en' | 'ku'] || parsed.en || groupJson;
                    } catch (e) {
                      // fallback to raw groupJson
                    }

                    return (
                      <div key={idx} className="bg-[#F5F8FF] dark:bg-[#060D1A] rounded-2xl border border-[#1B4F9B]/10 overflow-hidden">
                        <div className="bg-white dark:bg-[#0E1A33] px-5 py-4 border-b border-[#1B4F9B]/10">
                          <h3 className="font-800 text-lg text-[#1B4F9B] dark:text-[#4B8FE2]">{groupName}</h3>
                        </div>
                        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {specs.map((spec, i) => (
                            <div key={i} className="flex flex-col gap-1.5 p-3.5 bg-white dark:bg-[#0E1A33] rounded-xl shadow-sm">
                              <span className="text-xs font-700 text-[#5A6A85] dark:text-[#7A9BC0] uppercase tracking-wider">
                                {spec.key?.[lang as 'ar' | 'en' | 'ku'] ?? spec.key?.en ?? ''}
                              </span>
                              <span className="text-sm font-700 text-[#0A1628] dark:text-[#E8F0FF]">
                                {spec.value?.[lang as 'ar' | 'en' | 'ku'] ?? spec.value?.en ?? ''}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {(!product.specifications || Object.keys(product.specifications).length === 0) && (
                    <div className="text-center text-[#5A6A85] dark:text-[#7A9BC0] py-12 font-600 bg-[#F5F8FF] dark:bg-[#060D1A] rounded-2xl">
                      <div className="text-4xl mb-3">📋</div>
                      {t('لا توجد مواصفات متاحة', 'No specifications available', 'هیچ تایبەتمەندییەک بەردەست نییە')}
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'features' && (
                <div className="space-y-3">
                  {(product.features || []).map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#1B4F9B]/10 flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-[#1B4F9B] dark:text-[#4B8FE2]" />
                      </div>
                      <span className="text-sm text-[#0A1628] dark:text-[#E8F0FF]">
                        {typeof feature === 'string' ? feature : (feature as any)?.[lang as 'ar' | 'en' | 'ku'] ?? (feature as any)?.en ?? ''}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-800 text-[#0A1628] dark:text-[#E8F0FF] mb-6">
                {t('منتجات ذات صلة', 'Related Products', 'بەرهەمە پەیوەندیدارەکان')}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/products/${related.id}`}
                    className="group bg-white dark:bg-[#0E1A33] rounded-2xl overflow-hidden border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 hover:shadow-xl hover:shadow-[#1B4F9B]/10 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    <div className="h-36 overflow-hidden bg-[#EBF0FA] dark:bg-[#122040]">
                      <img
                        src={related.images?.[0]?.url || ''}
                        alt={related.name[lang as 'ar' | 'en' | 'ku'] ?? related.name.en}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 flex-1 flex flex-col">
                      <div className="text-xs text-[#29ABE2] font-700 mb-1">{related.brand?.name || '---'}</div>
                      <p className="text-xs font-700 text-[#0A1628] dark:text-[#E8F0FF] line-clamp-2">
                        {related.name[lang as 'ar' | 'en' | 'ku'] ?? related.name.en}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
