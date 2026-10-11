import React from 'react';
import {
  Info,
  ShieldCheck,
  CheckCircle2,
  Code2,
  ArrowRight,
  Heart,
  Globe,
  Database,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutUsPage: React.FC = () => {
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
          <span className="font-semibold text-slate-900">{t('mediaAboutUs')}</span>
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
      <div className="bg-gradient-to-l from-teal-950 via-emerald-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold">
            <Info className="w-4 h-4 text-amber-300" />
            <span>وثيقة المشروع والشفافية</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            من نحن — منصة «دليل المنوفية»
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            نموذج تجريبي مستقل لبوابة خدمات ومعلومات محافظة المنوفية، يهدف إلى دراسة وتطوير أفضل الممارسات الرقمية لخدمة المواطن وتسهيل الوصول للمرافق الحيوية.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">استقلالية وتجريب</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            هذا التطبيق نموذج ابتكاري تجريبي مستقل؛ لا يدّعي تمثيل ديوان عام محافظة المنوفية رسمياً ولا يحل محل المنصات المعتمدة للدولة.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">تفاعلية كاملة وعملية</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            كل بطاقة وزر ونموذج في التطبيق صُمم ليؤدي وظيفة حقيقية تفاعلية مع حفظ محلي للمعلومات ودون أزرار صورية أو صفحات فارغة.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">حماية الخصوصية</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            تُحفظ جميع البيانات التجريبية محلياً في متصفح المستخدم دون الحاجة لتتبع أو بيع بيانات أو طلب مفاتيح سرية خارجية.
          </p>
        </div>

      </div>

      {/* Detailed Vision & Purpose */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          الرؤية والهدف من النموذج التجريبي
        </h3>

        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            انطلق تصميم <strong>«دليل المنوفية»</strong> مستلهماً من أفضل التجارب الناجحة لتطبيقات المراكز الإعلامية بالمحافظات المصرية (كنموذج المركز الإعلامي لمحافظة الشرقية)، مع إعادة صياغة كاملة للهوية والمحتوى والخدمات لتلائم خصوصية محافظة المنوفية كقلعة للتعليم والمراكز التكنولوجية والصناعات الرائدة.
          </p>
          <p>
            تغطي المنصة مختلف جوانب الحياة اليومية للمواطن المنوفي: من أرقام الطوارئ السريعة الموحدة، وحجز المواعيد بالمركز التكنولوجي، إلى منظومة الشكاوى التفاعلية، والبحث عن نتائج الامتحانات، واستكشاف المشروعات القومية والتاريخ الوطني.
          </p>
        </div>

        {/* Feature Checkpoints */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
          <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>واجهة عربية أصيلة بنظام RTL مع دعم كامل للغة الإنجليزية</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>توافق تام مع شاشات الهواتف المحمولة والكمبيوتر</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>أدوات إتاحة مخصصة لذوي الهمم (تباين وحجم خط)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>لوحة إدارة تفاعلية ودليل اختبار لفحص كافة الوظائف</span>
          </div>
        </div>
      </div>

    </div>
  );
};
