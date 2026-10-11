import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Landmark,
  ShieldCheck,
  ArrowRight,
  Award,
  Sparkles,
  MapPin,
  ChevronDown,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HistoryCivilizationPage: React.FC = () => {
  const { navigate, t, language } = useApp();

  const [expandedEra, setExpandedEra] = useState<number | null>(1);

  const eras = [
    {
      era: 'العصر الفرعوني والوسيط',
      title: 'أصل التسمية والنشأة الأولى',
      period: 'ما قبل الميلاد حتى العصر الإسلامي',
      desc: 'كانت المنوفية قديماً تُعرف بـ «مانوف» أو «أونوفيس»، وكانت جزءاً من الإقليم القبطي والفرعوني الغني بالدلتا. وفي العصر الفاطمي والمملوكي، قُسمت إلى أعمال المنوفية، وكانت مدينة منوف هي القاعدة والعاصمة القديمة للمحافظة حتى انتقلت إلى شبين الكوم عام 1826 في عهد محمد علي باشا.'
    },
    {
      era: 'ملحمة دنشواي 1906',
      title: 'أشجع وقفة وطنية في تاريخ مصر الحديث',
      period: '13 يونيو 1906 — العيد القومي',
      desc: 'في 13 يونيو 1906، أقدم ضباط إنجليز على صيد الحمام بأجران قرية دنشواي بمركز الشهداء، مما تسبب في اشتعال النار بأحد الأجران وإصابة سيدة قروية بالرصاص. هبّ أهالي القرية للدفاع عن أرضهم، ففر الضباط وأصيب أحدهم بضربة شمس توفي على إثرها. شكّل الاحتلال محكمة عسكرية جائرة نصبت المشانق وأعدمت 4 من أهالي القرية وجلدت وسجنت العشرات، مما أشعل شرارة الغضب الوطني بقيادة الزعيم مصطفى كامل، واضطرت بريطانيا لعزل اللورد كرومر.'
    },
    {
      era: 'بناء الدولة والدفاع عن الوطن',
      title: 'دور أبناء المنوفية في حرب أكتوبر وبناء مصر',
      period: 'العصر الحديث والمعاصر',
      desc: 'قدّمت المنوفية لمصر نخبة من أرفع قادتها وعلمائها ومفكريها، وفي مقدمتهم الرئيس الراحل البطل محمد أنور السادات صاحب قرار حرب أكتوبر المجيدة 1973، والفريق أول عبد المنعم رياض رئيس أركان حرب القوات المسلحة وأيقونة يوم الشهيد، إلى جانب أجيال من الأطباء والمهندسين وأساتذة الجامعات.'
    }
  ];

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
          <span className="font-semibold text-slate-900">{t('mediaHistory')}</span>
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
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>سجل الخلود والأمجاد الوطنية</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            تاريخ وحضارة محافظة المنوفية
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            توثيق تاريخي لمسيرة المنوفية عبر العصور، وصمود أهالي دنشواي التاريخي، ودور قادة المحافظة في تشكيل تاريخ مصر المعاصر.
          </p>
        </div>
      </div>

      {/* Denshway Epic Spotlight Card */}
      <div className="bg-gradient-to-br from-amber-50 via-emerald-50 to-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-amber-900">
          <Award className="w-5 h-5 text-amber-700" />
          <span className="text-xs font-extrabold uppercase tracking-wide">الحدث التاريخي الأبرز — العيد القومي للمحافظة</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          حادثة دنشواي 1906: شرارة التحرر وعيد المنوفية القومي
        </h2>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          تعتز المنوفية بيوم <strong>13 يونيو</strong> عيداً قومياً سنوياً، تخليداً لصمود فلاحي قرية دنشواي الشجعان الذين واجهوا صلف الاستعمار الإنجليزي بصدور عارية دفاعاً عن كرامة أرضهم وأعراضهم. وقد خلد التاريخ أسماء شهداء دنشواي: <strong>حسن محفوظ، ويوسف سليم، والسيد عيسى، ومحمد درويش</strong>، الذين صعدوا إلى المشانق بشموخ وعزة.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-amber-200/60">
          <div className="flex items-center gap-2 text-xs text-amber-900 font-bold">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>متحف دنشواي القومي بمركز الشهداء يخلد الوقائع ببانوراما ومقتنيات أصلية.</span>
          </div>

          <button
            onClick={() => navigate('tourism-heritage')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline"
          >
            عرض تفاصيل متحف دنشواي ومواعيد الزيارة ←
          </button>
        </div>
      </div>

      {/* Historical Eras Accordion */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          محطات تاريخية مضيئة في مسيرة المنوفية
        </h3>

        <div className="space-y-3">
          {eras.map((era, index) => {
            const isOpen = expandedEra === index;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setExpandedEra(isOpen ? null : index)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        {era.period}
                      </span>
                      <span className="text-xs font-bold text-slate-500">{era.era}</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900">{era.title}</h4>
                  </div>

                  <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 border-t border-slate-100 text-xs text-slate-600 leading-relaxed space-y-3">
                    <p>{era.desc}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
