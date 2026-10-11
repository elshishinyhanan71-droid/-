import React, { useState } from 'react';
import {
  Compass,
  Building,
  Search,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  FileText,
  MapPin,
  ExternalLink,
  Info,
  Layers,
  Ruler
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MENOUFIA_CITIES } from '../data/mockData';

interface UrbanZoneInfo {
  city: string;
  district: string;
  zoneType: 'سكني معتمد' | 'تجاري إداري' | 'توسعات حيز عمراني 2026' | 'منطقة حرفية / صناعية';
  maxHeight: string;
  setbackFront: string;
  setbackSide: string;
  buildingRatio: string;
  cordonStatus: 'داخل الحيز العمراني المعتمد' | 'حيز استرشادي جارٍ اعتماده' | 'خارج الحيز - يخضع لموافقة الزراعة';
  notes: string;
}

const SAMPLE_ZONING_DATA: UrbanZoneInfo[] = [
  {
    city: 'شبين الكوم',
    district: 'حي شرق - مساكن الزراعة والجلاء',
    zoneType: 'سكني معتمد',
    maxHeight: 'أرضي + 4 أدوار علوية (16 متر)',
    setbackFront: 'صفر مع الحفاظ على خط التنظيم',
    setbackSide: '2.5 متر للواجهات الجانبية إذا زاد الارتفاع',
    buildingRatio: '100% للقطع الأقل من 150م²',
    cordonStatus: 'داخل الحيز العمراني المعتمد',
    notes: 'تطبق الاشتراطات البنائية العامة لقانون البناء رقم 119 لسنة 2008 وتعديلاته.'
  },
  {
    city: 'شبين الكوم',
    district: 'حي غرب - العزبة الغربية وقري متصلة',
    zoneType: 'سكني معتمد',
    maxHeight: 'أرضي + 3 أدوار (13 متر)',
    setbackFront: 'الالتزام بعرض الشارع (مرة ونصف عرض الشارع بحد أقصى)',
    setbackSide: 'لا يشترط للقطع السكنية القائمة',
    buildingRatio: '100% وفق المخطط التفصيلي',
    cordonStatus: 'داخل الحيز العمراني المعتمد',
    notes: 'يلزم الحصول على بيان صلاحية موقع من المركز التكنولوجي بحي غرب.'
  },
  {
    city: 'منوف',
    district: 'مدينة منوف - محيط الكليات وطريق سرس',
    zoneType: 'تجاري إداري',
    maxHeight: 'أرضي + 4 أدوار (17 متر)',
    setbackFront: '3 أمتار ردود للشوارع الرئيسية',
    setbackSide: '2 متر',
    buildingRatio: '80% للأنشطة الإدارية',
    cordonStatus: 'داخل الحيز العمراني المعتمد',
    notes: 'يسمح بالأنشطة التجارية في الدورين الأرضي والأول فوق الأرضي.'
  },
  {
    city: 'أشمون',
    district: 'امتداد الحيز العمراني جنوب أشمون',
    zoneType: 'توسعات حيز عمراني 2026',
    maxHeight: 'أرضي + 3 أدوار (13 متر)',
    setbackFront: 'الالتزام بخطوط التنظيم المعتمدة للشارع',
    setbackSide: 'وفق عرض القطعة',
    buildingRatio: '100%',
    cordonStatus: 'داخل الحيز العمراني المعتمد',
    notes: 'تمت إضافتها ضمن الحيز العمراني المعتمد حديثاً لخدمة الكثافات السكانية.'
  },
  {
    city: 'قويسنا',
    district: 'المنطقة الصناعية - المرحلة الثالثة والرابعة',
    zoneType: 'منطقة حرفية / صناعية',
    maxHeight: '15 متر (أنشطة صناعية وهناجر)',
    setbackFront: '5 أمتار ردود أمامي للشاحنات',
    setbackSide: '4 أمتار للسلامة والدفاع المدني',
    buildingRatio: '65% بحد أقصى',
    cordonStatus: 'داخل الحيز العمراني المعتمد',
    notes: 'تخضع لموافقات الهيئة العامة للتنمية الصناعية والدفاع المدني.'
  }
];

