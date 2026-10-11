import React, { useState } from 'react';
import {
  Search,
  PhoneCall,
  UserCheck,
  Building2,
  FileText,
  GraduationCap,
  HeartPulse,
  MapPin,
  CloudSun,
  ArrowLeft,
  Sparkles,
  ChevronLeft,
  Landmark,
  Users,
  Compass,
  MessageCircle,
  ShieldCheck,
  Car,
  Home,
  Zap,
  ShoppingBag,
  ExternalLink,
  Lightbulb,
  TrendingUp,
  Ruler,
  BookOpen,
  Award,
  Megaphone,
  Heart,
  MessageSquare,
  Layers,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  MENOUFIA_CITIES,
  TECH_CENTERS,
  NEWS_ARTICLES,
  HERITAGE_SITES,
  NOTABLE_PERSONALITIES
} from '../data/mockData';
import { GovernorCard } from '../components/GovernorCard';

export const HomePage: React.FC = () => {
  const {
    navigate,
    user,
    setIsAssistantOpen,
    setIsWhatsAppModalOpen,
    globalSearchQuery,
    setGlobalSearchQuery,
    t,
    language
  } = useApp();

  const [selectedCity, setSelectedCity] = useState('شبين الكوم');

  // Filtered preview data
  const cityTechCenter = TECH_CENTERS.find(c => c.city === selectedCity) || TECH_CENTERS[0];
  const featuredNews = NEWS_ARTICLES.slice(0, 3);
  const featuredHeritage = HERITAGE_SITES.slice(0, 3);
  const featuredPersonalities = NOTABLE_PERSONALITIES.slice(0, 3);

  // Quick Action Shortcuts
  const quickActions = [
    {
      title: 'أرقام الطوارئ',
      subtitle: 'إسعاف، نجدة، مطافئ',
      icon: <PhoneCall className="w-5 h-5 text-rose-600" />,
      bg: 'bg-rose-50 hover:bg-rose-100/80 border-rose-200/80',
      route: 'emergency' as const
    },
    {
      title: 'لقاء المحافظ',
      subtitle: 'حجز مقابلة ديوان عام',
      icon: <UserCheck className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50 hover:bg-amber-100/80 border-amber-200/80',
      route: 'governor-meeting' as const
    },
    {
      title: 'المراكز التكنولوجية',
      subtitle: 'تراخيص ومعاملات 10 مراكز',
      icon: <Building2 className="w-5 h-5 text-emerald-700" />,
      bg: 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200/80',
      route: 'tech-centers' as const
    },
    {
      title: 'منظومة الشكاوى',
      subtitle: 'تسجيل وبلاغات ومتابعة',
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      bg: 'bg-blue-50 hover:bg-blue-100/80 border-blue-200/80',
      route: 'complaints' as const
    },
    {
      title: 'النتائج والشهادات',
      subtitle: 'الإعدادية وجداول الامتحانات',
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50 hover:bg-indigo-100/80 border-indigo-200/80',
      route: 'education' as const
    },
    {
      title: 'التأمين والعيادات',
      subtitle: 'حجز واستعلام صحي',
      icon: <HeartPulse className="w-5 h-5 text-teal-600" />,
      bg: 'bg-teal-50 hover:bg-teal-100/80 border-teal-200/80',
      route: 'health' as const
    }
  ];

  // Citizen Services Grid
  const citizenServices = [
    {
      id: 'srv-build',
      title: 'تراخيص البناء والهدم',
      desc: 'بيانات الصلاحية، شهادات المطابقة، وتراخيص الإشغالات',
      icon: <Home className="w-5 h-5 text-emerald-700" />,
      route: 'tech-centers' as const
    },
    {
      id: 'srv-traffic',
      title: 'المرور ومواقف السرفيس',
      desc: 'خطوط السير، مواقف المحافظة، ومخالفات السيارات',
      icon: <Car className="w-5 h-5 text-blue-700" />,
      route: 'directory' as const
    },
    {
      id: 'srv-supply',
      title: 'التموين والبطاقات الذكية',
      desc: 'إضافة المواليد، تالف البطاقة، ومنافذ السلع التموينية',
      icon: <ShoppingBag className="w-5 h-5 text-amber-700" />,
      route: 'links' as const
    },
    {
      id: 'srv-utility',
      title: 'فواتير ومقايسات المرافق',
      desc: 'شحن العدادات الكودية للكهرباء ومياه الشرب والغاز',
      icon: <Zap className="w-5 h-5 text-orange-600" />,
      route: 'emergency' as const
    },
    {
      id: 'srv-disability',
      title: 'خدمات ذوي الهمم',
      desc: 'كارت الخدمات المتكاملة ومراكز التأهيل الشامل',
      icon: <Users className="w-5 h-5 text-purple-700" />,
      route: 'accessibility' as const
    },
    {
      id: 'srv-directory',
      title: 'دليل مرافق المنوفية',
      desc: 'مستشفيات، مكاتب بريد، مدارس، ومحاكم المحافظة',
      icon: <Compass className="w-5 h-5 text-emerald-800" />,
      route: 'directory' as const
    }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearchQuery.trim()) {
      navigate('directory');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. Hero Section with Generated Illustration & Search */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl mx-4 sm:mx-6 mt-4 p-6 sm:p-10 shadow-xl border border-emerald-700/40">
        
        {/* Background artwork layer */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="/src/assets/images/hero_menoufia_portal_1791651154058.jpg"
            alt="خلفية المنوفية"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Right column: Welcome & Search */}
          <div className="lg:col-span-7 space-y-5">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>بوابة المنوفية الرقمية المستقلة</span>
              </span>
              <span className="text-xs text-emerald-200">
                {user ? `مرحباً، ${user.name}` : 'أهلاً بك زائرنا الكريم'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white text-balance">
              دليلك الشامل لخدمات ومعالم ومراكز محافظة المنوفية
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
              تصفح المراكز التكنولوجية العشرة، احجز المواعيد الاسترشادية، وقدم الشكاوى، واطلع على أرقام الطوارئ ونتائج الشهادات في منصة تجريبية تفاعلية واحدة.
            </p>

            {/* Integrated Search Box */}
            <form onSubmit={handleSearchSubmit} className="pt-2">
              <div className="relative flex items-center max-w-xl">
                <input
                  type="text"
                  value={globalSearchQuery}
                  onChange={(e) => setGlobalSearchQuery(e.target.value)}
                  placeholder="ابحث عن خدمة أو مكان في المنوفية (مثال: مركز شبين، مستشفى أشمون...)"
                  className="w-full bg-white text-slate-900 rounded-2xl py-3.5 pr-4 pl-28 text-xs sm:text-sm placeholder:text-slate-400 shadow-lg focus:outline-none focus:ring-3 focus:ring-emerald-400"
                />
                <button
                  type="submit"
                  className="absolute left-2 py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow"
                >
                  <Search className="w-4 h-4" />
                  <span>بحث</span>
                </button>
              </div>
            </form>

            {/* Quick stats banner */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-emerald-200/90">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-300" />
                <span>10 مراكز ومدن رئيسية</span>
              </div>
              <span aria-hidden="true" className="text-emerald-500">·</span>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-300" />
                <span>مراكز تكنولوجية متطورة</span>
              </div>
              <span aria-hidden="true" className="text-emerald-500">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>بيانات تجريبية محلية آمنة</span>
              </div>
            </div>

          </div>

          {/* Left column: Visual Illustration Card */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-400/30 shadow-2xl bg-emerald-950/40">
              <img
                src="/src/assets/images/hero_menoufia_portal_1791651154058.jpg"
                alt="بوابة المنوفية الرقمية"
                className="w-full h-72 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <div className="text-xs text-slate-200">
                  <span className="font-bold text-amber-300 block">محافظة المنوفية</span>
                  <span>أرض الأصالة والعراقة والنهضة الزراعية والصناعية</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. قسم معالي محافظ المنوفية - اللواء عمرو محمد السيد الغريب */}
      <GovernorCard />

      {/* 3. Weather Widget & Emergency Ticker Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-12 gap-4">
          
          {/* Weather Widget */}
          <div className="sm:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/80">
                <CloudSun className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900">طقس شبين الكوم</span>
                  <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">بيانات تجريبية</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">مشمس ومعتدل · الرياح هادئة</p>
              </div>
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">26°</span>
              <span className="text-[11px] text-slate-500 block">مئوية</span>
            </div>
          </div>

          {/* Quick Direct Hotline Card */}
          <div className="sm:col-span-8 bg-gradient-to-r from-emerald-800 to-emerald-700 text-white rounded-2xl p-4 border border-emerald-600 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold">طوارئ المنوفية السريعة الموحدة</h3>
                <p className="text-[11px] text-emerald-100 mt-0.5">
                  الإسعاف (123) · النجدة (122) · الحماية المدنية (180) · مياه الشرب (125) · الكهرباء (121)
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('emergency')}
              className="py-1.5 px-3 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shadow-sm flex items-center gap-1 self-end sm:self-auto"
            >
              <span>دليل أرقام الطوارئ</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 3. Quick Action Shortcuts (6 Core Primary Hubs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">أقسام الوصول السريع</h2>
            <p className="text-xs text-slate-500">اختر المعاملة أو الخدمة المطلوبة للانتقال الفوري</p>
          </div>
          <span className="text-xs text-emerald-700 font-semibold hidden sm:inline">
            كل الأزرار تفاعلية بالكامل
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => navigate(action.route)}
              className={`p-4 rounded-2xl border text-right transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow flex flex-col justify-between min-h-[110px] ${action.bg}`}
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs mb-3">
                {action.icon}
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                  {action.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                  {action.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Sawtak Masmou Initiative (Distinct Green Design) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-l from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-700/50 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-700/60 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                <MessageSquare className="w-4 h-4 text-amber-300" />
                <span>{t('sawtakMasmouTitle')}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                صوتك يصل إلينا — منظومة البلاغات والمقترحات الموحدة
              </h2>
              <p className="text-xs text-emerald-100 max-w-2xl leading-relaxed">
                {t('sawtakMasmouSubtitle')}
              </p>
            </div>

            <button
              onClick={() => navigate('sawtak-masmou')}
              className="py-2.5 px-5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold rounded-xl text-xs transition-colors shadow-sm flex items-center gap-2 shrink-0 self-start md:self-auto"
            >
              <span>{t('sawtakPortalBtn')}</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Action 1: New Complaint */}
            <div
              onClick={() => navigate('complaints')}
              className="bg-white/10 hover:bg-white/15 backdrop-blur-xs p-4 rounded-2xl border border-white/15 transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                {t('sawtakNewComplaint')}
              </h3>
              <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                {t('sawtakNewComplaintDesc')}
              </p>
            </div>

            {/* Action 2: New Proposal */}
            <div
              onClick={() => navigate('community')}
              className="bg-white/10 hover:bg-white/15 backdrop-blur-xs p-4 rounded-2xl border border-white/15 transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                {t('sawtakNewProposal')}
              </h3>
              <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                {t('sawtakNewProposalDesc')}
              </p>
            </div>

            {/* Action 3: Track Request */}
            <div
              onClick={() => navigate('request-tracking')}
              className="bg-white/10 hover:bg-white/15 backdrop-blur-xs p-4 rounded-2xl border border-white/15 transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                {t('sawtakTrackRequest')}
              </h3>
              <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                {t('sawtakTrackRequestDesc')}
              </p>
            </div>

            {/* Action 4: Contact Us */}
            <div
              onClick={() => navigate('contact')}
              className="bg-white/10 hover:bg-white/15 backdrop-blur-xs p-4 rounded-2xl border border-white/15 transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                {t('sawtakContactUs')}
              </h3>
              <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                {t('sawtakContactUsDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services Section (Rounded Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                {t('additionalServicesTitle')}
              </span>
              <span className="text-xs text-slate-400">· أدوات متقدمة</span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 mt-1">
              خدمات تخطيطية واستثمارية واستشارية
            </h2>
          </div>
          <span className="text-xs text-emerald-700 font-semibold hidden sm:inline">
            بطاقات مستقلة قابلة للضغط
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Interactive Map */}
          <div
            onClick={() => navigate('interactive-map')}
            className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col items-center text-center space-y-3 group"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
              <Compass className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
                {t('serviceInteractiveMap')}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                {t('serviceInteractiveMapDesc')}
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 mt-auto pt-2 flex items-center gap-1 group-hover:underline">
              <span>فتح الخريطة</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 2: Urban Plan */}
          <div
            onClick={() => navigate('urban-plan')}
            className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col items-center text-center space-y-3 group"
          >
            <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs">
              <Ruler className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-teal-800 transition-colors">
                {t('serviceUrbanPlan')}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                {t('serviceUrbanPlanDesc')}
              </p>
            </div>
            <span className="text-[11px] font-bold text-teal-700 mt-auto pt-2 flex items-center gap-1 group-hover:underline">
              <span>بيان الاشتراطات</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 3: Ideas Bank */}
          <div
            onClick={() => navigate('ideas-bank')}
            className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col items-center text-center space-y-3 group"
          >
            <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-xs">
              <Lightbulb className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                {t('serviceIdeasBank')}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                {t('serviceIdeasBankDesc')}
              </p>
            </div>
            <span className="text-[11px] font-bold text-amber-700 mt-auto pt-2 flex items-center gap-1 group-hover:underline">
              <span>استعراض الأفكار</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 4: Investment Services */}
          <div
            onClick={() => navigate('investment-services')}
            className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col items-center text-center space-y-3 group"
          >
            <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-indigo-800 transition-colors">
                {t('serviceInvestment')}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                {t('serviceInvestmentDesc')}
              </p>
            </div>
            <span className="text-[11px] font-bold text-indigo-700 mt-auto pt-2 flex items-center gap-1 group-hover:underline">
              <span>فرص الاستثمار</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </section>

      {/* 4. Technology Centers Spotlight (Interactive city selector & Center preview) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  خدمات المحليات
                </span>
                <span className="text-xs text-slate-400">· نموذج تجريبي</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                المراكز التكنولوجية لخدمة المواطنين
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                اختر المركز أو المدينة لاستعراض الخدمات وحجز موعد استرشادي فوري
              </p>
            </div>

            <button
              onClick={() => navigate('tech-centers')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl transition-colors self-start md:self-auto"
            >
              <span>عرض جميع المراكز (10 مدن)</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* City Horizontal Tab Selector */}
          <div>
            <span className="text-xs font-semibold text-slate-600 block mb-2">اختر المركز / المدينة:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {MENOUFIA_CITIES.map((city) => {
                const isSelected = selectedCity === city;
                return (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {city}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Center Card Grid */}
          <div className="grid md:grid-cols-12 gap-6 items-center bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/80">
            
            <div className="md:col-span-5 rounded-xl overflow-hidden border border-slate-200 h-52 bg-slate-200">
              <img
                src="/src/assets/images/tech_center_service_1791651175977.jpg"
                alt="مركز تكنولوجي"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded">
                  مركز خدمة معتمد تجريبياً
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {cityTechCenter.workingHours}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {cityTechCenter.name}
              </h3>

              <p className="text-xs text-slate-600 flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{cityTechCenter.address} ({cityTechCenter.googleMapsHint})</span>
              </p>

              <div>
                <span className="text-[11px] font-bold text-slate-700 block mb-1">أهم المعاملات المتاحة:</span>
                <div className="flex flex-wrap gap-1.5">
                  {cityTechCenter.services.slice(0, 3).map((srv, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-lg"
                    >
                      {srv}
                    </span>
                  ))}
                  {cityTechCenter.services.length > 3 && (
                    <span className="text-[11px] text-slate-400 self-center">
                      +{cityTechCenter.services.length - 3} خدمات أخرى
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => navigate('tech-centers')}
                  className="py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Building2 className="w-4 h-4" />
                  <span>حجز موعد بالمركز التكنولوجي</span>
                </button>
                <button
                  onClick={() => navigate('tech-centers')}
                  className="py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold transition-colors"
                >
                  تفاصيل المركز
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. Citizen Services Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">منظومة خدمات المواطنين</h2>
            <p className="text-xs text-slate-500">معاملات الإسكان، المرور، المرافق، والضمان الاجتماعي</p>
          </div>
          <button
            onClick={() => navigate('directory')}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>دليل المرافق الكامل</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {citizenServices.map((srv) => (
            <div
              key={srv.id}
              onClick={() => navigate(srv.route)}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-emerald-50 flex items-center justify-center transition-colors mb-3">
                  {srv.icon}
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                <span>فتح تفاصيل الخدمة</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Latest Demo News & Announcements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                المركز الإعلامي
              </span>
              <span className="text-xs text-slate-400">· أخبار تجريبية</span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 mt-1">آخر الأخبار والإعلانات المحلية</h2>
          </div>
          <button
            onClick={() => navigate('news')}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>كافة الأخبار والبيانات</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredNews.map((news) => (
            <div
              key={news.id}
              onClick={() => navigate('news')}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between hover:border-emerald-300 hover:shadow transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                    {news.category}
                  </span>
                  <span className="text-[11px] font-mono">{news.date}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                  {news.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {news.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px]">وقت القراءة: {news.readTime}</span>
                <span className="font-semibold text-emerald-700 group-hover:underline">قراءة البيان</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Tourism, Heritage & Notable Personalities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Heritage column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  تراث ومعالم المنوفية التاريخية
                </h2>
                <p className="text-xs text-slate-500">متحف دنشواي، ميت أبو الكوم، والمزارات التراثية</p>
              </div>
              <button
                onClick={() => navigate('tourism')}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <span>دليل السياحة</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden h-44 relative border border-slate-200">
              <img
                src="/src/assets/images/menoufia_heritage_landmark_1791651165888.jpg"
                alt="تراث المنوفية"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <div className="text-white text-xs">
                  <span className="font-bold text-amber-300 block">أبراج الحمام ومآذن وسط الدلتا العريقة</span>
                  <span>شواهد حية على نضال وأصالة قرى المنوفية عبر العصور</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {featuredHeritage.map((site) => (
                <div
                  key={site.id}
                  onClick={() => navigate('tourism')}
                  className="p-3 bg-slate-50 hover:bg-emerald-50/50 rounded-xl border border-slate-200/80 cursor-pointer transition-colors flex items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{site.name}</h4>
                    <span className="text-[11px] text-slate-500">{site.city} · {site.category}</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Personalities column */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    شخصيات منوفية بارزة
                  </h2>
                  <p className="text-xs text-slate-500">قادة وفلاسفة وعلماء وأدباء أثروا تاريخ مصر</p>
                </div>
                <button
                  onClick={() => navigate('personalities')}
                  className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <span>عرض الكل</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3 mt-4">
                {featuredPersonalities.map((pers) => (
                  <div
                    key={pers.id}
                    onClick={() => navigate('personalities')}
                    className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/80 cursor-pointer transition-colors flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {pers.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{pers.name}</h4>
                      <p className="text-[11px] text-emerald-700">{pers.title}</p>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">{pers.birthCity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community voice banner */}
            <div className="pt-4 border-t border-slate-100">
              <div
                onClick={() => navigate('community')}
                className="bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/90 rounded-2xl p-3.5 cursor-pointer transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-5 h-5 text-emerald-700" />
                  <div>
                    <span className="text-xs font-bold text-emerald-950 block">مبادرة «صوت المنوفية»</span>
                    <span className="text-[11px] text-emerald-800">شارك باقتراحك وصوت على مبادرات أهالينا</span>
                  </div>
                </div>
                <ArrowLeft className="w-4 h-4 text-emerald-700" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Media & Awareness Section (9 Interactive Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-200">
                {t('mediaHubTitle')}
              </span>
              <span className="text-xs text-slate-400">· نافذة التوعية والثقافة</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              الإعلام والتوعية بمحافظة المنوفية
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              بطاقات تفاعلية مستقلة تفتح صفحات تفصيلية موثقة وشاملة
            </p>
          </div>

          <button
            onClick={() => navigate('media-hub')}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>عرض دليل الإعلام كاملاً</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: Governorate Card */}
          <div
            onClick={() => navigate('governorate-card')}
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  بطاقة تعريف
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
                {t('mediaGovCard')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {t('mediaGovCardDesc')}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>عرض بطاقة التعريف</span>
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: General Diwan */}
          <div
            onClick={() => navigate('general-diwan')}
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                  الجهاز التنفيذي
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-indigo-700 group-hover:scale-110 transition-transform">
                  <Landmark className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-indigo-800 transition-colors">
                {t('mediaDiwan')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {t('mediaDiwanDesc')}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700">
              <span>عرض بيانات الديوان</span>
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: About Us */}
          <div
            onClick={() => navigate('about-us')}
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                  النموذج التجريبي
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-teal-700 group-hover:scale-110 transition-transform">
                  <Info className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-teal-800 transition-colors">
                {t('mediaAboutUs')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {t('mediaAboutUsDesc')}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>رؤية المنصة والشفافية</span>
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Differently Abled */}
          <div
            onClick={() => navigate('accessibility')}
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                  إتاحة ودعم
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                  <Heart className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-rose-700 transition-colors">
                {t('mediaDifferentlyAbled')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {t('mediaDifferentlyAbledDesc')}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-700">
              <span>خدمات وأدوات الإتاحة</span>
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: History & Civilization */}
          <div
            onClick={() => navigate('history-civilization')}
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  تاريخ وطني
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-amber-800 transition-colors">
                {t('mediaHistory')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {t('mediaHistoryDesc')}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>استكشاف تاريخ المنوفية</span>
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Tourism & Heritage */}
          <div
            onClick={() => navigate('tourism-heritage')}
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200">
                  مزارات ومعالم
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-sky-700 group-hover:scale-110 transition-transform">
                  <Compass className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-sky-800 transition-colors">
                {t('mediaTourism')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {t('mediaTourismDesc')}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700">
              <span>دليل المتاحف والمزارات</span>
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 7: Maps & Articles */}
          <div
            onClick={() => navigate('maps-articles')}
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  دراسات وخرائط
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-emerald-800 group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
                {t('mediaMapsArticles')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {t('mediaMapsArticlesDesc')}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>قراءة الدراسات والمقالات</span>
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 8: Official Coverage & News */}
          <div
            onClick={() => navigate('news')}
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200">
                  أخبار المشروعات
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-purple-700 group-hover:scale-110 transition-transform">
                  <Megaphone className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-purple-800 transition-colors">
                {t('mediaCoverage')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {t('mediaCoverageDesc')}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
              <span>تصفح المستجدات والتغطيات</span>
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 9: Menoufia Achievers */}
          <div
            onClick={() => navigate('menoufia-achievers')}
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  لوحة الشرف
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                  <Award className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                {t('mediaAchievers')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {t('mediaAchieversDesc')}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>سير القادة والعلماء والمتفوقين</span>
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* 8. Interactive Assistant and Contact Floating Hub Prompt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center md:text-right">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold inline-block">
              دعم وتوجيه المواطنين
            </span>
            <h3 className="text-lg sm:text-xl font-bold">
              هل تبحث عن خدمة معينة أو تحتاج إرشاداً سريعاً؟
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              المساعد الإرشادي الذكي جاهز للإجابة على تساؤلاتك حول خطوات حجز المواعيد، متابعة الشكاوى، وخدمات ذوي الهمم.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>فتح المساعد الإرشادي</span>
            </button>
            <button
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>محادثة واتساب التجريبية</span>
            </button>
          </div>
        </div>
      </section>

      {/* Reviewer & Testing Toolkit Quick Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 pb-4">
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-950">
          <div className="flex items-center gap-2.5 text-right w-full sm:w-auto">
            <span className="w-8 h-8 rounded-lg bg-amber-200/70 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
              🛠️
            </span>
            <div>
              <p className="text-xs font-bold text-amber-900">أدوات الفحص والتقييم للنموذج التجريبي</p>
              <p className="text-[11px] text-amber-800">جرب مسارات حجز المواعيد والشكاوى، أو تصفح لوحة الإدارة ودليل الاختبار الكامل</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={() => navigate('my-requests')}
              className="px-3 py-1.5 bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-bold transition-colors"
            >
              📋 طلباتي وتذاكري
            </button>
            <button
              onClick={() => navigate('admin')}
              className="px-3 py-1.5 bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-bold transition-colors"
            >
              ⚙️ لوحة الإدارة والمحاكاة
            </button>
            <button
              onClick={() => navigate('testing-guide')}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
            >
              📖 دليل الاختبار خطوة بخطوة
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
