"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X, Globe, Check, ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t, dir } = useI18n();

  useEffect(() => {
    setIsOpen(false);
    setLangMenuOpen(false);
  }, [pathname, lang]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/products", label: t("nav.products") },
    { to: "/support", label: t("nav.support") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const langs = [
    { code: "en", label: "English", dir: "ltr", flag: "🇬🇧" },
    { code: "ar", label: "العربية", dir: "rtl", flag: "🇮🇶" },
    { code: "ku", label: "کوردی", dir: "rtl", flag: "☀️" },
  ] as const;

  const currentLangObj = langs.find((l) => l.code === lang) || langs[0];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-brand z-[60]" />
      <header
        className={`fixed top-1 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-sm py-2"
            : "bg-background/50 backdrop-blur-sm py-4"
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label={t("logo.name")}
            className="flex items-center gap-3 group relative"
          >
            <div className="relative w-12 h-12 overflow-hidden rounded-full ring-2 ring-primary/20 group-hover:ring-primary transition-all duration-300">
              <Image
                src="/bhr.jpeg"
                alt={t("logo.name")}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-tight text-primary">
                {t("logo.name")}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider hidden sm:block">
                {t("logo.subtitle")}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-muted/50 rounded-full px-2 py-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-full transition-colors hover:text-primary hover:bg-background ${
                    isActive ? "bg-background text-primary shadow-sm" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Lang Selector Desktop */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full hover:bg-muted transition-colors"
                aria-expanded={langMenuOpen}
              >
                <Globe className="w-4 h-4 text-primary" />
                <span className="hidden xl:inline">{currentLangObj.label}</span>
                <span className="xl:hidden uppercase">{lang}</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </button>

              {langMenuOpen && (
                <div className="absolute top-full mt-2 w-40 bg-background border border-border rounded-xl shadow-lg overflow-hidden py-1 rtl:left-0 ltr:right-0">
                  {langs.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code as any)}
                      className={`w-full text-start flex items-center justify-between px-4 py-2 text-sm hover:bg-muted transition-colors ${
                        lang === l.code ? "text-primary font-medium" : "text-foreground"
                      }`}
                      dir={l.dir}
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        {l.label}
                      </span>
                      {lang === l.code && <Check className="w-4 h-4 text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 lg:hidden text-foreground hover:text-primary transition-colors rounded-full hover:bg-muted"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden pt-24 pb-6 px-4 flex flex-col h-[100dvh]">
          <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-4 text-lg font-medium border-b border-border/50 transition-colors hover:text-primary ${
                    isActive ? "text-primary border-primary/50" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Lang Selector Mobile */}
            <div className="mt-6">
              <p className="text-sm text-muted-foreground font-medium mb-3 px-4">
                Language / اللغة
              </p>
              <div className="grid grid-cols-3 gap-2 px-2">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code as any);
                      setIsOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                      lang === l.code
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card text-foreground"
                    }`}
                  >
                    <span className="text-xl">{l.flag}</span>
                    <span className="text-sm font-medium">{l.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

