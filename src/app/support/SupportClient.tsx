"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Search, FileText, Book, ChevronDown, ChevronUp, Play, Building2, MapPin, Phone, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ApiDownload, ApiVideo, ApiMaintenanceCenter } from '@/types/api';
import Link from 'next/link';

const faqs = [
  {
    id: 1,
    questionAr: 'ما هي مدة الضمان على الأجهزة؟',
    questionEn: 'What is the warranty period for appliances?',
    questionKu: 'ماوەی زەمانەت لەسەر ئامێرەکان چەندە؟',
    answerAr: 'جميع أجهزتنا تأتي بضمان رسمي من الشركة المصنعة يتراوح بين سنة واحدة وخمس سنوات حسب نوع الجهاز والعلامة التجارية.',
    answerEn: 'All our appliances come with an official manufacturer warranty ranging from 1 to 5 years depending on the type of appliance and brand.',
    answerKu: 'هەموو ئامێرەکانمان بە زەمانەتی فەرمی کۆمپانیای بەرهەمهێنەر دێن کە لە نێوان یەک ساڵ تا پێنج ساڵدایە بەپێی جۆری ئامێرەکە و براندەکە.',
  },

  {
    id: 3,
    questionAr: 'كيف يمكنني الاستفسار عن منتج معين؟',
    questionEn: 'How can I inquire about a specific product?',
    questionKu: 'چۆن دەتوانم پرسیار بکەم دەربارەی بەرهەمێکی دیاریکراو؟',
    answerAr: 'يمكنك التواصل معنا مباشرة عبر واتساب أو الاتصال بنا عبر الهاتف أو تعبئة نموذج الاستفسار على موقعنا.',
    answerEn: 'You can contact us directly via WhatsApp or call us by phone or fill out the inquiry form on our website.',
    answerKu: 'دەتوانیت ڕاستەوخۆ لە ڕێگەی واتسئەپەوە پەیوەندیمان پێوە بکەیت یان لە ڕێگەی تەلەفۆنەوە یان فۆڕمی پرسیارکردن لە ماڵپەڕەکەمان پڕبکەیتەوە.',
  },
  {
    id: 4,
    questionAr: 'هل الأجهزة أصلية 100%؟',
    questionEn: 'Are the appliances 100% genuine?',
    questionKu: 'ئایا ئامێرەکان ١٠٠٪ ڕەسەنن؟',
    answerAr: 'نعم، جميع أجهزتنا أصلية 100% ونوكيل معتمد للعلامات التجارية الكبرى مع ضمان رسمي.',
    answerEn: 'Yes, all our appliances are 100% genuine and we are an authorized dealer for major brands with official warranty.',
    answerKu: 'بەڵێ، هەموو ئامێرەکانمان ١٠٠٪ ڕەسەنن و ئێمە بریکاری ڕێگەپێدراوین بۆ براندە گەورەکان بە زەمانەتی فەرمی.',
  },
  {
    id: 5,
    questionAr: 'هل يمكن الطلب بكميات كبيرة للمشاريع؟',
    questionEn: 'Can I order in large quantities for projects?',
    questionKu: 'ئایا دەتوانم بە بڕی زۆر بۆ پڕۆژەکان داوا بکەم؟',
    answerAr: 'بالتأكيد، نوفر حلولاً متكاملة للمشاريع السكنية والتجارية مع أسعار تنافسية خاصة بالكميات.',
    answerEn: 'Absolutely, we provide comprehensive solutions for residential and commercial projects with competitive bulk pricing.',
    answerKu: 'بێگومان، چارەسەری گشتگیر دابین دەکەین بۆ پڕۆژە نیشتەجێبوون و بازرگانییەکان بە نرخی کێبڕکێکاری تایبەت بە بڕ.',
  },
];

interface SupportClientProps {
  downloads: ApiDownload[];
  videos: ApiVideo[];
  serviceCenters: ApiMaintenanceCenter[];
}

