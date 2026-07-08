"use client";
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fetchApi } from '@/lib/api';
import { ApiStoreSettings } from '@/types/api';

export default function ContactPage() {
  const { t, lang } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState<ApiStoreSettings | null>(null);

  useEffect(() => {
    fetchApi<any>("/api/site/store-settings")
      .then((res) => {
        if (res && res.settings) {
          setSettings(res.settings);
        } else {
          setSettings(res);
        }
      })
      .catch((err) => console.error("Failed to fetch settings", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetchApi("/api/site/contact", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error("Failed to send message", error);
      alert(t('حدث خطأ أثناء الإرسال', 'An error occurred while sending', 'هەڵەیەک ڕوویدا لە کاتی ناردندا'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      titleAr: 'الهاتف',
      titleEn: 'Phone',
      titleKu: 'تەلەفۆن',
      valueAr: settings?.phone ? (Array.isArray(settings.phone) ? settings.phone[0] : settings.phone) : '+966 50 000 0000',
      valueEn: settings?.phone ? (Array.isArray(settings.phone) ? settings.phone[0] : settings.phone) : '+966 50 000 0000',
      valueKu: settings?.phone ? (Array.isArray(settings.phone) ? settings.phone[0] : settings.phone) : '+966 50 000 0000',
      href: settings?.phone ? `tel:${Array.isArray(settings.phone) ? settings.phone[0] : settings.phone}` : 'tel:+966500000000',
      color: '#1B4F9B',
    },
    {
      icon: Mail,
      titleAr: 'البريد الإلكتروني',
      titleEn: 'Email',
      titleKu: 'ئیمەیڵ',
      valueAr: settings?.email || 'info@bahralalwan.com',
      valueEn: settings?.email || 'info@bahralalwan.com',
      valueKu: settings?.email || 'info@bahralalwan.com',
      href: `mailto:${settings?.email || 'info@bahralalwan.com'}`,
      color: '#29ABE2',
    },
    {
      icon: MapPin,
      titleAr: 'العنوان',
      titleEn: 'Address',
      titleKu: 'ناونیشان',
      valueAr: settings?.address?.ar || 'الرياض، المملكة العربية السعودية',
      valueEn: settings?.address?.en || 'Riyadh, Saudi Arabia',
      valueKu: (settings?.address as any)?.ku || settings?.address?.en || 'ڕیاز، شانشینی عەرەبستانی سعودی',
      href: 'https://maps.google.com',
      color: '#F7941D',
    },
    {
      icon: Clock,
      titleAr: 'ساعات العمل',
      titleEn: 'Working Hours',
      titleKu: 'کاتەکانی کارکردن',
      valueAr: 'الأحد – الخميس: 8ص – 8م',
      valueEn: 'Sun – Thu: 8AM – 8PM',
      valueKu: 'یەکشەممە – پێنجشەممە: ٨ بەیانی – ٨ ئێوارە',
      href: null,
      color: '#1B4F9B',
    },
  ];

  const whatsappNumber = settings?.whatsapp?.replace(/[^0-9]/g, "") || "966500000000";

  return (
    <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#060D1A]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B4F9B] to-[#29ABE2] pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-900 mb-3">{t('اتصل بنا', 'Contact Us', 'پەیوەندیمان پێوە بکە')}</h1>
          <p className="text-white/80 text-sm">{t('نحن هنا لخدمتك — تواصل معنا عبر أي وسيلة', 'We\'re here to serve you — contact us through any channel', 'نحن هنا لخدمتك — تواصل معنا عبر أي وسيلة')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* WhatsApp Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#25D366] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 mb-12 shadow-2xl shadow-[#25D366]/20"
        >
          <div className="flex items-center gap-5 text-white">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-800">{t('تواصل فوري عبر واتساب', 'Instant Contact via WhatsApp', 'پەیوەندی خێرا لە ڕێگەی واتسئەپ')}</h3>
              <p className="text-white/85 text-sm">{t('الطريقة الأسرع للرد — فريقنا جاهز', 'The fastest response method — our team is ready', 'خێراترین ڕێگا بۆ وەڵامدانەوە — تیمەکەمان ئامادەیە')}</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-8 py-3 bg-white text-[#25D366] rounded-2xl font-800 text-sm hover:bg-[#F5F8FF] transition-all hover:scale-105 shadow-lg"
          >
            {t('ابدأ المحادثة', 'Start Chat', 'دەست بکە بە گفتوگۆ')}
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactInfo.map(({ icon: Icon, titleAr, titleEn, titleKu, valueAr, valueEn, valueKu, href, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-[#0E1A33] rounded-2xl p-5 border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 flex items-start gap-4 hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}12` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <div className="text-xs text-[#5A6A85] dark:text-[#7A9BC0] mb-1">{t(titleAr, titleEn, titleKu)}</div>
                  {href ? (
                    <a href={href} className="text-sm font-700 text-[#0A1628] dark:text-[#E8F0FF] hover:text-[#1B4F9B] dark:hover:text-[#4B8FE2] transition-colors">
                      {t(valueAr, valueEn, valueKu)}
                    </a>
                  ) : (
                    <span className="text-sm font-700 text-[#0A1628] dark:text-[#E8F0FF]">{t(valueAr, valueEn, valueKu)}</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social */}
            <div className="bg-white dark:bg-[#0E1A33] rounded-2xl p-5 border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10">
              <div className="text-xs text-[#5A6A85] dark:text-[#7A9BC0] mb-3">{t('تابعنا على', 'Follow Us On', 'فۆڵۆمان بکە لە')}</div>
              <div className="flex gap-3">
                {settings?.facebook && (
                  <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center text-xs font-600 bg-[#EBF0FA] dark:bg-[#122040] text-[#1B4F9B] dark:text-[#4B8FE2] rounded-xl hover:bg-[#1B4F9B] hover:text-white transition-all">FB</a>
                )}
                {settings?.instagram && (
                  <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center text-xs font-600 bg-[#EBF0FA] dark:bg-[#122040] text-[#1B4F9B] dark:text-[#4B8FE2] rounded-xl hover:bg-[#1B4F9B] hover:text-white transition-all">IG</a>
                )}
                {settings?.tiktok && (
                  <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center text-xs font-600 bg-[#EBF0FA] dark:bg-[#122040] text-[#1B4F9B] dark:text-[#4B8FE2] rounded-xl hover:bg-[#1B4F9B] hover:text-white transition-all">TK</a>
                )}
                {settings?.youtube && (
                  <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center text-xs font-600 bg-[#EBF0FA] dark:bg-[#122040] text-[#1B4F9B] dark:text-[#4B8FE2] rounded-xl hover:bg-[#1B4F9B] hover:text-white transition-all">YT</a>
                )}
                {!settings?.facebook && !settings?.instagram && !settings?.tiktok && !settings?.youtube && (
                  ['Facebook', 'Instagram', 'Twitter', 'YouTube'].map(platform => (
                    <a
                      key={platform}
                      href="#"
                      className="flex-1 py-2 text-center text-xs font-600 bg-[#EBF0FA] dark:bg-[#122040] text-[#1B4F9B] dark:text-[#4B8FE2] rounded-xl hover:bg-[#1B4F9B] hover:text-white transition-all"
                    >
                      {platform.slice(0, 2)}
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-[#0E1A33] rounded-2xl p-8 border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 shadow-sm">
              <h2 className="text-xl font-800 text-[#0A1628] dark:text-[#E8F0FF] mb-6">{t('أرسل لنا رسالة', 'Send Us a Message', 'نامەیەکمان بۆ بنێرە')}</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-[#25D366]" />
                  </div>
                  <h3 className="text-lg font-700 text-[#0A1628] dark:text-[#E8F0FF] mb-2">{t('تم الإرسال بنجاح!', 'Sent Successfully!', 'بە سەرکەوتوویی نێردرا!')}</h3>
                  <p className="text-[#5A6A85] dark:text-[#7A9BC0] text-sm">{t('سنتواصل معك قريباً', 'We\'ll get back to you soon', 'سنتواصل معك قريباً')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-600 text-[#5A6A85] dark:text-[#7A9BC0] mb-1.5">{t('الاسم الكامل', 'Full Name', 'ناوی تەواو')} *</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl bg-[#F5F8FF] dark:bg-[#060D1A] border border-[#1B4F9B]/12 dark:border-[#4B8FE2]/12 text-[#0A1628] dark:text-[#E8F0FF] placeholder-[#5A6A85] focus:outline-none focus:ring-2 focus:ring-[#1B4F9B]/30 transition-all"
                        placeholder={t('محمد عبدالله', 'Mohammed Abdullah', 'محەمەد عەبدوڵڵا')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-600 text-[#5A6A85] dark:text-[#7A9BC0] mb-1.5">{t('رقم الجوال', 'Phone Number', 'ژمارەی مۆبایل')}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl bg-[#F5F8FF] dark:bg-[#060D1A] border border-[#1B4F9B]/12 dark:border-[#4B8FE2]/12 text-[#0A1628] dark:text-[#E8F0FF] placeholder-[#5A6A85] focus:outline-none focus:ring-2 focus:ring-[#1B4F9B]/30 transition-all"
                        placeholder="+966 5x xxx xxxx"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-600 text-[#5A6A85] dark:text-[#7A9BC0] mb-1.5">{t('البريد الإلكتروني', 'Email Address', 'ئیمەیڵ')} *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-[#F5F8FF] dark:bg-[#060D1A] border border-[#1B4F9B]/12 dark:border-[#4B8FE2]/12 text-[#0A1628] dark:text-[#E8F0FF] placeholder-[#5A6A85] focus:outline-none focus:ring-2 focus:ring-[#1B4F9B]/30 transition-all"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-600 text-[#5A6A85] dark:text-[#7A9BC0] mb-1.5">{t('الموضوع', 'Subject', 'بابەت')} *</label>
                    <input
                      required
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-[#F5F8FF] dark:bg-[#060D1A] border border-[#1B4F9B]/12 dark:border-[#4B8FE2]/12 text-[#0A1628] dark:text-[#E8F0FF] placeholder-[#5A6A85] focus:outline-none focus:ring-2 focus:ring-[#1B4F9B]/30 transition-all"
                      placeholder={t('الاستفسار عن منتج', 'Inquiry about a product', 'پرسیارکردن دەربارەی بەرهەمێک')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-600 text-[#5A6A85] dark:text-[#7A9BC0] mb-1.5">{t('الرسالة', 'Message', 'نامە')} *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-[#F5F8FF] dark:bg-[#060D1A] border border-[#1B4F9B]/12 dark:border-[#4B8FE2]/12 text-[#0A1628] dark:text-[#E8F0FF] placeholder-[#5A6A85] focus:outline-none focus:ring-2 focus:ring-[#1B4F9B]/30 transition-all resize-none"
                      placeholder={t('اكتب رسالتك هنا...', 'Write your message here...', 'لێرە نامەکەت بنووسە...')}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-[#1B4F9B] hover:bg-[#163d7a] disabled:bg-[#1B4F9B]/70 disabled:cursor-not-allowed text-white rounded-2xl font-700 text-sm transition-all shadow-lg shadow-[#1B4F9B]/25 hover:shadow-[#1B4F9B]/40 hover:scale-[1.01]"
                  >
                    <Send size={18} className={isSubmitting ? 'animate-pulse' : ''} />
                    {isSubmitting ? t('جاري الإرسال...', 'Sending...', 'خەریکی ناردنە...') : t('إرسال الرسالة', 'Send Message', 'ناردنی نامە')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-10 rounded-3xl overflow-hidden border border-[#1B4F9B]/10 dark:border-[#4B8FE2]/10 h-64 bg-[#EBF0FA] dark:bg-[#122040] flex items-center justify-center">
          <iframe
            title="Bahr Alalwan location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.993692548742!2d43.00353909999999!3d36.8665698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40088db18ae1c0f1%3A0x900b9ea00b75579c!2sChrani%20Company!5e0!3m2!1sen!2s!4v1778252192920!5m2!1sen!2s"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
