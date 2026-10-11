import React from 'react';
import {
  Award,
  ChevronLeft,
  Calendar,
  Building2,
  ShieldCheck,
  FileText,
  UserCheck,
  GraduationCap,
  Globe2,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import governorImg from '../assets/images/governor_amr_elghareeb.jpg';
import menoufiaLogo from '../assets/images/menoufia_governorate_logo_clean.png';

export const GovernorCard: React.FC = () => {
  const { navigate } = useApp();

  const careerHighlights = [
    {
      year: '1993',
      role: 'التخرج من الكلية الحربية',
      scope: 'خريج الكلية الحربية عام 1993 والتحق ضابطاً بالقوات المسلحة'
    },
    {
      year: '2004',
      role: 'هيئة الرقابة الإدارية',
      scope: 'التحاق بالهيئة وتقلد وظائف تنفيذية وإشرافية وقيادية'
    },
    {
      year: '2016',
      role: 'رئيس الإدارة المركزية',
      scope: 'متابعة أداء وزارتي البترول والإنتاج الحربي'
    },
    {
      year: '2021',
      role: 'رئيس مكتب الرقابة بالإسكندرية',
      scope: 'قيادة المنظومة الرقابية ومكافحة الفساد'
    },
    {
      year: '2022',
      role: 'رئيس قطاع الحماية الاجتماعية',
      scope: 'متابعة وزارات الصحة، التموين، التضامن، الإسكان، والأزهر'
    },
    {
      year: '2024',
      role: 'رئيس قطاع الدلتا',
      scope: 'متابعة محافظات المنوفية وكفر الشيخ والغربية والدقهلية والشرقية والبحيرة ودمياط'
    },
    {
      year: '2026',
      role: 'نائب رئيس جهاز مكافحة الفساد الإقليمي',
      scope: 'متابعة كافة محافظات الجمهورية · وتولي منصب محافظ المنوفية'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
        
        {/* Civic Header Strip */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-emerald-700/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700/70 p-1 flex items-center justify-center border border-emerald-400/30">
              <img
                src={menoufiaLogo}
                alt="شعار محافظة المنوفية"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="font-extrabold text-amber-300">محافظة المنوفية</span>
              <span className="text-emerald-400/60 hidden sm:inline">|</span>
              <span className="text-emerald-100 font-bold hidden sm:inline">القيادة التنفيذية وديوان عام المحافظة</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span className="font-medium">البيانات الرسمية للمحافظ</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Column 1: Governor Official Photo & Badges (5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-full max-w-sm">
                
                {/* Official Photo Frame */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-700/30 shadow-xl bg-slate-900 group">
                  <img
                    src={governorImg}
                    alt="اللواء عمرو محمد السيد الغريب - محافظ المنوفية"
                    className="w-full h-auto aspect-4/3 sm:aspect-16/11 object-cover object-top transition-transform duration-500 group-hover:scale-102"
                    loading="eager"
                  />
                  {/* Subtle lower gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                  
                  {/* Overlay Nameplate Badge */}
                  <div className="absolute bottom-3 inset-x-3 text-white text-right p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-lg">
                    <p className="text-[11px] font-semibold text-amber-300">محافظة المنوفية</p>
                    <p className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                      اللواء / عمرو محمد السيد الغريب
                    </p>
                    <p className="text-xs text-emerald-200 font-medium">
                      محافظ المنوفية
                    </p>
                  </div>
                </div>

                {/* Sub-photo quick credentials strip */}
                <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="text-right text-[11px] font-bold leading-tight">
                      الكلية الحربية 1993
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-right text-[11px] font-bold leading-tight">
                      الرقابة الإدارية 2004
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Column 2: Biography & Career Highlights (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-5 text-right">
              
              {/* Header Titles */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/80 mb-2">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>البيانات الأساسية لمحافظ المنوفية</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  اللواء / عمرو محمد السيد الغريب
                </h2>
                
                <div className="flex flex-wrap items-center gap-3 mt-1.5">
                  <span className="text-base sm:text-lg font-bold text-emerald-700">
                    محافظ المنوفية
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
                    <Calendar className="w-3.5 h-3.5 text-amber-700" />
                    <span>مواليد عام: 1971</span>
                  </span>
                </div>
              </div>

              {/* Bio Summary Section (Exact text from user) */}
              <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed bg-slate-50/90 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
                <p className="font-semibold text-slate-900">
                  نبذة عن الخبرات والمؤهلات:
                </p>
                <p>
                  من قيادات هيئة الرقابة الإدارية، التحق للعمل بالهيئة منذ عام 2004، وشغل كافة وظائف الهيئة (التنفيذية والإشرافية والقيادية)، كما حصل على العديد من الدورات التدريبية التخصصية المؤهلة للترقي للمناصب العليا بالأجهزة الرقابية، وذلك في مجالات المكافحة والوقاية من الفساد وجرائم المال العام وغسل الأموال والكسب غير المشروع واستراتيجيات مكافحة الفساد والوقاية منه، ودورات تخصصية في مجال الإدارة المحلية داخل الهيئة وخارجها بالولايات المتحدة الأمريكية والصين وماليزيا.
                </p>
              </div>

              {/* Key Career Highlights Preview */}
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 mb-2.5 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  <span>أبرز المحطات في المسيرة المهنية والقيادية:</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      2024
                    </span>
                    <span className="text-xs font-bold text-slate-900 mr-2">رئيس قطاع الدلتا</span>
                    <p className="text-[11px] text-slate-500 mt-1">متابعة أداء محافظات الدلتا ومنها المنوفية</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      2026
                    </span>
                    <span className="text-xs font-bold text-slate-900 mr-2">نائب رئيس جهاز مكافحة الفساد الإقليمي</span>
                    <p className="text-[11px] text-slate-500 mt-1">متابعة أداء كافة محافظات الجمهورية</p>
                  </div>
                </div>
              </div>

              {/* Interactive Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {/* Primary Button requested: «عرض السيرة الذاتية كاملة» */}
                <button
                  onClick={() => navigate('governor-bio')}
                  className="py-3 px-6 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-900/15 hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>عرض السيرة الذاتية كاملة</span>
                  <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </button>

                {/* Secondary Button: حجز لقاء المحافظ */}
                <button
                  onClick={() => navigate('governor-meeting')}
                  className="py-3 px-5 bg-white hover:bg-slate-50 text-slate-800 hover:text-emerald-800 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 shadow-2xs cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-amber-600" />
                  <span>طلب حجز لقاء المحافظ</span>
                </button>

                {/* Sawtak Masmou Initiative */}
                <button
                  onClick={() => navigate('sawtak-masmou')}
                  className="py-3 px-4 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 border border-emerald-200/60 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>مبادرة صوتك مسموع</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
