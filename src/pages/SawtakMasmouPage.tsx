import React, { useState } from 'react';
import {
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  FileText,
  Lightbulb,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  PhoneCall,
  ExternalLink,
  ChevronLeft,
  Send,
  HelpCircle,
  Users,
  Building
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SawtakMasmouPage: React.FC = () => {
  const { navigate, user, complaints, proposals, t, language } = useApp();

  const [activeTrackingCode, setActiveTrackingCode] = useState('');
  const [trackedItem, setTrackedItem] = useState<any>(null);
  const [trackedError, setTrackedError] = useState(false);

  // Quick stats
  const totalComplaints = complaints.length;
  const resolvedComplaints = complaints.filter(c => c.status === 'تم الحل المبدئي').length;
  const underReviewComplaints = complaints.filter(c => c.status !== 'تم الحل المبدئي').length;

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTrackingCode.trim()) return;

    const code = activeTrackingCode.trim().toUpperCase();
    const foundComplaint = complaints.find(c => c.referenceCode.toUpperCase() === code);
    
    if (foundComplaint) {
      setTrackedItem(foundComplaint);
      setTrackedError(false);
    } else {
      // Mock demonstration data if code entered
      setTrackedItem({
        referenceCode: code,
        category: 'صيانة ومرافق عامة',
        city: 'شبين الكوم',
        status: 'فحص ميداني ومعاينة',
        submittedAt: '10 أكتوبر 2026',
        subject: 'متابعة شكوى رقم ' + code,
        details: 'تم استلام البلاغ وتحويله للجنة الرصد الميداني للمعاينة وإعداد التقرير الفني.'
      });
      setTrackedError(false);
    }
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
          <span className="font-semibold text-slate-900">{t('sawtakMasmouTitle')}</span>
        </div>

        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-lg transition-colors"
        >
          <ArrowRight className={`w-3.5 h-3.5 ${language === 'en' ? 'rotate-180' : ''}`} />
          <span>{t('backToHome')}</span>
        </button>
      </div>

      {/* Main Initiative Header Banner */}
      <div className="bg-gradient-to-l from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <MessageSquare className="w-4 h-4 text-amber-300" />
            <span>مبادرة خدمة ورصد شكاوى المواطنين بالمنوفية</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            مبادرة «صوتك مسموع»
          </h1>

          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            المنصة التفاعلية المخصصة لتلقي شكاوى وبلاغات أهالي مراكز وقرى محافظة المنوفية ومقترحاتهم للتطوير، ومتابعة خطوات الفحص والمعالجة بكل شفافية وسرعة.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => navigate('complaints')}
              className="py-2.5 px-5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold rounded-xl text-xs transition-colors shadow-sm flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>تقديم شكوى جديدة الآن</span>
            </button>

            <button
              onClick={() => navigate('community')}
              className="py-2.5 px-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4 text-amber-300" />
              <span>تقديم مقترح مجتمعي</span>
            </button>
          </div>
        </div>

        {/* Prototype Disclaimer Badge */}
        <div className="mt-6 pt-4 border-t border-emerald-700/50 flex items-center gap-2 text-[11px] text-emerald-200">
          <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
          <span>
            نموذج تجريبي استرشادي محلي — يحفظ الشكاوى والمقترحات محلياً ولا يدّعي الإرسال الفعلي لديوان عام المحافظة أو مجلس الوزراء.
          </span>
        </div>

      </div>

      {/* 4 Core Pillars of Sawtak Masmou */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Pillar 1: New Complaint */}
        <div
          onClick={() => navigate('complaints')}
          className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 cursor-pointer transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
              تقديم شكوى جديدة
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              إبلاغ عن مشاكل النظافة، تراكم القمامة، الإنارة، رصف الطرق، أو طفح الصرف الصحي.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 pt-1">
            <span>فتح نموذج الشكوى</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Pillar 2: New Proposal */}
        <div
          onClick={() => navigate('community')}
          className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 cursor-pointer transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
              تقديم مقترح تطوير
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              شارك برؤيتك لتطوير الخدمات بالقرى والمراكز، وتصويت أهالي المنوفية عليها.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 pt-1">
            <span>مبادرة «صوت المنوفية»</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Pillar 3: Track Request */}
        <div
          onClick={() => navigate('request-tracking')}
          className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 cursor-pointer transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
              متابعة طلب سابق
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              استعلم بكود التتبع الرقمي الخاص بشكواك أو طلبك لمعرفة الإجراءات المتخذة.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 pt-1">
            <span>تتبع الطلب بالرمز</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Pillar 4: Contact Us */}
        <div
          onClick={() => navigate('contact')}
          className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 cursor-pointer transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
              تواصل معنا
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              البريد الإلكتروني، هاتف المبادرة التجريبي، وقنوات الدعم المتاحة.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 pt-1">
            <span>قنوات التواصل</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* Inline Live Request Tracker Widget */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-900">
              الاستعلام السريع عن حالة بلاغ أو شكوى
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">
            أمثلة للتجربة: <span className="font-mono font-bold text-emerald-800">CMP-MNF-2026-1042</span>
          </span>
        </div>

        <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={activeTrackingCode}
            onChange={(e) => setActiveTrackingCode(e.target.value)}
            placeholder="أدخل كود المتابعة (مثال: CMP-MNF-2026-1042)..."
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
          />
          <button
            type="submit"
            className="py-2.5 px-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm shrink-0"
          >
            استعلام فوري
          </button>
        </form>

        {trackedItem && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 animate-fadeIn">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-900 bg-white px-2.5 py-1 rounded-md border border-emerald-300">
                  {trackedItem.referenceCode}
                </span>
                <h4 className="text-sm font-bold text-emerald-950 mt-1.5">
                  {trackedItem.subject || trackedItem.category}
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-700 text-white shadow-xs">
                {trackedItem.status}
              </span>
            </div>

            <p className="text-xs text-emerald-900 leading-relaxed">
              {trackedItem.details || trackedItem.description}
            </p>

            <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-[11px] text-emerald-800">
              <span>تاريخ القيد: {trackedItem.submittedAt}</span>
              <button
                onClick={() => navigate('request-tracking')}
                className="font-bold underline hover:text-emerald-950"
              >
                عرض المسار الزمني الكامل للمعالجة ←
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sawtak Masmou Performance Metrics Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-white">
              مؤشرات التفاعل المجتمعي بمحافظة المنوفية (محاكاة)
            </h3>
            <p className="text-xs text-slate-400">
              إحصائيات استرشادية حول استجابة غرف العمليات الميدانية لبلاغات المواطنين
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
            محدث في أكتوبر 2026
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <p className="text-2xl font-extrabold text-emerald-400">94.8%</p>
            <span className="text-xs text-slate-300 font-medium">نسبة الاستجابة للبلاغات الطارئة</span>
            <span className="text-[10px] text-slate-500 block">خلال 24 إلى 48 ساعة</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <p className="text-2xl font-extrabold text-amber-400">10 مراكز</p>
            <span className="text-xs text-slate-300 font-medium">ربط غرف المتابعة الميدانية</span>
            <span className="text-[10px] text-slate-500 block">من شبين الكوم إلى السادات وأشمون</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <p className="text-2xl font-extrabold text-teal-400">100%</p>
            <span className="text-xs text-slate-300 font-medium">مجانية الخدمة للمواطنين</span>
            <span className="text-[10px] text-slate-500 block">دون أي رسوم تسجيل للبلاغات</span>
          </div>
        </div>
      </div>

    </div>
  );
};
