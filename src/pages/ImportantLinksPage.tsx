import React, { useState } from 'react';
import {
  Link as LinkIcon,
  Search,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Globe,
  Building,
  GraduationCap,
  Car,
  Home,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PortalLink {
  title: string;
  category: 'خدمات مركزية' | 'مرور ونقل' | 'تعليم وجامعات' | 'إسكان واستثمار';
  url: string;
  desc: string;
  icon: React.ReactNode;
}

const OFFICIAL_LINKS: PortalLink[] = [
  {
    title: 'بوابة مصر الرقمية (Digital Egypt)',
    category: 'خدمات مركزية',
    url: 'https://digital.gov.eg',
    desc: 'المنصة القومية الموحدة لخدمات التموين، التوثيق والشهر العقاري، ورخص القيادة والمركبات.',
    icon: <Globe className="w-5 h-5 text-emerald-700" />
  },
  {
    title: 'منظومة الشكاوى الحكومية الموحدة (مجلس الوزراء)',
    category: 'خدمات مركزية',
    url: 'https://www.shakwa.eg',
    desc: 'القناة الرسمية المركزية لتلقي وفحص ومعالجة شكاوى المواطنين على مستوى كافة الوزارات.',
    icon: <ShieldCheck className="w-5 h-5 text-indigo-700" />
  },
  {
    title: 'بوابة النيابة العامة لخدمات المرور',
    category: 'مرور ونقل',
    url: 'https://ppo.gov.eg',
    desc: 'الاستعلام الفوري عن مخالفات رخص القيادة والمركبات وسداد الغرامات وتجديد الرخص.',
    icon: <Car className="w-5 h-5 text-sky-700" />
  },
  {
    title: 'الموقع الرسمي لجامعة المنوفية',
    category: 'تعليم وجامعات',
    url: 'https://mu.menofia.edu.eg',
    desc: 'البوابة الأكاديمية لكليات الجامعة، الجداول الدراسية، نتائج الامتحانات، والدراسات العليا.',
    icon: <GraduationCap className="w-5 h-5 text-purple-700" />
  },
  {
    title: 'بوابة الوظائف الحكومية (الجهاز المركزي للتنظيم والإدارة)',
    category: 'خدمات مركزية',
    url: 'https://jobs.caoa.gov.eg',
    desc: 'الإعلانات الرسمية للمسابقات والتعيينات الحكومية وشروط التقدم والنتائج.',
    icon: <Briefcase className="w-5 h-5 text-amber-700" />
  },
  {
    title: 'صندوق الإسكان الاجتماعي ودعم التمويل العقاري',
    category: 'إسكان واستثمار',
    url: 'https://cff.gov.eg',
    desc: 'حجز ومتابعة وحدات «سكن لكل المصريين» والوحدات المطروحة بمدن المحافظة.',
    icon: <Home className="w-5 h-5 text-teal-700" />
  },
  {
    title: 'الهيئة العامة للتنمية الصناعية (IDA)',
    category: 'إسكان واستثمار',
    url: 'https://ida.gov.eg',
    desc: 'طروحات الأراضي الصناعية ورخص التشغيل للمصانع بقويسنا ومدينة السادات.',
    icon: <Building className="w-5 h-5 text-slate-700" />
  }
];

export const ImportantLinksPage: React.FC = () => {
  const { navigate, t, language } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'خدمات مركزية', 'مرور ونقل', 'تعليم وجامعات', 'إسكان واستثمار'];

  const filteredLinks = OFFICIAL_LINKS.filter(l => {
    const matchCat = selectedCategory === 'all' || l.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.desc.toLowerCase().includes(searchQuery.toLowerCase());
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
          <span className="font-semibold text-slate-900">{t('navLinks')}</span>
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
      <div className="bg-gradient-to-l from-slate-900 via-indigo-950 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
            <LinkIcon className="w-4 h-4 text-amber-300" />
            <span>دليل البوابات والمواقع الحكومية</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            روابط ومنصات رسمية مهمة
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            دليل موثق للوصول السريع إلى المنصات الحكومية الرسمية المعتمدة لجمهورية مصر العربية في مجالات التموين، المرور، التعليم، الإسكان، والاستثمار.
          </p>
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
            placeholder="ابحث عن بوابة أو منصة رسمية..."
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

      {/* Links List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {link.category}
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                  {link.icon}
                </div>
              </div>

              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
                {link.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {link.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span className="font-mono text-[11px] text-slate-400">{link.url.replace('https://', '')}</span>
              <span className="flex items-center gap-1 group-hover:underline">
                <span>زيارة الموقع</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Notice */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-[11px] flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
        <span>
          جميع الروابط المذكورة تؤدي إلى نطاقات حكومية مصرية رسمية معتمدة (`.gov.eg` / `.edu.eg`).
        </span>
      </div>

    </div>
  );
};
