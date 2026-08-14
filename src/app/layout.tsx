import type { Metadata } from 'next'
import { AppProvider } from './context/AppContext'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import { CompareProvider } from './context/CompareContext'
import { CompareFloatingBar } from './components/CompareFloatingBar'
import '../styles/index.css'

import logoImg from '../imports/WhatsApp_Image_2026-06-22_at_3.23.33_PM.jpeg'

export const metadata: Metadata = {
  title: 'بحر الالوان للتجارة العامة والاستيراد والتصدير محدودة المسؤولية | Bahr Alalwan for General Trading Import and Export LTD | کۆمپانیای بەحری ئەلوان بۆ بازرگانی گشتی و هاوردەکردن و هەناردەکردن سنووردار',
  description: 'أجهزة منزلية حديثة (أفران، مكيفات، غسالات، ثلاجات، شفاطات). Modern home appliances (ovens, ACs, washing machines, refrigerators, hoods). ئامێرە مۆدێرنەکانی ناوماڵ (فڕن، سپلیت، جلشۆر، سەلاجە، هەواکێش).',
  icons: {
    icon: logoImg.src,
    apple: logoImg.src,
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <CompareProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <WhatsAppFloat />
              <CompareFloatingBar />
            </div>
          </CompareProvider>
        </AppProvider>
      </body>
    </html>
  )
}
