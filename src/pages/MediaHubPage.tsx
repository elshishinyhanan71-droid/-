import React from 'react';
import {
  FileText,
  Building2,
  Info,
  Heart,
  Landmark,
  Compass,
  MapPin,
  Megaphone,
  Award,
  ArrowRight,
  ChevronLeft,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageRoute } from '../types';

export const MediaHubPage: React.FC = () => {
  const { navigate, t, language } = useApp();

  const mediaSections: {
    id: string;
    route: PageRoute;
    title: string;
    subtitle: string;
    desc: string;
    icon: React.ReactNode;
    bg: string;
    badge: string;
  }[] = [
    {
      id: 'gov-card',
      route: 'governorate-card',
      title: 'بطاقة التعريف بمحافظة المنوفية',
      subtitle: 'الموقع، السكان، والمراكز العشرة',
      desc: 'بيانات جغرافية وتاريخية وسكانية موثقة عن محافظة المنوفية وعاصمتها شبين الكوم.',
      icon: <Building2 className="w-6 h-6 text-emerald-700" />,
      bg: 'bg-emerald-50 border-emerald-200 hover:border-emerald-300',
      badge: 'حقائق وأرقام'
    },
    {
      id: 'general-diwan',
      route: 'general-diwan',
      title: 'الديوان العام لمحافظة المنوفية',
      subtitle: 'الهيكل التنظيمي والإدارات المركزية',
      desc: 'معلومات تعريفية عن ديوان عام المحافظة، الإدارات الخدمية، ودور المراكز التكنولوجية.',
      icon: <Landmark className="w-6 h-6 text-indigo-700" />,
      bg: 'bg-indigo-50 border-indigo-200 hover:border-indigo-300',
      badge: 'الهيكل الإداري'
    },
    {
      id: 'about-us',
      route: 'about-us',
      title: 'من نحن — دليل المنوفية',
      subtitle: 'رؤية المنصة والنموذج التجريبي',
      desc: 'تعريف بهذا النموذج التجريبي المستقل، معايير الشفافية، وحدود التجربة الاسترشادية.',
      icon: <Info className="w-6 h-6 text-teal-700" />,
      bg: 'bg-teal-50 border-teal-200 hover:border-teal-300',
      badge: 'النموذج التجريبي'
    },
    {
      id: 'differently-abled',
      route: 'accessibility',
      title: '«قادرون باختلاف» — ذوو الهمم',
      subtitle: 'الخدمات والإتاحة والدعم المتخصص',
      desc: 'دليل مكاتب التأهيل، كارت الخدمات المتكاملة، الخطوط الساخنة، وأدوات الإتاحة الرقمية.',
      icon: <Heart className="w-6 h-6 text-rose-600" />,
      bg: 'bg-rose-50 border-rose-200 hover:border-rose-300',
      badge: 'إتاحة ودعم'
    },
    {
      id: 'history',
      route: 'history-civilization',
      title: 'التاريخ والحضارة',
      subtitle: 'أمجاد المنوفية وعيدها القومي',
      desc: 'سجل الخلود لشهداء دنشواي 1906، ودور قادة المنوفية ورجالها في بناء الدولة المصرية الحديثة.',
      icon: <BookOpen className="w-6 h-6 text-amber-700" />,
      bg: 'bg-amber-50 border-amber-200 hover:border-amber-300',
      badge: 'تاريخ وطني'
    },
    {
      id: 'tourism',
      route: 'tourism-heritage',
      title: 'السياحة والتراث والمعالم',
      subtitle: 'المتاحف، القناطر، والسياحة الريفية',
      desc: 'دليل متحف دنشواي، متحف السادات، القناطر الخيرية القديمة، والآثار الإسلامية.',
      icon: <Compass className="w-6 h-6 text-sky-700" />,
      bg: 'bg-sky-50 border-sky-200 hover:border-sky-300',
      badge: 'مزارات سياحية'
    },
    {
      id: 'maps-articles',
      route: 'maps-articles',
      title: 'الخرائط والمقالات الوثائقية',
      subtitle: 'دراسات جغرافية ومقالات بحثية',
      desc: 'مجموعة من الدراسات والخرائط التوضيحية والمقالات الموثقة حول بيئة وتاريخ المنوفية.',
      icon: <MapPin className="w-6 h-6 text-emerald-800" />,
      bg: 'bg-emerald-50 border-emerald-200 hover:border-emerald-300',
      badge: 'وثائق ومقالات'
    },
    {
      id: 'news-coverage',
      route: 'news',
      title: 'التغطيات الرسمية وآخر المستجدات',
      subtitle: 'أخبار المشروعات والخدمات',
      desc: 'متابعة المشروعات التنموية ومبادرة حياة كريمة ومستجدات المرافق بالمحافظة.',
      icon: <Megaphone className="w-6 h-6 text-purple-700" />,
      bg: 'bg-purple-50 border-purple-200 hover:border-purple-300',
      badge: 'أخبار محلية'
    },
    {
      id: 'achievers',
      route: 'menoufia-achievers',
      title: '«أوائل المنوفية» والمتميزون',
      subtitle: 'شخصيات ملهمة ورواد الفكر',
      desc: 'سجل الشرف للمتفوقين دراسياً، علماء الأزهر والجامعات، والقادة البارزين من أبناء المنوفية.',
      icon: <Award className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-200 hover:border-amber-300',
      badge: 'سجل الشرف'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => navigate('home')} className="hover:text-emerald-700 transition-colors">
            {t('navHome')}
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">{t('mediaHubTitle')}</span>
        </div>

        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-lg transition-colors"
        >
          <ArrowRight className={`w-3.5 h-3.5 ${language === 'en' ? 'rotate-180' : ''}`} />
          <span>{t('backToHome')}</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-l from-slate-900 via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
            <FileText className="w-4 h-4 text-amber-300" />
            <span>{t('mediaHubTitle')} — النافذة المعرفية والثقافية</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            مركز الإعلام والتوعية لمحافظة المنوفية
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            قسم شامل يجمع المعرفة التاريخية والجغرافية، والتعريف بالديوان العام، ودعم قادرون باختلاف، وتوثيق بطولات أهالي المنوفية وأوائلها ومزاراتها التراثية.
          </p>
        </div>
      </div>

      {/* 9 Interactive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mediaSections.map((sec) => (
          <div
            key={sec.id}
            onClick={() => navigate(sec.route)}
            className={`p-5 rounded-3xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between space-y-4 ${sec.bg}`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-white shadow-xs flex items-center justify-center">
                  {sec.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-700 bg-white/80 px-2.5 py-1 rounded-full shadow-2xs">
                  {sec.badge}
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {sec.title}
                </h3>
                <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                  {sec.subtitle}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {sec.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-800 group">
              <span>فتح الصفحة المخصصة</span>
              <ChevronLeft className="w-4 h-4 text-emerald-700 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
