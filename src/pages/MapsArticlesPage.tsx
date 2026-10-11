import React, { useState } from 'react';
import {
  MapPin,
  BookOpen,
  FileText,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Calendar,
  User,
  Share2,
  X,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ArticleItem {
  id: string;
  title: string;
  category: 'جغرافيا ومياه' | 'تعليم وجامعات' | 'تراث وصناعات يدوية' | 'تخطيط وطرق';
  author: string;
  readTime: string;
  date: string;
  summary: string;
  fullContent: string;
}

const ARTICLES: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'الشبكة المائية بالمنوفية: شريان الخصوبة الزراعية بين فرعي رشيد ودمياط',
    category: 'جغرافيا ومياه',
    author: 'أ.د. سمير الباجوري (دراسات دلتا النيل)',
    readTime: '4 دقائق قراءة',
    date: '04 أكتوبر 2026',
    summary: 'تحليل بيئي وجغرافي لطبيعة الأراضي الطمية الرسوبية المحصورة بين فرعي النيل، وأثر مشروع تبطين الترع في تحسين جودة مياه الري بالقرى.',
    fullContent: 'تعد محافظة المنوفية قلب الدلتا المائي النابض؛ حيث تحتضن شبكة كثيفة من الرياحات والقنوات مثل بحر شبين، وترعة الباجورية، وترعة القاصد. هذه المنظومة المائية التاريخية جعلت من تربة المنوفية أخصب الأراضي الزراعية في مصر بإنتاجية استثنائية من محاصيل القمح، والذرة، والبطاطس، والخضروات التي تغذي العاصمة وتصدر للأسواق الخارجية.'
  },
  {
    id: 'art-2',
    title: 'تطور التعليم العالي في المنوفية: قصة أول كلية هندسة إلكترونية بالشرق الأوسط',
    category: 'تعليم وجامعات',
    author: 'م. مروان الشنواني',
    readTime: '5 دقائق قراءة',
    date: '28 سبتمبر 2026',
    summary: 'كيف أصبحت المنوفية منارة هندسية بتأسيس المعهد العالي للإلكترونيات بمنوف عام 1964 الذي تحول إلى كلية الهندسة الإلكترونية بجامعة المنوفية.',
    fullContent: 'في أوائل الستينيات، كانت مصر بحاجة ملحة لتأسيس كوادر تكنولوجية متخصصة في الاتصالات والدوائر الإلكترونية الناشئة. فوقع الاختيار على مدينة منوف لتكون مهداً لأول صرح تعليمي متخصص في هندسة الإلكترونيات بالشرق الأوسط. خرجت الكلية آلاف العلماء والمهندسين الذين قادوا قطاعات الاتصالات والرادارات وتكنولوجيا المعلومات في مصر والعالم العربي.'
  },
  {
    id: 'art-3',
    title: 'قرى الذهب الأخضر والحرف: الصدف بساقية المنقدي والسجاد بساقية أبو شعرة',
    category: 'تراث وصناعات يدوية',
    author: 'هناء العفيفي (باحثة في التراث الشعبي)',
    readTime: '3 دقائق قراءة',
    date: '15 سبتمبر 2026',
    summary: 'جولة توثيقية في قرى مركز أشمون التي حافظت على تقاليد الصدف والأرابيسك وتصدير السجاد الحريري إلى قارات العالم.',
    fullContent: 'تتميز قرية ساقية المنقدي بمركز أشمون بأنها قلعة تطعيم خشب الزان بالصدف الطبيعي والأرابيسك، حيث يعمل مئات الحرفيين في ورش متوارثة تنتج الصناديق والمقاعد والتحف التي تزين القصور والمتاحف في أوروبا والخليج. وبجوارها قرية ساقية أبو شعرة الرائدة في نسج السجاد الحريري اليدوي ذي العقد المتقنة.'
  }
];

export const MapsArticlesPage: React.FC = () => {
  const { navigate, t, language } = useApp();

  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'جغرافيا ومياه', 'تعليم وجامعات', 'تراث وصناعات يدوية', 'تخطيط وطرق'];

  const filtered = ARTICLES.filter(art => {
    const matchCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

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
          <span className="font-semibold text-slate-900">{t('mediaMapsArticles')}</span>
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
      <div className="bg-gradient-to-l from-emerald-950 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>مقالات وأبحاث موثقة</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            الخرائط والمقالات الوثائقية عن المنوفية
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            مكتبة رقمية تضم دراسات جغرافية وبحثية وتراثية حول الخصائص الطبيعية للمحافظة وتاريخ مراكزها ونهضتها التنموية.
          </p>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في المقالات والدراسات..."
            className="w-full pr-9 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'جميع التصنيفات' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {filtered.map(art => (
          <div
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {art.category}
              </span>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span>{art.date}</span>
                <span>·</span>
                <span>{art.readTime}</span>
              </div>
            </div>

            <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
              {art.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {art.summary}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">{art.author}</span>
              <span className="font-bold text-emerald-800 group-hover:underline flex items-center gap-1">
                <span>قراءة المقال كاملاً</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 border border-slate-200 max-h-[90vh] overflow-y-auto animate-scaleIn">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {selectedArticle.category}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-2 leading-snug">
                  {selectedArticle.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  بقلم: {selectedArticle.author} · {selectedArticle.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
              <p className="font-bold text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                {selectedArticle.summary}
              </p>
              <p>{selectedArticle.fullContent}</p>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                إغلاق المقال
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
