"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fetchApi } from '@/lib/api';
import { ApiCategory } from '@/types/api';
const COMPANY_NAME_AR = "بحر الألوان للتجارة العامة";
const COMPANY_NAME_EN = "Bahr Alalwan General Trading";
const COMPANY_NAME_KU = "بەحری ئەلوان بۆ بازرگانی گشتی";
import logoImg from '../../imports/WhatsApp_Image_2026-06-22_at_3.23.33_PM.jpeg';

export function Footer() {
  const { t, lang } = useApp();
  const [settings, setSettings] = useState<any>(null);
  const [categories, setCategories] = useState<ApiCategory[]>([]);

  useEffect(() => {
    fetchApi<any>("/api/site/store-settings")
      .then((res) => {
        if (res && res.settings) {
          setSettings(res.settings);
        } else {
          setSettings(res);
        }
      })
      .catch((err) => console.error("Failed to fetch settings in Footer", err));

    fetchApi<ApiCategory[]>("/api/site/categories")
      .then((res) => {
        const main = (res || []).filter(cat => !cat.parent_id);
        setCategories(main);
      })
      .catch((err) => console.error("Failed to fetch categories in Footer", err));
  }, []);

  const quickLinks = [
    { ar: 'الرئيسية', en: 'Home', ku: 'سەرەکی', href: '/' },
    { ar: 'من نحن', en: 'About Us', ku: 'دەربارەی ئێمە', href: '/about' },
    { ar: 'منتجاتنا', en: 'Our Products', ku: 'بەرهەمەکانمان', href: '/products' },
    { ar: 'مركز الدعم', en: 'Support', ku: 'سەنتەری پشتگیری', href: '/support' },
    { ar: 'اتصل بنا', en: 'Contact Us', ku: 'پەیوەندیمان پێوە بکە', href: '/contact' },
  ];

  const support = [
    { ar: 'تحميل الكتالوجات', en: 'Download Catalogs', ku: 'دابەزاندنی کەتەلۆگەکان', href: '/support' },
    { ar: 'دليل المستخدم', en: 'User Manuals', ku: 'ڕێبەری بەکارهێنەر', href: '/support' },
    { ar: 'الأسئلة الشائعة', en: 'FAQs', ku: 'پرسیارە باوەکان', href: '/support' },
    { ar: 'الضمان', en: 'Warranty', ku: 'زەمانەت', href: '/support' },
    { ar: 'التركيب والصيانة', en: 'Installation & Service', ku: 'دانان و چاککردنەوە', href: '/support' },
  ];

  return (
    <footer className="bg-[#060D1A] text-[#A8C4E8]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img src={logoImg.src} alt={t(COMPANY_NAME_AR, COMPANY_NAME_EN, COMPANY_NAME_KU)} className="h-14 w-14 rounded-full object-contain" />
              <div>
                <div className="text-white font-700 text-base">{t('بحر الألوان', 'Bahr Alalwan', 'بەحری ئەلوان')}</div>
                <div className="text-[#7A9BC0] text-xs">{t('للتجارة العامة', 'General Trading', 'بۆ بازرگانی گشتی')}</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-[#7A9BC0] mb-6">
              {t('شركة رائدة في توريد الأجهزة المنزلية الأصلية من أفضل العلامات التجارية العالمية. نضمن الجودة والأصالة في كل منتج.', 'A leading company in supplying genuine home appliances from the best global brands. We guarantee quality and authenticity in every product.', 'کۆمپانیایەکی پێشەنگ لە دابینکردنی ئامێرە مۆدێرنەکانی ناوماڵ لە باشترین براندە جیهانییەکان. زەمانەتی کوالێتی و ڕەسەنایەتی دەکەین.')}
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {settings?.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/8 hover:bg-[#29ABE2] flex items-center justify-center transition-all hover:scale-110">
                  <Facebook size={16} className="text-[#A8C4E8]" />
                </a>
              )}
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/8 hover:bg-[#29ABE2] flex items-center justify-center transition-all hover:scale-110">
                  <Instagram size={16} className="text-[#A8C4E8]" />
                </a>
              )}
              {settings?.twitter && (
                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/8 hover:bg-[#29ABE2] flex items-center justify-center transition-all hover:scale-110">
                  <Twitter size={16} className="text-[#A8C4E8]" />
                </a>
              )}
              {settings?.youtube && (
                <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/8 hover:bg-[#29ABE2] flex items-center justify-center transition-all hover:scale-110">
                  <Youtube size={16} className="text-[#A8C4E8]" />
                </a>
              )}
              {settings?.tiktok && (
                <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/8 hover:bg-[#29ABE2] flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-4 h-4 fill-current text-[#A8C4E8]" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.99-1.72-.08-.07-.17-.14-.24-.22v6.52c.03 2.32-.82 4.67-2.52 6.22-1.76 1.61-4.29 2.31-6.61 1.88-2.61-.43-4.99-2.31-5.74-4.88-.86-2.88-.16-6.25 1.84-8.49 1.7-1.95 4.31-2.92 6.89-2.5v4.09c-1.57-.42-3.32.06-4.43 1.22-1.07 1.09-1.41 2.8-1.01 4.29.41 1.6 1.94 2.8 3.59 2.89 1.7.12 3.42-.91 3.92-2.55.15-.46.17-.95.17-1.42V.02z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-700 text-base mb-5">{t('روابط سريعة', 'Quick Links', 'بەستەرە خێراکان')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#7A9BC0] hover:text-[#29ABE2] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#F7941D] group-hover:w-3 transition-all duration-300" />
                    {t(link.ar, link.en, link.ku)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-700 text-base mb-5">{t('الفئات', 'Categories', 'پۆلەکان')}</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="text-sm text-[#7A9BC0] hover:text-[#29ABE2] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#29ABE2] group-hover:w-3 transition-all duration-300" />
                    {cat.name[lang as 'ar' | 'en' | 'ku'] ?? cat.name.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-700 text-base mb-5">{t('تواصل معنا', 'Contact Us', 'پەیوەندیمان پێوە بکە')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1B4F9B]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-[#29ABE2]" />
                </div>
                <span className="text-sm text-[#7A9BC0]">
                  {t('شارع التل، الدركزلية، حي الجزائر', 'Al-Tal Street, Al-Darkazliya, Al-Jazaer District', 'شەقامی تەل، دەرکەزلیە، گەڕەکی جەزائیر')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1B4F9B]/30 flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-[#29ABE2]" />
                </div>
                <a href={settings?.phone ? `tel:${Array.isArray(settings.phone) ? settings.phone[0] : settings.phone}` : "#"} className="text-sm text-[#7A9BC0] hover:text-[#29ABE2] transition-colors" dir="ltr">
                  {settings?.phone ? (Array.isArray(settings.phone) ? settings.phone[0] : settings.phone) : "---"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1B4F9B]/30 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-[#29ABE2]" />
                </div>
                <a href={settings?.email ? `mailto:${settings.email}` : "#"} className="text-sm text-[#7A9BC0] hover:text-[#29ABE2] transition-colors">
                  {settings?.email || "---"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={14} className="text-[#25D366]" />
                </div>
                <a
                  href={`https://wa.me/${settings?.whatsapp?.replace(/[^0-9]/g, "") || ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#25D366] hover:text-[#20BA58] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>

            {/* Working Hours */}
            <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/8">
              <div className="text-xs font-600 text-white mb-2">{t('ساعات العمل', 'Working Hours', 'کاتەکانی کارکردن')}</div>
              <div className="text-xs text-[#7A9BC0] space-y-1">
                <div>{t('الأحد – الخميس: 8ص – 8م', 'Sun – Thu: 8AM – 8PM', 'یەکشەممە – پێنجشەممە: ٨ بەیانی – ٨ ئێوارە')}</div>
                <div>{t('الجمعة – السبت: 10ص – 6م', 'Fri – Sat: 10AM – 6PM', 'هەینی – شەممە: ١٠ بەیانی – ٦ ئێوارە')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#5A7A9A]">
            © 2025 {t(COMPANY_NAME_AR, COMPANY_NAME_EN, COMPANY_NAME_KU)}. {t('جميع الحقوق محفوظة.', 'All rights reserved.', 'هەموو مافەکان پارێزراون.')}
          </p>
          <div className="flex items-center gap-4">
            {support.slice(0, 3).map((item) => (
              <Link key={item.href + item.en} href={item.href} className="text-xs text-[#5A7A9A] hover:text-[#29ABE2] transition-colors">
                {t(item.ar, item.en, item.ku)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
