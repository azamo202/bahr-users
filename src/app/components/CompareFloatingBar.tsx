'use client';

import { useCompare } from '../context/CompareContext';
import { X, GitCompare } from 'lucide-react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export const CompareFloatingBar = () => {
  const { selectedProducts, removeProduct, clearCompare } = useCompare();
  const { t, lang } = useApp();

  return (
    <AnimatePresence>
      {selectedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 z-50 w-[95%] sm:w-full max-w-2xl -translate-x-1/2"
        >
          <div className="flex items-center justify-between rounded-full border border-[#1B4F9B]/20 dark:border-[#4B8FE2]/20 bg-white/80 dark:bg-[#0E1A33]/80 p-3 pr-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3 overflow-hidden px-2 rtl:space-x-reverse">
                {selectedProducts.map((p, i) => (
                  <div
                    key={p.id}
                    className="relative h-10 w-10 rounded-full border-2 border-white dark:border-[#0E1A33] bg-[#EBF0FA] dark:bg-[#122040] shadow-sm"
                    style={{ zIndex: 10 - i }}
                  >
                    <img
                      src={p.image}
                      alt={p.name[lang as 'ar' | 'en' | 'ku'] || p.name['en']}
                      className="h-full w-full rounded-full object-cover"
                    />
                    <button
                      onClick={() => removeProduct(p.id)}
                      className="absolute -right-1 -top-1 rounded-full bg-red-500 text-white opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100 flex items-center justify-center w-4 h-4"
                      aria-label="Remove"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {Array.from({ length: 4 - selectedProducts.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="h-10 w-10 rounded-full border-2 border-dashed border-[#5A6A85]/30 bg-[#EBF0FA]/30 dark:bg-[#122040]/30"
                  />
                ))}
              </div>
              <div className="hidden flex-col sm:flex">
                <span className="text-xs font-medium text-[#5A6A85] dark:text-[#7A9BC0]">
                  {selectedProducts.length}/4 {t('محدد', 'Selected', 'دیاریکراوە')}
                </span>
                <button
                  onClick={clearCompare}
                  className="text-start text-[10px] uppercase tracking-wider text-[#1B4F9B] dark:text-[#4B8FE2] hover:underline"
                >
                  {t('مسح الكل', 'Clear all', 'هەمووی بسڕەوە')}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/compare"
                className={`flex items-center gap-2 rounded-full bg-[#1B4F9B] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#153e7a] ${
                  selectedProducts.length < 2 ? 'pointer-events-none opacity-50 grayscale' : ''
                }`}
              >
                <GitCompare className="h-4 w-4" />
                <span className="hidden sm:inline">{t('قارن الآن', 'Compare Now', 'بەراورد بکە')}</span>
                <span className="inline sm:hidden">{t('قارن', 'Compare', 'بەراورد')}</span>
              </Link>
              
              <button
                onClick={clearCompare}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EBF0FA] dark:bg-[#122040] text-[#5A6A85] dark:text-[#7A9BC0] transition hover:bg-red-500 hover:text-white"
                title={t('مسح الكل', 'Clear all', 'هەمووی بسڕەوە')}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
