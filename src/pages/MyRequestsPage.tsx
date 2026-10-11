import React, { useState } from 'react';
import {
  ClipboardList,
  Ticket,
  FileText,
  UserCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  Calendar,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Complaint, GovernorAppointment, TechCenterAppointment } from '../types';

export const MyRequestsPage: React.FC = () => {
  const { navigate, complaints, governorAppointments, techAppointments } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'complaints' | 'tech' | 'governor'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplaintDetail, setSelectedComplaintDetail] = useState<Complaint | null>(null);

  const totalCount = complaints.length + techAppointments.length + governorAppointments.length;

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
        <span className="text-xs text-slate-400 font-mono">سجل طلباتي ومعاملاتي</span>
      </div>

      {/* Main Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
              معاملاتي المسجلة
            </span>
            <span className="text-xs text-slate-400">· محافظة المنوفية</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            سجل طلباتي وتذاكر الحجز والشكاوى ({totalCount})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            تابع في مكان واحد كافة التذاكر والشكاوى ومواعيد الديوان العام الصادرة برقمك
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
          <ClipboardList className="w-6 h-6" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            activeFilter === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          كافة المعاملات ({totalCount})
        </button>

        <button
          onClick={() => setActiveFilter('tech')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            activeFilter === 'tech'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          تذاكر المراكز التكنولوجية ({techAppointments.length})
        </button>

        <button
          onClick={() => setActiveFilter('complaints')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            activeFilter === 'complaints'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          الشكاوى والبلاغات ({complaints.length})
        </button>

        <button
          onClick={() => setActiveFilter('governor')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            activeFilter === 'governor'
              ? 'bg-amber-700 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          مقابلات السيد المحافظ ({governorAppointments.length})
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        
        {/* TECH CENTER APPOINTMENTS */}
        {(activeFilter === 'all' || activeFilter === 'tech') && techAppointments.map((tc) => (
          <div
            key={tc.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-300 transition-colors"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded border border-emerald-200">
                  {tc.referenceCode}
                </span>
                <span className="text-[11px] text-slate-400">بتاريخ: {tc.submittedAt}</span>
              </div>

              <h3 className="font-bold text-base text-slate-900">{tc.serviceType}</h3>
              <p className="text-xs text-slate-600">{tc.centerName}</p>

              <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{tc.appointmentDate}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{tc.timeSlot}</span>
                </span>
              </div>
            </div>

            {/* Token Badge */}
            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-3.5 rounded-2xl text-center min-w-[90px] shadow">
              <span className="text-[10px] text-emerald-300 block">رقم الدور</span>
              <span className="font-mono text-2xl font-extrabold text-amber-300">{tc.tokenNumber}</span>
              <span className="text-[9px] text-emerald-200 block mt-0.5">تذكرة سارية</span>
            </div>
          </div>
        ))}

        {/* CITIZEN COMPLAINTS */}
        {(activeFilter === 'all' || activeFilter === 'complaints') && complaints.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedComplaintDetail(c)}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded border border-blue-200">
                  {c.referenceCode}
                </span>
                <span className="text-[11px] text-slate-400">بلاغ: {c.submittedAt}</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mr-auto sm:mr-0">
                  {c.status}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900">{c.description}</h3>
              <p className="text-xs text-slate-500">
                {c.city} - {c.districtOrVillage} ({c.addressDetails})
              </p>
              {c.attachmentName && (
                <span className="text-[11px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded inline-block">
                  مرفق: {c.attachmentName}
                </span>
              )}
            </div>

            <div className="self-end sm:self-center shrink-0">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-colors">
                عرض المسار الزمني
              </span>
            </div>
          </div>
        ))}

        {/* GOVERNOR APPOINTMENTS */}
        {(activeFilter === 'all' || activeFilter === 'governor') && governorAppointments.map((g) => (
          <div
            key={g.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-amber-300 transition-colors"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded border border-amber-200">
                  {g.referenceCode}
                </span>
                <span className="text-[11px] text-slate-400">طلب: {g.submittedAt}</span>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                  {g.status}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900">{g.subject}</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{g.details}</p>

              <div className="text-xs text-slate-500">
                الموعد المفضل: <strong className="font-mono text-slate-800">{g.preferredDate} ({g.preferredTime})</strong>
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Complaint Timeline Detail Modal */}
      {selectedComplaintDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  تفاصيل الشكوى {selectedComplaintDetail.referenceCode}
                </h3>
              </div>
              <button
                onClick={() => setSelectedComplaintDetail(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl space-y-1.5 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500">موضوع البلاغ:</span>
                  <strong className="text-slate-900">{selectedComplaintDetail.description}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">الموقع:</span>
                  <span className="text-slate-800">{selectedComplaintDetail.city} - {selectedComplaintDetail.districtOrVillage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">الحالة الراهنة:</span>
                  <strong className="text-emerald-700">{selectedComplaintDetail.status}</strong>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-3">محطات المسار الميداني:</h4>
                <div className="space-y-3 relative before:absolute before:top-2 before:bottom-2 before:right-3 before:w-0.5 before:bg-slate-200 pr-1">
                  {selectedComplaintDetail.timeline.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        step.done ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
                      }`}>
                        {step.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-0.5">
                        <span className={`font-bold ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step.stage}
                        </span>
                        <p className="text-[11px] text-slate-500">{step.note} ({step.date})</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedComplaintDetail(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
