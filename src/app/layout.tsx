import type { Metadata } from "next";
import { Providers } from "./Providers";
import { getLang } from "@/lib/lang";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CompareFloatingBar } from "@/components/compare/CompareFloatingBar";
import { fetchApi } from "@/lib/api";
import { ApiStoreSettings } from "@/types/api";
import { SITE_URL, CACHE_TTL, COMPANY_DETAILS } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();

  const companyNames: Record<string, string> = {
    en: "Bahr Alalwan for General Trading",
    ar: "شركة بحر الألوان للتجارة العامة",
    ku: "کۆمپانیای بەحری ئەلوان بۆ بازرگانی گشتی",
  };

  const defaultTitles: Record<string, string> = {
    en: "Bahr Alalwan | Premium Home Appliances",
    ar: "بحر الألوان | الأجهزة المنزلية والمطبخية",
    ku: "بەحری ئەلوان | ئامێرەکانی ناوماڵ",
  };

  const description: Record<string, string> = {
    en: "Premium home appliances and kitchenware. Explore our collection of high-quality products from Bahr Alalwan.",
    ar: "أفضل الأجهزة المنزلية والمطبخية من شركة بحر الألوان. اكتشف مجموعة منتجاتنا عالية الجودة لتجهيز منزلك.",
    ku: "باشترین ئامێرەکانی ناوماڵ و چێشتخانە لە کۆمپانیای بەحری ئەلوان. کۆمەڵەی بەرهەمە کوالێتی بەرزەکانمان بدۆزەرەوە.",
  };

  const keywords: Record<string, string> = {
    en: "Bahr Alalwan, home appliances, kitchenware, premium appliances",
    ar: "بحر الألوان, اجهزة منزلية, ادوات مطبخ, اجهزة كهربائية",
    ku: "بەحری ئەلوان, ئامێرەکانی ناوماڵ, پێداویستی چێشتخانە",
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s | ${companyNames[lang]}`,
      default: defaultTitles[lang] ?? defaultTitles.en,
    },
    description: description[lang] ?? description.en,
    keywords: keywords[lang] ?? keywords.en,
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/?lang=en",
        "ar-IQ": "/?lang=ar",
        "ku-IQ": "/?lang=ku",
      },
    },
    openGraph: {
      title: defaultTitles[lang] ?? defaultTitles.en,
      description: description[lang] ?? description.en,
      url: SITE_URL,
      siteName: "Bahr Alalwan",
      locale: lang === "ar" ? "ar_IQ" : lang === "ku" ? "ku_IQ" : "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/bhr.jpeg`,
          width: 800,
          height: 800,
          alt: companyNames[lang] ?? companyNames.en,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: defaultTitles[lang] ?? defaultTitles.en,
      description: description[lang] ?? description.en,
      images: [`${SITE_URL}/bhr.jpeg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await getLang();
  const dir = lang === "ar" || lang === "ku" ? "rtl" : "ltr";

  // Fetch store settings — failures are non-fatal (graceful degradation).
  let storeSettings: ApiStoreSettings | null = null;
  try {
    const res = await fetchApi<{ settings: ApiStoreSettings }>("/api/site/store-settings", {
      next: { revalidate: CACHE_TTL.storeSettings, tags: ["store-settings"] },
    });
    storeSettings = res?.settings ?? null;
  } catch (error) {
    // Log but don't crash — layout still renders without settings.
    console.error("[RootLayout] Failed to fetch store settings:", error);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_DETAILS.name,
    alternateName: [
      "شركة بحر الألوان",
      "بحر الألوان",
      "Bahr Alalwan",
      "Bahr Alalwan Company",
      "بەحری ئەلوان",
    ],
    url: SITE_URL,
    logo: `${SITE_URL}${COMPANY_DETAILS.logo}`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: storeSettings?.phone ?? "+9647504454864",
      contactType: "customer service",
      areaServed: "IQ",
      availableLanguage: ["Arabic", "Kurdish", "English"],
    },
    sameAs: [COMPANY_DETAILS.facebook, COMPANY_DETAILS.instagram],
  };

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <Providers locale={lang}>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1" id="main-content">
              {children}
            </main>
            <Footer settings={storeSettings} />
            <CompareFloatingBar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
