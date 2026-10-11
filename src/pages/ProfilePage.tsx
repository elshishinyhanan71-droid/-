import React, { useState } from 'react';
import {
  User,
  CreditCard,
  Phone,
  Building,
  Mail,
  Calendar,
  Ticket,
  FileText,
  UserCheck,
  LogOut,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Edit2,
  Save,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MENOUFIA_CITIES } from '../data/mockData';

export const ProfilePage: React.FC = () => {
  const {
    navigate,
    user,
    updateProfile,
    logout,
    governorAppointments,
    techAppointments,
    complaints,
    resetDemoData
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editCity, setEditCity] = useState(user?.city || 'شبين الكوم');
  const [editNationalId, setEditNationalId] = useState(user?.nationalId || '');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      city: editCity,
      nationalId: editNationalId
    });
    setIsEditing(false);
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2000);
  };

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
        <span className="text-xs text-slate-400 font-mono">الملف الشخصي للمواطن</span>
      </div>

      {/* User Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white flex items-center justify-center font-extrabold text-2xl shadow-sm">
            {user?.name.charAt(0) || 'م'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">
                {user ? user.name : 'زائر المنصة'}
              </h1>
              {user?.isGuest && (
                <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                  وضع الزائر
                </span>
              )}
            </div>
            <p className="text-xs text-emerald-700 font-medium mt-0.5">
              مواطن بمركز {user?.city || 'شبين الكوم'} · محافظة المنوفية
            </p>
            <span className="text-[11px] text-slate-400 block mt-1">
              تاريخ التسجيل: {user?.joinedDate || '10 أكتوبر 2026'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
          {!isEditing ? (
            <button
              onClick={() => {
                setEditName(user?.name || '');
                setEditPhone(user?.phone || '');
                setEditCity(user?.city || 'شبين الكوم');
                setEditNationalId(user?.nationalId || '');
                setIsEditing(true);
              }}
              className="py-2 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>تعديل البيانات</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="py-2 px-3.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold"
            >
              إلغاء التعديل
            </button>
          )}

          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="py-2 px-3.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {saveFeedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>تم حفظ تعديلات الملف الشخصي بنجاح!</span>
        </div>
      )}

      {/* Profile Details Edit Form or View */}
      {isEditing ? (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            تعديل بيانات الحساب التجريبي
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">الاسم الكامل</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">الرقم القومي (14 رقماً)</label>
              <input
                type="text"
                maxLength={14}
                value={editNationalId}
                onChange={(e) => setEditNationalId(e.target.value)}
                className="w-full font-mono bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">رقم الهاتف المحمول</label>
              <input
                type="tel"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full font-mono bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">المركز / المدينة</label>
              <select
                value={editCity}
                onChange={(e) => setEditCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {MENOUFIA_CITIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="py-2.5 px-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow"
            >
              <Save className="w-3.5 h-3.5" />
              <span>حفظ التعديلات</span>
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="py-2.5 px-4 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
            >
              إلغاء
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 mb-3">بيانات بطاقة الهوية المسجلة محلياً:</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-400 block text-[11px]">الرقم القومي:</span>
              <strong className="font-mono text-slate-900 mt-1 block">
                {user?.nationalId || 'غير مسجل'}
              </strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-400 block text-[11px]">رقم الهاتف:</span>
              <strong className="font-mono text-slate-900 mt-1 block">
                {user?.phone || 'غير مسجل'}
              </strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-400 block text-[11px]">البريد الإلكتروني:</span>
              <strong className="text-slate-900 mt-1 block truncate">
                {user?.email || 'غير مسجل'}
              </strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-400 block text-[11px]">المركز التابع له:</span>
              <strong className="text-slate-900 mt-1 block">
                {user?.city || 'شبين الكوم'}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* User's Activity Hub */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900">سجل المعاملات والتذاكر المحفوظة محلياً:</h2>

        <div className="grid md:grid-cols-3 gap-4">
          
          {/* Tech appointments card */}
          <div
            onClick={() => navigate('tech-centers')}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm cursor-pointer hover:border-emerald-300 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between">
              <Ticket className="w-5 h-5 text-emerald-700" />
              <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-xs">
                {techAppointments.length} تذاكر
              </span>
            </div>
            <h3 className="font-bold text-sm text-slate-900">حجوزات المراكز التكنولوجية</h3>
            <p className="text-[11px] text-slate-500">تذاكر النداء الآلي وأرقام الدور في المراكز</p>
          </div>

          {/* Complaints card */}
          <div
            onClick={() => navigate('complaints')}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm cursor-pointer hover:border-emerald-300 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between">
              <FileText className="w-5 h-5 text-blue-700" />
              <span className="font-mono font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded text-xs">
                {complaints.length} شكاوى
              </span>
            </div>
            <h3 className="font-bold text-sm text-slate-900">منظومة الشكاوى والبلاغات</h3>
            <p className="text-[11px] text-slate-500">متابعة مراحل الفحص الميداني والمعاينة</p>
          </div>

          {/* Governor appointment card */}
          <div
            onClick={() => navigate('governor-meeting')}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm cursor-pointer hover:border-emerald-300 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between">
              <UserCheck className="w-5 h-5 text-amber-700" />
              <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-xs">
                {governorAppointments.length} طلبات
              </span>
            </div>
            <h3 className="font-bold text-sm text-slate-900">لقاءات السيد المحافظ</h3>
            <p className="text-[11px] text-slate-500">مواعيد المقابلة المسجلة بالديوان العام</p>
          </div>

        </div>
      </div>

      {/* Danger Zone: Reset Demo Data */}
      <div className="p-6 bg-slate-100 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-xs sm:text-sm text-slate-800">
            إعادة ضبط بيانات النموذج التجريبي
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            يقوم بمسح الحجوزات والشكاوى التجريبية وإعادة الحساب للحالة الأولية النظيفة.
          </p>
        </div>
        <button
          onClick={() => setShowResetConfirm(true)}
          className="py-2 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>استعادة الضبط الأولي</span>
        </button>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 mx-auto flex items-center justify-center">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">هل تود تسجيل الخروج؟</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              سيتم إنهاء الجلسة والعودة لشاشة الترحيب. يمكنك الدخول مجدداً في أي وقت.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  logout();
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                تأكيد الخروج
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Data Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">تأكيد استعادة الضبط الأولي</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              سيتم مسح كافة الشكاوى والحجوزات التي قمت بإنشائها محلياً وإرجاع البيانات الافتراضية.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setShowResetConfirm(false);
                  resetDemoData();
                }}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                نعم، إعادة الضبط
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