export const UrbanPlanPage: React.FC = () => {
  const { navigate, t, language } = useApp();
  
  const [selectedCity, setSelectedCity] = useState('شبين الكوم');
  const [districtQuery, setDistrictQuery] = useState('');
  const [plotNumber, setPlotNumber] = useState('');
  const [searched, setSearched] = useState(false);
  const [resultItem, setResultItem] = useState<UrbanZoneInfo | null>(SAMPLE_ZONING_DATA[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const found = SAMPLE_ZONING_DATA.find(item => item.city === selectedCity) || SAMPLE_ZONING_DATA[0];
    setResultItem(found);
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
          <span className="font-semibold text-slate-900">{t('serviceUrbanPlan')}</span>
        </div>

        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-lg transition-colors"
        >
          <ArrowRight className={`w-3.5 h-3.5 ${language === 'en' ? 'rotate-180' : ''}`} />
          <span>{t('backToHome')}</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-l from-emerald-950 via-teal-900 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <Ruler className="w-4 h-4 text-amber-300" />
              <span>{t('serviceUrbanPlan')} — التخطيط والتنظيم العمراني</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              بوابة الاستعلام الاسترشادي عن المخطط العمراني واشتراطات البناء
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              منصة رقمية استرشادية لمساعدة المواطنين والمهندسين في التعرف على موقف الأحوزة العمرانية المعتمدة، وخطوط التنظيم، والارتفاعات المسموحة بمراكز وقرى محافظة المنوفية.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-xs space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>تنويه قانوني هام</span>
            </div>
            <p className="text-slate-200 text-[11px] max-w-xs">
              البيانات المعروضة هنا لأغراض الاسترشاد والتيسير، وتصدر شهادة صلاحية الموقع الرسمية والتراخيص حصرياً من المركز التكنولوجي والإدارة الهندسية التابعة للمركز.
            </p>
          </div>
        </div>
      </div>

      {/* Lookup Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Search className="w-5 h-5 text-emerald-700" />
          <h2 className="text-base font-bold text-slate-900">
            الاستعلام عن اشتراطات منطقة أو قطعة أرض
          </h2>
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              المركز / المدينة <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            >
              {MENOUFIA_CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              الحي / القرية / اسم الحوض
            </label>
            <input
              type="text"
              value={districtQuery}
              onChange={(e) => setDistrictQuery(e.target.value)}
              placeholder="مثال: حي شرق، قرية طنبدي، حوض الداير..."
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              رقم القطعة أو الشارع (اختياري)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={plotNumber}
                onChange={(e) => setPlotNumber(e.target.value)}
                placeholder="رقم القطعة أو الكود"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shrink-0 shadow-sm"
              >
                استعلام
              </button>
            </div>
          </div>

        </form>
      </div>

      {/* Results Detail Card */}
      {resultItem && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {resultItem.cordonStatus}
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mt-2">
                بيان الاشتراطات التخطيطية — {resultItem.city} ({resultItem.district})
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">تصنيف المنطقة:</span>
              <span className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">
                {resultItem.zoneType}
              </span>
            </div>
          </div>

          {/* Grid of Planning Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500">أقصى ارتفاع مصرح به</span>
              <p className="text-sm font-bold text-slate-900">{resultItem.maxHeight}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500">خط الارتداد الأمامي</span>
              <p className="text-sm font-bold text-slate-900">{resultItem.setbackFront}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500">الارتدادات الجانبية والخلفية</span>
              <p className="text-sm font-bold text-slate-900">{resultItem.setbackSide}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500">نسبة البناء من الأرض</span>
              <p className="text-sm font-bold text-slate-900">{resultItem.buildingRatio}</p>
            </div>

          </div>

          {/* Notes and instructions */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Info className="w-4 h-4 text-amber-700" />
              <span>إرشادات الإدارة الهندسية بالمركز التكنولوجي</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {resultItem.notes}
            </p>
          </div>

          {/* Next steps CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-500">
              هل تريد التقدم للحصول على بيان صلاحية موقع رسمي أو ترخيص بناء؟
            </span>
            <button
              onClick={() => navigate('tech-centers')}
              className="py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>حجز موعد بالمركز التكنولوجي لاستخراج شهادة الصلاحية</span>
              <ArrowRight className={`w-3.5 h-3.5 ${language === 'en' ? 'rotate-180' : ''}`} />
            </button>
          </div>

        </div>
      )}

      {/* Guide Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 bg-white rounded-3xl border border-slate-200 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <h4 className="text-sm font-bold text-slate-900">شهادة صلاحية الموقع</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            المستند الأساسي الذي يحدد الكروكي المعتمد والارتفاع المسموح وخطوط التنظيم قبل إعداد الرسومات الهندسية.
          </p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <h4 className="text-sm font-bold text-slate-900">قانون التصالح رقم 187</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            استقبال طلبات تقنين الأوضاع والتصالح على مخالفات البناء من خلال اللجان الفنية المعتمدة بالمراكز التكنولوجية.
          </p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <h4 className="text-sm font-bold text-slate-900">حماية الرقعة الزراعية</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            المنوفية من أخصب أراضي الدلتا؛ وتخضع التعديات على الأراضي الزراعية خارج الحيز المعتمد لإجراءات رادعة فورية.
          </p>
        </div>
      </div>

    </div>
  );
};
