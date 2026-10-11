import React from 'react';
import {
  Info,
  MapPin,
  Calendar,
  Users,
  Building,
  Wheat,
  Factory,
  ArrowRight,
  ShieldCheck,
  Compass,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MENOUFIA_CITIES } from '../data/mockData';

export const AboutMenoufiaPage: React.FC = () => {
  const { navigate } = useApp();

  const statistics = [
    { label: 'العاصمة الإدارية', value: 'مدينة شبين الكوم', sub: 'المقر المركزي لديوان المحافظة' },
    { label: 'العيد القومي', value: '13 يونيو', sub: 'تخليداً لصمود أهالي دنشواي 1906' },
    { label: 'المساحة الكلية', value: '2,543.03 كم²', sub: 'قلب الدلتا الخصب بين فرعي النيل' },
    { label: 'عدد السكان التقديري', value: '~4.6 مليون نسمة', sub: 'تقديرات الجهاز المركزي للتعبئة 2024' },
    { label: 'التقسيم الإداري', value: '10 مراكز ومدن', sub: 'تضم 317 قرية رئيسية وتابع' },
    { label: 'المناطق الصناعية', value: 'مدينتا قويسنا والسادات', sub: 'صناعات غذائية وإلكترونية وغزل' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>
        <span className="text-xs text-slate-400 font-mono">بطاقة تعريف المنوفية</span>
      </div>

      {/* Hero Visual Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src="/src/assets/images/menoufia_agriculture_1791651186411.jpg"
            alt="ريف المنوفية ونهر النيل"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
            <span className="px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-bold self-start border border-emerald-400/30 mb-2">
              محافظة المنوفية · جمهورية مصر العربية
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              أرض الأصالة والنضال الوطني والنهضة العلمية
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-2xl leading-relaxed">
              تقع المنوفية في أخصب بقعة بدلتا النيل بموقع استراتيجي فريد يربط بين القاهرة والإسكندرية وتتميز بأعلى نسب التعليم والريادة الوطنية.
            </p>
          </div>
        </div>
      </div>

      {/* General Statistics Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statistics.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between"
          >
            <span className="text-xs text-slate-500">{stat.label}</span>
            <div className="font-extrabold text-lg text-slate-900 mt-1">
              {stat.value}
            </div>
            <span className="text-[11px] text-emerald-700 mt-2 block border-t border-slate-100 pt-2 font-medium">
              {stat.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Identity Profile & History Details */}
      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Story & National Day */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              العيد القومي وملحمة دنشواي (13 يونيو 1906)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            تحتفل محافظة المنوفية بعيدها القومي في 13 يونيو من كل عام تخليداً لصمود وشجاعة أهالي قرية دنشواي بمركز الشهداء في مواجهة ضباط الاحتلال البريطاني، والتي أثارت الرأي العام العالمي وخلدها التاريخ كشرارة للمقاومة الوطنية المصرية الحديثة.
          </p>
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <strong>شعار المحافظة (السنبلتان والبرج واللهب):</strong>
            <p className="leading-relaxed">
              يتكون الشعار الرسمي من سنبلتي قمح ترمز لخصوبة الأراضي الزراعية، وبرج الحمام التاريخي يرمز لقرية دنشواي، واللهب الذي يرمز للثورة ضد الظلم، وترس يرمز للصناعة.
            </p>
          </div>
        </div>

        {/* Administrative Divisions */}
        <div className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              المراكز والمدن العشر
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            تتكون المنوفية إدارياً من 10 مراكز رئيسية تضم مدنها وعشرات القرى والوحدات المحلية:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {MENOUFIA_CITIES.map((city, idx) => (
              <div
                key={city}
                className="p-2.5 bg-slate-50 rounded-xl text-xs font-semibold text-slate-800 border border-slate-200/80 flex items-center gap-1.5"
              >
                <span className="font-mono text-emerald-700 text-[11px]">{idx + 1}.</span>
                <span>{city}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Economic Pillars */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          المقومات الاقتصادية والإنتاجية للمحافظة
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Wheat className="w-5 h-5 text-amber-600" />
              <span>القطاع الزراعي والري</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              تشتهر المنوفية بإنتاج المحاصيل النقدية مثل القمح، القطن طويل التيلة، الخضروات، البطاطس، الفواكه، والصناعات الغذائية القائمة على إنتاج مزارع وسط الدلتا الخصبة المروية بالرياح المنوفي وترعة القاصد.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Factory className="w-5 h-5 text-blue-600" />
              <span>القطاع الصناعي والاستثماري</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              تحتضن المحافظة مجمع قويسنا الصناعي العملاق ومصانع الأجهزة الإلكترونية والهندسية والغذائية، بالإضافة لمدينة السادات كإحدى أكبر مدن المجتمعات العمرانية والصناعات الثقيلة والغزل والنسيج في مصر.
            </p>
          </div>
        </div>
      </div>

      {/* Prototype Footer Disclaimer */}
      <div className="p-3.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
        <span>
          المعلومات الواردة مستندة إلى مراجع تاريخية وجغرافية موثقة حول محافظة المنوفية، مع تصنيف الأرقام التقديرية كبيانات استرشادية لنموذج التطبيق.
        </span>
      </div>

    </div>
  );
};
