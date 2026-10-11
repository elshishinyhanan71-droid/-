import React from 'react';
import {
  ArrowRight,
  Award,
  Calendar,
  Building2,
  ShieldCheck,
  Globe2,
  GraduationCap,
  MapPin,
  CheckCircle2,
  Share2,
  Printer,
  ChevronLeft,
  UserCheck,
  FileText,
  Clock,
  Briefcase,
  Landmark,
  BadgeCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import governorImg from '../assets/images/governor_amr_elghareeb.jpg';
import menoufiaLogo from '../assets/images/menoufia_governorate_logo_clean.png';

export const GovernorBioPage: React.FC = () => {
  const { navigate, t, language } = useApp();

  // Career Positions in Chronological Order as provided in the official CV
  const careerTimeline = [
    {
      year: '1993',
      title: 'التخرج من الكلية الحربية',
      description: 'خريج الكلية الحربية عام 1993.',
      icon: <GraduationCap className="w-5 h-5 text-emerald-700" />,
      tag: 'المؤهل العسكري'
    },
    {
      year: '1993–2003',
      title: 'القوات المسلحة',
      description: 'التحق ضابطًا بالقوات المسلحة خلال الفترة من عام 1993 حتى عام 2003.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-800" />,
      tag: 'خدمة وطنية'
    },
    {
      year: '2004',
      title: 'هيئة الرقابة الإدارية',
      description: 'التحق بالرقابة الإدارية خلال عام 2004.',
      icon: <Building2 className="w-5 h-5 text-teal-700" />,
      tag: 'الهيئة الرقابية'
    },
    {
      year: 'منذ عام 2004',
      title: 'مهام رقابية وإشرافية وقيادية',
      description: 'عضو ورئيس مجموعة عمل بالعديد من تخصصات الهيئة منذ عام 2004.',
      icon: <Briefcase className="w-5 h-5 text-blue-700" />,
      tag: 'مهام قيادية'
    },
    {
      year: '2016',
      title: 'رئيس الإدارة المركزية',
      description: 'رئيس الإدارة المركزية المعنية بمتابعة أداء وزارتي البترول والإنتاج الحربي عام 2016.',
      icon: <Award className="w-5 h-5 text-indigo-700" />,
      tag: 'إدارة مركزية'
    },
    {
      year: '2021',
      title: 'رئيس مكتب الرقابة الإدارية بالإسكندرية',
      description: 'رئيس مكتب الرقابة الإدارية بالإسكندرية عام 2021.',
      icon: <Building2 className="w-5 h-5 text-cyan-700" />,
      tag: 'قيادة إقليمية'
    },
    {
      year: '2022',
      title: 'رئيس قطاع الحماية الاجتماعية',
      description: 'رئيس قطاع الحماية الاجتماعية عام 2022، والمعنية بمتابعة أداء وزارات الصحة والبيئة والتموين والتضامن الاجتماعي والأوقاف والإسكان والعدل والأزهر.',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-700" />,
      tag: 'قطاع الحماية الاجتماعية'
    },
    {
      year: '2024',
      title: 'رئيس قطاع الدلتا بهيئة الرقابة الإدارية',
      description: 'رئيس قطاع الدلتا بهيئة الرقابة الإدارية عام 2024 لمتابعة أداء محافظات الدلتا: كفر الشيخ، والمنوفية، والغربية، والدقهلية، والشرقية، والبحيرة، ودمياط.',
      icon: <MapPin className="w-5 h-5 text-amber-600" />,
      tag: 'قطاع الدلتا'
    },
    {
      year: '2026',
      title: 'نائب رئيس جهاز مكافحة ومنع الفساد الإقليمي',
      description: 'نائب رئيس جهاز مكافحة ومنع الفساد الإقليمي عام 2026 لمتابعة أداء كافة محافظات الجمهورية.',
      icon: <BadgeCheck className="w-5 h-5 text-rose-700" />,
      tag: 'مكافحة ومنع الفساد'
    }
  ];

  // Specific training and expertise areas
  const trainingDomains = [
    {
      title: 'المكافحة والوقاية من الفساد',
      desc: 'دورات تخصصية متقدمة في استراتيجيات مكافحة الفساد والوقاية منه على المستوى القومي والإقليمي.'
    },
    {
      title: 'جرائم المال العام وغسل الأموال',
      desc: 'التأهيل النوعي في تتبع جرائم المال العام، والكسب غير المشروع، ومكافحة غسل الأموال.'
    },
    {
      title: 'استراتيجيات مكافحة الفساد والوقاية منه',
      desc: 'تطبيق وتطوير السياسات والاستراتيجيات المعنية بالشفافية والنزاهة وحوكمة الأداء المؤسسي.'
    },
    {
      title: 'دورات تخصصية في مجال الإدارة المحلية',
      desc: 'برامج تدريبية داخل الهيئة وخارجها في الولايات المتحدة الأمريكية والصين وماليزيا.'
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-fadeIn">
      
      {/* 1. Breadcrumb and Quick Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <button
            onClick={() => navigate('home')}
            className="hover:text-emerald-700 transition-colors font-medium flex items-center gap-1"
          >
            <span>الرئيسية</span>
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">محافظ المنوفية</span>
          <span>/</span>
          <span className="font-medium text-emerald-800">السيرة الذاتية الكاملة</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-xl transition-colors shadow-2xs"
            title="طباعة السيرة الذاتية"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>طباعة</span>
          </button>

          <button
            onClick={() => navigate('home')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 px-4 py-1.5 rounded-xl transition-colors shadow-2xs"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى الصفحة الرئيسية</span>
          </button>
        </div>
      </div>

      {/* 2. Governor Header Profile Card (Intro with Name, Title, Birth & Official Photo) */}
      <section className="relative overflow-hidden bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/50">
        
        {/* Decorative Top Civic Band */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white px-6 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-800/80 p-0.5 flex items-center justify-center border border-emerald-400/40">
              <img
                src={menoufiaLogo}
                alt="شعار محافظة المنوفية"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-extrabold text-amber-300">جمهورية مصر العربية</span>
              <span className="text-emerald-400/60 hidden sm:inline">|</span>
              <span className="font-bold text-white">محافظة المنوفية</span>
              <span className="text-emerald-400/60 hidden sm:inline">|</span>
              <span className="text-emerald-200 hidden sm:inline">ديوان عام المحافظة</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-200 font-medium">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>البيانات الرسمية للسيرة الذاتية</span>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Governor Official Photo Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm">
                <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-700/30 shadow-xl bg-slate-900">
                  <img
                    src={governorImg}
                    alt="اللواء عمرو محمد السيد الغريب - محافظ المنوفية"
                    className="w-full h-auto aspect-4/3 sm:aspect-16/11 object-cover object-top"
                    loading="eager"
                  />
                  {/* Subtle lower gradient overlay for official framing */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent pointer-events-none" />
                  
                  {/* Nameplate inside photo banner */}
                  <div className="absolute bottom-3 inset-x-3 text-white text-right p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-lg">
                    <p className="text-[11px] font-semibold text-amber-300">محافظة المنوفية</p>
                    <p className="text-base sm:text-lg font-extrabold text-white">
                      اللواء / عمرو محمد السيد الغريب
                    </p>
                    <p className="text-xs text-emerald-300 font-medium">
                      محافظ المنوفية
                    </p>
                  </div>
                </div>

                <div className="mt-3 text-center text-xs text-slate-500 font-medium">
                  الصورة الرسمية للسيد المحافظ بمكتبه بديوان عام المحافظة
                </div>
              </div>
            </div>

            {/* Basic Info & Leadership Profile */}
            <div className="lg:col-span-7 space-y-4 text-right">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <Landmark className="w-3.5 h-3.5 text-emerald-700" />
                <span>القيادة التنفيذية لمحافظة المنوفية</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  اللواء / عمرو محمد السيد الغريب
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="text-lg sm:text-xl font-bold text-emerald-700">
                    محافظ المنوفية
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 text-amber-900 text-xs sm:text-sm font-bold border border-amber-200">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    <span>مواليد عام: 1971</span>
                  </span>
                </div>
              </div>

              {/* Fast Highlights Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">المؤهل العسكري</span>
                    <strong className="text-xs text-slate-900 font-bold">خريج الكلية الحربية 1993</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">الهيئة الرقابية</span>
                    <strong className="text-xs text-slate-900 font-bold">قيادات الرقابة الإدارية (2004)</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">المتابعة الإقليمية</span>
                    <strong className="text-xs text-slate-900 font-bold">رئيس قطاع الدلتا (2024)</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">مكافحة الفساد</span>
                    <strong className="text-xs text-slate-900 font-bold">نائب رئيس الجهاز الإقليمي (2026)</strong>
                  </div>
                </div>
              </div>

              {/* Action shortcuts */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate('governor-meeting')}
                  className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 shadow-xs"
                >
                  <UserCheck className="w-4 h-4 text-amber-300" />
                  <span>طلب حجز لقاء مع المحافظ</span>
                </button>

                <button
                  onClick={() => navigate('general-diwan')}
                  className="py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Building2 className="w-4 h-4 text-emerald-700" />
                  <span>الديوان العام للمحافظة</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* 3. Section: نبذة عن الخبرات والمؤهلات (Full Official Text) */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-sm space-y-6">
        
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              نبذة عن الخبرات والمؤهلات
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              السجل المهني والأكاديمي والبرامج التدريبية المتقدمة
            </p>
          </div>
        </div>

        {/* The Exact Official Narrative */}
        <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-2xl p-6 sm:p-8 text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 text-justify">
          <p className="font-semibold text-emerald-950">
            من قيادات هيئة الرقابة الإدارية، التحق للعمل بالهيئة منذ عام 2004، وشغل كافة وظائف الهيئة (التنفيذية والإشرافية والقيادية)، كما حصل على العديد من الدورات التدريبية التخصصية المؤهلة للترقي للمناصب العليا بالأجهزة الرقابية، وذلك في مجالات المكافحة والوقاية من الفساد وجرائم المال العام وغسل الأموال والكسب غير المشروع واستراتيجيات مكافحة الفساد والوقاية منه، ودورات تخصصية في مجال الإدارة المحلية داخل الهيئة وخارجها بالولايات المتحدة الأمريكية والصين وماليزيا.
          </p>
        </div>

        {/* Detailed Qualification & Training Breakdown Cards */}
        <div>
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>محاور الدورات التدريبية التخصصية والخبرات النوعية:</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {trainingDomains.map((domain, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-colors space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {domain.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pr-4">
                  {domain.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* International Exposure Callout */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Globe2 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">خبرات وتدريب دولي في الإدارة المحلية</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                دورات تخصصية وتجارب مقارنة في الإدارة المحلية والحوكمة بكل من <strong>الولايات المتحدة الأمريكية</strong>، <strong>الصين</strong>، و<strong>ماليزيا</strong>.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold whitespace-nowrap">
            حوكمة وإدارة محلية
          </span>
        </div>

      </section>

      {/* 4. Section: أهم الوظائف التي شغلها (Chronological Timeline) */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-sm space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                أهم الوظائف التي شغلها
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                الخط الزمني للمسيرة المهنية والوظائف القيادية والتنفيذية
              </p>
            </div>
          </div>
          <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
            1993 — 2026
          </span>
        </div>

        {/* Visual Chronological Timeline */}
        <div className="relative border-r-2 border-emerald-200/80 mr-4 sm:mr-6 pr-6 sm:pr-8 space-y-8">
          {careerTimeline.map((item, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline Bullet Node */}
              <div className="absolute -right-[35px] sm:-right-[43px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-emerald-600 shadow-sm group-hover:scale-115 group-hover:border-emerald-700 transition-transform" />

              {/* Content Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/90 hover:border-emerald-300 transition-all shadow-2xs group-hover:shadow-sm">
                
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-emerald-800 text-amber-300 font-extrabold font-mono text-xs sm:text-sm tracking-wide shadow-2xs">
                      {item.year}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-lg border border-emerald-200/60">
                    {item.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {item.description}
                </p>

              </div>

            </div>
          ))}
        </div>

      </section>

      {/* 5. Civic Contact & Quick Actions Footer */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-emerald-700/50 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-white">
              خدمات وتواصل ديوان عام محافظة المنوفية
            </h3>
            <p className="text-xs text-emerald-200">
              قنوات رسمية لحجز المقابلات وتقديم الشكاوى والمقترحات التنموية لمحافظة المنوفية
            </p>
          </div>

          <button
            onClick={() => navigate('home')}
            className="py-2.5 px-5 bg-white text-emerald-900 hover:bg-emerald-50 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 shadow-sm"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى الصفحة الرئيسية</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          
          <button
            onClick={() => navigate('governor-meeting')}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-right transition-colors space-y-1"
          >
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
              <UserCheck className="w-4 h-4" />
              <span>لقاء المحافظ الأسبوعي</span>
            </div>
            <p className="text-[11px] text-slate-200 leading-tight">
              حجز موعد مقابلة لبحث مشكلات المواطنين
            </p>
          </button>

          <button
            onClick={() => navigate('complaints')}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-right transition-colors space-y-1"
          >
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
              <FileText className="w-4 h-4" />
              <span>منظومة الشكاوى والبلاغات</span>
            </div>
            <p className="text-[11px] text-slate-200 leading-tight">
              تسجيل شكوى رسمية ومتابعتها إلكترونياً
            </p>
          </button>

          <button
            onClick={() => navigate('sawtak-masmou')}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-right transition-colors space-y-1"
          >
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>مبادرة صوتك مسموع</span>
            </div>
            <p className="text-[11px] text-slate-200 leading-tight">
              قناة مباشرة للإبلاغ العاجل وحل المشكلات
            </p>
          </button>

        </div>

      </section>

      {/* Return to Home Bottom Button */}
      <div className="pt-2 text-center">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 bg-white hover:bg-slate-50 border border-slate-300 px-6 py-3 rounded-2xl shadow-xs hover:shadow transition-all"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى الصفحة الرئيسية لمنصة دليل المنوفية</span>
        </button>
      </div>

    </div>
  );
};
