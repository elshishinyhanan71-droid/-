import React, { useState } from 'react';
import {
  Bell,
  Search,
  MessageSquare,
  User as UserIcon,
  ShieldCheck,
  Menu,
  X,
  Compass,
  PhoneCall,
  FileText,
  Building2,
  Sparkles,
  Info,
  Layers,
  HelpCircle,
  BarChart3,
  Hammer,
  ClipboardList,
  Sliders,
  CheckCircle2,
  ArrowLeft,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageRoute } from '../types';
import { TECH_CENTERS } from '../data/mockData';
import menoufiaLogo from '../assets/images/menoufia_governorate_logo_clean.png';

export const Header: React.FC = () => {
  const {
    navigate,
    currentRoute,
    user,
    notifications,
    setIsNotificationsOpen,
    setIsAssistantOpen,
    globalSearchQuery,
    setGlobalSearchQuery,
    newsArticles,
    directoryItems,
    language,
    setLanguage,
    t
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const primaryNavLinks: { label: string; route: PageRoute; icon: React.ReactNode }[] = [
    { label: t('navHome'), route: 'home', icon: <Compass className="w-4 h-4" /> },
    { label: t('navDirectory'), route: 'directory', icon: <Building2 className="w-4 h-4" /> },
    { label: t('navServices'), route: 'services', icon: <Layers className="w-4 h-4" /> },
    { label: t('navProjects'), route: 'projects', icon: <Hammer className="w-4 h-4" /> },
    { label: t('navNews'), route: 'news', icon: <FileText className="w-4 h-4" /> }
  ];

  // Suggestions for autocomplete search
  const suggestions = globalSearchQuery.trim().length > 1
    ? [
        ...TECH_CENTERS.filter(c => c.name.includes(globalSearchQuery) || c.city.includes(globalSearchQuery))
          .map(c => ({ title: c.name, type: 'مركز تكنولوجي', route: 'tech-centers' as PageRoute })),
        ...directoryItems.filter(d => d.name.includes(globalSearchQuery) || d.category.includes(globalSearchQuery))
          .map(d => ({ title: d.name, type: d.category, route: 'directory' as PageRoute })),
        ...newsArticles.filter(n => n.title.includes(globalSearchQuery))
          .map(n => ({ title: n.title, type: 'خبر محلي', route: 'news' as PageRoute })),
        { title: 'السيرة الذاتية لمحافظ المنوفية (اللواء عمرو الغريب)', type: 'قيادة المحافظة', route: 'governor-bio' as PageRoute },
        { title: 'أرقام الطوارئ السريعة', type: 'طوارئ', route: 'emergency' as PageRoute },
        { title: 'حجز لقاء المحافظ', type: 'ديوان عام', route: 'governor-meeting' as PageRoute },
        { title: 'منظومة الشكاوى والبلاغات', type: 'شكاوى', route: 'complaints' as PageRoute },
        { title: 'نتائج الشهادات والامتحانات', type: 'تعليم', route: 'education' as PageRoute }
      ].slice(0, 5)
    : [];

  return (
    <>
      {/* Top Banner Notice: Clear Prototype Disclosure */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 border-b border-emerald-800">
        <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
        <span className="font-medium">
          نموذج تجريبي مستقل استرشادي لمحافظة المنوفية — غير تابع رسمياً لديوان عام المحافظة
        </span>
      </div>

      {/* Main Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
          
          {/* Zone 1: Single-Element Wordmark Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigate('home');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 text-right group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center p-1 text-white shadow-sm shadow-emerald-700/20 group-hover:scale-105 transition-transform overflow-hidden">
                <img
                  src={menoufiaLogo}
                  alt="شعار محافظة المنوفية"
                  className="w-full h-full object-contain filter drop-shadow-sm select-none"
                  loading="eager"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-slate-900 tracking-tight whitespace-nowrap leading-none">
                  دليل المنوفية
                </span>
                <span className="text-[11px] text-emerald-700 font-medium whitespace-nowrap mt-0.5">
                  بوابة الخدمات والمعلومات
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {primaryNavLinks.map(link => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => navigate(link.route)}
                  className={`flex items-center gap-1.5 transition-colors whitespace-nowrap py-1 ${
                    isActive
                      ? 'text-emerald-700 font-bold border-b-2 border-emerald-600'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Interactive Affordances & User CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="بحث في الدليل"
              aria-label="بحث في الدليل"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switch Button: العربية | English */}
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 rounded-xl transition-colors whitespace-nowrap shadow-2xs"
              title={language === 'ar' ? 'Switch to English' : 'التحويل إلى اللغة العربية'}
              aria-label="تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* AI/Rule Assistant Shortcut */}
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-lg transition-colors whitespace-nowrap"
              title="المساعد التفاعلي"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">المساعد الذكي</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="التنبيهات"
              aria-label="التنبيهات"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Profile / Auth Button */}
            {user ? (
              <button
                onClick={() => navigate('profile')}
                className="flex items-center gap-2 p-1.5 pl-2.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors"
                title="الملف الشخصي"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0) || 'م'}
                </div>
                <span className="hidden md:inline text-xs font-semibold text-slate-800 max-w-[90px] truncate">
                  {user.name}
                </span>
              </button>
            ) : (
              <button
                onClick={() => navigate('login')}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap"
              >
                تسجيل الدخول
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Global Search Bar (Collapsible with live suggestions) */}
        {searchOpen && (
          <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 transition-all animate-fadeIn">
            <div className="max-w-3xl mx-auto space-y-2">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={globalSearchQuery}
                  onChange={(e) => setGlobalSearchQuery(e.target.value)}
                  placeholder="ابحث عن مركز تكنولوجي، مستشفى، خدمة، رقم طوارئ، أو شكوى..."
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  autoFocus
                />
                {globalSearchQuery && (
                  <button
                    onClick={() => setGlobalSearchQuery('')}
                    className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1"
                  >
                    مسح
                  </button>
                )}
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Autocomplete Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-md divide-y divide-slate-100 overflow-hidden">
                  <div className="p-2 text-[11px] font-bold text-slate-400 bg-slate-50">
                    اقتراحات البحث المباشرة:
                  </div>
                  {suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchOpen(false);
                        navigate(sug.route);
                      }}
                      className="w-full text-right p-2.5 hover:bg-emerald-50 text-xs flex items-center justify-between text-slate-800 transition-colors"
                    >
                      <span className="font-semibold">{sug.title}</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {sug.type}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile / Secondary Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 shadow-lg animate-fadeIn max-h-[80vh] overflow-y-auto">
            <div className="text-[11px] font-bold text-slate-400 px-3 pb-1">الأقسام الرئيسية:</div>
            {primaryNavLinks.map(link => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => {
                    navigate(link.route);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-right ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-emerald-700">{link.icon}</span>
                  <span>{link.label}</span>
                </button>
              );
            })}

            <div className="pt-2 border-t border-slate-100 space-y-1">
              <div className="text-[11px] font-bold text-slate-400 px-3 pb-1">أدوات إضافية:</div>
              <button
                onClick={() => {
                  navigate('my-requests');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg text-right"
              >
                <ClipboardList className="w-4 h-4 text-emerald-700" />
                <span>طلباتي وحجوزاتي التجريبية</span>
              </button>
              <button
                onClick={() => {
                  navigate('testing-guide');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 rounded-lg text-right"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>دليل تجربة التطبيق والمسارات</span>
              </button>
              <button
                onClick={() => {
                  navigate('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-50 rounded-lg text-right"
              >
                <Sliders className="w-4 h-4 text-purple-700" />
                <span>لوحة الإدارة التجريبية</span>
              </button>
              <button
                onClick={() => {
                  navigate('statistics');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg text-right"
              >
                <BarChart3 className="w-4 h-4 text-blue-700" />
                <span>الإحصاءات والمؤشرات</span>
              </button>
              <button
                onClick={() => {
                  navigate('help');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg text-right"
              >
                <HelpCircle className="w-4 h-4 text-amber-700" />
                <span>المساعدة والأسئلة الشائعة</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <button
                onClick={() => {
                  navigate('settings');
                  setMobileMenuOpen(false);
                }}
                className="hover:text-emerald-700 py-1"
              >
                الإعدادات
              </button>
              <button
                onClick={() => {
                  navigate('accessibility');
                  setMobileMenuOpen(false);
                }}
                className="hover:text-emerald-700 py-1"
              >
                إمكانية الوصول
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
