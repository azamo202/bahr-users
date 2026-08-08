"use client";
import { motion } from 'motion/react';
import { Target, Eye, ShieldCheck, Handshake, TrendingUp, Flag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AboutClient({ initialStats }: { initialStats?: any[] }) {
  const { t } = useApp();

  const goals = [
    {
      icon: TrendingUp,
      titleAr: 'حضور قوي في السوق',
      titleEn: 'Market Presence',
      titleKu: 'ئامادەیی بەهێز لە بازاڕدا',
      descAr: 'تقديم منتجاتنا وعلاماتنا التجارية عالية الجودة بنجاح للعائلات في الموصل، والتوسع بثقة لتغطية جميع أنحاء العراق.',
      descEn: 'Successfully introduce our high-quality brands to families in Mosul and actively expand our reach to cover all of Iraq.',
      descKu: 'پێشکەشکردنی بەرهەم و براندە کوالێتی بەرزەکانمان بە سەرکەوتوویی بە خێزانەکانی مووسڵ، و فراوانکردنی کارەکانمان بە متمانەوە بۆ داپۆشینی تەواوی ناوچەکانی عێراق.',
      color: '#1B4F9B',
    },
    {
      icon: ShieldCheck,
      titleAr: 'القيمة الحقيقية',
      titleEn: 'Real Value',
      titleKu: 'بەهای ڕاستەقینە',
      descAr: 'الارتقاء بمستوى المنافسة في السوق عبر تقديم أجهزة ممتازة بضمانات طويلة الأمد وأسعار ملائمة تخدم العائلة العراقية وتلبي تطلعاتها.',
      descEn: 'Raise the bar in the market by offering premium appliances with long-term warranties at prices that Iraqi families can easily afford.',
      descKu: 'بەرزکردنەوەی ئاستی کێبڕکێ لە بازاڕدا لە ڕێگەی پێشکەشکردنی ئامێری نایاب بە گەرەنتی درێژخایەن و نرخی گونجاو کە خزمەت بە خێزانی عێراقی بکات.',
      color: '#29ABE2',
    },
    {
      icon: Handshake,
      titleAr: 'شراكات راسخة',
      titleEn: 'Strong Partnerships',
      titleKu: 'هاوبەشی پتەو',
      descAr: 'بناء جسور الثقة وعلاقات عمل متينة وطويلة الأمد مع محلات البيع بالتجزئة، من خلال التوريد المستمر والدعم المتميز، لضمان توفير منتجاتنا في كافة المدن العراقية.',
      descEn: 'Build long-term trust and strong relationships with local retail shops through continuous product supply and excellent support, ensuring our products are available everywhere in Iraq.',
      descKu: 'دروستکردنی پردی متمانە و پەیوەندی کاری بەهێز و درێژخایەن لەگەڵ فرۆشگاکانی فرۆشتنی تاکەکەسی، لە ڕێگەی دابینکردنی بەردەوام و پاڵپشتی ناوازە، بۆ دەستەبەرکردنی بوونی بەرهەمەکانمان لە سەرجەم شارەکانی عێراقدا.',
      color: '#F7941D',
    },
  ];

  const highlights = [
    { value: '2025', ar: 'سنة التأسيس', en: 'Founded', ku: 'ساڵی دامەزراندن', color: '#1B4F9B' },
    { value: '5', ar: 'سنوات ضمان', en: 'Yrs Warranty', ku: 'ساڵ گەرەنتی', color: '#29ABE2' },
    { value: 'iLK', ar: 'علامة تجارية مسجلة', en: 'Registered Brand', ku: 'براندی تۆمارکراو', color: '#F7941D' },
    { value: 'iNOX', ar: 'علامة تجارية مسجلة', en: 'Registered Brand', ku: 'براندی تۆمارکراو', color: '#1B4F9B' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#060D1A]">

      {/* ── Hero ── */}
      <div className="relative bg-gradient-to-br from-[#0d3272] via-[#1B4F9B] to-[#29ABE2] pt-32 pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -end-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 start-0 w-72 h-72 rounded-full bg-[#F7941D]/20 blur-3xl" />
          <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
          <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/8" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-800 mb-4 leading-tight">
              {t('من نحن', 'About Us', 'دەربارەی ئێمە')}
            </h1>
            <p className="text-white/90 text-base sm:text-xl md:text-2xl font-700 leading-snug text-balance max-w-3xl mx-auto">
              {t(
                'بحر الالوان للتجارة العامة والاستيراد والتصدير محدودة المسؤولية',
                'Bahr Alalwan for General Trading Imp. & Exp. LTD.',
                'بەحر ئەلئەلوان بۆ بازرگانی گشتی و هاوردەکردن و هەناردەکردن — سنووردار'
              )}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Highlight cards ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-10 mb-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              className="bg-white dark:bg-[#0E1A33] rounded-2xl p-5 text-center shadow-xl shadow-[#1B4F9B]/10 border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/12"
            >
              <div className="text-3xl font-800 mb-1" style={{ color: h.color }}>{h.value}</div>
              <div className="text-xs text-[#5A6A85] dark:text-[#7A9BC0] leading-tight">{t(h.ar, h.en, h.ku)}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24 space-y-24">

        {/* ── Company Story ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white dark:bg-[#0E1A33] rounded-3xl p-8 md:p-12 border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/12 shadow-sm"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-0.5 bg-[#F7941D] rounded" />
            <span className="text-[#F7941D] text-xs font-600 uppercase tracking-widest ltr:tracking-widest rtl:tracking-normal">
              {t('قصتنا', 'Our Story', 'چیرۆکی ئێمە')}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-800 text-[#0A1628] dark:text-[#E8F0FF] mb-6">
            {t(
              'بحر الالوان للتجارة العامة والاستيراد والتصدير محدودة المسؤولية',
              'Bahr Alalwan for General Trading Imp. & Exp. LTD.',
              'کۆمپانیای بەحر ئەلئەلوان بۆ بازرگانی گشتی و هاوردەکردن و هەناردەکردنی سنووردار'
            )}
          </h2>
          <div className="space-y-5 text-[#5A6A85] dark:text-[#7A9BC0] leading-relaxed text-sm md:text-[15px]">
            <p>
              {t(
                'تأسست بحر الالوان للتجارة العامة والاستيراد والتصدير محدودة المسؤولية في عام 2025 في مدينة الموصل، لتكون انطلاقة جديدة وحيوية في سوق الأجهزة المنزلية في العراق.',
                'Established in 2025 in Mosul, Bahr Alalwan for General Trading Imp. & Exp. LTD. is a fresh and dynamic force in the Iraqi home appliances market.',
                'کۆمپانیای بەحر ئەلئەلوان بۆ بازرگانی گشتی و هاوردەکردن و هەناردەکردنی سنووردار لە ساڵی 2025 لە شاری مووسڵ دامەزراوە، بۆ ئەوەی ببێتە دەستپێشخەرییەکی نوێ و پڕ وزە لە بازاڕی ئامێرەکانی ناوماڵ لە عێراقدا.'
              )}
            </p>
            <p>
              {t(
                'على الرغم من حداثة عهد شركتنا، إلا أننا نقف على أرضية صلبة من الخبرة العميقة؛ إذ يمتلك مؤسسنا ومديرنا التنفيذي، السيد نوژدار عبد الله، إلى جانب فريق عملنا، خبرة طويلة لسنوات عديدة في هذا القطاع. هذه المعرفة العميقة تمكننا من تبني استراتيجيات عصرية وذكية تضمن تقديم أفضل الخدمات لعملائنا وتلبية احتياجات السوق العراقي بكفاءة عالية.',
                'Although we are a new company, we stand on a solid foundation of deep industry expertise. Our founder and CEO, Mr. Nozhdar Abdullah, along with our team, brings many years of rich experience in this sector. This strong background allows us to introduce smart, modern strategies to serve our customers and the Iraqi market with high efficiency.',
                'هەرچەندە ئێمە کۆمپانیایەکی نوێین، بەڵام لەسەر بنەمایەکی بەهێز لە ئەزموونی قووڵ وەستاوین؛ بەڕێز دامەزرێنەر و بەڕێوەبەری جێبەجێکارمان، بەرێز نۆژدار عەبدوڵڵا، لەگەڵ تیمی کاریمان، خاوەنی چەندین ساڵ ئەزموونی دەوڵەمەند و درێژخایەنن لەم کەرتەدا. ئەم زانیارییە قووڵە توانامان پێدەبەخشێت کە ستراتیژی مۆدێرن و زیرەک پەیڕەو بکەین بۆ دابینکردنی باشترین خزمەتگوزاری بە کڕیارانمان و دابینکردنی پێداویستییەکانی بازاڕی عێراق بە کارامەییەکی بەرز.'
              )}
            </p>
            <p>
              {t(
                'نحن نمتلك الحقوق الرسمية لاستيراد أجهزة منزلية عالية الجودة تحت علامتي iLK و iNOX المسجلتين في العراق، مع وجود خطط مستقبلية مدروسة لإضافة علامات تجارية ووكالات جديدة تثري عائلة منتجاتنا المتميزة. ومن خلال دمج خبراتنا الطويلة مع رؤيتنا الشابة، نقدم منتجات موثوقة للغاية، بأسعار تنافسية، ومع ضمان حقيقي يصل إلى 5 سنوات لراحة بالكم الكاملة.',
                'We hold official rights to import top-quality home appliances under the registered Iraqi brands iLK and iNOX, with active plans to introduce new quality brands and international agencies to our product family in the near future. By combining our team\'s deep experience with a modern business approach, we provide highly reliable products at competitive prices, backed by a strong warranty of up to 5 years for your total peace of mind.',
                'ئێمە خاوەنی مافی فەرمین بۆ هاوردەکردنی ئامێرەکانی ناوماڵ بە کوالێتی بەرز لەژێر دوو براندی تۆمارکراو لە عێراقدا کە ئەوانیش iLK و iNOX ن، لەگەڵ بوونی پلانی داهاتووی لێکۆڵراوە بۆ زیادکردنی براند و بریکارنامەی نوێ کە خێزانی بەرهەمە ناوازەکانمان دەوڵەمەندتر بکەن. لە ڕێگەی تێکەڵکردنی ئەزموونی درێژخایەنمان لەگەڵ دیدگای گەنجانەماندا، بەرهەمی زۆر باوەڕپێکراو، بە نرخێکی گونجاو، و بە گەرەنتییەکی ڕاستەقینە کە دەگاتە 5 ساڵ پێشکەش دەکەین بۆ دەستەبەرکردنی ئارامی تەواوی دڵتان.'
              )}
            </p>
          </div>
          {/* Brand badges */}
          <div className="mt-8 flex flex-wrap gap-3">
            {['iLK', 'iNOX'].map((brand) => (
              <div
                key={brand}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5F8FF] dark:bg-[#122040] border border-[#1B4F9B]/15 dark:border-[#4B8FE2]/20"
              >
                <span className="w-2 h-2 rounded-full bg-[#F7941D]" />
                <span className="font-800 text-[#1B4F9B] dark:text-[#4B8FE2] text-sm tracking-wide">{brand}</span>
                <span className="text-xs text-[#5A6A85] dark:text-[#7A9BC0]">
                  {t('علامة مسجلة', 'Registered Brand', 'براندی تۆمارکراو')}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Mission & Vision ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: Target,
              color: '#1B4F9B',
              labelAr: 'رسالتنا',
              labelEn: 'Our Mission',
              labelKu: 'پەیاممان',
              textAr: 'تزويد العائلات بأجهزة منزلية حديثة وعالية الجودة تجمع بين التصميم الذكي والأسعار المناسبة. ونحن نسخر خبرة فريقنا الطويلة لنجعل الحياة العصرية والمريحة سهلة وفي متناول يد كل عائلة عراقية.',
              textEn: 'To provide Iraqi families with high-quality, modern home appliances that combine smart design with fair prices. We use our team\'s deep experience to make comfortable, modern living easy and affordable for every home.',
              textKu: 'دابینکردنی ئامێری ناوماڵی مۆدێرن و کوالێتی بەرز بۆ خێزانەکان، کە لە نێوان دیزاینی زیرەک و نرخی گونجاودا کۆدەبێتەوە. ئێمە ئەزموونی قووڵی تیمەکەمان بەکاردەهێنین بۆ ئەوەی ژیانێکی مۆدێرن و ئاسوودە بە ئاسانی و بە نرخێکی گونجاو بۆ هەموو خێزانێکی عێراقی دابین بکەین.',
            },
            {
              icon: Eye,
              color: '#29ABE2',
              labelAr: 'رؤيتنا',
              labelEn: 'Our Vision',
              labelKu: 'دیدگامان',
              textAr: 'أن نصبح الشركة الأكثر موثوقية في مجال الأجهزة المنزلية في العراق، وأن نتميز باستراتيجياتنا المبتكرة، جودة منتجاتنا، ومستويات خدمة العملاء الاستثنائية التي نقدمها.',
              textEn: 'To become the most trusted home appliance supplier in Iraq, recognized for our modern strategies, excellent products, and outstanding customer service.',
              textKu: 'ببینە جێی متمانەترین کۆمپانیا لە بواری ئامێرەکانی ناوماڵ لە عێراقدا، و جیاواز بین بە ستراتیژە داهێنەرەکانمان، کوالێتی بەرهەمەکانمان، و ئاستی خزمەتگوزاری ناوازەی کڕیارانمان.',
            },
          ].map(({ icon: Icon, color, labelAr, labelEn, labelKu, textAr, textEn, textKu }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-white dark:bg-[#0E1A33] rounded-3xl p-8 border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/12 hover:shadow-xl hover:shadow-[#1B4F9B]/8 transition-all group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${color}15` }}
              >
                <Icon size={26} style={{ color }} />
              </div>
              <h3 className="text-xl font-800 text-[#0A1628] dark:text-[#E8F0FF] mb-4">
                {t(labelAr, labelEn, labelKu)}
              </h3>
              <p className="text-[#5A6A85] dark:text-[#7A9BC0] leading-relaxed text-sm md:text-[15px]">
                {t(textAr, textEn, textKu)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Goals ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-[#F7941D] rounded" />
              <span className="text-[#F7941D] text-xs font-600 uppercase tracking-widest ltr:tracking-widest rtl:tracking-normal">
                {t('أهدافنا', 'Our Goals', 'ئامانجەکانمان')}
              </span>
              <span className="w-8 h-0.5 bg-[#F7941D] rounded" />
            </div>
            <h2 className="text-2xl md:text-3xl font-800 text-[#0A1628] dark:text-[#E8F0FF]">
              {t('ما نسعى إليه', 'What We Strive For', 'ئەوەی هەوڵی دەدەین')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {goals.map(({ icon: Icon, color, titleAr, titleEn, titleKu, descAr, descEn, descKu }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="relative bg-white dark:bg-[#0E1A33] rounded-3xl p-7 border border-[#1B4F9B]/8 dark:border-[#4B8FE2]/12 hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden group"
              >
                <div
                  className="absolute top-0 start-0 end-0 h-1 rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <h4 className="text-base font-800 text-[#0A1628] dark:text-[#E8F0FF] mb-3">
                  {t(titleAr, titleEn, titleKu)}
                </h4>
                <p className="text-xs md:text-sm text-[#5A6A85] dark:text-[#7A9BC0] leading-relaxed">
                  {t(descAr, descEn, descKu)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Founder callout ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-to-br from-[#1B4F9B] via-[#1a5fc7] to-[#29ABE2] rounded-3xl p-8 md:p-12 overflow-hidden text-white text-center"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-16 -end-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 -start-16 w-64 h-64 rounded-full bg-[#F7941D]/20 blur-2xl" />
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center mx-auto mb-5">
              <Flag size={28} className="text-white" />
            </div>
            <div className="text-white/70 text-xs font-600 uppercase tracking-widest ltr:tracking-widest rtl:tracking-normal mb-2">
              {t('مؤسسنا ومديرنا التنفيذي', 'Founder & CEO', 'دامەزرێنەر و بەڕێوەبەری جێبەجێکار')}
            </div>
            <h3 className="text-2xl md:text-3xl font-800 mb-4" style={{ fontFamily: 'var(--font-kurdish)' }}>
              {t('السيد نوژدار عبد الله', 'Mr. Nozhdar Abdullah', 'بەرێز نۆژدار عەبدوڵڵا')}
            </h3>
            <p className="text-white/80 leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
              {t(
                'يقود بحر الالوان للتجارة العامة والاستيراد والتصدير محدودة المسؤولية بخبرة طويلة وعميقة في قطاع الأجهزة المنزلية، ورؤية شابة تجمع بين الاستراتيجيات العصرية والالتزام برضا العميل.',
                'Leading Bahr Alalwan with many years of deep expertise in the home appliances sector, and a modern vision that blends innovative strategies with a commitment to customer satisfaction.',
                'کۆمپانیای بەحر ئەلئەلوان بە چەندین ساڵ ئەزموونی قووڵ لە کەرتی ئامێرەکانی ناوماڵ رێبەرایەتی دەکات، و دیدگایەکی مۆدێرن کە نێوان ستراتیژی داهێنەرانە و پابەندبوون بە ڕەزامەندی کڕیار تێکەڵ دەکات.'
              )}
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
