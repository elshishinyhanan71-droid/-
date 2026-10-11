import React, { useState } from 'react';
import {
  Users,
  ThumbsUp,
  PlusCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Send,
  MessageSquare,
  Sparkles,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MENOUFIA_CITIES } from '../data/mockData';
import { CommunityProposal } from '../types';

export const CommunityPage: React.FC = () => {
  const { navigate, user, proposals, addProposal, voteProposal } = useApp();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [city, setCity] = useState(user?.city || 'شبين الكوم');
  const [category, setCategory] = useState<CommunityProposal['category']>('بيئة وتجميل');
  const [description, setDescription] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [proposalSubmitted, setProposalSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [key: string]: string } = {};

    if (!title.trim() || title.length < 10) errs.title = 'يرجى كتابة عنوان واضح للمبادرة (10 أحرف على الأقل)';
    if (!description.trim() || description.length < 20) errs.description = 'يرجى شرح فكرة المبادرة وأثرها الإيجابي (20 حرفاً على الأقل)';

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    addProposal(title, category, city, description);
    setProposalSubmitted(true);
    setFormErrors({});
    setTimeout(() => {
      setIsFormOpen(false);
      setProposalSubmitted(false);
      setTitle('');
      setDescription('');
    }, 1600);
  };

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
        <span className="text-xs text-slate-400 font-mono">المشاركة المجتمعية</span>
      </div>

      {/* Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
              صوت المنوفية
            </span>
            <span className="text-xs text-slate-400">· منصة أفكار ومبادرات المواطنين</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            مبادرات ومقترحات أهالي المنوفية
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            شارك بفكرتك لتطوير المرافق والبيئة، وصوت على المقترحات الأكثر تأثيراً في مدينتك
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="py-3 px-5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs font-bold transition-colors shadow-sm flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>إضافة مقترح مجتمعي جديد</span>
        </button>
      </div>

      {/* Disclaimer */}
      <div className="p-3.5 bg-slate-100 border border-slate-200 rounded-2xl flex items-start gap-3 text-xs text-slate-600">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p>
          <strong>محاكاة للمشاركة المجتمعية:</strong> تهدف هذه الصفحة إلى قياس التفاعل الأهلي وتبادل الأفكار التطويرية بين مواطني مراكز المحافظة بشكل تفاعلي محلي.
        </p>
      </div>

      {/* Submission Form Modal / Drawer */}
      {isFormOpen && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-lg space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              تقديم مبادرة أو مقترح لتطوير مجتمع المنوفية
            </h2>
            <button
              onClick={() => setIsFormOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              إلغاء
            </button>
          </div>

          {proposalSubmitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-sm text-emerald-900">تم تسجيل ونشر مبادرتك بنجاح!</h3>
              <p className="text-xs text-slate-600">أصبحت المبادرة الآن متاحة لأهالي المحافظة للتصويت والدعم.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    تصنيف المبادرة *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="بيئة وتجميل">بيئة وتجميل وتشجير</option>
                    <option value="مواصلات وطرق">مواصلات وتنظيم طرق وسرفيس</option>
                    <option value="شباب ورياضة">شباب ورياضة ومسارات مشي</option>
                    <option value="ثقافة ومجتمع">ثقافة وتراث وحرف يدوية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    المركز / المدينة المستهدفة *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {MENOUFIA_CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  عنوان المبادرة أو الفكرة *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: مبادرة تزيين مدخل قرية شنوان بالجهود الذاتية"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                {formErrors.title && (
                  <p className="text-[11px] text-rose-600 mt-1">{formErrors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  شرح الفكرة وآلية تنفيذها المقترحة *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="وضح كيف يمكن للأهالي وشباب المركز المساهمة في إنجاح المبادرة..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                {formErrors.description && (
                  <p className="text-[11px] text-rose-600 mt-1">{formErrors.description}</p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 rtl:-scale-x-100" />
                  <span>نشر المبادرة</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  إلغاء
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Proposals Feed */}
      <div className="space-y-4">
        {proposals.map((prop) => (
          <div
            key={prop.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:border-emerald-200 transition-all"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  {prop.category}
                </span>
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{prop.city}</span>
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-400 font-mono text-[11px]">{prop.submittedAt}</span>
              </div>

              <h3 className="font-bold text-base text-slate-900">{prop.title}</h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {prop.description}
              </p>

              <div className="text-[11px] text-slate-400">
                مقدم المقترح: <strong className="text-slate-700">{prop.authorName}</strong>
              </div>
            </div>

            {/* Voting Action Box */}
            <div className="self-end sm:self-center shrink-0">
              <button
                onClick={() => voteProposal(prop.id)}
                className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all min-w-[76px] ${
                  prop.hasVoted
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-105'
                    : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 border-slate-200 hover:border-emerald-300'
                }`}
                title="التصويت لدعم المبادرة"
              >
                <ThumbsUp className={`w-5 h-5 ${prop.hasVoted ? 'fill-current' : ''}`} />
                <span className="font-mono font-extrabold text-sm mt-1 tabular-nums">
                  {prop.votesCount}
                </span>
                <span className="text-[10px] mt-0.5 whitespace-nowrap">
                  {prop.hasVoted ? 'تم دعمك' : 'ادعم الفكرة'}
                </span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
