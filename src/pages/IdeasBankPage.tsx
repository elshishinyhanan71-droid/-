import React, { useState } from 'react';
import {
  Lightbulb,
  Sparkles,
  Search,
  ThumbsUp,
  Plus,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Tag,
  MessageSquare,
  Award,
  TrendingUp,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MENOUFIA_CITIES } from '../data/mockData';

interface IdeaItem {
  id: string;
  title: string;
  proposer: string;
  city: string;
  category: 'تحول رقمي وذكاء اصطناعي' | 'بيئة وتدوير مخلفات' | 'تجميل وتطوير الميادين' | 'تمكين الشباب والمشروعات' | 'ترشيد طاقة ومياه';
  summary: string;
  votes: number;
  status: 'قيد التقييم والدراسة' | 'فكرة فائزة / مرحلة تجريبية' | 'تم تبنيها محلياً';
  submittedAt: string;
}

const INITIAL_IDEAS: IdeaItem[] = [
  {
    id: 'idea-1',
    title: 'تطبيق ذكي لإدارة مخلفات مصانع الغزل والنسيج بشبين الكوم',
    proposer: 'م. سارة أحمد الشنواني',
    city: 'شبين الكوم',
    category: 'بيئة وتدوير مخلفات',
    summary: 'منصة لربط بقايا الأقمشة والقصاصات النسيجية بورش الحرف اليدوية ومعامل التدوير للحد من الانبعاثات وتحقيق عائد اقتصادي للشباب.',
    votes: 142,
    status: 'فكرة فائزة / مرحلة تجريبية',
    submittedAt: '02 أكتوبر 2026'
  },
  {
    id: 'idea-2',
    title: 'نظام ري ذكي بحساسات رطوبة لقنوات الري بمركزي منوف وأشمون',
    proposer: 'د. طارق عبد العليم (كلية الزراعة)',
    city: 'منوف',
    category: 'ترشيد طاقة ومياه',
    summary: 'تركيب مجسات متصلة بالهاتف ترشد المزارعين بمواعيد فتح مياه الري بدقة لمنع الهدر وخفض استهلاك السولار لماكينات الرفع.',
    votes: 98,
    status: 'قيد التقييم والدراسة',
    submittedAt: '05 أكتوبر 2026'
  },
  {
    id: 'idea-3',
    title: 'دليل مسارات الدراجات الآمنة وتجميل كورنيش بحر شبين',
    proposer: 'كريم خالد البدري (فريق شباب منوفي)',
    city: 'شبين الكوم',
    category: 'تجميل وتطوير الميادين',
    summary: 'تخطيط مسار مخصص للدراجات على امتداد الكورنيش مع إنارة بالطاقة الشمسية ومقاعد صديقة للبيئة مصنوعة من خامات محلية معاد تدويرها.',
    votes: 115,
    status: 'تم تبنيها محلياً',
    submittedAt: '28 سبتمبر 2026'
  },
  {
    id: 'idea-4',
    title: 'حاضنة أعمال مصغرة لخريجي كلية الهندسة الإلكترونية بمنوف',
    proposer: 'مهندس إلكترونيات محمد عزت',
    city: 'منوف',
    category: 'تمكين الشباب والمشروعات',
    summary: 'توفير مساحات عمل ومعامل فحص تقنية بالشراكة مع مصانع السادات وقويسنا لتصنيع الدوائر الإلكترونية المدمجة.',
    votes: 83,
    status: 'قيد التقييم والدراسة',
    submittedAt: '07 أكتوبر 2026'
  }
];

