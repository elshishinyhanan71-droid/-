import React from 'react';
import {
  Building2,
  MapPin,
  Users,
  Calendar,
  Wheat,
  Factory,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  Info,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MENOUFIA_CITIES } from '../data/mockData';

export const GovernorateCardPage: React.FC = () => {
  const { navigate, t, language } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => navigate('home')} className="hover:text-emerald-700 transition-colors">
            {t('navHome')}
          </button>
          <span>/</span>
          <button onClick={() => navigate('media-hub')} className="hover:text-emerald-700 transition-colors">
            {t('mediaHubTitle')}
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">{t('mediaGovCard')}</span>
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
      <div className="bg-gradient-to-l from-emerald-950 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
            <Building2 className="w-4 h-4 text-amber-300" />
            <span>بطاقة الهوية والتعريف الرسمية</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            بطاقة التعريف بمحافظة المنوفية
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            محافظة المنوفية، إحدى أعرق وأهم محافظات جمهورية مصر العربية في قلب دلتا النيل، وتُعرف بأنها قلعة التعليم والثقافة والوطنية ورائدة الزراعة والصناعة.
          </p>
        </div>
      </div>

      {/* Fact Sheet Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 block">العاصمة الإدارية</span>
          <p className="text-base font-extrabold text-slate-900">مدينة شبين الكوم</p>
          <span className="text-[10px] text-slate-400 block">مقر الديوان العام والجامعة</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 block">عدد السكان التقديري</span>
          <p className="text-base font-extrabold text-slate-900">~ 4.6 مليون نسمة</p>
          <span className="text-[10px] text-slate-400 block">المصدر: الجهاز المركزي للتعبئة والإحصاء</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 block">العيد القومي السنوي</span>
          <p className="text-base font-extrabold text-slate-900">13 يونيو من كل عام</p>
          <span className="text-[10px] text-slate-400 block">ذكرى ملحمة وبسالة دنشواي 1906</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 block">التقسيم الإداري</span>
          <p className="text-base font-extrabold text-slate-900">10 مراكز ومدن رئيسية</p>
          <span className="text-[10px] text-slate-400 block">تضم أكثر من 317 قرية ووحدة محلية</span>
        </div>

      </div>

      {/* Deep Dive Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Geography & Location */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <MapPin className="w-5 h-5 text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-900">الموقع الجغرافي والحدود</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            تأخذ محافظة المنوفية شكلاً مثلثاً محصوراً بين فرعي النيل: <strong className="text-slate-800">فرع رشيد</strong> غرباً و<strong className="text-slate-800">فرع دمياط</strong> شرقاً، وتلتقي عند رأس الدلتا جنوباً عند القناطر الخيرية.
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li><strong>شمالاً:</strong> محافظة الغربية (طنطا وزفتى).</li>
            <li><strong>جنوباً:</strong> محافظة الجيزة والقليوبية ونهر النيل.</li>
            <li><strong>شرقاً:</strong> فرع دمياط ومحافظة القليوبية (بنها).</li>
            <li><strong>غرباً:</strong> فرع رشيد ومحافظة البحيرة (كوم حمادة وإيتاي البارود)، وامتداد الصحراء الغربية بمدينة السادات.</li>
          </ul>
        </div>

        {/* Emblem & Symbolism */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Award className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">شعار المحافظة ودلالاته</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            يتكون شعار محافظة المنوفية من عناصر ذات دلالات تاريخية وتنموية عميقة:
          </p>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <strong className="text-emerald-800">برج الحمام ولهب الثورة:</strong> يرمزان إلى قرية دنشواي وبسالة أهلها والتضحيات الخالدة ضد الاحتلال البريطاني.
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <strong className="text-amber-800">سنبلتا القمح الذهبيتان:</strong> تمثلان وفرة الإنتاج الزراعي وخصوبة تربة المنوفية التي ترويها شبكة الري النيلية.
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <strong className="text-indigo-800">ترس الصناعة:</strong> يرمز إلى القلاع الصناعية بمدينتي قويسنا والسادات ومصانع الغزل والنسيج.
            </div>
          </div>
        </div>

      </div>

      {/* The 10 Districts of Menoufia */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">المراكز والمدن العشرة بمحافظة المنوفية</h3>
          <span className="text-xs text-emerald-800 font-bold">10 مراكز</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          {MENOUFIA_CITIES.map((c, idx) => (
            <div
              key={c}
              className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-1 hover:border-emerald-300 transition-colors"
            >
              <span className="text-[10px] text-slate-400 font-bold">مركز {idx + 1}</span>
              <p className="font-bold text-slate-900">{c}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sources & Disclaimers */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-[11px] space-y-1">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>مصادر التوثيق الرسمية المعتمدة</span>
        </div>
        <p>
          تم استيفاء البيانات الجغرافية والتاريخية الواردة في هذه البطاقة بالرجوع إلى البيانات المفتوحة الصادرة عن: الجهاز المركزي للتعبئة العامة والإحصاء (CAPMAS)، الهيئة العامة للاستعلامات المصرية (SIS)، وبوابة ديوان عام محافظة المنوفية.
        </p>
      </div>

    </div>
  );
};
