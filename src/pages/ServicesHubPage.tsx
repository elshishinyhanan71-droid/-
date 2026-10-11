import React from 'react';
import {
  Layers,
  PhoneCall,
  Building2,
  UserCheck,
  FileText,
  GraduationCap,
  HeartPulse,
  ArrowRight,
  ChevronLeft,
  ShieldCheck,
  Car,
  Home,
  Users,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageRoute } from '../types';

export const ServicesHubPage: React.FC = () => {
  const { navigate } = useApp();

  const services = [
    {
      id: 'emergency',
      route: 'emergency' as PageRoute,
      title: 'دليل أرقام الطوارئ والخطوط الساخنة',
      desc: 'أرقام الإسعاف، النجدة، الحماية المدنية، الكهرباء، المياه، والغاز مع تأكيد مسبق للاتصال.',
      icon: <PhoneCall className="w-6 h-6 text-rose-600" />,
      bg: 'bg-rose-50 border-rose-200 hover:border-rose-300',
      badge: 'متاح 24/7'
    },
    {
      id: 'tech-centers',
      route: 'tech-centers' as PageRoute,
      title: 'حجز موعد بالمركز التكنولوجي لخدمة المواطنين',
      desc: 'استخراج تراخيص البناء، المحال العامة، الإشغالات، والحصول على تذكرة نداء آلي فورية.',
      icon: <Building2 className="w-6 h-6 text-emerald-700" />,
      bg: 'bg-emerald-50 border-emerald-200 hover:border-emerald-300',
      badge: '10 مراكز ومدن'
    },
    {
      id: 'governor-meeting',
      route: 'governor-meeting' as PageRoute,
      title: 'طلب حجز لقاء مع السيد المحافظ',
      desc: 'تقديم استمارة المقابلة الرسمية لبحث المشكلات والمطالب العامة بديوان عام المحافظة.',
      icon: <UserCheck className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-200 hover:border-amber-300',
      badge: 'نموذج محلي تجريبي'
    },
    {
      id: 'complaints',
      route: 'complaints' as PageRoute,
      title: 'منظومة الشكاوى والبلاغات الميدانية',
      desc: 'تسجيل بلاغات النظافة والإنارة والمرافق مع إرفاق ملف ومتابعة المسار الزمني للمعاينة.',
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50 border-blue-200 hover:border-blue-300',
      badge: 'تتبع كود البلاغ'
    },
    {
      id: 'education',
      route: 'education' as PageRoute,
      title: 'الخدمات التعليمية ونتائج الامتحانات',
      desc: 'استعلام نتائج الشهادة الإعدادية برقم الجلوس، كشف تفصيلي للدرجات، وجداول الامتحانات الرسمية.',
      icon: <GraduationCap className="w-6 h-6 text-indigo-600" />,
      bg: 'bg-indigo-50 border-indigo-200 hover:border-indigo-300',
      badge: 'بيان درجات فوري'
    },
    {
      id: 'health',
      route: 'health' as PageRoute,
      title: 'الخدمات الصحية وعيادات التأمين الصحي',
      desc: 'دليل المستشفيات والعيادات الشاملة، مواعيد اللجان الطبية العليا، ومحاكاة حجز كشف طبي.',
      icon: <HeartPulse className="w-6 h-6 text-teal-600" />,
      bg: 'bg-teal-50 border-teal-200 hover:border-teal-300',
      badge: 'كافة التخصصات'
    },
    {
      id: 'accessibility',
      route: 'accessibility' as PageRoute,
      title: 'خدمات ذوي الهمم وقادرون باختلاف',
      desc: 'إجراءات كارت الخدمات المتكاملة، مراكز التأهيل الشامل، والتسهيلات المتاحة بالمراكز.',
      icon: <Users className="w-6 h-6 text-purple-600" />,
      bg: 'bg-purple-50 border-purple-200 hover:border-purple-300',
      badge: 'إتاحة ودمج'
    },
    {
      id: 'community',
      route: 'community' as PageRoute,
      title: 'منصة المشاركة المجتمعية «صوت المنوفية»',
      desc: 'مبادرات ومقترحات المواطنين لتطوير المحافظة مع نظام تصويت تفاعلي مفتوح.',
      icon: <Sparkles className="w-6 h-6 text-amber-700" />,
      bg: 'bg-amber-50/70 border-amber-200 hover:border-amber-300',
      badge: 'تصويت ومشاركة'
    }
  ];

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
        <span className="text-xs text-slate-400 font-mono">بوابة الخدمات الإلكترونية</span>
      </div>

      {/* Main Title Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
              الخدمات الرقمية للمواطنين
            </span>
            <span className="text-xs text-slate-400">· محافظة المنوفية</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            مجمع الخدمات الإلكترونية الموحد
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            دليلك الشامل لكافة المعاملات والمواعيد والشكاوى مع صفحات مستقلة ومسارات تنقل مكتملة
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
          <Layers className="w-6 h-6" />
        </div>
      </div>

      {/* Prototype Notice */}
      <div className="p-3.5 bg-slate-100 border border-slate-200 rounded-2xl flex items-start gap-3 text-xs text-slate-600">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p>
          <strong>نموذج تجريبي تفاعلي:</strong> كل بطاقة أدناه تقود إلى صفحة فرعية مستقلة كاملة الوظائف تمكنك من ملء النماذج وتوليد أكواد المعاملات ومتابعة حالتها محلياً.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {services.map((srv) => (
          <div
            key={srv.id}
            onClick={() => navigate(srv.route)}
            className={`p-6 rounded-3xl border transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col justify-between group ${srv.bg}`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                  {srv.icon}
                </div>
                <span className="text-[11px] font-bold bg-white/90 text-slate-700 px-2.5 py-0.5 rounded-lg border border-slate-200 shadow-2xs">
                  {srv.badge}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  {srv.desc}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-emerald-800">
              <span>الانتقال لصفحة الخدمة الكاملة</span>
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Action bar */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-right">
          <h4 className="font-bold text-sm">هل قمت بتقديم طلب أو حجز من قبل؟</h4>
          <p className="text-xs text-slate-400">تابع كافة طلباتك السابقة وتذاكر النداء الآلي في صفحة واحدة مجمعة.</p>
        </div>
        <button
          onClick={() => navigate('my-requests')}
          className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow whitespace-nowrap"
        >
          استعراض سجل طلباتي وحجوزاتي
        </button>
      </div>

    </div>
  );
};
