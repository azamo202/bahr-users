"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, Search, Sun, Moon, Globe, ChevronDown, Check,
  Refrigerator, Wind, Flame, Waves, Home, Snowflake,
  Radio, Thermometer, ChefHat, Droplets,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useApp } from '../context/AppContext';
import { ApiCategory } from "@/types/api";

const COMPANY_NAME_AR = "شركة بحر الألوان للتجارة العامة";
const COMPANY_NAME_EN = "Bahr Alalwan General Trading Company";
const COMPANY_NAME_KU = "کۆمپانیای بەحری ئەلوان بۆ بازرگانی گشتی";
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
  const { lang, setLang, isDark, toggleDark, t, whatsapp } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const megaRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<ApiCategory | null>(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

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
    { pathAr: 'الرئيسية', pathEn: 'Home', pathKu: 'سەرەکی', href: '/' },
    { pathAr: 'المنتجات', pathEn: 'Products', pathKu: 'بەرهەمەکان', href: '/products', hasMega: true },
    { pathAr: 'من نحن', pathEn: 'About Us', pathKu: 'دەربارەی ئێمە', href: '/about' },
    { pathAr: 'مركز الدعم', pathEn: 'Support', pathKu: 'سەنتەری پشتگیری', href: '/support' },
    { pathAr: 'اتصل بنا', pathEn: 'Contact', pathKu: 'پەیوەندیمان پێوە بکە', href: '/contact' },
  ];

  const isTransparent = isHome && !scrolled && !mobileOpen;
  const navBg = isTransparent
    ? 'bg-transparent'
    : 'bg-white/95 dark:bg-[#0E1A33]/95 backdrop-blur-md shadow-lg shadow-[#1B4F9B]/8';

  const textColor = isTransparent ? 'text-white' : 'text-[#0A1628] dark:text-[#E8F0FF]';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src={logoImg.src}
              alt={t(COMPANY_NAME_AR, COMPANY_NAME_EN, COMPANY_NAME_KU)}
              className="h-12 w-12 object-contain rounded-full transition-all duration-300"
            />
            <div className="hidden sm:block">
              <div className={`text-sm font-700 leading-tight transition-colors ${textColor}`}>
                {t('شركة بحر الألوان', 'Bahr Alalwan Company', 'کۆمپانیای بەحری ئەلوان')}
              </div>
              <div className={`text-xs transition-colors ${isTransparent ? 'text-white/70' : 'text-[#5A6A85] dark:text-[#7A9BC0]'}`}>
                {t('للتجارة العامة', 'General Trading', 'بۆ بازرگانی گشتی')}
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
                  {t(link.pathAr, link.pathEn, link.pathKu)}
                  {link.hasMega && <ChevronDown size={14} className={`transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Mega Menu Grid */}
                {link.hasMega && (
                  <AnimatePresence>
                    {megaMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full mt-3 bg-[#E4E8F0] dark:bg-[#0E1A33] rounded-3xl shadow-xl shadow-[#1B4F9B]/15 border border-white/50 dark:border-[#4B8FE2]/15 p-6 z-50 w-[750px]"
                        style={{
                          [lang === 'ar' || lang === 'ku' ? 'right' : 'left']: 0,
                        }}
                      >
                        <div className="grid grid-cols-3 gap-3">
                          {categories.map((cat) => {
                            const Icon = categoryIcons[cat.slug] || Home;
                            return (
                              <div key={cat.id} className="relative group/cat">
                                <Link
                                  href={`/products?category=${cat.slug}`}
                                  className="flex items-center justify-between p-3 rounded-2xl group-hover/cat:bg-[#D4D9E3] dark:group-hover/cat:bg-white/10 transition-colors relative z-10"
                                  onClick={() => setMegaMenuOpen(false)}
                                >
                                  <div>
                                    <div className="font-800 text-[#0A1628] dark:text-[#E8F0FF] text-sm group-hover/cat:text-[#1B4F9B] dark:group-hover/cat:text-[#4B8FE2] transition-colors">
                                      {cat.name[lang as 'ar' | 'en' | 'ku'] ?? cat.name.en}
                                    </div>
                                    <div className="text-[11px] text-[#5A6A85] dark:text-[#7A9BC0] mt-0.5">
                                      {cat.children?.length ? `${cat.children.length} ${t('تصنيفات فرعية', 'subcategories', 'پۆل')}` : t('تصفح المنتجات', 'Browse Products', 'بەرهەمەکان بگەڕێ')}
                                    </div>
                                  </div>
                                  <div className="w-10 h-10 rounded-xl bg-[#D4D9E3] dark:bg-[#122040] flex items-center justify-center flex-shrink-0 text-[#1B4F9B] dark:text-[#4B8FE2] group-hover/cat:bg-[#1B4F9B] group-hover/cat:text-white transition-colors">
                                    <Icon size={18} />
                                  </div>
                                </Link>
                                
                                {/* Subcategories Absolute Dropdown */}
                                {cat.children && cat.children.length > 0 && (
                                  <div className="absolute top-full pt-1 opacity-0 invisible group-hover/cat:opacity-100 group-hover/cat:visible transition-all duration-200 z-50 min-w-[200px]"
                                       style={{ [lang === 'ar' || lang === 'ku' ? 'right' : 'left']: '12px' }}>
                                    <div className="bg-white dark:bg-[#0E1A33] rounded-2xl shadow-xl border border-[#1B4F9B]/10 dark:border-[#4B8FE2]/15 p-2 flex flex-col gap-1">
                                      {cat.children.map((sub) => (
                                        <Link
                                          key={sub.id}
                                          href={`/products?category=${sub.slug}`}
                                          className="flex items-center gap-2 px-3 py-2 text-sm font-600 text-[#5A6A85] dark:text-[#7A9BC0] hover:text-[#1B4F9B] dark:hover:text-[#4B8FE2] hover:bg-[#F5F8FF] dark:hover:bg-white/5 rounded-xl transition-colors group/sub"
                                          onClick={() => setMegaMenuOpen(false)}
                                        >
                                          <span className="w-1.5 h-1.5 rounded-full bg-[#1B4F9B]/30 dark:bg-[#4B8FE2]/30 transition-colors group-hover/sub:bg-[#1B4F9B] dark:group-hover/sub:bg-[#4B8FE2]" />
                                          <span className="truncate">{sub.name[lang as 'ar' | 'en' | 'ku'] ?? sub.name.en}</span>
                                        </Link>
                                      ))}
                                      <div className="mt-1 pt-1 border-t border-[#1B4F9B]/5 dark:border-[#4B8FE2]/10">
                                        <Link
                                          href={`/products?category=${cat.slug}`}
                                          className="text-[11px] font-800 text-[#1B4F9B] dark:text-[#4B8FE2] hover:underline flex items-center justify-center py-1.5"
                                          onClick={() => setMegaMenuOpen(false)}
                                        >
                                          {t('عرض الكل', 'View All', 'هەمووی ببینە')}
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
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
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 200 }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder={t('بحث...', 'Search...', 'گەڕان...')}
                      className={`w-full py-1.5 px-3 rounded-lg text-sm bg-transparent border border-white/20 outline-none ${textColor} placeholder-white/50`}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => {
                if (searchOpen) {
                  if (searchQuery.trim()) {
                    handleSearch();
                  } else {
                    setSearchOpen(false);
                  }
                } else {
                  setSearchOpen(true);
                }
              }}
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-600 transition-all border ${
                    isTransparent
                      ? 'border-white/30 text-white hover:bg-white/15'
                      : 'border-[#1B4F9B]/20 text-[#1B4F9B] dark:text-[#4B8FE2] hover:bg-[#1B4F9B]/8 dark:hover:bg-[#4B8FE2]/10'
                  }`}
                >
                  <Globe size={14} />
                  {lang === 'ar' ? 'عربي' : lang === 'en' ? 'English' : 'کوردی'}
                  <ChevronDown size={14} className="opacity-70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32 bg-white dark:bg-[#0E1A33] border border-[#1B4F9B]/10 shadow-lg">
                <DropdownMenuItem onClick={() => setLang('ar')} className="justify-between cursor-pointer py-2">
                  <span>عربي</span>
                  {lang === 'ar' && <Check size={14} className="text-[#1B4F9B]" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('en')} className="justify-between cursor-pointer py-2">
                  <span>English</span>
                  {lang === 'en' && <Check size={14} className="text-[#1B4F9B]" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang('ku')} className="justify-between cursor-pointer py-2">
                  <span>کوردی</span>
                  {lang === 'ku' && <Check size={14} className="text-[#1B4F9B]" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* WhatsApp CTA (desktop) */}
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-600 bg-[#25D366] hover:bg-[#20BA58] text-white transition-all shadow-md shadow-[#25D366]/30 hover:shadow-[#25D366]/50"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t('تواصل معنا', 'Contact Us', 'پەیوەندیمان پێوە بکە')}
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
                  {t(link.pathAr, link.pathEn, link.pathKu)}
                </Link>
              ))}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-600 text-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t('تواصل عبر واتساب', 'Contact via WhatsApp', 'پەیوەندی بکە لە ڕێگەی واتسئەپ')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
