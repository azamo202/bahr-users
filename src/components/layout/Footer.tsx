"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  MapPin,
  Mail,
  ArrowRight,
  Flame,
  Wind,
  WashingMachine,
  Microwave,
  Refrigerator,
  Utensils,
} from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { ApiStoreSettings } from "@/types/api";

const logo = "/bhr.jpeg";

interface FooterProps {
  settings: ApiStoreSettings | null;
}

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M16.5 13.5l-2.5-1.5-1.5 1.5a4.5 4.5 0 0 1-4.5-4.5l1.5-1.5-1.5-2.5-2 .5c-.5 1.5.5 3.5 2.5 5.5s4 3 5.5 2.5l.5-2z" />
  </svg>
);

export const Footer = ({ settings }: FooterProps) => {
  const { t, lang } = useI18n();

  const cleanWhatsappNumber = settings?.whatsapp?.replace(/\D/g, "");

  // Build social links list — only include if href is defined
  const socialLinks = [
    settings?.facebook && {
      href: settings.facebook,
      Icon: Facebook,
      label: "Facebook",
    },
    settings?.instagram && {
      href: settings.instagram,
      Icon: Instagram,
      label: "Instagram",
    },
    settings?.youtube && {
      href: settings.youtube,
      Icon: Youtube,
      label: "YouTube",
    },
    settings?.tiktok && {
      href: settings.tiktok,
      Icon: TiktokIcon,
      label: "TikTok",
    },
    cleanWhatsappNumber && {
      href: `https://wa.me/${cleanWhatsappNumber}`,
      Icon: WhatsappIcon,
      label: "WhatsApp",
    },
  ].filter(Boolean) as {
    href: string;
    Icon: React.ComponentType<{ className?: string }>;
    label: string;
  }[];

  // Normalise phone to an array
  const phoneNumbers = Array.isArray(settings?.phone)
    ? settings.phone.filter(Boolean)
    : settings?.phone
    ? [settings.phone]
    : [];

  const categories = [
    { icon: Refrigerator, label: lang === "ar" ? "ثلاجات" : lang === "ku" ? "سەلاجەکان" : "Refrigerators" },
    { icon: WashingMachine, label: lang === "ar" ? "غسالات" : lang === "ku" ? "جلشۆرەکان" : "Washing Machines" },
    { icon: Wind, label: lang === "ar" ? "مكيفات" : lang === "ku" ? "فێنککەرەوەکان" : "Air Conditioners" },
    { icon: Flame, label: lang === "ar" ? "أفران" : lang === "ku" ? "فڕنەکان" : "Ovens" },
    { icon: Microwave, label: lang === "ar" ? "ميكرويفات" : lang === "ku" ? "مایکرۆوەیڤەکان" : "Microwaves" },
    { icon: Utensils, label: lang === "ar" ? "غسالات صحون" : lang === "ku" ? "قاپشۆرەکان" : "Dishwashers" },
  ];

  return (
    <footer className="mt-24 bg-gradient-hero text-white border-t-4 border-secondary relative overflow-hidden" role="contentinfo">
      {/* Wave Separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 pointer-events-none">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] sm:h-[50px] fill-background">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container-wide grid gap-12 pt-24 pb-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-3 relative z-10" aria-label={t("logo.name")}>
            <div className="relative w-14 h-14 overflow-hidden rounded-full ring-2 ring-white/20 bg-white p-1">
              <img src={logo} alt={t("logo.name")} className="w-full h-full object-cover rounded-full" />
            </div>
            <span className="font-display text-2xl font-bold">{t("logo.name")}</span>
          </Link>
          <p className="mt-6 max-w-xs text-sm text-white/70 leading-relaxed">
            {t("footer.tagline")}
          </p>
          {socialLinks.length > 0 && (
            <div className="mt-8 flex gap-3" aria-label="Social media links">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/5 border border-white/10 transition-all hover:bg-secondary hover:border-secondary hover:text-white hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(232,92,16,0.3)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Categories */}
        <nav aria-label="Appliance Categories">
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            {lang === "ar" ? "الأجهزة المنزلية" : lang === "ku" ? "ئامێرەکانی ناوماڵ" : "Home Appliances"}
          </h4>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 text-sm text-white/70">
            {categories.map((cat, idx) => (
              <li key={idx}>
                <Link href="/products" className="group flex items-center gap-2 hover:text-white transition-colors w-fit">
                  <cat.icon className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:text-accent transition-all" />
                  <span className="group-hover:translate-x-1 transition-transform">{cat.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick links */}
        <nav aria-label="Footer navigation">
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            {t("footer.quickLinks")}
          </h4>
          <ul className="mt-6 space-y-3 text-sm text-white/70">
            {[
              { href: "/", label: t("nav.home") },
              { href: "/products", label: t("nav.products") },
              { href: "/support", label: t("nav.support") },
              { href: "/about", label: t("nav.about") },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="group flex items-center gap-2 hover:text-white transition-colors w-fit">
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent transition-all rtl:rotate-180" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact info */}
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-glow"></span>
            {t("footer.contact")}
          </h4>
          <ul className="mt-6 space-y-4 text-sm text-white/70">
            {phoneNumbers.map((num, i) => (
              <li key={`phone-${i}`} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/15 transition-colors">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider opacity-60">Call Us</span>
                  <a href={`tel:${num.replace(/\s/g, "")}`} className="hover:text-white transition font-medium" dir="ltr">
                    {num}
                  </a>
                </div>
              </li>
            ))}
            
            {settings?.address && (
              <li className="flex items-start gap-3 mt-4">
                <MapPin className="h-5 w-5 mt-0.5 text-accent flex-shrink-0" aria-hidden="true" />
                <span className="leading-relaxed">
                  {settings.address[lang] ?? settings.address.en ?? "Erbil, Iraq"}
                </span>
              </li>
            )}
            
            <li className="flex items-start gap-3">
              <Mail className="h-5 w-5 mt-0.5 text-accent flex-shrink-0" aria-hidden="true" />
              <a href="mailto:info@bahralalwan.com" className="hover:text-white transition">
                info@bahralalwan.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container-wide flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 sm:flex-row">
          <p>{t("footer.rights")}</p>
          <div className="flex items-center gap-4">
            <span>Premium Appliances</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Since 2002</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
