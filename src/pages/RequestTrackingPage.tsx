import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Building,
  MapPin,
  Phone,
  User,
  Copy,
  Printer,
  FileText,
  Calendar,
  Layers,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Complaint } from '../types';

export const RequestTrackingPage: React.FC = () => {
  const { navigate, complaints, governorAppointments, techAppointments, t, language } = useApp();

  const [codeQuery, setCodeQuery] = useState('CMP-MNF-2026-1042');
  const [copied, setCopied] = useState(false);
  const [printSimulated, setPrintSimulated] = useState(false);

  // Search among existing complaints or sample
  const foundComplaint = complaints.find(
    c => c.referenceCode.toUpperCase() === codeQuery.trim().toUpperCase()
  ) || complaints[0];

  const handleCopy = () => {
    navigator.clipboard?.writeText(foundComplaint.referenceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    setPrintSimulated(true);
    setTimeout(() => setPrintSimulated(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => navigate('home')} className="hover:text-emerald-700 transition-colors">
            {t('navHome')}
          </button>
          <span>/</span>
          <button onClick={() => navigate('sawtak-masmou')} className="hover:text-emerald-700 transition-colors">
            {t('sawtakMasmouTitle')}
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">{t('sawtakTrackRequest')}</span>
        </div>

        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-lg transition-colors"
        >
          <ArrowRight className={`w-3.5 h-3.5 ${language === 'en' ? 'rotate-180' : ''}`} />
          <span>{t('backToHome')}</span>
        </button>
      </div>

      {/* Title Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            منظومة المتابعة الرقمية الموحدة
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            متابعة حالة الطلب والمسار الإجرائي
          </h1>
          <p className="text-xs text-slate-500">
            أدخل كود المتابعة الممنوح لك عند تسجيل الشكوى أو طلب موعد المحافظ أو تذكرة المركز التكنولوجي
          </p>
        </div>

        {/* Input Bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={codeQuery}
              onChange={(e) => setCodeQuery(e.target.value)}
              placeholder="اكتب كود الطلب..."
              className="w-full pr-10 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>
          <button
            onClick={() => {}}
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            استعلام
          </button>
        </div>

        {/* Quick sample chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 text-[11px]">أكواد جاهزة للتجربة:</span>
          {complaints.slice(0, 3).map(c => (
            <button
              key={c.id}
              onClick={() => setCodeQuery(c.referenceCode)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] font-bold"
            >
              {c.referenceCode}
            </button>
          ))}
        </div>
      </div>

      {/* Found Request Detail View */}
      {foundComplaint && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Card Top Information */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-extrabold bg-slate-900 text-amber-300 px-3 py-1 rounded-lg">
                  {foundComplaint.referenceCode}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
                  title="نسخ الكود"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {copied && <span className="text-[11px] text-emerald-600 font-bold">تم النسخ!</span>}
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-2">
                {foundComplaint.subject}
              </h2>
              <p className="text-xs text-slate-500">
                المركز: {foundComplaint.city} · القطاع: {foundComplaint.category} · تاريخ التقديم: {foundComplaint.submittedAt}
              </p>
            </div>

            <div className="text-left shrink-0">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
                {foundComplaint.status}
              </span>
            </div>
          </div>

          {/* Details Overview */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-slate-700 block">تفاصيل البلاغ المسجل:</span>
            <p className="text-slate-600 leading-relaxed">
              {foundComplaint.description}
            </p>
            {foundComplaint.address && (
              <p className="text-slate-500 text-[11px] pt-1">
                📍 العنوان: {foundComplaint.address}
              </p>
            )}
          </div>

          {/* Milestone Timeline */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>مراحل فحص ومعالجة الطلب</span>
            </h3>

            <div className="relative border-r-2 border-emerald-200 mr-3 space-y-6 py-2">
              {foundComplaint.timeline && foundComplaint.timeline.map((step, idx) => (
                <div key={idx} className="relative pr-6">
                  {/* Step Dot */}
                  <div className="absolute -right-2 top-1 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow-xs"></div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{step.stage}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{step.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions & Print Simulation */}
          <div className="border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handlePrint}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة إيصال المتابعة (محاكاة)</span>
            </button>

            {printSimulated && (
              <span className="text-xs text-emerald-700 font-bold animate-fadeIn">
                ✓ تم تجهيز إشعار المتابعة للطباعة بنجاح!
              </span>
            )}

            <button
              onClick={() => navigate('contact')}
              className="text-xs text-emerald-700 hover:text-emerald-900 font-bold underline"
            >
              هل تحتاج لمزيد من الاستفسار؟ تواصل مع المبادرة
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
