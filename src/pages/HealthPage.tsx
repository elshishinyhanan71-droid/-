import React, { useState } from 'react';
import {
  HeartPulse,
  MapPin,
  Clock,
  Phone,
  Search,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Stethoscope,
  Filter,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HEALTH_CLINICS, MENOUFIA_CITIES } from '../data/mockData';
import { HealthClinic } from '../types';

export const HealthPage: React.FC = () => {
  const { navigate, user } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCityFilter, setSelectedCityFilter] = useState('all');
  const [selectedClinic, setSelectedClinic] = useState<HealthClinic | null>(null);

  // Booking simulation state
  const [bookingClinic, setBookingClinic] = useState<HealthClinic | null>(null);
  const [patientName, setPatientName] = useState(user?.name || '');
  const [insuranceNumber, setInsuranceNumber] = useState('781920341');
  const [specialty, setSpecialty] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-10-19');
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);

  const filteredClinics = HEALTH_CLINICS.filter(clinic => {
    const matchCity = selectedCityFilter === 'all' || clinic.city === selectedCityFilter;
    const matchSearch =
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCity && matchSearch;
  });

  const handleStartBooking = (clinic: HealthClinic) => {
    setBookingClinic(clinic);
    setSpecialty(clinic.specialties[0] || 'باطنة');
    setBookingSuccess(null);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    setBookingSuccess({
      bookingCode: `HLT-MNF-${Math.floor(1000 + Math.random() * 9000)}`,
      clinicName: bookingClinic?.name,
      patientName,
      specialty,
      bookingDate,
      turnNumber: Math.floor(5 + Math.random() * 35)
    });
  };

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
        <span className="text-xs text-slate-400 font-mono">الهيئة العامة للتأمين الصحي</span>
      </div>

      {/* Main Title Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-800 text-xs font-bold">
              الرعاية الصحية والتأمين
            </span>
            <span className="text-xs text-slate-400">· فرع المنوفية</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            دليل عيادات ومستشفيات التأمين الصحي بالمنوفية
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            مواقع العيادات الشاملة، مواعيد اللجان الطبية العليا، وحجز الكشف الاسترشادي
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
          <HeartPulse className="w-6 h-6" />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900 leading-relaxed shadow-sm">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">تنويه استرشادي:</strong>
          هذا الدليل يوضح مواقع وتخصصات منشآت التأمين الصحي بالمنوفية. محاكاة الحجز هنا هي لتدريب وتسهيل تجربة المواطن، ولا تغني عن بطاقة التأمين الصحي السارية والأختام الرسمية المعتمدة.
        </div>
      </div>

      {/* High Medical Committee Callout */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-6 sm:p-7 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-300" />
          <h3 className="font-bold text-base">اللجنة الطبية العامة العليا بالمنوفية (ميت خاقان)</h3>
        </div>
        <p className="text-xs text-teal-100 leading-relaxed max-w-3xl">
          تختص بتوقيع الكشف الطبي لبطاقة إثبات الإعاقة والخدمات المتكاملة، لجان العجز المستديم، كشف استحقاق معاش تكافل وكرامة، واعتماد الإجازات المرضية الاستثنائية لموظفي الجهاز الإداري للدولة.
        </p>
        <div className="pt-1 flex flex-wrap gap-4 text-xs text-amber-200">
          <span>الموقع: حي ميت خاقان - مبنى التأمين الصحي الملحق بمستشفى الهلال</span>
          <span>·</span>
          <span>مواعيد العمل: من الأحد إلى الخميس 9:00 ص حتى 1:30 م</span>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-3">
        <div className="grid sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، التخصص، أو المركز (مثل: باطنة، عيادة منوف، أطفال...)"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 pl-9"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          <div className="sm:col-span-4 relative">
            <select
              value={selectedCityFilter}
              onChange={(e) => setSelectedCityFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 pl-9"
            >
              <option value="all">كافة المدن والمراكز</option>
              {MENOUFIA_CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>
      </div>

      {/* Clinics Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredClinics.map((clinic) => (
          <div
            key={clinic.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between hover:border-teal-300 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                    {clinic.type}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{clinic.workingHours}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900">{clinic.name}</h3>
                <p className="text-xs text-slate-600 flex items-start gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{clinic.address}</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-1.5 bg-slate-50 p-2 rounded-xl">
                  {clinic.notes}
                </p>
              </div>

              {/* Specialties */}
              <div className="pt-1">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">التخصصات والعيادات:</span>
                <div className="flex flex-wrap gap-1.5">
                  {clinic.specialties.map((spec, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-lg"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => handleStartBooking(clinic)}
                className="flex-1 py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>حجز كشف استرشادي</span>
              </button>
              
              <a
                href={`tel:${clinic.phone}`}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 font-mono"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{clinic.phone}</span>
              </a>
            </div>

          </div>
        ))}
      </div>

      {/* Booking Simulation Modal */}
      {bookingClinic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  حجز كشف بالعيادة التأمينية
                </h3>
                <p className="text-[11px] text-teal-700 font-medium">
                  {bookingClinic.name}
                </p>
              </div>
              <button
                onClick={() => setBookingClinic(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div>
                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                    تم تأكيد حجز الكشف التجريبي
                  </span>
                  <div className="mt-3 p-4 bg-gradient-to-br from-teal-800 to-teal-950 text-white rounded-2xl shadow-lg text-center space-y-1">
                    <span className="text-xs text-teal-200">رقم الدور في العيادة</span>
                    <div className="font-mono text-4xl font-extrabold text-amber-300">
                      {bookingSuccess.turnNumber}
                    </div>
                    <span className="text-[11px] text-teal-300 font-mono">
                      كود الحجز: {bookingSuccess.bookingCode}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 text-right text-xs space-y-1.5 border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">اسم المريض:</span>
                    <strong className="text-slate-900">{bookingSuccess.patientName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">التخصص:</span>
                    <span className="font-medium text-slate-800">{bookingSuccess.specialty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">التاريخ:</span>
                    <span className="font-mono text-slate-900 font-bold">{bookingSuccess.bookingDate}</span>
                  </div>
                </div>

                <button
                  onClick={() => setBookingClinic(null)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  إغلاق التذكرة
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    اسم المريض المستفيد *
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="الاسم ثلاثي"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    الرقم التأميني (استرشادي)
                  </label>
                  <input
                    type="text"
                    value={insuranceNumber}
                    onChange={(e) => setInsuranceNumber(e.target.value)}
                    placeholder="781920341"
                    className="w-full font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    العيادة التخصصية المطلوبة *
                  </label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    {bookingClinic.specialties.map((spec, idx) => (
                      <option key={idx} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    تاريخ الكشف المطلوب *
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min="2026-10-12"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                  >
                    تأكيد حجز الكشف
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
