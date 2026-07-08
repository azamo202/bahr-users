"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, Search, Sun, Moon, Globe, ChevronDown,
  Refrigerator, Wind, Flame, Waves, Home, Snowflake,
  Radio, Thermometer, ChefHat, Droplets,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ApiCategory } from "@/types/api";

const COMPANY_NAME_AR = "بحر الألوان للتجارة العامة";
const COMPANY_NAME_EN = "Bahr Alalwan General Trading";
import logoImg from '../../imports/WhatsApp_Image_2026-06-22_at_3.23.33_PM.jpeg';

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  refrigerators: Refrigerator,
  'washing-machines': Waves,
  'air-conditioners': Wind,
  ovens: Flame,
  cooktops: ChefHat,
  hoods: Wind,
  dishwashers: Droplets,
  microwaves: Radio,
  'water-heaters': Thermometer,
  freezers: Snowflake,
  'small-appliances': Home,
  other: Home,
};

export function NavbarClient({ categories }: { categories: ApiCategory[] }) {
  const { lang, setLang, isDark, toggleDark, t } = useApp();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const megaRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { pathAr: 'الرئيسية', pathEn: 'Home', href: '/' },
    { pathAr: 'المنتجات', pathEn: 'Products', href: '/products', hasMega: true },
    { pathAr: 'من نحن', pathEn: 'About Us', href: '/about' },
    { pathAr: 'مركز الدعم', pathEn: 'Support', href: '/support' },
    { pathAr: 'اتصل بنا', pathEn: 'Contact', href: '/contact' },
  ];

  const isTransparent = isHome && !scrolled && !mobileOpen;
  const navBg = isTransparent
    ? 'bg-transparent'
    : 'bg-white/95 dark:bg-[#0E1A33]/95 backdrop-blur-md shadow-lg shadow-[#1B4F9B]/8';

  const textColor = isTransparent ? 'text-white' : 'text-[#0A1628] dark:text-[#E8F0FF]';
  const logoFilter = isTransparent ? 'brightness-0 invert' : '';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${navBg}`}
      style={{ fontFamily: 'Cairo, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src={logoImg.src}
              alt={t(COMPANY_NAME_AR, COMPANY_NAME_EN)}
              className={`h-12 w-12 object-contain rounded-full transition-all duration-300 ${logoFilter}`}
            />
            <div className="hidden sm:block">
              <div className={`text-sm font-700 leading-tight transition-colors ${textColor}`}>
                {t('بحر الألوان', 'Bahr Alalwan')}
              </div>
              <div className={`text-xs transition-colors ${isTransparent ? 'text-white/70' : 'text-[#5A6A85] dark:text-[#7A9BC0]'}`}>
                {t('للتجارة العامة', 'General Trading')}
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.hasMega && setMegaMenuOpen(true)}
                onMouseLeave={() => link.hasMega && setMegaMenuOpen(false)}
                ref={link.hasMega ? megaRef : undefined}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-600 transition-all duration-200
                    ${pathname === link.href
                      ? 'text-[#1B4F9B] dark:text-[#4B8FE2] bg-[#1B4F9B]/10'
                      : `${textColor} hover:text-[#1B4F9B] dark:hover:text-[#4B8FE2] hover:bg-white/10`
                    }`}
                >
                  {t(link.pathAr, link.pathEn)}
                  {link.hasMega && <ChevronDown size={14} className={`transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Mega Menu */}
                {link.hasMega && (
                  <AnimatePresence>
                    {megaMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 bg-white dark:bg-[#0E1A33] rounded-2xl shadow-2xl shadow-[#1B4F9B]/15 border border-[#1B4F9B]/10 p-6 w-[580px] grid grid-cols-3 gap-3"
                        style={{ [lang === 'ar' ? 'right' : 'left']: 0 }}
                      >
                        {categories.map((cat) => {
                          const Icon = categoryIcons[cat.slug] || Home;
                          return (
                            <Link
                              key={cat.id}
                              href={`/products?category=${cat.slug}`}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1B4F9B]/8 dark:hover:bg-[#4B8FE2]/10 transition-all group"
                            >
                              <div className="w-9 h-9 rounded-lg bg-[#E8F4FD] dark:bg-[#122040] flex items-center justify-center group-hover:bg-[#1B4F9B] transition-colors flex-shrink-0">
                                <Icon size={16} className="text-[#1B4F9B] dark:text-[#4B8FE2] group-hover:text-white" />
                              </div>
                              <div>
                                <div className="text-xs font-600 text-[#0A1628] dark:text-[#E8F0FF] line-clamp-1">
                                  {cat.name[lang as 'ar' | 'en'] ?? cat.name.en}
                                </div>
                                <div className="text-xs text-[#5A6A85] dark:text-[#7A9BC0]">
                                  {t('منتج', 'items')}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <input
                    autoFocus
                    type="text"
                    placeholder={t('ابحث...', 'Search...')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setSearchOpen(false);
                        setSearchQuery('');
                      }
                    }}
                    className="w-full px-3 py-1.5 text-sm rounded-lg bg-white/20 dark:bg-[#122040] border border-white/30 dark:border-[#29ABE2]/20 text-[#0A1628] dark:text-[#E8F0FF] placeholder-white/60 dark:placeholder-[#7A9BC0] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-lg transition-all ${textColor} hover:bg-white/15 dark:hover:bg-[#122040]`}
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Dark Mode */}
            <button
              onClick={toggleDark}
              className={`p-2 rounded-lg transition-all ${textColor} hover:bg-white/15 dark:hover:bg-[#122040]`}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-600 transition-all border ${
                isTransparent
                  ? 'border-white/30 text-white hover:bg-white/15'
                  : 'border-[#1B4F9B]/20 text-[#1B4F9B] dark:text-[#4B8FE2] hover:bg-[#1B4F9B]/8 dark:hover:bg-[#4B8FE2]/10'
              }`}
            >
              <Globe size={14} />
              {lang === 'ar' ? 'EN' : 'عر'}
            </button>

            {/* WhatsApp CTA (desktop) */}
            <a
              href={`https://wa.me/${'+966500000000'.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-600 bg-[#25D366] hover:bg-[#20BA58] text-white transition-all shadow-md shadow-[#25D366]/30 hover:shadow-[#25D366]/50"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t('تواصل معنا', 'Contact Us')}
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all ${textColor} hover:bg-white/15`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-white dark:bg-[#0E1A33] border-t border-[#1B4F9B]/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-600 transition-all ${
                    pathname === link.href
                      ? 'bg-[#1B4F9B] text-white'
                      : 'text-[#0A1628] dark:text-[#E8F0FF] hover:bg-[#1B4F9B]/8'
                  }`}
                >
                  {t(link.pathAr, link.pathEn)}
                </Link>
              ))}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${'+966500000000'.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-600 text-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t('تواصل عبر واتساب', 'Contact via WhatsApp')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
