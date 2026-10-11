import React, { useState } from 'react';
import {
  Award,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
  BookOpen,
  X,
  ChevronLeft,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NOTABLE_PERSONALITIES } from '../data/mockData';
import { NotablePersonality } from '../types';

export const MenoufiaAchieversPage: React.FC = () => {
  const { navigate, t, language } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState<string>('all');
  const [selectedPerson, setSelectedPerson] = useState<NotablePersonality | null>(null);

  const fields = ['all', 'قادة وزعماء', 'علماء ومفكرون', 'رواد الصحافة والأدب', 'أوائل التعليم'];

  // Add sample educational achiever to show full spectrum
  const extendedPersonalities: NotablePersonality[] = [
    ...NOTABLE_PERSONALITIES,
    {
      id: 'ach-1',
      name: 'أحمد ياسر عبد الفتاح',
      title: 'المركز الأول على مستوى الجمهورية (الشهادة الإعدادية العامة 2026)',
      category: 'أوائل التعليم',
      period: '2026',
      field: 'علوم وطب',
      birthCity: 'شبين الكوم',
      era: '2026',
      bio: 'حقق الدرجة النهائية 280/280 في الشهادة الإعدادية بمحافظة المنوفية، وتم تكريمه في احتفالية التفوق العلمي بديوان عام المحافظة.',
      keyContributions: [
        'المركز الأول مكرر على مستوى الجمهورية بمجموع 100%',
        'التفوق في مسابقات الروبوت والبرمجة المدرسية',
        'تمثيل المنوفية في الأولمبياد الوطني للعلوم والرياضيات'
      ]
    }
  ];

  const filtered = extendedPersonalities.filter(person => {
    const matchField = selectedField === 'all' || person.category === selectedField;
    const matchSearch =
      searchQuery === '' ||
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.birthCity.includes(searchQuery) ||
      person.bio.includes(searchQuery);
    return matchField && matchSearch;
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
          <button onClick={() => navigate('media-hub')} className="hover:text-emerald-700 transition-colors">
            {t('mediaHubTitle')}
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">{t('mediaAchievers')}</span>
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
      <div className="bg-gradient-to-l from-amber-950 via-emerald-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
            <Award className="w-4 h-4 text-amber-300" />
            <span>لوحة الشرف الوطنية</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            «أوائل المنوفية» ورواد الفكر والقيادة
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            توثيق لسير العظماء والعلماء والقادة الذين أنجبتهم أرض المنوفية الطيبة وخلدوا أسماءهم في تاريخ مصر والأمة، إلى جانب تكريم المتفوقين في التعليم.
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
            placeholder="ابحث بالاسم أو التخصص أو المدينة..."
            className="w-full pr-9 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {fields.map(f => (
            <button
              key={f}
              onClick={() => setSelectedField(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedField === f
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f === 'all' ? 'جميع المجالات' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(person => (
          <div
            key={person.id}
            onClick={() => setSelectedPerson(person)}
            className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {person.category}
                </span>
                <span className="text-[10px] font-bold text-slate-500">
                  {person.era}
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {person.name}
                </h3>
                <p className="text-xs font-bold text-emerald-700 mt-0.5">
                  {person.title}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>مسقط الرأس: {person.birthCity}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {person.bio}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>عرض السيرة والتكريم</span>
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Person Detail Modal */}
      {selectedPerson && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 border border-slate-200 animate-scaleIn">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {selectedPerson.category} · {selectedPerson.era}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1.5">
                  {selectedPerson.name}
                </h3>
                <p className="text-xs font-bold text-emerald-700">{selectedPerson.title}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">مسقط الرأس: {selectedPerson.birthCity}</p>
              </div>
              <button
                onClick={() => setSelectedPerson(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p className="font-medium text-slate-800 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                {selectedPerson.bio}
              </p>

              {selectedPerson.keyContributions && (
                <div className="space-y-2 pt-1">
                  <span className="font-bold text-slate-900 block text-xs">أبرز المحطات والإنجازات الوطنية:</span>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-600 text-[11px]">
                    {selectedPerson.keyContributions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedPerson(null)}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
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
