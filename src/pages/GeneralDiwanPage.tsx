import React from 'react';
import {
  Landmark,
  Building2,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Users,
  FileText,
  Calendar,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GeneralDiwanPage: React.FC = () => {
  const { navigate, t, language } = useApp();

  const directorates = [
    { title: 'مديرية التربية والتعليم', desc: 'الإشراف على المدارس والإدارات التعليمية والامتحانات بمراكز المحافظة.', city: 'شبين الكوم' },
    { title: 'مديرية الشؤون الصحية', desc: 'إدارة المستشفيات المركزية، الوحدات الصحية، والقوافل العلاجية.', city: 'شبين الكوم' },
    { title: 'مديرية التضامن الاجتماعي', desc: 'معاشات تكافل وكرامة، دور الرعاية، وتأهيل ذوي الهمم.', city: 'شبين الكوم' },
    { title: 'مديرية الإسكان والمرافق', desc: 'متابعة مشروعات التطوير الحضري وإسكان بديل العشوائيات.', city: 'شبين الكوم' },
    { title: 'مديرية التموين والتجارة', desc: 'مراقبة المخابز والأسواق ومعارض «أهلاً رمضان» والسلع التموينية.', city: 'شبين الكوم' },
    { title: 'مديرية الزراعة واستصلاح الأراضي', desc: 'صرف الأسمدة، تطهير المساقي، وحماية الرقعة الزراعية من التعديات.', city: 'شبين الكوم' }
  ];

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
          <span className="font-semibold text-slate-900">{t('mediaDiwan')}</span>
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
      <div className="bg-gradient-to-l from-slate-900 via-indigo-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
            <Landmark className="w-4 h-4 text-amber-300" />
            <span>الجهاز التنفيذي للمحافظة</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            الديوان العام لمحافظة المنوفية
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            المقر الإداري والتنفيذي الرئيسي لإدارة شؤون محافظة المنوفية، وتنسيق الخطط التنموية والمشروعات القومية بالتكامل مع كافة الوزارات والهيئات.
          </p>
        </div>
      </div>

      {/* Basic Contact & Location Info */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Building2 className="w-5 h-5 text-indigo-700" />
          <h3 className="text-sm font-bold text-slate-900">بيانات المقر الرئيسي للديوان العام</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-slate-500 font-bold">
              <MapPin className="w-4 h-4 text-indigo-700" />
              <span>المقر الرئيسي</span>
            </div>
            <p className="font-bold text-slate-900">شارع جمال عبد الناصر، شبين الكوم، المنوفية</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-slate-500 font-bold">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>مواعيد العمل الإداري</span>
            </div>
            <p className="font-bold text-slate-900">الأحد إلى الخميس: 8:00 ص إلى 3:00 م</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-slate-500 font-bold">
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>بدالة الديوان العام</span>
            </div>
            <p className="font-bold text-slate-900">048-2222000 (بيان استرشادي)</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>تنويه:</strong> هذه الصفحة تعرض بيانات تعريفية عامة موثقة عن الديوان العام ولا تتيح التراسل المباشر مع مسؤولي الديوان خارج القنوات الرسمية المنصوص عليها قانوناً.
          </span>
        </div>
      </div>

      {/* Quick Action: Governor Audience Booking */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            خدمة المواطنين
          </span>
          <h4 className="text-base font-extrabold text-emerald-950">
            حجز موعد للقاء السيد المحافظ (محاكاة)
          </h4>
          <p className="text-xs text-emerald-800 max-w-lg">
            يخصص ديوان عام المحافظة لقاءات دورية لخدمة المواطنين وبحث الطلبات العاجلة وفق مواعيد مسبقة.
          </p>
        </div>

        <button
          onClick={() => navigate('governor-meeting')}
          className="py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shrink-0 shadow-sm flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span>فتح نموذج حجز اللقاء</span>
        </button>
      </div>

      {/* Service Directorates */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">مديريات الخدمات التابعة لديوان المحافظة</h3>
          <span className="text-xs text-slate-500">مجمع المصالح والمديريات</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {directorates.map((dir, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900">{dir.title}</h4>
                <span className="text-[10px] text-slate-400 font-semibold">{dir.city}</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {dir.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
