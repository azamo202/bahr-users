"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Search, MapPin, Phone, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';
import { ApiMaintenanceCenter } from '@/types/api';
import Link from 'next/link';

export default function CentersClient({ centers }: { centers: ApiMaintenanceCenter[] }) {
  const { t, lang, dir } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCenters = centers.filter(c => {
    const term = searchQuery.toLowerCase();
    return !term || 
      (c.name.ar?.toLowerCase() || '').includes(term) || (c.name.en?.toLowerCase() || '').includes(term) ||
      (c.city.ar?.toLowerCase() || '').includes(term) || (c.city.en?.toLowerCase() || '').includes(term);
  });

  const ArrowIcon = dir === "rtl" ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#060D1A]" style={{ fontFamily: 'Cairo, sans-serif' }}>
      <div className="bg-gradient-to-r from-[#1B4F9B] to-[#29ABE2] pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center text-white relative">
          <Link href="/support" className="absolute top-0 right-0 p-2 hover:bg-white/10 rounded-xl transition-colors">
            <ArrowIcon size={24} />
          </Link>
          <h1 className="text-4xl md:text-5xl font-900 mb-4">{t('مراكز الصيانة', 'Service Centers')}</h1>
          <p className="text-white/80 text-sm mb-8">
            {t('ابحث عن أقرب مركز صيانة معتمد لك', 'Find the nearest authorized service center')}
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              type="text"
              placeholder={t('ابحث بالمدينة أو اسم المركز...', 'Search by city or center name...')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full ps-12 pe-4 py-4 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCenters.map((center, i) => (
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
                      {center.name[lang as 'ar' | 'en'] ?? center.name.en}
                    </h4>
                    <span className="text-xs bg-[#EBF0FA] dark:bg-[#122040] text-[#1B4F9B] dark:text-[#4B8FE2] px-2 py-0.5 rounded-full font-600 mt-1 inline-block">
                      {center.city[lang as 'ar' | 'en'] ?? center.city.en}
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
                  <span>{center.address[lang as 'ar' | 'en'] ?? center.address.en}</span>
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
        {filteredCenters.length === 0 && (
          <div className="text-center py-12 text-[#5A6A85] dark:text-[#7A9BC0]">
            {t('لا توجد مراكز صيانة بهذا الاسم', 'No service centers found with this name')}
          </div>
        )}
      </div>
    </div>
  );
}