export const IdeasBankPage: React.FC = () => {
  const { navigate, user, t, language } = useApp();

  const [ideas, setIdeas] = useState<IdeaItem[]>(() => {
    const saved = localStorage.getItem('menoufia_ideas_bank');
    return saved ? JSON.parse(saved) : INITIAL_IDEAS;
  });

  const [votedIds, setVotedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('menoufia_voted_ideas');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<IdeaItem['category']>('تحول رقمي وذكاء اصطناعي');
  const [formCity, setFormCity] = useState(user?.city || 'شبين الكوم');
  const [formSummary, setFormSummary] = useState('');
  const [formProposer, setFormProposer] = useState(user?.name || '');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const categories = [
    'all',
    'تحول رقمي وذكاء اصطناعي',
    'بيئة وتدوير مخلفات',
    'تجميل وتطوير الميادين',
    'تمكين الشباب والمشروعات',
    'ترشيد طاقة ومياه'
  ];

  const handleVote = (id: string) => {
    if (votedIds.includes(id)) {
      // Toggle unvote
      const nextVotes = votedIds.filter(vId => vId !== id);
      setVotedIds(nextVotes);
      localStorage.setItem('menoufia_voted_ideas', JSON.stringify(nextVotes));
      setIdeas(prev =>
        prev.map(item => item.id === id ? { ...item, votes: Math.max(0, item.votes - 1) } : item)
      );
    } else {
      // Vote
      const nextVotes = [...votedIds, id];
      setVotedIds(nextVotes);
      localStorage.setItem('menoufia_voted_ideas', JSON.stringify(nextVotes));
      setIdeas(prev =>
        prev.map(item => item.id === id ? { ...item, votes: item.votes + 1 } : item)
      );
    }
  };

  const handleSubmitIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSummary.trim()) return;

    const newIdea: IdeaItem = {
      id: 'idea-' + Date.now(),
      title: formTitle.trim(),
      proposer: formProposer.trim() || 'مواطن مبدع',
      city: formCity,
      category: formCategory,
      summary: formSummary.trim(),
      votes: 1,
      status: 'قيد التقييم والدراسة',
      submittedAt: 'اليوم (تجريبي)'
    };

    const nextIdeas = [newIdea, ...ideas];
    setIdeas(nextIdeas);
    localStorage.setItem('menoufia_ideas_bank', JSON.stringify(nextIdeas));
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowSubmitModal(false);
      setFormTitle('');
      setFormSummary('');
    }, 2000);
  };

  const filteredIdeas = ideas.filter(item => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => navigate('home')} className="hover:text-emerald-700 transition-colors">
            {t('navHome')}
          </button>
          <span>/</span>
          <button onClick={() => navigate('services')} className="hover:text-emerald-700 transition-colors">
            {t('navServices')}
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">{t('serviceIdeasBank')}</span>
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
      <div className="bg-gradient-to-l from-amber-900 via-emerald-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold">
              <Lightbulb className="w-4 h-4 text-amber-300" />
              <span>{t('serviceIdeasBank')} — إبداعات أهالي المنوفية</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              بنك الأفكار والمقترحات الابتكارية لمحافظة المنوفية
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              منصة مجتمعية تجمع العقول المبدعة، طلبة الجامعات، والخبراء لتقديم حلول ذكية وقابلة للتطبيق في التنمية الحضرية والخدمات والمشروعات الخضراء.
            </p>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="py-3 px-5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-2xl text-xs transition-all shadow-md flex items-center gap-2 shrink-0 hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>تقديم فكرة جديدة</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في الأفكار والمبادرات المطروحة..."
            className="w-full pr-9 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'جميع المسارات' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ideas Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredIdeas.map((idea) => {
          const hasVoted = votedIds.includes(idea.id);
          return (
            <div
              key={idea.id}
              className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    {idea.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                      idea.status === 'فكرة فائزة / مرحلة تجريبية'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : idea.status === 'تم تبنيها محلياً'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {idea.status}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  {idea.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {idea.summary}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between gap-3 text-xs">
                <div className="text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">{idea.proposer}</span> · {idea.city}
                </div>

                <button
                  onClick={() => handleVote(idea.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                    hasVoted
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  title="أعجبني هذا المقترح"
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-current' : ''}`} />
                  <span>{idea.votes}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Idea Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-scaleIn border border-slate-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 text-base">تسجيل فكرة ابتكارية جديدة</h3>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">تم تسجيل فكرتك بنجاح!</h4>
                <p className="text-xs text-slate-500">
                  تمت إضافة الفكرة إلى بنك المقترحات لعرضها على اللجان الاستشارية وأهالي المحافظة.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitIdea} className="space-y-3 text-xs">
                
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    عنوان الفكرة <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="مثال: منصة تبادل المنتجات الحرفية بين قرى أشمون..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">المسار التخصصي</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      <option value="تحول رقمي وذكاء اصطناعي">تحول رقمي وذكاء اصطناعي</option>
                      <option value="بيئة وتدوير مخلفات">بيئة وتدوير مخلفات</option>
                      <option value="تجميل وتطوير الميادين">تجميل وتطوير الميادين</option>
                      <option value="تمكين الشباب والمشروعات">تمكين الشباب والمشروعات</option>
                      <option value="ترشيد طاقة ومياه">ترشيد طاقة ومياه</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">المركز / المدينة</label>
                    <select
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      {MENOUFIA_CITIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">صاحب الفكرة / المبتكر</label>
                  <input
                    type="text"
                    value={formProposer}
                    onChange={(e) => setFormProposer(e.target.value)}
                    placeholder="اسمك أو اسم الفريق"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    شرح الفكرة والأثر المتوقع <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formSummary}
                    onChange={(e) => setFormSummary(e.target.value)}
                    placeholder="اشرح المشكلة، الحل الابتكاري المقترح، وكيف يمكن تنفيذه بتكلفة مناسبة..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-sm flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>نشر في بنك الأفكار</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
