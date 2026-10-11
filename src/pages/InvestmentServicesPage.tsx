import React, { useState } from 'react';
import {
  TrendingUp,
  Building2,
  Factory,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Search,
  ExternalLink,
  Briefcase,
  DollarSign,
  FileCheck,
  Send,
  HelpCircle,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface InvestmentOpportunity {
  id: string;
  title: string;
  zone: 'المنطقة الصناعية بقويسنا' | 'مدينة السادات الصناعية' | 'مجمع الورش الحرفية بشبين الكوم';
  sector: 'صناعات غذائية وزراعية' | 'صناعات هندسية وإلكترونية' | 'غزل ونسيج وملابس' | 'صناعات دوائية ومستلزمات';
  landArea: string;
  highlights: string;
  powerAvailability: string;
  status: 'طرح استثماري متاح' | 'دراسة جدوى استرشادية جاهزة' | 'توسعات جارية';
}

const SAMPLE_OPPORTUNITIES: InvestmentOpportunity[] = [
  {
    id: 'inv-1',
    title: 'مجمع الصناعات الغذائية وتجفيف الحاصلات الزراعية',
    zone: 'المنطقة الصناعية بقويسنا',
    sector: 'صناعات غذائية وزراعية',
    landArea: '1,500 إلى 5,000 م²',
    highlights: 'قرب الموقع من مزارع الدلتا وطريق القاهرة - الإسكندرية الزراعي، وتوفر شبكات الغاز والكهرباء.',
    powerAvailability: 'متوفرة بقدرات صناعية فائقة',
    status: 'طرح استثماري متاح'
  },
  {
    id: 'inv-2',
    title: 'مصنع مكونات إلكترونية ومحولات ذكية',
    zone: 'مدينة السادات الصناعية',
    sector: 'صناعات هندسية وإلكترونية',
    landArea: '2,500 إلى 10,000 م²',
    highlights: 'الاستفادة من الكوادر الفنية المؤهلة من كلية الهندسة الإلكترونية ومراكز التدريب المهني بالمنوفية.',
    powerAvailability: 'محطة محولات مخصصة',
    status: 'دراسة جدوى استرشادية جاهزة'
  },
  {
    id: 'inv-3',
    title: 'وحدات مجمع الصناعات الصغيرة للملابس الجاهزة',
    zone: 'المنطقة الصناعية بقويسنا',
    sector: 'غزل ونسيج وملابس',
    landArea: '500 إلى 1,200 م² (هناجر جاهزة)',
    highlights: 'جاهزية الوحدات بنظام الإيجار أو التمليك مع تيسيرات بنكية للمشروعات الصغيرة والمتوسطة.',
    powerAvailability: 'جاهزة للتشغيل الفوري',
    status: 'طرح استثماري متاح'
  },
  {
    id: 'inv-4',
    title: 'مجمع للصناعات الطبية والبيطرية والمطهرات',
    zone: 'مدينة السادات الصناعية',
    sector: 'صناعات دوائية ومستلزمات',
    landArea: '4,000 إلى 8,000 م²',
    highlights: 'موقع استراتيجي على طريق القاهرة - الإسكندرية الصحراوي، مع سهولة الشحن لموانئ الإسكندرية والدخيلة.',
    powerAvailability: 'متوفرة',
    status: 'توسعات جارية'
  }
];

export const InvestmentServicesPage: React.FC = () => {
  const { navigate, user, t, language } = useApp();

  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [inquiryName, setInquiryName] = useState(user?.name || '');
  const [inquiryPhone, setInquiryPhone] = useState(user?.phone || '');
  const [inquirySector, setInquirySector] = useState('صناعات هندسية وإلكترونية');
  const [inquiryDetails, setInquiryDetails] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const zones = ['all', 'المنطقة الصناعية بقويسنا', 'مدينة السادات الصناعية', 'مجمع الورش الحرفية بشبين الكوم'];
  const sectors = ['all', 'صناعات غذائية وزراعية', 'صناعات هندسية وإلكترونية', 'غزل ونسيج وملابس', 'صناعات دوائية ومستلزمات'];

  const filteredOpportunities = SAMPLE_OPPORTUNITIES.filter(item => {
    const matchZone = selectedZone === 'all' || item.zone === selectedZone;
    const matchSector = selectedSector === 'all' || item.sector === selectedSector;
    return matchZone && matchSector;
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryDetails('');
    }, 3500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => navigate('home')} className="hover:text-emerald-700 transition-colors">
            {t('navHome')}
          </button>
          <span>/</span>
          <button onClick={() => navigate('services')} className="hover:text-emerald-700 transition-colors">
            {t('navServices')}
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">{t('serviceInvestment')}</span>
        </div>

        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-lg transition-colors"
        >
          <ArrowRight className={`w-3.5 h-3.5 ${language === 'en' ? 'rotate-180' : ''}`} />
          <span>{t('backToHome')}</span>
        </button>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-l from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <TrendingUp className="w-4 h-4 text-amber-300" />
              <span>{t('serviceInvestment')} — التنمية الصناعية والاستثمار</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              الفرص الاستثمارية والمناطق الصناعية بمحافظة المنوفية
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              تتمتع محافظة المنوفية بموقع استراتيجي في قلب الدلتا مع قربها من موانئ الإسكندرية وسوق القاهرة الكبرى، وتضم اثنتين من كبرى قلاع الصناعة المصرية بقويسنا والسادات.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-xs space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>تنويه رسمي للمستثمرين</span>
            </div>
            <p className="text-slate-200 text-[11px] max-w-xs">
              البيانات هنا استرشادية، ويتم التخصيص وإصدار رخص التشغيل عبر منصة «مصر الرقمية للاستثمار» والهيئة العامة للتنمية الصناعية (IDA).
            </p>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1 text-center">
          <span className="text-[11px] font-bold text-slate-500">المنطقة الصناعية بقويسنا</span>
          <p className="text-xl font-extrabold text-emerald-800">4 مراحل صناعية</p>
          <span className="text-[10px] text-slate-400 block">أكثر من 450 مصنعاً ومنشأة إنتاجية</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1 text-center">
          <span className="text-[11px] font-bold text-slate-500">مدينة السادات الصناعية</span>
          <p className="text-xl font-extrabold text-teal-800">قاعدة صناعية عملاقة</p>
          <span className="text-[10px] text-slate-400 block">صناعات ثقيلة، غزل، حديد وصلب، وأغذية</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1 text-center">
          <span className="text-[11px] font-bold text-slate-500">مجمع الصناعات الصغيرة</span>
          <p className="text-xl font-extrabold text-amber-800">وحدات جاهزة للتشغيل</p>
          <span className="text-[10px] text-slate-400 block">تيسيرات للمشروعات الناشئة ورواد الأعمال</span>
        </div>
      </div>

      {/* Filters and Opportunities Catalog */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2">
            <Factory className="w-5 h-5 text-emerald-700" />
            <h2 className="text-sm font-bold text-slate-900">الفرص والطروحات الاستثمارية الاسترشادية</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="all">جميع المناطق الصناعية</option>
              {zones.filter(z => z !== 'all').map(z => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>

            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="all">جميع القطاعات الإنتاجية</option>
              {sectors.filter(s => s !== 'all').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOpportunities.map(op => (
            <div
              key={op.id}
              className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    {op.sector}
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                    {op.status}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  {op.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {op.highlights}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>الموقع:</span>
                  <span className="font-bold text-slate-800">{op.zone}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>المساحة المقترحة:</span>
                  <span className="font-bold text-emerald-800">{op.landArea}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>المرافق والطاقة:</span>
                  <span className="font-bold text-slate-800">{op.powerAvailability}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulated Investment Consultation Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Briefcase className="w-5 h-5 text-emerald-700" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">طلب استشارة استثمارية ودراسة مبدئية (محاكاة)</h3>
            <p className="text-[11px] text-slate-500">
              سجل استفسارك حول شروط التخصيص أو المزايا النسبية لمشروعك المقترح بمحافظة المنوفية
            </p>
          </div>
        </div>

        {inquirySubmitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2 animate-fadeIn">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-emerald-950">تم تسجيل طلب الاستشارة الاستثمارية بنجاح!</h4>
            <p className="text-xs text-emerald-800">
              رقم المتابعة التجريبي الاسترشادي: <span className="font-mono font-bold">INV-MNF-2026-88</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">اسم المستثمر / الشركة</label>
                <input
                  type="text"
                  required
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="الاسم الثلاثي أو اسم المنشأة"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">رقم الهاتف للتواصل</label>
                <input
                  type="tel"
                  required
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                  placeholder="010XXXXXXXX"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">القطاع الصناعي المستهدف</label>
                <select
                  value={inquirySector}
                  onChange={(e) => setInquirySector(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="صناعات غذائية وزراعية">صناعات غذائية وزراعية</option>
                  <option value="صناعات هندسية وإلكترونية">صناعات هندسية وإلكترونية</option>
                  <option value="غزل ونسيج وملابس">غزل ونسيج وملابس</option>
                  <option value="صناعات دوائية ومستلزمات">صناعات دوائية ومستلزمات</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">تفاصيل المشروع والمساحة المطلوبة</label>
              <textarea
                required
                rows={3}
                value={inquiryDetails}
                onChange={(e) => setInquiryDetails(e.target.value)}
                placeholder="اذكر فكرة المشروع، الطاقة الإنتاجية المقدرة، والمساحة المتوقعة بالمتر المربع..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2.5 px-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold transition-colors shadow-sm flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>إرسال طلب الاستشارة الاستثماري</span>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
