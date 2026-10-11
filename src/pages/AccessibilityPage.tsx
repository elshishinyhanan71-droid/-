import React from 'react';
import {
  Users,
  Eye,
  Type,
  Volume2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
  Heart,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AccessibilityPage: React.FC = () => {
  const {
    navigate,
    highContrast,
    setHighContrast,
    fontSize,
    setFontSize
  } = useApp();

  const services = [
    {
      title: 'بطاقة الخدمات المتكاملة لذوي الإعاقة',
      desc: 'استخراج وتجديد بطاقة إثبات الإعاقة بالتنسيق مع مكاتب التأهيل الاجتماعي التابعة لمديرية التضامن بشبين الكوم.',
      location: 'مجمع التضامن الاجتماعي - شبين الكوم ومراكز التأهيل بالمدن'
    },
    {
      title: 'شباك خدمة ذوي الهمم بالمراكز التكنولوجية',
      desc: 'تخصيص شباك أرضي بدون سلالم ومزود بمترجم لغة إشارة لإنهاء كافة التراخيص والشهادات دون انتظار في الطوابير العامة.',
      location: 'متاح بكافة المراكز التكنولوجية العشرة بالمنوفية'
    },
    {
      title: 'لجان الكشف الطبي لسيارات المعاقين',
      desc: 'مقر القومسيون الطبي العام بالمنوفية لتوقيع الكشف وتحديد اللياقة الطبية للحصول على سيارات مجهزة معفاة من الجمارك.',
      location: 'القومسيون الطبي - بجوار مستشفى شبين الكوم التعليمي'
    },
    {
      title: 'مراكز التأهيل المهني والعلاج الطبيعي التخصصي',
      desc: 'تدريب وتشغيل نسبة الـ 5% وتوفير الأجهزة التعويضية (كراسي متحركة، عكازات، أطراف صناعية) بالتعاون مع الجمعيات الأهلية.',
      location: 'مركز التأهيل الشامل بحي ميت خاقان'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>
        <span className="text-xs text-slate-400 font-mono">سهولة الوصول والدمج</span>
      </div>

      {/* Main Title Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold">
              قادرون باختلاف
            </span>
            <span className="text-xs text-slate-400">· محافظة المنوفية</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            خدمات وتيسيرات ذوي الهمم وإتاحة الوصول
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            دليل الخدمات التيسيرية وضوابط الإتاحة الرقمية والميدانية لخدمة أهالينا
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
          <Users className="w-6 h-6" />
        </div>
      </div>

      {/* Live Accessibility Controls Panel */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-4">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-amber-300" />
          <h2 className="text-base font-bold">تفضيلات إتاحة القراءة والعرض في التطبيق:</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-1">
          {/* Font Size Adjuster */}
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold flex items-center gap-1.5">
                <Type className="w-4 h-4 text-emerald-400" />
                <span>حجم خط القراءة</span>
              </span>
              <span className="text-amber-300 font-mono text-[11px]">
                {fontSize === 'normal' ? 'افتراضي' : fontSize === 'large' ? 'كبير' : 'كبير جداً'}
              </span>
            </div>
            <div className="flex gap-1.5 pt-1">
              <button
                onClick={() => setFontSize('normal')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  fontSize === 'normal' ? 'bg-emerald-600 text-white' : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                عادي
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  fontSize === 'large' ? 'bg-emerald-600 text-white' : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                كبير (A+)
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  fontSize === 'xlarge' ? 'bg-emerald-600 text-white' : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                أكبر (A++)
              </button>
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-amber-300" />
                <span>وضع التباين العالي (High Contrast)</span>
              </span>
              <span className="text-amber-300 font-mono text-[11px]">
                {highContrast ? 'مفعل' : 'معطل'}
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              زيادة تباين الألوان والحدود لتسهيل القراءة لضعاف البصر وكبار السن.
            </p>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-full py-2 rounded-xl text-xs font-bold transition-colors mt-2 ${
                highContrast ? 'bg-amber-400 text-slate-900' : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              {highContrast ? 'إلغاء وضع التباين' : 'تفعيل التباين العالي'}
            </button>
          </div>
        </div>
      </div>

      {/* Directory of Disability Services in Menoufia */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          دليل التيسيرات والخدمات الميدانية بالمحافظة:
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">{srv.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{srv.desc}</p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5" />
                <span>المقر: {srv.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Voice Reader Simulation */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
        <div className="flex items-center gap-3">
          <Volume2 className="w-5 h-5 text-emerald-700" />
          <span>التطبيق متوافق تماماً مع قارئات الشاشة (Screen Readers) ويدعم التصفح بلوحة المفاتيح.</span>
        </div>
        <button
          onClick={() => alert('تم تفعيل محاكي القراءة الصوتية للنصوص')}
          className="py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-[11px] font-bold whitespace-nowrap"
        >
          اختبار القراءة الصوتية
        </button>
      </div>

    </div>
  );
};
