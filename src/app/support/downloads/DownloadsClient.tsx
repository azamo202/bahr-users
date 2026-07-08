"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Search, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';
import { ApiDownload } from '@/types/api';
import Link from 'next/link';

export default function DownloadsClient({ downloads }: { downloads: ApiDownload[] }) {
  const { t, lang, dir } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDownloads = downloads.filter(d => {
    const term = searchQuery.toLowerCase();
    return !term || (d.title.ar?.toLowerCase() || '').includes(term) || (d.title.en?.toLowerCase() || '').includes(term);
  });

  const ArrowIcon = dir === "rtl" ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#060D1A]">
      <div className="bg-gradient-to-r from-[#1B4F9B] to-[#29ABE2] pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center text-white relative">
          <Link href="/support" className="absolute top-0 right-0 p-2 hover:bg-white/10 rounded-xl transition-colors">
            <ArrowIcon size={24} />
          </Link>
          <h1 className="text-4xl md:text-5xl font-900 mb-4">{t('مركز التحميلات', 'Downloads Center', 'سەنتەری دابەزاندنەکان')}</h1>
          <p className="text-white/80 text-sm mb-8">
            {t('تصفح وحمل جميع الملفات المتاحة', 'Browse and download all available files', 'سەیربکە و هەموو فایلە بەردەستەکان دابەزێنە')}
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              type="text"
              placeholder={t('ابحث في التحميلات...', 'Search downloads...', 'گەڕان لە ناو دابەزاندنەکان...')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full ps-12 pe-4 py-4 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDownloads.map((file, i) => (
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
        {filteredDownloads.length === 0 && (
          <div className="text-center py-12 text-[#5A6A85] dark:text-[#7A9BC0]">
            {t('لا توجد ملفات بهذا الاسم', 'No downloads found with this name', 'هیچ فایلێک بەم ناوە نییە')}
          </div>
        )}
      </div>
    </div>
  );
}
