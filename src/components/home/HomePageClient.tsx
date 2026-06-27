"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Truck,
  BadgeCheck,
  Star,
  Flame,
  Wind,
  WashingMachine,
  Microwave,
  Refrigerator,
  Utensils,
  Wallet,
  HeadphonesIcon,
} from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { ProductCard } from "@/components/ProductCard";
import { ApiHomeSection, ApiCategory } from "@/types/api";
import { cn } from "@/lib/utils";

interface HomePageClientProps {
  sections: ApiHomeSection[];
  categories: ApiCategory[];
}

export const HomePageClient = ({
  sections,
  categories,
}: HomePageClientProps) => {
  const { t, lang } = useI18n();

  const activeSections = sections
    .filter((s) => s.is_active && s.products && s.products.length > 0)
    .sort((a, b) => a.sort_order - b.sort_order);

  const getCategoryIcon = (slug: string) => {
    switch (slug.toLowerCase()) {
      case "refrigerators":
      case "ثلاجات":
        return Refrigerator;
      case "washing-machines":
      case "غسالات":
        return WashingMachine;
      case "air-conditioners":
      case "مكيفات":
        return Wind;
      case "ovens":
      case "أفران":
        return Flame;
      case "microwaves":
      case "ميكرويفات":
        return Microwave;
      case "dishwashers":
      case "غسالات صحون":
        return Utensils;
      default:
        return Sparkles;
    }
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#0D2B5E] to-[#1B4FA0] text-white overflow-hidden"
        aria-label="Hero"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0DB8E8] rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E85C10] rounded-full mix-blend-multiply filter blur-[128px] opacity-20" />

        <div className="container-wide relative z-10 grid items-center gap-12 pt-24 pb-32 lg:grid-cols-2">
          <div className="animate-fade-up flex flex-col items-start text-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md mb-6">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium tracking-wide text-white/90">
                {t("home.hero.eyebrow")}
              </span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.1] text-balance sm:text-6xl lg:text-7xl">
              {t("home.hero.title")}
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg leading-relaxed">
              {t("home.hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="group relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(232,92,16,0.4)]"
              >
                <span className="relative z-10">{t("cta.browse")}</span>
                <ArrowRight
                  className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_forwards]" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
              >
                {t("nav.about")}
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-3 gap-6 w-full max-w-lg border-t border-white/10 pt-8">
              {[
                { icon: ShieldCheck, label: t("warranty"), val: "5 Years" },
                { icon: BadgeCheck, label: "Quality", val: "Premium" },
                { icon: Truck, label: "Delivery", val: "Fast" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <stat.icon className="h-6 w-6 text-accent mb-2" />
                  <span className="text-xl font-bold">{stat.val}</span>
                  <span className="text-xs text-white/60 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in hidden lg:block h-[600px]">
            {/* Main Product Image Container */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="relative w-[450px] h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] border-white/10 bg-white/5 backdrop-blur-sm">
                <img
                  src="/thisis.jpeg"
                  alt="Bahr Alalwan Home Appliances"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-[20%] -left-12 z-20 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-4 animate-[bounce_4s_ease-in-out_infinite]">
              <div className="bg-[#E85C10]/10 p-3 rounded-full text-[#E85C10]">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div className="flex flex-col text-black">
                <span className="font-bold text-lg">4.9/5</span>
                <span className="text-xs text-gray-500">Customer Rating</span>
              </div>
            </div>

            <div className="absolute bottom-[20%] -right-8 z-20 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-4 animate-[bounce_5s_ease-in-out_infinite_reverse]">
              <div className="bg-[#0DB8E8]/10 p-3 rounded-full text-[#0DB8E8]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-black">
                <span className="font-bold text-lg">100%</span>
                <span className="text-xs text-gray-500">Authentic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] sm:h-[80px] fill-background">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      {categories.length > 0 && (
        <section className="container-wide py-12 lg:py-20" aria-label="Categories">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2">{t("home.categories.eyebrow")}</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              {t("home.categories.main")}
            </h2>
            <div className="w-24 h-1 bg-gradient-brand mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((cat) => {
              const Icon = getCategoryIcon(cat.slug);
              return (
                <Link
                  key={cat.id}
                  href={`/products?category_slug=${cat.slug}`}
                  className="group relative flex flex-col items-center gap-4 p-6 bg-card rounded-2xl border border-border/40 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-center text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {cat.name[lang] ?? cat.name.en}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ── WHY CHOOSE US (6 Features) ───────────────────────────────────── */}
      <section className="bg-muted/30 py-16 lg:py-24" aria-label="Why Choose Us">
        <div className="container-wide">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2">Why Us</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              {lang === "ar" ? "لماذا تختار بحر الألوان؟" : lang === "en" ? "Why Choose Bahr Alalwan?" : "بۆچی بەحری ئەلوان هەڵدەبژێریت؟"}
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
              {lang === "ar" ? "نلتزم بتقديم الأفضل لمنزلك، مع مجموعة من المميزات التي تجعلنا الخيار الأول للأجهزة المنزلية." : lang === "en" ? "We are committed to providing the best for your home, with a set of features that make us the first choice for home appliances." : "ئێمە پابەندین بە پێشکەشکردنی باشترین بۆ ماڵەکەت، لەگەڵ کۆمەڵێک تایبەتمەندی کە وامان لێدەکات ببینە یەکەم هەڵبژاردن بۆ ئامێرەکانی ناوماڵ."}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: ShieldCheck, title: lang === "ar" ? "ضمان موثوق" : lang === "en" ? "Reliable Warranty" : "گەرەنتی باوەڕپێکراو", desc: lang === "ar" ? "ضمان حقيقي يصل إلى 5 سنوات على جميع الأجهزة." : lang === "en" ? "Real warranty up to 5 years on all appliances." : "گەرەنتی ڕاستەقینە تا ٥ ساڵ بۆ هەموو ئامێرەکان." },
              { icon: Star, title: lang === "ar" ? "جودة استثنائية" : lang === "en" ? "Exceptional Quality" : "کوالێتی ناوازە", desc: lang === "ar" ? "أفضل العلامات التجارية العالمية الموثوقة." : lang === "en" ? "The best trusted global brands." : "باشترین براندە باوەڕپێکراوە جیهانییەکان." },
              { icon: Wallet, title: lang === "ar" ? "أسعار تنافسية" : lang === "en" ? "Competitive Prices" : "نرخی گونجاو", desc: lang === "ar" ? "أفضل قيمة مقابل السعر في السوق العراقي." : lang === "en" ? "The best value for money in the Iraqi market." : "باشترین بەها بەرامبەر نرخ لە بازاڕی عێراق." },
              { icon: HeadphonesIcon, title: lang === "ar" ? "دعم فني متميز" : lang === "en" ? "Premium Support" : "پاڵپشتی ناوازە", desc: lang === "ar" ? "فريق دعم متخصص لخدمتك بعد البيع." : lang === "en" ? "A dedicated support team to serve you after sales." : "تیمێکی تایبەتی پاڵپشتی بۆ خزمەتکردنت دوای فرۆشتن." },
              { icon: Truck, title: lang === "ar" ? "توصيل سريع" : lang === "en" ? "Fast Delivery" : "گەیاندنی خێرا", desc: lang === "ar" ? "توصيل آمن وسريع لكافة أنحاء البلاد." : lang === "en" ? "Safe and fast delivery across the country." : "گەیاندنی سەلامەت و خێرا بۆ هەموو ناوچەکانی وڵات." },
              { icon: BadgeCheck, title: lang === "ar" ? "وكيل معتمد" : lang === "en" ? "Authorized Dealer" : "بریکاری ڕێگەپێدراو", desc: lang === "ar" ? "وكلاء حصريون للعديد من الماركات العالمية." : lang === "en" ? "Exclusive dealers for many global brands." : "بریکاری تایبەتی بۆ چەندین براندی جیهانی." },
            ].map((feature, idx) => (
              <div key={idx} className="bg-background rounded-2xl p-8 shadow-sm border border-border/50 hover:border-primary hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-primary/10">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DYNAMIC PRODUCT SECTIONS ─────────────────────────────────────── */}
      {activeSections.map((section, index) => (
        <section
          key={section.id}
          className="container-wide py-12 lg:py-20"
          aria-label={section.title[lang] ?? section.title.en}
        >
          <div className="flex items-end justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-10 bg-secondary rounded-full" />
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                {section.title[lang] ?? section.title.en}
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors sm:flex uppercase tracking-wider"
            >
              {t("cta.viewAll")}{" "}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>

          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {section.products.map((p) => (
              <div
                key={p.id}
                className="w-[75vw] shrink-0 snap-center sm:w-auto"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* ── CTA STRIP ────────────────────────────────────────────────────── */}
      <section className="container-wide pb-12 lg:pb-20" aria-label="Call to action">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-hero text-white px-8 py-16 lg:px-20 lg:py-24 shadow-2xl">
          {/* Decorative shapes */}
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-secondary/30 blur-[80px]" aria-hidden="true" />
          <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-accent/20 blur-[60px]" aria-hidden="true" />
          
          <div className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
                Customer Support
              </span>
              <h3 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl leading-tight">
                {t("cta.help.title")}
              </h3>
              <p className="mt-4 text-white/80 text-lg">
                {t("cta.help.subtitle")}
              </p>
            </div>
            <Link
              href="/contact"
              className="group flex-shrink-0 inline-flex items-center gap-3 rounded-full bg-white text-primary px-8 py-4 text-base font-bold transition-all hover:bg-secondary hover:text-white hover:scale-105 shadow-xl"
            >
              {t("nav.contact")}{" "}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
