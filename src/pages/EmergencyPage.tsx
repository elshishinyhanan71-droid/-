import React, { useState } from 'react';
import {
  PhoneCall,
  AlertTriangle,
  Copy,
  Check,
  ShieldCheck,
  Clock,
  ArrowRight,
  Filter,
  Flame,
  Zap,
  Droplet,
  HeartPulse,
  Shield,
  Building
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EMERGENCY_NUMBERS } from '../data/mockData';
import { EmergencyNumber } from '../types';

export const EmergencyPage: React.FC = () => {
  const { navigate } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [callingNumber, setCallingNumber] = useState<EmergencyNumber | null>(null);

  const categories = [
    { id: 'all', label: 'كافة الأرقام' },
    { id: 'health', label: 'طوارئ صحية وإسعاف' },
    { id: 'security', label: 'أمن ونجدة وحماية' },
    { id: 'utilities', label: 'مرافق (كهرباء ومياه وغاز)' },
    { id: 'operations', label: 'غرف العمليات بالمحافظة' },
    { id: 'general', label: 'أرقام وخطوط مساعدة عامة' }
  ];

  const filteredNumbers = EMERGENCY_NUMBERS.filter(item => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  const handleCopy = (id: string, num: string) => {
    navigator.clipboard?.writeText(num);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'health':
        return <HeartPulse className="w-5 h-5 text-rose-600" />;
      case 'security':
        return <Shield className="w-5 h-5 text-blue-600" />;
      case 'utilities':
        return <Zap className="w-5 h-5 text-amber-600" />;
      case 'operations':
        return <Building className="w-5 h-5 text-purple-600" />;
      default:
        return <PhoneCall className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>
        <span className="text-xs text-slate-400 font-mono">طوارئ المنوفية 24/7</span>
      </div>

      {/* Emergency Disclaimer Alert */}
      <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-xs text-rose-900 leading-relaxed shadow-sm">
        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold text-sm mb-0.5">تنبيه هام جداً:</strong>
          هذا التطبيق هو دليل تعريفي استرشادي، وليس غرفة عمليات طوارئ بديلة. في حالات الطوارئ القصوى والمهددة للحياة يرجى الاتصال المباشر من هاتفك المحمول بأرقام الإسعاف (123) أو النجدة (122) أو المطافئ (180).
        </div>
      </div>

      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 rounded-lg text-xs font-bold">
              دليل الطوارئ والخطوط الساخنة
            </span>
            <span className="text-xs text-slate-400">· محافظة المنوفية</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            أرقام الطوارئ والمرافق العامة
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            أرقام معتمدة للاتصال المباشر وخطوط التدخل السريع لكافة القطاعات
          </p>
        </div>

        {/* Quick Dial Grid for top 3 */}
        <div className="flex flex-wrap gap-2">
          <a
            href="tel:123"
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            <HeartPulse className="w-4 h-4" />
            <span>إسعاف 123</span>
          </a>
          <a
            href="tel:122"
            className="flex items-center gap-1.5 px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            <Shield className="w-4 h-4" />
            <span>نجدة 122</span>
          </a>
          <a
            href="tel:180"
            className="flex items-center gap-1.5 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            <Flame className="w-4 h-4" />
            <span>إطفاء 180</span>
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
              filterCategory === cat.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Numbers Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNumbers.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between hover:border-emerald-300 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {getCategoryIcon(item.category)}
                </div>
                <div className="flex flex-col items-end">
                  {item.isVerified ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>رقم قومي معتمد</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      رقم محلي استرشادي
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.hours}</span>
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-base text-slate-900">
                {item.title}
              </h3>
              
              <div className="my-2.5 p-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <span className="font-mono font-extrabold text-xl text-slate-900 tracking-wider dir-ltr">
                  {item.number}
                </span>
                <button
                  onClick={() => handleCopy(item.id, item.number)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
                  title="نسخ الرقم"
                >
                  {copiedId === item.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
              <a
                href={`tel:${item.number}`}
                className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>اتصال فوري</span>
              </a>

              <button
                onClick={() => setCallingNumber(item)}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                title="محاكاة تجربة الاتصال"
              >
                اختبار الاتصال
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Simulated Call Modal */}
      {callingNumber && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center animate-pulse">
              <PhoneCall className="w-8 h-8" />
            </div>
            
            <div>
              <span className="text-xs text-slate-400">جاري تجربة الاتصال بـ</span>
              <h3 className="font-bold text-base text-slate-900 mt-0.5">{callingNumber.title}</h3>
              <p className="font-mono text-2xl font-extrabold text-emerald-700 mt-1 dir-ltr">
                {callingNumber.number}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 leading-relaxed">
              هذه شاشة محاكاة لاختبار الاتصال في النموذج التجريبي. في الأجهزة الداعمة للاتصال، يؤدي الضغط على «اتصال فوري» إلى فتح لوحة الاتصال الهاتفية الفعلية مباشرة عبر بروتوكول <code className="font-mono text-slate-700">tel:{callingNumber.number}</code>.
            </div>

            <button
              onClick={() => setCallingNumber(null)}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              إنهاء المكالمة التجريبية
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
