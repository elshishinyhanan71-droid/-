import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  Calendar,
  Download,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  Printer
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ExamResultQuery } from '../types';

export const EducationPage: React.FC = () => {
  const { navigate } = useApp();

  const [activeTab, setActiveTab] = useState<'results' | 'schedules'>('results');

  // Search inquiry state
  const [stage, setStage] = useState<'preparatory' | 'primary' | 'secondary' | 'vocational'>('preparatory');
  const [term, setTerm] = useState<'second' | 'first'>('second');
  const [academicYear, setAcademicYear] = useState('2025 / 2026');
  const [seatNumber, setSeatNumber] = useState('45102');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<ExamResultQuery | null>(null);
  const [hasQueried, setHasQueried] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seatNumber.trim()) return;

    setIsSearching(true);
    setHasQueried(true);

    setTimeout(() => {
      setIsSearching(false);
      // Realistic simulated Menoufia result
      setSearchResult({
        stage,
        year: academicYear,
        term,
        seatNumber: seatNumber.trim(),
        studentName: 'محمود أحمد السيد المنوفي',
        schoolName: 'مدرسة المساعي المشكورة الإعدادية بنين',
        administration: 'إدارة شبين الكوم التعليمية',
        totalScore: 268.5,
        maxScore: 280,
        percentage: 95.89,
        subjects: [
          { name: 'اللغة العربية والخط', score: 77.5, maxScore: 80 },
          { name: 'اللغة الإنجليزية', score: 58.0, maxScore: 60 },
          { name: 'الدراسات الاجتماعية', score: 38.0, maxScore: 40 },
          { name: 'الرياضيات (جبر وهندسة)', score: 58.0, maxScore: 60 },
          { name: 'العلوم والتكنولوجيا', score: 37.0, maxScore: 40 }
        ]
      });
    }, 600);
  };

  const examSchedules = [
    {
      title: 'جدول امتحانات الفصل الدراسي الثاني - الشهادة الإعدادية العامة بالمنوفية',
      period: 'مايو 2026',
      admin: 'مديرية التربية والتعليم بالمنوفية',
      days: [
        { date: 'السبت 16 مايو 2026', subject: 'اللغة العربية والخط والإملاء (ساعتان ونصف)' },
        { date: 'الأحد 17 مايو 2026', subject: 'الجبر والإحصاء (ساعتان) + التربية الفنية' },
        { date: 'الإثنين 18 مايو 2026', subject: 'اللغة الإنجليزية (ساعتان)' },
        { date: 'الثلاثاء 19 مايو 2026', subject: 'العلوم (ساعتان) + التربية الدينية' },
        { date: 'الأربعاء 20 مايو 2026', subject: 'الدراسات الاجتماعية (ساعتان) + الحاسب الآلي' }
      ]
    },
    {
      title: 'جدول امتحانات النقل للصفين الأول والثاني الثانوي العام بالمنوفية',
      period: 'مايو 2026',
      admin: 'التعليم العام - شبين الكوم',
      days: [
        { date: 'الخميس 14 مايو 2026', subject: 'اللغة العربية (ورقي وإلكتروني)' },
        { date: 'السبت 16 مايو 2026', subject: 'الرياضيات البحتة / التاريخ' },
        { date: 'الإثنين 18 مايو 2026', subject: 'اللغة الأجنبية الأولى' }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>
        <span className="text-xs text-slate-400 font-mono">بوابة نتائج الامتحانات</span>
      </div>

      {/* Main Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-xs font-bold">
              التربية والتعليم بالمنوفية
            </span>
            <span className="text-xs text-slate-400">· نموذج استعلام تجريبي</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            الشهادات ونتائج الامتحانات وجداول الاختبارات
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            استعلم عن نتيجة الشهادة الإعدادية برقم الجلوس واستعرض الجداول المعتمدة
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
          <GraduationCap className="w-6 h-6" />
        </div>
      </div>

      {/* Prototype Notice */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900 leading-relaxed shadow-sm">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">تنويه استرشادي:</strong>
          نتائج الاستعلام المعروضة هنا هي عينات تجريبية افتراضية لأغراض المحاكاة والتطوير، ولا تمثل بيانات درجات حقيقية للطلاب دون الربط المباشر بقواعد بيانات وزارة التربية والتعليم الرسمية.
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('results')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'results'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>الاستعلام عن النتائج والشهادات</span>
        </button>
        <button
          onClick={() => setActiveTab('schedules')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'schedules'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>جداول الامتحانات المعتمدة</span>
        </button>
      </div>

      {/* TAB 1: RESULTS QUERY */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          
          {/* Query Form */}
          <form onSubmit={handleLookup} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              بيانات الاستعلام عن الشهادة الدراسية
            </h2>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">المرحلة الدراسية</label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="preparatory">الشهادة الإعدادية العامة</option>
                  <option value="primary">الشهادة الابتدائية / سنوات النقل</option>
                  <option value="secondary">الثانوية العامة (استرشادي)</option>
                  <option value="vocational">الدبلومات الفنية الصناعية والزراعية</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">العام الدراسي</label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="2025 / 2026">العام الحالي 2025 / 2026</option>
                  <option value="2024 / 2025">العام السابق 2024 / 2025</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">الفصل الدراسي</label>
                <select
                  value={term}
                  onChange={(e) => setTerm(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="second">الفصل الدراسي الثاني (نهاية العام)</option>
                  <option value="first">الفصل الدراسي الأول (نصف العام)</option>
                </select>
              </div>
            </div>

            <div className="pt-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                رقم جلوس الطالب *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={seatNumber}
                  onChange={(e) => setSeatNumber(e.target.value)}
                  placeholder="أدخل رقم الجلوس (مثال: 45102)"
                  className="flex-1 font-mono text-base tracking-wider bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="py-2.5 px-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>{isSearching ? 'جاري البحث...' : 'استعلام عن النتيجة'}</span>
                </button>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                يمكنك تجربة رقم الجلوس التجريبي الافتراضي: 45102 للاطلاع على بيان الدرجات المكتمل
              </span>
            </div>
          </form>

          {/* Results Sheet Card */}
          {hasQueried && searchResult && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
              
              {/* Certificate Header */}
              <div className="border-b border-slate-200 pb-5 text-center relative space-y-1">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  كشف درجات تجريبي معتمد للمعاينة
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                  شهادة إتمام مرحلة التعليم الأساسي (الإعدادية)
                </h3>
                <p className="text-xs text-slate-500">
                  محافظة المنوفية · {searchResult.administration}
                </p>
              </div>

              {/* Student Metadata Card */}
              <div className="grid sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">اسم الطالب:</span>
                  <strong className="text-slate-900 font-bold">{searchResult.studentName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">المدرسة:</span>
                  <span className="text-slate-800 font-medium">{searchResult.schoolName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">رقم الجلوس:</span>
                  <span className="font-mono text-slate-900 font-bold">{searchResult.seatNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">حالة النتيجة:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ناجح ومنقول</span>
                  </span>
                </div>
              </div>

              {/* Subject Breakdown Table */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">بيان تفصيلي بدرجات المواد الدراسية:</h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-right">
                    <thead className="bg-slate-100 text-slate-700 font-bold">
                      <tr>
                        <th className="p-3">المادة الدراسية</th>
                        <th className="p-3 text-center">الدرجة المحصلة</th>
                        <th className="p-3 text-center">النهاية العظمى</th>
                        <th className="p-3 text-center">التقدير</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {searchResult.subjects?.map((subj, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3 font-medium text-slate-800">{subj.name}</td>
                          <td className="p-3 text-center font-mono font-bold text-slate-900 tabular-nums">
                            {subj.score}
                          </td>
                          <td className="p-3 text-center font-mono text-slate-500 tabular-nums">
                            {subj.maxScore}
                          </td>
                          <td className="p-3 text-center text-emerald-700 font-bold">ممتاز</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-emerald-50/70 border-t border-emerald-200 font-bold">
                      <tr>
                        <td className="p-3 text-emerald-950 font-extrabold">المجموع الكلي والنسبة</td>
                        <td className="p-3 text-center font-mono text-base font-extrabold text-emerald-800 tabular-nums">
                          {searchResult.totalScore}
                        </td>
                        <td className="p-3 text-center font-mono text-slate-700 tabular-nums">
                          {searchResult.maxScore}
                        </td>
                        <td className="p-3 text-center text-emerald-800 font-extrabold font-mono">
                          %{searchResult.percentage}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap gap-2 justify-end">
                <button
                  onClick={() => alert('تم تنزيل إفادة النجاح بصيغة PDF التجريبية')}
                  className="py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل بيان الدرجات (PDF تجريبي)</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة الإفادة</span>
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* TAB 2: EXAM SCHEDULES */}
      {activeTab === 'schedules' && (
        <div className="space-y-4">
          {examSchedules.map((schedule, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[11px] font-bold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded">
                    {schedule.admin}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 mt-1">{schedule.title}</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono self-start sm:self-auto">
                  {schedule.period}
                </span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-right">
                  <thead className="bg-slate-100 text-slate-700 font-bold">
                    <tr>
                      <th className="p-3">اليوم والتاريخ</th>
                      <th className="p-3">المواد المقررة وزمن الإجابة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {schedule.days.map((d, dIdx) => (
                      <tr key={dIdx} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-800 font-mono">{d.date}</td>
                        <td className="p-3 text-slate-700">{d.subject}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-1 flex justify-end">
                <button
                  onClick={() => alert('تم تحميل الجدول بصيغة عالية الجودة')}
                  className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل الجدول الرسمي بصيغة PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
