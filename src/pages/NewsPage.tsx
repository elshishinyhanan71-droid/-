import React, { useState } from 'react';
import {
  Megaphone,
  Calendar,
  Clock,
  Share2,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  X,
  Search,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NEWS_ARTICLES } from '../data/mockData';
import { NewsArticle } from '../types';

export const NewsPage: React.FC = () => {
  const { navigate } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [sharedCopied, setSharedCopied] = useState(false);

  const categories = [
    { id: 'all', label: 'كافة الأخبار' },
    { id: 'تطوير ومشروعات', label: 'تطوير ومشروعات' },
    { id: 'إعلانات خدمية', label: 'إعلانات خدمية' },
    { id: 'تعليم', label: 'تعليم وشهادات' },
    { id: 'صحة', label: 'صحة وقوافل' },
    { id: 'طوارئ وتنبيهات', label: 'طوارئ وتنبيهات' }
  ];

  const filteredNews = NEWS_ARTICLES.filter(item => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleShare = (article: NewsArticle) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${article.title} - دليل المنوفية`);
      setSharedCopied(true);
      setTimeout(() => setSharedCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>
        <span className="text-xs text-slate-400 font-mono">المركز الإعلامي</span>
      </div>

      {/* Main Title Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
              الأخبار والبيانات الصحفية
            </span>
            <span className="text-xs text-slate-400">· محافظة المنوفية</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            المركز الإعلامي والبيانات الرسمية الاسترشادية
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            متابعة المشروعات، إعلانات مديريات التموين والصحة والتعليم، والتنبيهات الميدانية
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
          <Megaphone className="w-6 h-6" />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p>
          <strong>تنويه إخباري:</strong> كافة المقالات والبيانات الواردة موسومة بـ <strong>«خبر تجريبي»</strong> ومصممة لأغراض توضيح الهيكل الإخباري للمنصة، ولا تمثل بيانات حكومية رسمية ملزمة.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في الأخبار والبيانات الصحفية..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                selectedCategory === c.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  {article.category}
                </span>
                <span className="text-[11px] font-mono">{article.date}</span>
              </div>

              <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                {article.summary}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px]">قراءة: {article.readTime}</span>
              <span className="font-bold text-emerald-700 group-hover:underline flex items-center gap-1">
                <span>التفاصيل الكاملة</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedArticle.date}</span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                {selectedArticle.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                <span>المصدر: {selectedArticle.source}</span>
                <span>·</span>
                <span>وقت القراءة: {selectedArticle.readTime}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
              <p className="font-medium text-slate-900">{selectedArticle.summary}</p>
              <p>{selectedArticle.content}</p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <button
                onClick={() => handleShare(selectedArticle)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>{sharedCopied ? 'تم نسخ العنوان' : 'مشاركة الخبر'}</span>
              </button>

              <button
                onClick={() => setSelectedArticle(null)}
                className="py-2 px-5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
