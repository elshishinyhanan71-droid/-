import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Search,
  MessageCircle,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FAQ_ITEMS } from '../data/mockData';

export const HelpPage: React.FC = () => {
  const { navigate, setIsAssistantOpen } = useApp();

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(FAQ_ITEMS.map(f => f.category)))];

  const filteredFaqs = FAQ_ITEMS.filter(f => {
    return filterCategory === 'all' || f.category === filterCategory;
  });

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
        <span className="text-xs text-slate-400 font-mono">مركز المساعدة والإرشاد</span>
      </div>

      {/* Main Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
              دعم المواطنين
            </span>
            <span className="text-xs text-slate-400">· محافظة المنوفية</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            المساعدة والأسئلة الشائعة
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            إجابات وافية حول كيفية حجز المواعيد واستخراج التراخيص وتقديم الشكاوى
          </p>
        </div>

        <button
          onClick={() => setIsAssistantOpen(true)}
          className="py-3 px-5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs font-bold transition-colors shadow flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>فتح المساعد الإرشادي</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilterCategory(c)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              filterCategory === c
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {c === 'all' ? 'كافة التساؤلات' : c}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-right p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-emerald-800"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded font-normal">
                    {faq.category}
                  </span>
                  <span>{faq.question}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* How It Works Guide Strip */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="font-bold text-base text-white">خطوات إتمام أي معاملة عبر المنصة:</h3>
        <div className="grid sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white/10 p-4 rounded-2xl space-y-1">
            <span className="font-mono text-emerald-400 font-bold">خطوة 1:</span>
            <h4 className="font-bold text-white">اختيار المركز والخدمة</h4>
            <p className="text-slate-300 text-[11px]">حدد مدينتك ونوع الترخيص أو المعاملة المطلوبة.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl space-y-1">
            <span className="font-mono text-emerald-400 font-bold">خطوة 2:</span>
            <h4 className="font-bold text-white">إدخال البيانات وتحديد الموعد</h4>
            <p className="text-slate-300 text-[11px]">املأ النموذج البسيط وراجع التفاصيل قبل الاعتماد.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl space-y-1">
            <span className="font-mono text-emerald-400 font-bold">خطوة 3:</span>
            <h4 className="font-bold text-white">استلام الكود ورقم النداء</h4>
            <p className="text-slate-300 text-[11px]">احصل على تذكرة النداء المعتمدة لمتابعتها في أي وقت.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
