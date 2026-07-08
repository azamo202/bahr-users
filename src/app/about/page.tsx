"use client";
import { motion } from 'motion/react';
import { Award, Target, Eye, Heart, Users, Package, Globe, Star, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AboutPage() {
  const { t } = useApp();

  const values = [
    { icon: CheckCircle, ar: 'الجودة', en: 'Quality', ku: 'کوالێتی', descAr: 'نلتزم بتقديم أعلى معايير الجودة في كل منتج وخدمة', descEn: 'We are committed to delivering the highest quality standards in every product and service', descKu: 'پابەندین بە پێشکەشکردنی بەرزترین پێوەرەکانی کوالێتی لە هەموو بەرهەم و خزمەتگوزارییەکدا', color: '#1B4F9B' },
    { icon: Heart, ar: 'الأمانة', en: 'Integrity', ku: 'دەستپاکی', descAr: 'نبني علاقات قائمة على الصدق والشفافية مع عملائنا', descEn: 'We build relationships based on honesty and transparency with our clients', descKu: 'پەیوەندی لەسەر بنەمای ڕاستگۆیی و شەفافیەت لەگەڵ کڕیارەکانمان دروست دەکەین', color: '#29ABE2' },
    { icon: Star, ar: 'التميز', en: 'Excellence', ku: 'نایابی', descAr: 'نسعى دائماً للتميز والتجاوز في تقديم أفضل تجربة', descEn: 'We always strive for excellence and surpassing in delivering the best experience', descKu: 'هەمیشە هەوڵدەدەین بۆ نایابی و تێپەڕاندن لە پێشکەشکردنی باشترین ئەزمووندا', color: '#F7941D' },
    { icon: Users, ar: 'العملاء أولاً', en: 'Customer First', ku: 'کڕیار لە پێشینە', descAr: 'احتياجات العميل هي المحور الأساسي لكل قرار نتخذه', descEn: 'Customer needs are the core focus of every decision we make', descKu: 'پێداویستییەکانی کڕیار تەوەری سەرەکییە بۆ هەر بڕیارێک کە دەیدەین', color: '#1B4F9B' },
  ];

  const timeline = [
    { year: '2009', ar: 'التأسيس', en: 'Founded', ku: 'دامەزراندن', descAr: 'تأسيس شركة بحر الألوان للتجارة العامة في المملكة العربية السعودية', descEn: 'Bahr Alalwan General Trading was founded in Saudi Arabia', descKu: 'دامەزراندنی کۆمپانیای بەحری ئەلوان بۆ بازرگانی گشتی لە شانشینی عەرەبستانی سعودی' },
    { year: '2012', ar: 'التوسع', en: 'Expansion', ku: 'فراوانبوون', descAr: 'توسيع الشراكات مع كبرى العلامات التجارية العالمية', descEn: 'Expanded partnerships with major global brands', descKu: 'فراوانکردنی هاوبەشییەکان لەگەڵ گەورەترین براندە جیهانییەکان' },
    { year: '2016', ar: 'الريادة', en: 'Leadership', ku: 'پێشەنگی', descAr: 'أصبحنا من أبرز موردي الأجهزة المنزلية في المنطقة', descEn: 'Became one of the leading home appliance suppliers in the region', descKu: 'بووین بە یەکێک لە دیارترین دابینکەرانی ئامێری ناوماڵ لە ناوچەکەدا' },
    { year: '2020', ar: 'الرقمنة', en: 'Digitization', ku: 'بەدیجیتاڵکردن', descAr: 'إطلاق منصتنا الرقمية لخدمة عملائنا بشكل أفضل', descEn: 'Launched our digital platform to serve our clients better', descKu: 'پلاتفۆرمی دیجیتاڵیمان خستەکار بۆ ئەوەی باشتر خزمەتی کڕیارەکانمان بکەین' },
    { year: '2025', ar: 'الحاضر', en: 'Present', ku: 'ئێستا', descAr: 'أكثر من 10,000 عميل راضٍ وأكثر من 500 منتج متاح', descEn: 'Over 10,000 satisfied customers and over 500 products available', descKu: 'زیاتر لە ١٠,٠٠٠ کڕیاری ڕازی و زیاتر لە ٥٠٠ بەرهەمی بەردەست' },
  ];

  const stats = [
    { icon: Package, value: '+500', ar: 'منتج', en: 'Products', ku: 'بەرهەم', color: '#1B4F9B' },
    { icon: Globe, value: '+50', ar: 'علامة تجارية', en: 'Brands', ku: 'براند', color: '#29ABE2' },
    { icon: Users, value: '+10,000', ar: 'عميل', en: 'Customers', ku: 'کڕیار', color: '#F7941D' },
    { icon: Award, value: '+15', ar: 'سنة خبرة', en: 'Years Experience', ku: 'ساڵ ئەزموون', color: '#1B4F9B' },
  ];

  const team = [
    { nameAr: 'فهد العمري', nameEn: 'Fahad Al-Omari', nameKu: 'فەهەد ئەلعومەری', roleAr: 'المدير التنفيذي', roleEn: 'CEO', roleKu: 'بەڕێوەبەری جێبەجێکار', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop' },
    { nameAr: 'خالد الشمري', nameEn: 'Khaled Al-Shammari', nameKu: 'خالید ئەلشەممەری', roleAr: 'مدير المبيعات', roleEn: 'Sales Director', roleKu: 'بەڕێوەبەری فرۆشتن', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop' },
    { nameAr: 'بندر الزهراني', nameEn: 'Bandar Al-Zahrani', nameKu: 'بەندەر ئەلزەهرانی', roleAr: 'مدير التسويق', roleEn: 'Marketing Manager', roleKu: 'بەڕێوەبەری بەبازاڕکردن', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop' },
    { nameAr: 'ماجد الحربي', nameEn: 'Majed Al-Harbi', nameKu: 'ماجید ئەلحەربی', roleAr: 'مدير التقنية', roleEn: 'Technical Manager', roleKu: 'بەڕێوەبەری تەکنیکی', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#060D1A]">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#1B4F9B] via-[#1a5fc7] to-[#29ABE2] pt-28 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 end-0 w-96 h-96 rounded-full bg-white blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-900 mb-5">{t('من نحن', 'About Us', 'دەربارەی ئێمە')}</h1>
            <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              {t('شركة بحر الألوان للتجارة العامة — شريكك الموثوق في عالم الأجهزة المنزلية. نفخر بتقديم أفضل المنتجات من العلامات التجارية العالمية بأعلى معايير الجودة.', 'Bahr Alalwan General Trading — your trusted partner in the world of home appliances. We pride ourselves on providing the best products from global brands with the highest quality standards.', 'کۆمپانیای بەحری ئەلوان بۆ بازرگانی گشتی — هاوبەشی متمانەپێکراوی تۆ لە جیهانی ئامێرەکانی ناوماڵ. شانازی دەکەین بە پێشکەشکردنی باشترین بەرهەمەکان لە براندە جیهانییەکان.')}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-[#0E1A33] rounded-2xl p-6 text-center border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${stat.color}15` }}>
                  <Icon size={22} style={{ color: stat.color }} />
                </div>
                <div className="text-3xl font-900 text-[#0A1628] dark:text-[#E8F0FF] mb-1">{stat.value}</div>
                <div className="text-sm text-[#5A6A85] dark:text-[#7A9BC0]">{t(stat.ar, stat.en, stat.ku)}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-[#F7941D] rounded" />
              <span className="text-[#F7941D] text-xs font-600 uppercase tracking-widest">{t('قصتنا', 'Our Story', 'چیرۆکی ئێمە')}</span>
            </div>
            <h2 className="text-3xl font-900 text-[#0A1628] dark:text-[#E8F0FF] mb-5">
              {t('رحلة النجاح منذ 2009', 'A Journey of Success Since 2009', 'گەشتی سەرکەوتن لە ساڵی ٢٠٠٩ەوە')}
            </h2>
            <p className="text-[#5A6A85] dark:text-[#7A9BC0] leading-relaxed mb-4 text-sm">
              {t('انطلقت رحلة بحر الألوان عام 2009 بحلم بسيط: تقديم أفضل الأجهزة المنزلية للمستهلك السعودي بجودة لا تُضاهى وبأسعار تنافسية.', 'Bahr Alalwan\'s journey began in 2009 with a simple dream: to provide the best home appliances to Saudi consumers with unmatched quality and competitive prices.', 'انطلقت رحلة بحر الألوان عام 2009 بحلم بسيط: تقديم أفضل الأجهزة المنزلية للمستهلك السعودي بجودة لا تُضاهى وبأسعار تنافسية.')}
            </p>
            <p className="text-[#5A6A85] dark:text-[#7A9BC0] leading-relaxed mb-4 text-sm">
              {t('اليوم، بعد أكثر من 15 عاماً، نفخر بثقة أكثر من 10,000 عميل راضٍ وشراكات مع أكثر من 50 علامة تجارية عالمية رائدة.', 'Today, after more than 15 years, we are proud of the trust of over 10,000 satisfied customers and partnerships with more than 50 leading global brands.', 'ئەمڕۆ، دوای زیاتر لە ١٥ ساڵ، شانازی بە متمانەی زیاتر لە ١٠,٠٠٠ کڕیار و هاوبەشی لەگەڵ زیاتر لە ٥٠ براندی جیهانی دەکەین.')}
            </p>
            <p className="text-[#5A6A85] dark:text-[#7A9BC0] leading-relaxed text-sm">
              {t('نؤمن بأن كل بيت يستحق أفضل الأجهزة، ولذلك نعمل بلا كلل لنكون الخيار الأول لكل عائلة سعودية.', 'We believe every home deserves the best appliances, which is why we work tirelessly to be the first choice for every Saudi family.', 'بڕوامان وایە هەموو ماڵێک شایەنی باشترین ئامێرە، بۆیە بێ وەستان کار دەکەین بۆ ئەوەی ببینە هەڵبژاردەی یەکەم بۆ هەر خێزانێک.')}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="relative rounded-3xl overflow-hidden h-80">
              <img
                src="https://images.unsplash.com/photo-1778731525496-3e7bd4807e55?w=800&h=600&fit=crop&auto=format"
                alt="Modern kitchen"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B4F9B]/40 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {[
            {
              icon: Target,
              titleAr: 'مهمتنا',
              titleEn: 'Our Mission',
              titleKu: 'ئەرکمان',
              textAr: 'تزويد عملائنا بأفضل الأجهزة المنزلية الأصلية من العلامات التجارية العالمية الكبرى، مع تقديم خدمة عملاء استثنائية وحلول متكاملة بأسعار تنافسية.',
              textEn: 'To supply our customers with the best genuine home appliances from major global brands, while providing exceptional customer service and comprehensive solutions at competitive prices.',
              textKu: 'دابینکردنی کڕیارەکانمان بە باشترین ئامێری ناوماڵی ڕەسەن لە گەورەترین براندە جیهانییەکان، لەگەڵ پێشکەشکردنی خزمەتگوزاری کڕیاری نایاب و چارەسەری گشتگیر بە نرخی کێبڕکێکار.',
              color: '#1B4F9B',
            },
            {
              icon: Eye,
              titleAr: 'رؤيتنا',
              titleEn: 'Our Vision',
              titleKu: 'دیدگامان',
              textAr: 'أن نكون الشريك الأول والأكثر موثوقية في عالم الأجهزة المنزلية في المملكة العربية السعودية والمنطقة العربية، ونموذجاً يُحتذى به في الجودة والخدمة.',
              textEn: 'To be the leading and most trusted partner in the home appliance world in Saudi Arabia and the Arab region, setting a benchmark in quality and service.',
              textKu: 'ببینە یەکەمین و باوەڕپێکراوترین هاوبەش لە جیهانی ئامێری ناوماڵ لە شانشینی عەرەبستانی سعودی و ناوچەی عەرەبی، و ببینە نموونەیەک بۆ کوالێتی و خزمەتگوزاری.',
              color: '#29ABE2',
            },
          ].map(({ icon: Icon, titleAr, titleEn, titleKu, textAr, textEn, textKu, color }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white dark:bg-[#0E1A33] rounded-2xl p-8 border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 hover:shadow-xl hover:shadow-[#1B4F9B]/8 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: `${color}15` }}>
                <Icon size={28} style={{ color }} />
              </div>
              <h3 className="text-xl font-800 text-[#0A1628] dark:text-[#E8F0FF] mb-3">{t(titleAr, titleEn, titleKu)}</h3>
              <p className="text-[#5A6A85] dark:text-[#7A9BC0] leading-relaxed text-sm">{t(textAr, textEn, textKu)}</p>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-900 text-[#0A1628] dark:text-[#E8F0FF]">{t('قيمنا الجوهرية', 'Our Core Values', 'بەها بنەڕەتییەکانمان')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-[#0E1A33] rounded-2xl p-6 border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${value.color}12` }}>
                    <Icon size={22} style={{ color: value.color }} />
                  </div>
                  <h4 className="text-base font-800 text-[#0A1628] dark:text-[#E8F0FF] mb-2">{t(value.ar, value.en, value.ku)}</h4>
                  <p className="text-xs text-[#5A6A85] dark:text-[#7A9BC0] leading-relaxed">{t(value.descAr, value.descEn, value.descKu)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-900 text-[#0A1628] dark:text-[#E8F0FF]">{t('مسيرتنا', 'Our Journey', 'ڕێڕەوی ئێمە')}</h2>
          </div>
          <div className="relative">
            <div className="absolute start-1/2 top-0 bottom-0 w-px bg-[#1B4F9B]/20 dark:bg-[#4B8FE2]/20" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`flex items-center gap-6 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="flex-1" />
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#1B4F9B] text-white flex items-center justify-center text-xs font-700 flex-shrink-0 shadow-lg shadow-[#1B4F9B]/30">
                    {item.year.slice(2)}
                  </div>
                  <div className="flex-1">
                    <div className="bg-white dark:bg-[#0E1A33] rounded-2xl p-5 border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 shadow-sm">
                      <div className="text-[#F7941D] font-800 text-sm mb-1">{item.year} · {t(item.ar, item.en, item.ku)}</div>
                      <p className="text-[#5A6A85] dark:text-[#7A9BC0] text-xs">{t(item.descAr, item.descEn, item.descKu)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-900 text-[#0A1628] dark:text-[#E8F0FF]">{t('فريقنا', 'Our Team', 'تیمەکەمان')}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group bg-white dark:bg-[#0E1A33] rounded-2xl overflow-hidden border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/10 hover:shadow-xl hover:-translate-y-1 transition-all text-center"
              >
                <div className="h-44 overflow-hidden bg-[#EBF0FA] dark:bg-[#122040]">
                  <img
                    src={member.img}
                    alt={t(member.nameAr, member.nameEn)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-700 text-sm text-[#0A1628] dark:text-[#E8F0FF]">{t(member.nameAr, member.nameEn, member.nameKu)}</h4>
                  <p className="text-xs text-[#29ABE2] font-600 mt-1">{t(member.roleAr, member.roleEn, member.roleKu)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
