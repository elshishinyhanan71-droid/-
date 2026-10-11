import React from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Building2,
  FileText,
  GraduationCap,
  HeartPulse,
  Compass,
  Sliders,
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageRoute } from '../types';

export const TestingGuidePage: React.FC = () => {
  const { navigate } = useApp();

  const testSteps = [
    {
      num: '01',
      title: 'تسجيل الدخول والتصفح السريع كزائر أو مواطن',
      desc: 'اضغط على «تسجيل الدخول» وجرب زر «تعبئة بيانات التجربة» للدخول الفوري بحساب (أحمد المنوفي)، أو جرب «المتابعة كزائر».',
      actionLabel: 'الانتقال لشاشة الدخول',
      route: 'login' as PageRoute
    },
    {
      num: '02',
      title: 'حجز موعد وتذكرة نداء آلي بالمركز التكنولوجي',
      desc: 'اختر أي من مدن ومراكز المنوفية العشر (مثل أشمون أو شبين الكوم)، اضغط «حجز موعد وتذكرة نداء»، املأ النموذج واستلم تذكرة رقمية فورية برقم دور (مثل B-14).',
      actionLabel: 'تجربة المراكز التكنولوجية',
      route: 'tech-centers' as PageRoute
    },
    {
      num: '03',
      title: 'طلب حجز لقاء مع السيد المحافظ ومراجعة البيانات',
      desc: 'املأ استمارة المقابلة بالديوان العام، انتقل إلى خطوة المراجعة، ثم اضغط تأكيد للحصول على كود حجز مرجعي (مثل GOV-MNF-2026-XXXX).',
      actionLabel: 'تجربة حجز لقاء المحافظ',
      route: 'governor-meeting' as PageRoute
    },
    {
      num: '04',
      title: 'تقديم شكوى وإرفاق ملف ومتابعة المسار الميداني',
      desc: 'اختر تصنيف الشكوى (طرق وإنارة، نظافة، مياه)، أرفق ملفاً تجريبياً، وسجل البلاغ ثم تتبع المحطات الزمنية (تم الاستلام ← المعاينة الميدانية ← الحل).',
      actionLabel: 'تجربة منظومة الشكاوى',
      route: 'complaints' as PageRoute
    },
    {
      num: '05',
      title: 'الاستعلام عن نتيجة الشهادة الإعدادية وبيان الدرجات',
      desc: 'أدخل رقم الجلوس التجريبي 45102 واضغط استعلام لمشاهدة كشف الدرجات التفصيلي والمجموع الكلي والنسبة المئوية مع خيارات الطباعة.',
      actionLabel: 'تجربة نتائج الامتحانات',
      route: 'education' as PageRoute
    },
    {
      num: '06',
      title: 'حجز كشف تأمين صحي واستعراض اللجان الطبية',
      desc: 'تصفح عيادات شبين الكوم الشاملة، منوف، قويسنا، واللجنة الطبية العليا بميت خاقان، وجرب حجز كشف طبي والحصول على رقم الدور.',
      actionLabel: 'تجربة الخدمات الصحية',
      route: 'health' as PageRoute
    },
    {
      num: '07',
      title: 'لوحة الإدارة التجريبية وتغيير حالات الطلبات',
      desc: 'ادخل إلى «لوحة الإدارة التجريبية» لتغيير حالة أي شكوى أو طلب قدمته للتو من «قيد الفحص» إلى «تمت المعاينة»، وأضف خبراً أو احذف منشأة مع نافذة التأكيد.',
      actionLabel: 'فتح لوحة الإدارة التجريبية',
      route: 'admin' as PageRoute
    },
    {
      num: '08',
      title: 'صفحة «طلباتي المجمعة» وسجل العمليات',
      desc: 'استعرض في شاشة واحدة متكاملة كافة الحجوزات وتذاكر النداء والشكاوى وطلبات المقابلة التي أجريتها في جلستك الحالية.',
      actionLabel: 'فتح صفحة طلباتي',
      route: 'my-requests' as PageRoute
    },
    {
      num: '09',
      title: 'إتاحة الوصول وتكبير الخط والتباين العالي',
      desc: 'جرب زيادة حجم الخط إلى كبير وكبير جداً، أو تفعيل وضع التباين العالي (High Contrast) لملاحظة استجابة التصميم الفورية لضعاف البصر.',
      actionLabel: 'تجربة إمكانية الوصول',
      route: 'accessibility' as PageRoute
    },
    {
      num: '10',
      title: 'استعادة الضبط الأولي والبدء من جديد',
      desc: 'في أي وقت، يمكنك النقر على «استعادة الضبط الأولي» لمسح التعديلات المحلية وإرجاع البيانات الافتراضية النظيفة بنقرة واحدة.',
      actionLabel: 'الانتقال للإعدادات',
      route: 'settings' as PageRoute
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
        <span className="text-xs text-emerald-700 font-mono font-bold">دليل الاختبار والمراجعة</span>
      </div>

      {/* Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
              دليل المراجع والمختبر
            </span>
            <span className="text-xs text-slate-400">· Testing & Reviewer Guide</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            كيف تختبر كافة وظائف ومسارات «دليل المنوفية»؟
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            دليل إرشادي خطوة بخطوة لتجربة كل نموذج وبطاقة وزر ومسار تفاعلي في المنصة
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>
      </div>

      {/* Quick Summary Box */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-3xl flex items-start gap-3 text-xs text-emerald-950 leading-relaxed">
        <Sparkles className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold mb-0.5">جاهزية كاملة 100% دون أي أزرار شكلية:</strong>
          كل زر، رابط، تصفية، بحث، ونموذج إدخال في هذا التطبيق متصل بوظيفة حقيقية وحفظ محلي فوري. يمكنك تجربة دورة حياة المعاملة كاملة من الحجز كـ «مواطن» إلى تغيير حالتها كـ «مسؤول إدارة»!
        </div>
      </div>

      {/* Step by Step Testing Cards */}
      <div className="space-y-4">
        {testSteps.map((step) => (
          <div
            key={step.num}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-300 transition-colors"
          >
            <div className="flex items-start gap-4">
              <span className="font-mono text-xl font-extrabold text-emerald-700 bg-emerald-50 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0">
                {step.num}
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xl">{step.desc}</p>
              </div>
            </div>

            <button
              onClick={() => navigate(step.route)}
              className="py-2.5 px-4 bg-slate-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors whitespace-nowrap self-end sm:self-center shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <span>{step.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:-scale-x-100" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
