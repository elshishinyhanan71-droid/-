import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Clock,
  Phone,
  Search,
  CheckCircle2,
  Calendar,
  Ticket,
  ArrowRight,
  Filter,
  ShieldCheck,
  ChevronLeft,
  X,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TECH_CENTERS, MENOUFIA_CITIES } from '../data/mockData';
import { TechCenter, TechCenterAppointment } from '../types';

export const TechCentersPage: React.FC = () => {
  const { navigate, user, techAppointments, addTechAppointment } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCityFilter, setSelectedCityFilter] = useState('all');
  
  // Selected center for booking or detail
  const [selectedCenter, setSelectedCenter] = useState<TechCenter | null>(null);
  const [bookingCenter, setBookingCenter] = useState<TechCenter | null>(null);

  // Booking Form State
  const [applicantName, setApplicantName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '01012345678');
  const [serviceType, setServiceType] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('2026-10-18');
  const [timeSlot, setTimeSlot] = useState('09:30 ص - 10:00 ص');
  const [bookingErrors, setBookingErrors] = useState<{ [key: string]: string }>({});
  const [confirmedBooking, setConfirmedBooking] = useState<TechCenterAppointment | null>(null);

  const filteredCenters = TECH_CENTERS.filter(center => {
    const matchCity = selectedCityFilter === 'all' || center.city === selectedCityFilter;
    const matchSearch =
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCity && matchSearch;
  });

  const handleStartBooking = (center: TechCenter) => {
    setBookingCenter(center);
    setServiceType(center.services[0] || 'طلب بيان صلاحية موقع');
    setBookingErrors({});
    setConfirmedBooking(null);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [key: string]: string } = {};

    if (!applicantName.trim()) errs.applicantName = 'يرجى إدخال اسم المستفيد';
    if (!phone.trim() || phone.length < 11) errs.phone = 'يرجى إدخال رقم هاتف صحيح (11 رقم)';
    if (!serviceType) errs.serviceType = 'يرجى اختيار نوع المعاملة';
    if (!appointmentDate) errs.appointmentDate = 'يرجى تحديد تاريخ الحجز';

    if (Object.keys(errs).length > 0) {
      setBookingErrors(errs);
      return;
    }

    if (bookingCenter) {
      const record = addTechAppointment({
        centerId: bookingCenter.id,
        centerName: bookingCenter.name,
        applicantName,
        phone,
        serviceType,
        appointmentDate,
        timeSlot
      });
      setConfirmedBooking(record);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>
        <span className="text-xs text-slate-400 font-mono">منظومة ميكنة المحليات</span>
      </div>

      {/* Main Title Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
              مراكز خدمة المواطنين
            </span>
            <span className="text-xs text-slate-400">· 10 مراكز على مستوى المحافظة</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            دليل وحجز مواعيد المراكز التكنولوجية بالمنوفية
          </h1>
          <p className="text-xs text-slate-500">
            تراخيص البناء، المحال العامة، إشغالات الطرق، وسداد الرسوم برقم نداء آلي تجريبي
          </p>
        </div>

        {techAppointments.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs shrink-0 space-y-1">
            <div className="flex items-center gap-2 font-bold text-emerald-900">
              <Ticket className="w-4 h-4 text-emerald-700" />
              <span>تذاكر الحجز النشطة ({techAppointments.length})</span>
            </div>
            <p className="text-[11px] text-slate-600">
              آخر تذكرة: <strong className="font-mono text-emerald-800">{techAppointments[0].tokenNumber}</strong> ({techAppointments[0].timeSlot})
            </p>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="p-3.5 bg-slate-100 border border-slate-200 rounded-2xl flex items-start gap-3 text-xs text-slate-600">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p>
          <strong>بيانات استرشادية:</strong> مواعيد العمل وقوائم الخدمات مدرجة وفق الهيكل العام للمراكز التكنولوجية بالمحافظة. نظام حجز التذاكر محاكي محلياً لتسهيل استعراض تجربة المواطن.
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-3">
        <div className="grid sm:grid-cols-12 gap-3">
          
          <div className="sm:col-span-8 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، المدينة، أو نوع المعاملة (مثل: تراخيص بناء، قويسنا...)"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          <div className="sm:col-span-4 relative">
            <select
              value={selectedCityFilter}
              onChange={(e) => setSelectedCityFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9"
            >
              <option value="all">كافة المدن والمراكز ({TECH_CENTERS.length})</option>
              {MENOUFIA_CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

        </div>

        {/* Quick city pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
          <button
            onClick={() => setSelectedCityFilter('all')}
            className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap ${
              selectedCityFilter === 'all'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            الكل
          </button>
          {MENOUFIA_CITIES.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCityFilter(c)}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap ${
                selectedCityFilter === c
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Centers Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredCenters.map((center) => (
          <div
            key={center.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between hover:border-emerald-300 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded">
                    مركز {center.city}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{center.workingHours}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900">{center.name}</h3>
                <p className="text-xs text-slate-600 flex items-start gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{center.address}</span>
                </p>
                <p className="text-[11px] text-slate-400 mr-5">
                  علامة مميزة: {center.googleMapsHint}
                </p>
              </div>

              {/* Services badges */}
              <div className="pt-1">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">أهم المعاملات المقدمة:</span>
                <div className="flex flex-wrap gap-1.5">
                  {center.services.map((srv, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-lg"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => handleStartBooking(center)}
                className="flex-1 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <Ticket className="w-4 h-4" />
                <span>حجز موعد وتذكرة نداء</span>
              </button>
              
              <button
                onClick={() => setSelectedCenter(center)}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
              >
                معلومات المركز
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Center Details Modal */}
      {selectedCenter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-sm text-slate-900">{selectedCenter.name}</h3>
              </div>
              <button
                onClick={() => setSelectedCenter(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">المدينة / المركز:</span>
                  <span className="font-bold text-slate-900">{selectedCenter.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">العنوان التفصيلي:</span>
                  <span className="text-slate-800">{selectedCenter.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">مواعيد الاستقبال:</span>
                  <span className="font-mono text-slate-800">{selectedCenter.workingHours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">رقم الهاتف الاسترشادي:</span>
                  <span className="font-mono text-emerald-800 font-bold dir-ltr">{selectedCenter.phone}</span>
                </div>
              </div>

              <div>
                <strong className="block font-bold text-slate-900 mb-1.5">قائمة المعاملات المتاحة بالمركز:</strong>
                <ul className="space-y-1 list-disc list-inside text-slate-600">
                  {selectedCenter.services.map((srv, idx) => (
                    <li key={idx}>{srv}</li>
                  ))}
                  <li>استخراج إفادات سداد الرسوم وقسائم التحصيل</li>
                  <li>تظلمات اشتراطات التراخيص والمخططات التفصيلية</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  const c = selectedCenter;
                  setSelectedCenter(null);
                  handleStartBooking(c);
                }}
                className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                حجز موعد الآن
              </button>
              <button
                onClick={() => setSelectedCenter(null)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Form & Queue Ticket Modal */}
      {bookingCenter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  حجز موعد بالمركز التكنولوجي
                </h3>
                <p className="text-[11px] text-emerald-700 font-medium">
                  {bookingCenter.name}
                </p>
              </div>
              <button
                onClick={() => {
                  setBookingCenter(null);
                  setConfirmedBooking(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {confirmedBooking ? (
              /* Generated Queue Ticket */
              <div className="text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    تم تأكيد الحجز وحجز رقم النداء
                  </span>
                  <div className="mt-3 p-4 bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-2xl shadow-lg text-center space-y-1">
                    <span className="text-xs text-emerald-300">رقم تذكرة النداء الآلي</span>
                    <div className="font-mono text-4xl font-extrabold tracking-wider text-amber-300">
                      {confirmedBooking.tokenNumber}
                    </div>
                    <span className="text-[11px] text-emerald-200 font-mono">
                      كود المعاملة: {confirmedBooking.referenceCode}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 text-right text-xs space-y-1.5 border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">اسم المواطن:</span>
                    <span className="font-bold text-slate-900">{confirmedBooking.applicantName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">نوع الخدمة:</span>
                    <span className="font-medium text-slate-800">{confirmedBooking.serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">تاريخ الموعد:</span>
                    <span className="font-mono text-slate-900 font-bold">{confirmedBooking.appointmentDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">الفترة الزمنية:</span>
                    <span className="font-mono text-emerald-800 font-bold">{confirmedBooking.timeSlot}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500">
                  يرجى الحضور قبل الموعد بـ 10 دقائق وإحضار أصل بطاقة الرقم القومي والمستندات المطلوبة.
                </p>

                <button
                  onClick={() => {
                    setBookingCenter(null);
                    setConfirmedBooking(null);
                  }}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  تم، إغلاق التذكرة
                </button>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    اسم طالب المعاملة *
                  </label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="الاسم ثلاثي"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  {bookingErrors.applicantName && (
                    <p className="text-[11px] text-rose-600 mt-1">{bookingErrors.applicantName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    رقم الهاتف المحمول *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010XXXXXXXX"
                    className="w-full font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  {bookingErrors.phone && (
                    <p className="text-[11px] text-rose-600 mt-1">{bookingErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    نوع الخدمة أو المعاملة *
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {bookingCenter.services.map((srv, idx) => (
                      <option key={idx} value={srv}>{srv}</option>
                    ))}
                    <option value="معاملة عامة أخرى">معاملة عامة أخرى</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      تاريخ الزيارة *
                    </label>
                    <input
                      type="date"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      min="2026-10-12"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      فترة الحضور
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      <option value="09:00 ص - 09:30 ص">09:00 ص - 09:30 ص</option>
                      <option value="09:30 ص - 10:00 ص">09:30 ص - 10:00 ص</option>
                      <option value="10:30 ص - 11:00 ص">10:30 ص - 11:00 ص</option>
                      <option value="11:30 ص - 12:00 م">11:30 ص - 12:00 م</option>
                      <option value="12:30 م - 01:00 م">12:30 م - 01:00 م</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>تأكيد الحجز وإصدار التذكرة</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
