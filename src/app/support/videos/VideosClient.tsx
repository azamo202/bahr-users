"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Search, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';
import { ApiVideo } from '@/types/api';
import Link from 'next/link';

export default function VideosClient({ videos }: { videos: ApiVideo[] }) {
  const { t, lang, dir } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = videos.filter(v => {
    const term = searchQuery.toLowerCase();
    return !term || (v.title.ar?.toLowerCase() || '').includes(term) || (v.title.en?.toLowerCase() || '').includes(term);
  });

  const ArrowIcon = dir === "rtl" ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#060D1A]" style={{ fontFamily: 'Cairo, sans-serif' }}>
      <div className="bg-gradient-to-r from-[#1B4F9B] to-[#29ABE2] pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center text-white relative">
          <Link href="/support" className="absolute top-0 right-0 p-2 hover:bg-white/10 rounded-xl transition-colors">
            <ArrowIcon size={24} />
          </Link>
          <h1 className="text-4xl md:text-5xl font-900 mb-4">{t('الفيديوهات', 'Videos')}</h1>
          <p className="text-white/80 text-sm mb-8">
            {t('تصفح وشاهد جميع الفيديوهات التعليمية', 'Browse and watch all tutorial videos')}
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              type="text"
              placeholder={t('ابحث في الفيديوهات...', 'Search videos...')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full ps-12 pe-4 py-4 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, i) => (
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
                  title={video.title[lang as 'ar' | 'en'] ?? video.title.en}
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
                  {video.title[lang as 'ar' | 'en'] ?? video.title.en}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
        {filteredVideos.length === 0 && (
          <div className="text-center py-12 text-[#5A6A85] dark:text-[#7A9BC0]">
            {t('لا توجد فيديوهات بهذا الاسم', 'No videos found with this name')}
          </div>
        )}
      </div>
    </div>
  );
}