export default function SupportClient({ downloads, videos, serviceCenters }: SupportClientProps) {
  const { t, lang, dir, whatsapp } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'downloads' | 'videos' | 'centers'>('downloads');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredDownloads = downloads.filter(d => {
    const term = searchQuery.toLowerCase();
    return !term || (d.title.ar?.toLowerCase() || '').includes(term) || (d.title.en?.toLowerCase() || '').includes(term);
  });

  const filteredVideos = videos.filter(v => {
    const term = searchQuery.toLowerCase();
    return !term || (v.title.ar?.toLowerCase() || '').includes(term) || (v.title.en?.toLowerCase() || '').includes(term);
  });

  const filteredCenters = serviceCenters.filter(c => {
    const term = searchQuery.toLowerCase();
    return !term || 
      (c.name.ar?.toLowerCase() || '').includes(term) || (c.name.en?.toLowerCase() || '').includes(term) ||
      (c.city.ar?.toLowerCase() || '').includes(term) || (c.city.en?.toLowerCase() || '').includes(term);
  });

  const previewDownloads = filteredDownloads.slice(0, 4);
  const previewVideos = filteredVideos.slice(0, 4);
  const previewCenters = filteredCenters.slice(0, 4);

  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#060D1A]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B4F9B] to-[#29ABE2] pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-900 mb-4">{t('مركز الدعم', 'Support Center', 'سەنتەری پشتگیری')}</h1>
          <p className="text-white/80 text-sm mb-8">
            {t('تحميل الكتالوجات، الأدلة، وثائق الضمان والأسئلة الشائعة', 'Download catalogs, manuals, warranty documents and FAQs', 'دابەزاندنی کەتەلۆگەکان، ڕێبەرەکان، بەڵگەنامەکانی زەمانەت')}
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              type="text"
              placeholder={t('ابحث في مركز الدعم...', 'Search support center...', 'گەڕان لە ناو سەنتەری پشتگیری...')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full ps-12 pe-4 py-4 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Support Tabs Container */}
        <section className="mb-16">
          <div className="flex flex-wrap gap-2 mb-8 border-b border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10 pb-4">
            <button
              onClick={() => setActiveTab('downloads')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-700 transition-all ${
                activeTab === 'downloads'
                  ? 'bg-[#1B4F9B] text-white shadow-md shadow-[#1B4F9B]/25'
                  : 'bg-white dark:bg-[#0E1A33] text-[#5A6A85] dark:text-[#7A9BC0] hover:text-[#1B4F9B] dark:hover:text-[#4B8FE2]'
              }`}
            >
              <Download size={18} />
              {t('التحميلات', 'Downloads', 'دابەزاندنەکان')}
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'downloads' ? 'bg-white/20' : 'bg-[#EBF0FA] dark:bg-[#122040]'}`}>
                {filteredDownloads.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-700 transition-all ${
                activeTab === 'videos'
                  ? 'bg-[#1B4F9B] text-white shadow-md shadow-[#1B4F9B]/25'
                  : 'bg-white dark:bg-[#0E1A33] text-[#5A6A85] dark:text-[#7A9BC0] hover:text-[#1B4F9B] dark:hover:text-[#4B8FE2]'
              }`}
            >
              <Play size={18} />
              {t('الفيديوهات', 'Videos', 'ڤیدیۆکان')}
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'videos' ? 'bg-white/20' : 'bg-[#EBF0FA] dark:bg-[#122040]'}`}>
                {filteredVideos.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('centers')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-700 transition-all ${
                activeTab === 'centers'
                  ? 'bg-[#1B4F9B] text-white shadow-md shadow-[#1B4F9B]/25'
                  : 'bg-white dark:bg-[#0E1A33] text-[#5A6A85] dark:text-[#7A9BC0] hover:text-[#1B4F9B] dark:hover:text-[#4B8FE2]'
              }`}
            >
              <Building2 size={18} />
              {t('مراكز الصيانة', 'Service Centers', 'سەنتەرەکانی چاککردنەوە')}
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'centers' ? 'bg-white/20' : 'bg-[#EBF0FA] dark:bg-[#122040]'}`}>
                {filteredCenters.length}
              </span>
            </button>
          </div>

          {/* Downloads */}
          {activeTab === 'downloads' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {previewDownloads.map((file, i) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="group bg-white dark:bg-[#0E1A33] rounded-2xl p-5 border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 hover:shadow-lg hover:shadow-[#1B4F9B]/8 transition-all flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#1B4F9B]/10 dark:bg-[#4B8FE2]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1B4F9B] transition-colors">
                      <FileText size={20} className="text-[#1B4F9B] dark:text-[#4B8FE2] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-700 text-[#0A1628] dark:text-[#E8F0FF] mb-1 truncate">
                        {file.title[lang as 'ar' | 'en' | 'ku'] ?? file.title.en}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-[#EBF0FA] dark:bg-[#122040] text-[#1B4F9B] dark:text-[#4B8FE2] px-2 py-0.5 rounded-full font-600">
                          PDF
                        </span>
                        {file.file_size && (
                          <span className="text-xs text-[#5A6A85] dark:text-[#7A9BC0]">{file.file_size}</span>
                        )}
                      </div>
                    </div>
                    <a
                      href={file.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-[#1B4F9B]/8 hover:bg-[#1B4F9B] flex items-center justify-center flex-shrink-0 transition-all group-hover:shadow-md"
                    >
                      <Download size={15} className="text-[#1B4F9B] group-hover:text-white transition-colors" />
                    </a>
                  </motion.div>
                ))}
              </div>
              {filteredDownloads.length > 4 && (
                <div className="mt-8 flex justify-center">
                  <Link
                    href="/support/downloads"
                    className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-[#0E1A33] border-2 border-[#1B4F9B]/20 text-[#1B4F9B] dark:text-[#4B8FE2] rounded-2xl font-700 text-sm hover:bg-[#1B4F9B] hover:text-white hover:border-[#1B4F9B] transition-all"
                  >
                    {t('عرض المزيد من التحميلات', 'Show More Downloads', 'نیشاندانی دابەزاندنی زیاتر')}
                    <ArrowIcon size={16} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
              {filteredDownloads.length === 0 && (
                <div className="text-center py-12 text-[#5A6A85] dark:text-[#7A9BC0]">
                  {t('لا توجد ملفات بهذا الاسم', 'No downloads found with this name', 'هیچ فایلێک بەم ناوە نییە')}
                </div>
              )}
            </div>
          )}

          {/* Videos */}
          {activeTab === 'videos' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {previewVideos.map((video, i) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="group overflow-hidden bg-white dark:bg-[#0E1A33] rounded-2xl border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 hover:shadow-lg hover:shadow-[#1B4F9B]/8 transition-all"
                  >
                    <div className="aspect-video w-full bg-black/5 relative">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.youtube_id}`}
                        title={video.title[lang as 'ar' | 'en' | 'ku'] ?? video.title.en}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-5 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F7941D]/10 flex items-center justify-center flex-shrink-0">
                        <Play size={18} className="text-[#F7941D]" />
                      </div>
                      <h4 className="text-sm font-700 text-[#0A1628] dark:text-[#E8F0FF] line-clamp-2 mt-1">
                        {video.title[lang as 'ar' | 'en' | 'ku'] ?? video.title.en}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
              {filteredVideos.length > 4 && (
                <div className="mt-8 flex justify-center">
                  <Link
                    href="/support/videos"
                    className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-[#0E1A33] border-2 border-[#1B4F9B]/20 text-[#1B4F9B] dark:text-[#4B8FE2] rounded-2xl font-700 text-sm hover:bg-[#1B4F9B] hover:text-white hover:border-[#1B4F9B] transition-all"
                  >
                    {t('عرض المزيد من الفيديوهات', 'Show More Videos', 'نیشاندانی ڤیدیۆی زیاتر')}
                    <ArrowIcon size={16} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
              {filteredVideos.length === 0 && (
                <div className="text-center py-12 text-[#5A6A85] dark:text-[#7A9BC0]">
                  {t('لا توجد فيديوهات بهذا الاسم', 'No videos found with this name', 'هیچ ڤیدیۆیەک بەم ناوە نییە')}
                </div>
              )}
            </div>
          )}

          {/* Centers */}
          {activeTab === 'centers' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {previewCenters.map((center, i) => (
                  <motion.div
                    key={center.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="bg-white dark:bg-[#0E1A33] rounded-2xl p-6 border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#1B4F9B]/10 dark:bg-[#4B8FE2]/10 flex items-center justify-center">
                          <Building2 size={20} className="text-[#1B4F9B] dark:text-[#4B8FE2]" />
                        </div>
                        <div>
                          <h4 className="text-base font-800 text-[#0A1628] dark:text-[#E8F0FF]">
                            {center.name[lang as 'ar' | 'en' | 'ku'] ?? center.name.en}
                          </h4>
                          <span className="text-xs bg-[#EBF0FA] dark:bg-[#122040] text-[#1B4F9B] dark:text-[#4B8FE2] px-2 py-0.5 rounded-full font-600 mt-1 inline-block">
                            {center.city[lang as 'ar' | 'en' | 'ku'] ?? center.city.en}
                          </span>
                        </div>
                      </div>
                      {center.location_link && (
                        <a href={center.location_link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#F5F8FF] dark:bg-[#060D1A] flex items-center justify-center hover:bg-[#1B4F9B] hover:text-white text-[#5A6A85] transition-all">
                          <MapPin size={18} />
                        </a>
                      )}
                    </div>
                    <div className="space-y-3 mt-5">
                      <div className="flex items-start gap-3 text-sm text-[#5A6A85] dark:text-[#7A9BC0]">
                        <MapPin size={16} className="text-[#1B4F9B] dark:text-[#4B8FE2] mt-0.5 flex-shrink-0" />
                        <span>{center.address[lang as 'ar' | 'en' | 'ku'] ?? center.address.en}</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm text-[#5A6A85] dark:text-[#7A9BC0]">
                        <Phone size={16} className="text-[#1B4F9B] dark:text-[#4B8FE2] mt-0.5 flex-shrink-0" />
                        <span dir="ltr" className="text-right">
                          {Array.isArray(center.phone) ? center.phone.join(' - ') : center.phone}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {filteredCenters.length > 4 && (
                <div className="mt-8 flex justify-center">
                  <Link
                    href="/support/centers"
                    className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-[#0E1A33] border-2 border-[#1B4F9B]/20 text-[#1B4F9B] dark:text-[#4B8FE2] rounded-2xl font-700 text-sm hover:bg-[#1B4F9B] hover:text-white hover:border-[#1B4F9B] transition-all"
                  >
                    {t('عرض المزيد من مراكز الصيانة', 'Show More Service Centers', 'نیشاندانی سەنتەری چاککردنەوەی زیاتر')}
                    <ArrowIcon size={16} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
              {filteredCenters.length === 0 && (
                <div className="text-center py-12 text-[#5A6A85] dark:text-[#7A9BC0]">
                  {t('لا توجد مراكز صيانة بهذا الاسم', 'No service centers found with this name', 'هیچ سەنتەرێکی چاککردنەوە بەم ناوە نییە')}
                </div>
              )}
            </div>
          )}
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#F7941D]/10 flex items-center justify-center">
              <Book size={20} className="text-[#F7941D]" />
            </div>
            <h2 className="text-2xl font-900 text-[#0A1628] dark:text-[#E8F0FF]">{t('الأسئلة الشائعة', 'Frequently Asked Questions', 'پرسیارە باوەکان')}</h2>
          </div>
          <div className="space-y-3 max-w-3xl">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white dark:bg-[#0E1A33] rounded-2xl border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-start"
                >
                  <span className="text-sm font-700 text-[#0A1628] dark:text-[#E8F0FF] pe-4">
                    {t(faq.questionAr, faq.questionEn, faq.questionKu)}
                  </span>
                  {openFaq === faq.id
                    ? <ChevronUp size={18} className="text-[#1B4F9B] dark:text-[#4B8FE2] flex-shrink-0" />
                    : <ChevronDown size={18} className="text-[#5A6A85] flex-shrink-0" />
                  }
                </button>
                {openFaq === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-sm text-[#5A6A85] dark:text-[#7A9BC0] leading-relaxed border-t border-[#1B4F9B]/8 pt-4">
                      {t(faq.answerAr, faq.answerEn, faq.answerKu)}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section>
          <div className="bg-gradient-to-r from-[#1B4F9B]/8 to-[#29ABE2]/8 dark:from-[#122040] dark:to-[#0E1A33] rounded-3xl p-8 md:p-12 border border-[#1B4F9B]/12 dark:border-[#4B8FE2]/10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-900 text-[#0A1628] dark:text-[#E8F0FF] mb-3">
                {t('لم تجد ما تبحث عنه؟', 'Didn\'t Find What You\'re Looking For?', 'ئەوەی بەدوایدا دەگەڕێیت نەتگدۆزیەوە؟')}
              </h2>
              <p className="text-[#5A6A85] dark:text-[#7A9BC0] text-sm mb-8">
                {t('تواصل مع فريق الدعم الفني مباشرة وسنسعد بمساعدتك', 'Contact our technical support team directly and we\'ll be happy to help', 'ڕاستەوخۆ پەیوەندی بکە بە تیمی پشتگیری تەکنیکییەوە و خۆشحاڵ دەبین بە یارمەتیدانت')}
              </p>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20BA58] text-white rounded-2xl font-700 text-sm transition-all shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:scale-105"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t('تواصل مع الدعم الفني', 'Contact Technical Support', 'پەیوەندی بکە بە پشتگیری تەکنیکی')}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
