"use client";
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
const COMPANY_NAME_AR = "بحر الألوان للتجارة العامة";
const COMPANY_NAME_EN = "Bahr Alalwan General Trading";
import logoImg from '../../imports/WhatsApp_Image_2026-06-22_at_3.23.33_PM.jpeg';

export function Footer() {
  const { t } = useApp();

  const quickLinks = [
    { ar: 'الرئيسية', en: 'Home', href: '/' },
    { ar: 'من نحن', en: 'About Us', href: '/about' },
    { ar: 'منتجاتنا', en: 'Our Products', href: '/products' },
    { ar: 'مركز الدعم', en: 'Support', href: '/support' },
    { ar: 'اتصل بنا', en: 'Contact Us', href: '/contact' },
  ];

  const productCategories = [
    { ar: 'ثلاجات', en: 'Refrigerators', id: 'refrigerators' },
    { ar: 'غسالات', en: 'Washing Machines', id: 'washing-machines' },
    { ar: 'مكيفات', en: 'Air Conditioners', id: 'air-conditioners' },
    { ar: 'أفران وطباخات', en: 'Ovens & Cooktops', id: 'ovens' },
    { ar: 'غسالات صحون', en: 'Dishwashers', id: 'dishwashers' },
    { ar: 'أجهزة صغيرة', en: 'Small Appliances', id: 'small-appliances' },
  ];

  const support = [
    { ar: 'تحميل الكتالوجات', en: 'Download Catalogs', href: '/support' },
    { ar: 'دليل المستخدم', en: 'User Manuals', href: '/support' },
    { ar: 'الأسئلة الشائعة', en: 'FAQs', href: '/support' },
    { ar: 'الضمان', en: 'Warranty', href: '/support' },
    { ar: 'التركيب والصيانة', en: 'Installation & Service', href: '/support' },
  ];

  return (
    <footer className="bg-[#060D1A] text-[#A8C4E8]" style={{ fontFamily: 'Cairo, sans-serif' }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img src={logoImg.src} alt={t(COMPANY_NAME_AR, COMPANY_NAME_EN)} className="h-14 w-14 rounded-full object-contain" />
              <div>
                <div className="text-white font-700 text-base">{t('بحر الألوان', 'Bahr Alalwan')}</div>
                <div className="text-[#7A9BC0] text-xs">{t('للتجارة العامة', 'General Trading')}</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-[#7A9BC0] mb-6">
              {t(
                'شركة رائدة في توريد الأجهزة المنزلية الأصلية من أفضل العلامات التجارية العالمية. نضمن الجودة والأصالة في كل منتج.',
                'A leading company in supplying genuine home appliances from the best global brands. We guarantee quality and authenticity in every product.'
              )}
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-[#29ABE2] flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon size={16} className="text-[#A8C4E8]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-700 text-base mb-5">{t('روابط سريعة', 'Quick Links')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#7A9BC0] hover:text-[#29ABE2] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#F7941D] group-hover:w-3 transition-all duration-300" />
                    {t(link.ar, link.en)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-700 text-base mb-5">{t('الفئات', 'Categories')}</h4>
            <ul className="space-y-3">
              {productCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.id}`}
                    className="text-sm text-[#7A9BC0] hover:text-[#29ABE2] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#29ABE2] group-hover:w-3 transition-all duration-300" />
                    {t(cat.ar, cat.en)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-700 text-base mb-5">{t('تواصل معنا', 'Contact Us')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1B4F9B]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-[#29ABE2]" />
                </div>
                <span className="text-sm text-[#7A9BC0]">
                  {t('المملكة العربية السعودية، الرياض', 'Riyadh, Saudi Arabia')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1B4F9B]/30 flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-[#29ABE2]" />
                </div>
                <a href="tel:+966500000000" className="text-sm text-[#7A9BC0] hover:text-[#29ABE2] transition-colors">
                  +966 50 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1B4F9B]/30 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-[#29ABE2]" />
                </div>
                <a href="mailto:info@bahralalwan.com" className="text-sm text-[#7A9BC0] hover:text-[#29ABE2] transition-colors">
                  info@bahralalwan.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={14} className="text-[#25D366]" />
                </div>
                <a
                  href="https://wa.me/966500000000"
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
              <div className="text-xs font-600 text-white mb-2">{t('ساعات العمل', 'Working Hours')}</div>
              <div className="text-xs text-[#7A9BC0] space-y-1">
                <div>{t('الأحد – الخميس: 8ص – 8م', 'Sun – Thu: 8AM – 8PM')}</div>
                <div>{t('الجمعة – السبت: 10ص – 6م', 'Fri – Sat: 10AM – 6PM')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#5A7A9A]">
            © 2025 {t(COMPANY_NAME_AR, COMPANY_NAME_EN)}. {t('جميع الحقوق محفوظة.', 'All rights reserved.')}
          </p>
          <div className="flex items-center gap-4">
            {support.slice(0, 3).map((item) => (
              <Link key={item.href + item.en} href={item.href} className="text-xs text-[#5A7A9A] hover:text-[#29ABE2] transition-colors">
                {t(item.ar, item.en)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
