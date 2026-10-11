import React, { useState } from 'react';
import {
  UserCheck,
  Calendar,
  Clock,
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
  Phone,
  User,
  CreditCard,
  History
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MENOUFIA_CITIES } from '../data/mockData';

export const GovernorMeetingPage: React.FC = () => {
  const { navigate, user, governorAppointments, addGovernorAppointment } = useApp();

  const [activeTab, setActiveTab] = useState<'book' | 'history'>('book');

  // Form states
  const [applicantName, setApplicantName] = useState(user?.name || '');
  const [nationalId, setNationalId] = useState(user?.nationalId || '29010101700123');
  const [phone, setPhone] = useState(user?.phone || '01012345678');
  const [city, setCity] = useState(user?.city || 'شبين الكوم');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00 ص');

  // Review & Confirmation step
  const [isReviewing, setIsReviewing] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<any | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!applicantName.trim()) errs.applicantName = 'يرجى إدخال اسم مقدم الطلب ثلاثياً';
    if (!nationalId.trim() || nationalId.length < 14) errs.nationalId = 'الرقم القومي يجب أن يتكون من 14 رقماً';
    if (!phone.trim() || phone.length < 11) errs.phone = 'يرجى إدخال رقم هاتف محمول صحيح (11 رقم)';
    if (!subject.trim()) errs.subject = 'يرجى كتابة موضوع المقابلة بشكل واضح ومختصر';
    if (!details.trim() || details.length < 20) errs.details = 'يرجى توضيح ملخص الشكوى أو المطلب (20 حرفاً على الأقل)';
    if (!preferredDate) errs.preferredDate = 'يرجى اختيار التاريخ المفضل للمقابلة';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsReviewing(true);
    }
  };

  const handleFinalSubmit = () => {
    const newRecord = addGovernorAppointment({
      applicantName,
      nationalId,
      phone,
      city,
      subject,
      details,
      preferredDate,
      preferredTime
    });

    setSubmittedResult(newRecord);
    setIsReviewing(false);
  };

  const handleResetForm = () => {
    setSubmittedResult(null);
    setSubject('');
    setDetails('');
    setPreferredDate('');
    setIsReviewing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>
        <span className="text-xs text-slate-400 font-mono">ديوان عام محافظة المنوفية</span>
      </div>

      {/* Hero Notice Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            لقاء المواطنين الأسبوعي
          </span>
          <span className="text-xs text-emerald-200">· نموذج تجريبي استرشادي</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          حجز لقاء مع السيد محافظ المنوفية
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
          تنظم محافظة المنوفية لقاءات دورية بالمواطنين بديوان عام المحافظة بشبين الكوم لبحث مشكلات المواطنين ومقترحات المشروعات التنموية.
        </p>
        <div className="pt-1">
          <button
            onClick={() => navigate('governor-bio')}
            className="inline-flex items-center gap-2 py-1.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold border border-white/20 transition-colors"
          >
            <span>السيرة الذاتية لمعالي المحافظ (اللواء عمرو الغريب)</span>
            <span className="text-amber-300">←</span>
          </button>
        </div>
      </div>

      {/* Disclaimer Card */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900 leading-relaxed shadow-sm">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">تنويه هام بشأن النموذج:</strong>
          هذا النموذج يعمل محلياً في المتصفح لأغراض العرض والتجربة فقط. <strong>الطلب تجريبي غير مُرسل إلى ديوان عام محافظة المنوفية</strong> ولا يترتب عليه أي التزام بموعد رسمي حقيقي.
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('book')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'book'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>تقديم طلب جديد</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'history'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <History className="w-4 h-4" />
          <span>الطلبات المسجلة محلياً ({governorAppointments.length})</span>
        </button>
      </div>

      {activeTab === 'book' && (
        <>
          {submittedResult ? (
            /* Confirmation Screen */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  تم تسجيل الطلب التجريبي بنجاح
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-2">
                  كود الحجز المرجعي: {submittedResult.referenceCode}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  احتفظ بهذا الكود لمتابعة حالة الموعد التجريبي في قائمة الطلبات
                </p>
              </div>

              <div className="max-w-md mx-auto bg-slate-50 rounded-2xl p-4 border border-slate-200 text-right text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">مقدم الطلب:</span>
                  <span className="font-bold text-slate-900">{submittedResult.applicantName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">المركز / المدينة:</span>
                  <span className="font-bold text-slate-900">{submittedResult.city}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">الموضوع:</span>
                  <span className="font-bold text-slate-900">{submittedResult.subject}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">التاريخ المفضل:</span>
                  <span className="font-mono text-slate-900 font-bold">{submittedResult.preferredDate} ({submittedResult.preferredTime})</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">حالة الطلب:</span>
                  <span className="font-bold text-amber-700">{submittedResult.status}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleResetForm}
                  className="py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  تقديم طلب آخر
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  استعراض الطلبات المسجلة
                </button>
              </div>
            </div>
          ) : isReviewing ? (
            /* Review Step */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900">
                  مراجعة بيانات طلب لقاء السيد المحافظ
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  تأكد من صحة البيانات المسجلة قبل تأكيد التسجيل التجريبي
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-500 block">اسم مقدم الطلب:</span>
                  <span className="font-bold text-slate-900">{applicantName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">الرقم القومي:</span>
                  <span className="font-mono text-slate-900 font-bold">{nationalId}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">رقم الهاتف:</span>
                  <span className="font-mono text-slate-900 font-bold">{phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">المركز / المدينة:</span>
                  <span className="font-bold text-slate-900">{city}</span>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-slate-200">
                  <span className="text-slate-500 block">موضوع الطلب:</span>
                  <span className="font-bold text-slate-900">{subject}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block">تفاصيل المطلب أو المقترح:</span>
                  <p className="text-slate-700 leading-relaxed mt-1">{details}</p>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-slate-200 flex justify-between">
                  <div>
                    <span className="text-slate-500 block">الموعد المفضل:</span>
                    <span className="font-mono text-slate-900 font-bold">{preferredDate} - {preferredTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">مكان المقابلة:</span>
                    <span className="font-medium text-slate-800">ديوان عام المحافظة - شبين الكوم</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  تأكيد وحفظ الطلب التجريبي
                </button>
                <button
                  type="button"
                  onClick={() => setIsReviewing(false)}
                  className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  تعديل البيانات
                </button>
              </div>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleProceedToReview} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900">بيانات طالب المقابلة</h2>
                <p className="text-xs text-slate-500 mt-0.5">يرجى ملء الحقول المطلوبة بدقة للمراجعة</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    اسم المواطن مقدم الطلب *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="الاسم ثلاثي أو رباعي"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                  {errors.applicantName && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.applicantName}</p>
                  )}
                </div>

                {/* National ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    الرقم القومي (14 رقماً) *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={14}
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      placeholder="29010101700123"
                      className="w-full font-mono bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                  {errors.nationalId && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.nationalId}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    رقم الهاتف المحمول *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="010XXXXXXXX"
                      className="w-full font-mono bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    المركز أو المدينة التابع لها *
                  </label>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9"
                    >
                      {MENOUFIA_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  موضوع اللقاء أو الشكوى باختصار *
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="مثال: طلب توصيل شبكة صرف صحي لعزبة مجاورة بمركز أشمون"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                {errors.subject && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Details */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  شرح تفصيلي للموضوع والمطالب السابقة *
                </label>
                <textarea
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="اكتب شرحاً وافياً للمشكلة أو المقترح، مع ذكر أي طلبات أو شكاوى سابقة تم تقديمها لمجلس المدينة..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                {errors.details && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.details}</p>
                )}
              </div>

              {/* Date & Time */}
              <div className="grid sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    التاريخ المفضل للمقابلة *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      min="2026-10-12"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9"
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                  {errors.preferredDate && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    الفترة المفضلة
                  </label>
                  <div className="relative">
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9"
                    >
                      <option value="10:00 ص">الفترة الأولى: 10:00 ص - 11:30 ص</option>
                      <option value="12:00 م">الفترة الثانية: 12:00 م - 01:30 م</option>
                      <option value="02:00 م">الفترة الثالثة: 02:00 م - 03:30 م</option>
                    </select>
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  مراجعة تفاصيل الطلب قبل الحفظ
                </button>
              </div>

            </form>
          )}
        </>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          {governorAppointments.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
              لا توجد طلبات مسجلة حتى الآن
            </div>
          ) : (
            governorAppointments.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg">
                      {app.referenceCode}
                    </span>
                    <span className="text-xs text-slate-400">بتاريخ: {app.submittedAt}</span>
                  </div>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-lg">
                    {app.status}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">الموضوع:</span>
                    <span className="font-bold text-slate-900">{app.subject}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">المركز:</span>
                    <span className="font-bold text-slate-900">{app.city}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">الموعد المطلوب:</span>
                    <span className="font-mono text-slate-800">{app.preferredDate} ({app.preferredTime})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">مقدم الطلب:</span>
                    <span className="text-slate-800">{app.applicantName}</span>
                  </div>
                  <div className="sm:col-span-2 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                    {app.details}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};
