import React, { useState } from 'react';
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Building,
  MapPin,
  Phone,
  User,
  ExternalLink,
  ChevronRight,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MENOUFIA_CITIES } from '../data/mockData';
import { Complaint } from '../types';

export const ComplaintsPage: React.FC = () => {
  const { navigate, user, complaints, addComplaint } = useApp();

  const [activeTab, setActiveTab] = useState<'track' | 'submit'>('submit');

  // Submit Form States
  const [category, setCategory] = useState<Complaint['category']>('نظافة وتجميل');
  const [city, setCity] = useState(user?.city || 'شبين الكوم');
  const [districtOrVillage, setDistrictOrVillage] = useState('');
  const [addressDetails, setAddressDetails] = useState('');
  const [description, setDescription] = useState('');
  const [applicantName, setApplicantName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '01012345678');
  const [submitErrors, setSubmitErrors] = useState<{ [key: string]: string }>({});
  const [newlyCreatedComplaint, setNewlyCreatedComplaint] = useState<Complaint | null>(null);

  // Tracking query state
  const [searchTrackingCode, setSearchTrackingCode] = useState('');
  const [selectedComplaintForTrack, setSelectedComplaintForTrack] = useState<Complaint | null>(
    complaints[0] || null
  );

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [key: string]: string } = {};

    if (!applicantName.trim()) errs.applicantName = 'يرجى إدخال اسم الشاكي';
    if (!phone.trim() || phone.length < 11) errs.phone = 'يرجى إدخال رقم هاتف محمول صحيح';
    if (!districtOrVillage.trim()) errs.districtOrVillage = 'يرجى تحديد الحي أو القرية';
    if (!addressDetails.trim()) errs.addressDetails = 'يرجى إدخال وصف العنوان أو أقرب علامة مميزة';
    if (!description.trim() || description.length < 15) errs.description = 'يرجى شرح موضوع الشكوى بالتفصيل (15 حرفاً على الأقل)';

    if (Object.keys(errs).length > 0) {
      setSubmitErrors(errs);
      return;
    }

    const created = addComplaint({
      category,
      city,
      districtOrVillage,
      addressDetails,
      description,
      applicantName,
      phone
    });

    setNewlyCreatedComplaint(created);
    setSelectedComplaintForTrack(created);
    setSubmitErrors({});
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = complaints.find(
      c => c.referenceCode.toLowerCase() === searchTrackingCode.trim().toLowerCase()
    );
    if (found) {
      setSelectedComplaintForTrack(found);
      setActiveTab('track');
    } else {
      alert('لم يتم العثور على شكوى بهذا الكود. يمكنك تجربة كود الشكوى الافتراضي: ' + (complaints[0]?.referenceCode || 'CMP-2026-4891'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>
        <span className="text-xs text-slate-400 font-mono">منظومة الرصد الميداني</span>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-xs font-bold">
              صوت المواطن
            </span>
            <span className="text-xs text-slate-400">· محافظة المنوفية</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            منظومة الشكاوى والبلاغات الميدانية
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            سجل بلاغات النظافة والإنارة والمرافق وتتبع مراحل الفحص والمعاينة الميدانية
          </p>
        </div>

        {/* Official Hotline Callout */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs shrink-0 space-y-1">
          <span className="text-slate-500 block text-[11px]">الخط الساخن الحكومي الموحد:</span>
          <div className="font-mono text-xl font-extrabold text-blue-700">16528</div>
          <span className="text-[10px] text-slate-400">منظومة شكاوى مجلس الوزراء</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900 leading-relaxed shadow-sm">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">تنويه إخلاء المسؤولية:</strong>
          هذه المنظومة نموذج تجريبي محلي ولا ترسل الشكاوى إلى أي جهة تنفيذية رسمية. البيانات والمراحل الميدانية المعروضة هي لأغراض العرض والمحاكاة التفاعلية فقط.
        </div>
      </div>

      {/* Track & Submit Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('submit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'submit'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>تقديم شكوى جديدة</span>
        </button>
        <button
          onClick={() => setActiveTab('track')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'track'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>متابعة الشكاوى ومراحل الحل ({complaints.length})</span>
        </button>
      </div>

      {/* TAB 1: SUBMIT COMPLAINT */}
      {activeTab === 'submit' && (
        <>
          {newlyCreatedComplaint ? (
            /* Successful Submission Confirmation */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  تم تسجيل البلاغ في النظام المحلي
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-2">
                  رقم تتبع الشكوى: <span className="font-mono text-emerald-800">{newlyCreatedComplaint.referenceCode}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  يمكنك استخدام هذا الرقم في أي وقت لمتابعة مسار الشكوى الميداني
                </p>
              </div>

              <div className="max-w-md mx-auto bg-slate-50 rounded-2xl p-4 border border-slate-200 text-right text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">التصنيف:</span>
                  <span className="font-bold text-slate-900">{newlyCreatedComplaint.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">المدينة / الحي:</span>
                  <span className="font-bold text-slate-900">{newlyCreatedComplaint.city} - {newlyCreatedComplaint.districtOrVillage}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">وصف البلاغ:</span>
                  <span className="text-slate-800 line-clamp-1">{newlyCreatedComplaint.description}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">الحالة الراهنة:</span>
                  <span className="font-bold text-emerald-700">{newlyCreatedComplaint.status}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedComplaintForTrack(newlyCreatedComplaint);
                    setActiveTab('track');
                    setNewlyCreatedComplaint(null);
                  }}
                  className="py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  عرض مسار الشكوى الميداني الآن
                </button>
                <button
                  onClick={() => setNewlyCreatedComplaint(null)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  تسجيل شكوى أخرى
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleComplaintSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900">استمارة قيد بلاغ أو شكوى جديدة</h2>
                <p className="text-xs text-slate-500 mt-0.5">يرجى توضيح موقع المشكلة بدقة لسهولة المعاينة</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    تصنيف الشكوى *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="نظافة وتجميل">نظافة وتراكم مخلفات وتجميل</option>
                    <option value="طرق وإنارة">طرق ورصف وأعمدة إنارة معطلة</option>
                    <option value="مياه وصرف صحي">كسر مياه شرب أو طفح صرف صحي</option>
                    <option value="إشغالات ومخالفات">إشغالات أرصفة وتعديات بناء</option>
                    <option value="صحة وتموين">رقابة تموينية ومخابز وصحة</option>
                    <option value="أخرى">موضوع عام آخر</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    المركز أو المدينة *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {MENOUFIA_CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Village / District */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    الحي أو القرية أو العزبة *
                  </label>
                  <input
                    type="text"
                    value={districtOrVillage}
                    onChange={(e) => setDistrictOrVillage(e.target.value)}
                    placeholder="مثال: قرية سمادون / حي غرب"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  {submitErrors.districtOrVillage && (
                    <p className="text-[11px] text-rose-600 mt-1">{submitErrors.districtOrVillage}</p>
                  )}
                </div>

                {/* Address Details */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    العنوان التفصيلي وأقرب علامة مميزة *
                  </label>
                  <input
                    type="text"
                    value={addressDetails}
                    onChange={(e) => setAddressDetails(e.target.value)}
                    placeholder="مثال: شارع المحطة أمام صيدلية الأمل"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  {submitErrors.addressDetails && (
                    <p className="text-[11px] text-rose-600 mt-1">{submitErrors.addressDetails}</p>
                  )}
                </div>

                {/* Applicant Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    اسم الشاكي *
                  </label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="الاسم ثلاثي"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  {submitErrors.applicantName && (
                    <p className="text-[11px] text-rose-600 mt-1">{submitErrors.applicantName}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    رقم الهاتف المحمول للتواصل والمتابعة *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010XXXXXXXX"
                    className="w-full font-mono bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  {submitErrors.phone && (
                    <p className="text-[11px] text-rose-600 mt-1">{submitErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  شرح تفاصيل الشكوى *
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="صف بدقة المشكلة، طبيعة الخطر أو التعطيل، وتاريخ بدئها لمساعدة فرق المعاينة..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                {submitErrors.description && (
                  <p className="text-[11px] text-rose-600 mt-1">{submitErrors.description}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 rtl:-scale-x-100" />
                  <span>تسجيل الشكوى وإصدار رقم التتبع</span>
                </button>
              </div>

            </form>
          )}
        </>
      )}

      {/* TAB 2: TRACK COMPLAINT */}
      {activeTab === 'track' && (
        <div className="space-y-6">
          
          {/* Quick Lookup Bar */}
          <form onSubmit={handleTrackSearch} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchTrackingCode}
              onChange={(e) => setSearchTrackingCode(e.target.value)}
              placeholder="أدخل رقم تتبع الشكوى (مثال: CMP-2026-4891)..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              استعلام
            </button>
          </form>

          {/* List of My Complaints + Timeline Details */}
          <div className="grid md:grid-cols-12 gap-6">
            
            {/* Left Column: Complaint Cards */}
            <div className="md:col-span-5 space-y-3">
              <span className="text-xs font-bold text-slate-700 block">
                الشكاوى المسجلة محلياً ({complaints.length}):
              </span>
              {complaints.map((c) => {
                const isSelected = selectedComplaintForTrack?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedComplaintForTrack(c)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${
                      isSelected
                        ? 'bg-emerald-50/70 border-emerald-400 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                        {c.referenceCode}
                      </span>
                      <span className="text-[11px] text-slate-400">{c.submittedAt}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 line-clamp-1">{c.description}</h4>
                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span>{c.city} - {c.category}</span>
                      <span className="font-bold text-emerald-700">{c.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Active Timeline */}
            <div className="md:col-span-7">
              {selectedComplaintForTrack ? (
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                        {selectedComplaintForTrack.category}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-800">
                        {selectedComplaintForTrack.referenceCode}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mt-2">
                      {selectedComplaintForTrack.description}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      الموقع: {selectedComplaintForTrack.city} - {selectedComplaintForTrack.districtOrVillage} ({selectedComplaintForTrack.addressDetails})
                    </p>
                  </div>

                  {/* Chronological Milestone Timeline */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 mb-4">
                      المسار الزمني لمتابعة الإجراءات الميدانية:
                    </h4>
                    <div className="space-y-4 relative before:absolute before:top-2 before:bottom-2 before:right-3.5 before:w-0.5 before:bg-slate-200 pr-1">
                      {selectedComplaintForTrack.timeline.map((step, idx) => (
                        <div key={idx} className="relative flex items-start gap-4">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                              step.done
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 text-slate-400'
                            }`}
                          >
                            {step.done ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <Clock className="w-4 h-4" />
                            )}
                          </div>
                          <div className="text-xs space-y-0.5 flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`font-bold ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>
                                {step.stage}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">{step.date}</span>
                            </div>
                            <p className="text-[11px] text-slate-500">{step.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-200">
                    مقدم الشكوى: <strong>{selectedComplaintForTrack.applicantName}</strong> | هاتف: <strong className="font-mono">{selectedComplaintForTrack.phone}</strong>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
                  اختر شكوى من القائمة لعرض مسارها الزمني
                </div>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
