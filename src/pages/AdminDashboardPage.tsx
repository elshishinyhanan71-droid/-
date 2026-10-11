import React, { useState } from 'react';
import {
  Sliders,
  BarChart3,
  FileText,
  Building2,
  Trash2,
  Edit2,
  Plus,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Search,
  Filter,
  X,
  Save,
  Download,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Complaint, GovernorAppointment, NewsArticle, DirectoryItem } from '../types';
import { MENOUFIA_CITIES } from '../data/mockData';

export const AdminDashboardPage: React.FC = () => {
  const {
    navigate,
    complaints,
    governorAppointments,
    techAppointments,
    updateComplaintStatus,
    updateGovernorStatus,
    newsArticles,
    addNewsArticle,
    deleteNewsArticle,
    updateNewsArticle,
    directoryItems,
    addDirectoryItem,
    deleteDirectoryItem,
    resetDemoData
  } = useApp();

  const [activeTab, setActiveTab] = useState<'kpi' | 'requests' | 'news' | 'directory' | 'settings'>('kpi');

  // Search & filter states
  const [requestFilter, setRequestFilter] = useState<'all' | 'complaints' | 'governor'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [itemToDelete, setItemToDelete] = useState<{ type: 'news' | 'dir'; id: string; name: string } | null>(null);
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);
  const [isAddDirOpen, setIsAddDirOpen] = useState(false);

  // New News form state
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState<NewsArticle['category']>('إعلانات خدمية');
  const [newNewsSummary, setNewNewsSummary] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');
  const [newNewsSource, setNewNewsSource] = useState('ديوان عام محافظة المنوفية');

  // New Directory item form state
  const [newDirName, setNewDirName] = useState('');
  const [newDirCat, setNewDirCat] = useState<DirectoryItem['category']>('مستشفيات وصحة');
  const [newDirCity, setNewDirCity] = useState('شبين الكوم');
  const [newDirAddress, setNewDirAddress] = useState('');
  const [newDirPhone, setNewDirPhone] = useState('048-2220000');
  const [newDirDesc, setNewDirDesc] = useState('');

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    if (itemToDelete.type === 'news') {
      deleteNewsArticle(itemToDelete.id);
    } else if (itemToDelete.type === 'dir') {
      deleteDirectoryItem(itemToDelete.id);
    }
    setItemToDelete(null);
  };

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle.trim()) return;

    addNewsArticle({
      title: newNewsTitle,
      category: newNewsCategory,
      summary: newNewsSummary || newNewsTitle,
      content: newNewsContent || newNewsSummary,
      source: newNewsSource,
      date: '10 أكتوبر 2026',
      isDemo: true,
      readTime: '2 دقيقة'
    });

    setIsAddNewsOpen(false);
    setNewNewsTitle('');
    setNewNewsSummary('');
    setNewNewsContent('');
  };

  const handleCreateDirectory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDirName.trim()) return;

    addDirectoryItem({
      name: newDirName,
      category: newDirCat,
      city: newDirCity,
      address: newDirAddress || `مدينة ${newDirCity}`,
      phone: newDirPhone,
      timing: '8:00 ص - 3:00 م',
      description: newDirDesc || `منشأة خدمية عامة بمركز ${newDirCity}`
    });

    setIsAddDirOpen(false);
    setNewDirName('');
    setNewDirAddress('');
    setNewDirDesc('');
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
          <span>العودة للواجهة الرئيسية للمواطن</span>
        </button>
        <span className="text-xs text-purple-700 font-mono font-bold">بيئة الإدارة التجريبية</span>
      </div>

      {/* Main Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold">
              لوحة التحكم الإدارية التجريبية
            </span>
            <span className="text-xs text-slate-400">· Admin Demo Dashboard</span>
          </div>
          <h1 className="text-2xl font-extrabold mt-2">
            إدارة المحتوى وطلبات المواطنين التجريبية
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            استعرض طلبات الحجز والشكاوى، غيّر مراحل الإنجاز، وأضف أو احذف الأخبار والمرافق فورياً
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-purple-900/60 border border-purple-700/50 text-purple-300 flex items-center justify-center shrink-0">
          <Sliders className="w-6 h-6" />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900 leading-relaxed shadow-sm">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">تنويه إداري:</strong>
          هذه لوحة تحكم للعرض والمحاكاة التجريبية ولا تمثل نظام إدارة حكومي حقيقي أو قاعدة بيانات سرية. التعديلات والإضافات التي تجريها هنا تنعكس مباشرة في واجهة التطبيق وتُحفظ محلياً في متصفحك.
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('kpi')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'kpi'
              ? 'bg-purple-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>المؤشرات والإحصاءات</span>
        </button>

        <button
          onClick={() => setActiveTab('requests')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'requests'
              ? 'bg-purple-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>الشكاوى والمواعيد ({complaints.length + governorAppointments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('news')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'news'
              ? 'bg-purple-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>إدارة الأخبار ({newsArticles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('directory')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'directory'
              ? 'bg-purple-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>إدارة الدليل ({directoryItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-purple-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>إعدادات النظام</span>
        </button>
      </div>

      {/* TAB 1: KPI OVERVIEW */}
      {activeTab === 'kpi' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-400">إجمالي الشكاوى المسجلة</span>
              <div className="font-mono text-2xl font-extrabold text-blue-700">{complaints.length}</div>
              <span className="text-[11px] text-emerald-700 font-medium">محدث فورياً</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-400">طلبات لقاء المحافظ</span>
              <div className="font-mono text-2xl font-extrabold text-amber-700">{governorAppointments.length}</div>
              <span className="text-[11px] text-slate-500">قيد المراجعة</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-400">تذاكر المراكز التكنولوجية</span>
              <div className="font-mono text-2xl font-extrabold text-emerald-700">{techAppointments.length}</div>
              <span className="text-[11px] text-emerald-800">حجوزات دور نشطة</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-400">عناصر الدليل المفعلة</span>
              <div className="font-mono text-2xl font-extrabold text-purple-700">{directoryItems.length}</div>
              <span className="text-[11px] text-slate-500">مرافق وخدمات</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-900">حالات الشكاوى الحالية</h3>
              <div className="space-y-2 text-xs">
                {['تم الاستلام', 'قيد الفحص الفني', 'تمت المعاينة', 'جاري اتخاذ الإجراء', 'تم الحل المبدئي'].map((st) => {
                  const count = complaints.filter(c => c.status === st).length;
                  return (
                    <div key={st} className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                      <span>{st}</span>
                      <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-900">توزيع منشآت الدليل حسب المراكز</h3>
              <div className="space-y-2 text-xs">
                {MENOUFIA_CITIES.slice(0, 5).map((city) => {
                  const count = directoryItems.filter(d => d.city === city).length;
                  return (
                    <div key={city} className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                      <span>مدينة {city}</span>
                      <span className="font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {count} منشأة
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REQUESTS & STATUS MANAGEMENT */}
      {activeTab === 'requests' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-bold text-base text-slate-900">سجل طلبات وشكاوى المواطنين</h2>
              <p className="text-xs text-slate-500">يمكنك هنا تغيير حالة الشكوى أو طلب المحافظ ومشاهدة التحديث في شاشة المواطن فوراً</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setRequestFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  requestFilter === 'all' ? 'bg-purple-900 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                الكل
              </button>
              <button
                onClick={() => setRequestFilter('complaints')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  requestFilter === 'complaints' ? 'bg-purple-900 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                الشكاوى فقط
              </button>
              <button
                onClick={() => setRequestFilter('governor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  requestFilter === 'governor' ? 'bg-purple-900 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                المحافظ فقط
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {(requestFilter === 'all' || requestFilter === 'complaints') && complaints.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                      شكوى: {c.referenceCode}
                    </span>
                    <span className="text-xs font-semibold text-slate-800">{c.applicantName}</span>
                    <span className="text-[11px] text-slate-400">({c.city} - {c.category})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">تغيير الحالة:</span>
                    <select
                      value={c.status}
                      onChange={(e) => updateComplaintStatus(c.id, e.target.value as any)}
                      className="bg-white border border-slate-300 rounded-lg text-xs py-1 px-2 font-bold text-emerald-800 focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="تم الاستلام">تم الاستلام</option>
                      <option value="قيد الفحص الفني">قيد الفحص الفني</option>
                      <option value="تمت المعاينة">تمت المعاينة</option>
                      <option value="جاري اتخاذ الإجراء">جاري اتخاذ الإجراء</option>
                      <option value="تم الحل المبدئي">تم الحل المبدئي</option>
                    </select>
                  </div>
                </div>

                <p className="text-xs text-slate-600">{c.description}</p>
                {c.attachmentName && (
                  <span className="text-[11px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded inline-block">
                    مرفق ملف: {c.attachmentName}
                  </span>
                )}
              </div>
            ))}

            {(requestFilter === 'all' || requestFilter === 'governor') && governorAppointments.map((g) => (
              <div key={g.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      لقاء محافظ: {g.referenceCode}
                    </span>
                    <span className="text-xs font-semibold text-slate-800">{g.applicantName}</span>
                    <span className="text-[11px] text-slate-400">({g.city})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">تغيير الحالة:</span>
                    <select
                      value={g.status}
                      onChange={(e) => updateGovernorStatus(g.id, e.target.value as any)}
                      className="bg-white border border-slate-300 rounded-lg text-xs py-1 px-2 font-bold text-amber-800 focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="قيد المراجعة">قيد المراجعة</option>
                      <option value="مقبول مبدئياً">مقبول مبدئياً</option>
                      <option value="بانتظار تحديد الموعد">بانتظار تحديد الموعد</option>
                      <option value="مكتمل">مكتمل</option>
                    </select>
                  </div>
                </div>

                <p className="text-xs text-slate-600">{g.subject} — {g.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: NEWS MANAGEMENT */}
      {activeTab === 'news' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-bold text-base text-slate-900">إدارة الأخبار والبيانات الصحفية</h2>
              <p className="text-xs text-slate-500">إضافة وتعديل وحذف الأخبار التجريبية المعروضة بالموقع</p>
            </div>
            <button
              onClick={() => setIsAddNewsOpen(true)}
              className="py-2 px-4 bg-purple-900 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة خبر تجريبي جديد</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {newsArticles.map((article) => (
              <div key={article.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{article.date}</span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{article.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{article.summary}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setItemToDelete({ type: 'news', id: article.id, name: article.title })}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="حذف الخبر"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DIRECTORY MANAGEMENT */}
      {activeTab === 'directory' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-bold text-base text-slate-900">إدارة منشآت ومرافق الدليل</h2>
              <p className="text-xs text-slate-500">إضافة أو حذف مستشفيات، مدارس، مكاتب بريد، أو محاكم</p>
            </div>
            <button
              onClick={() => setIsAddDirOpen(true)}
              className="py-2 px-4 bg-purple-900 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة منشأة جديدة</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {directoryItems.map((item) => (
              <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">{item.city}</span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-500">{item.address}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setItemToDelete({ type: 'dir', id: item.id, name: item.name })}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="حذف المنشأة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SYSTEM SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h2 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
            إعدادات بيئة العرض التجريبية
          </h2>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <strong className="block font-bold text-slate-900">تصدير بيانات الاختبار (JSON):</strong>
              <p className="text-slate-600 leading-relaxed">
                يمكنك نسخ أو حفظ كافة السجلات والطلبات التي أنشأتها لاستخدامها في تقارير المراجعة.
              </p>
              <button
                onClick={() => {
                  const data = JSON.stringify({ complaints, governorAppointments, techAppointments }, null, 2);
                  navigator.clipboard.writeText(data);
                  alert('تم نسخ بيانات الطلبات التجريبية بصيغة JSON إلى الحافظة!');
                }}
                className="py-2 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                نسخ بيانات الطلبات كـ JSON
              </button>
            </div>

            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-2">
              <strong className="block font-bold text-rose-900">استعادة الضبط الأولي للمنظومة:</strong>
              <p className="text-rose-700 leading-relaxed">
                يمسح كافة التعديلات التي قمت بها في لوحة الإدارة ويرجع الأخبار والدليل للحالة الأصلية.
              </p>
              <button
                onClick={() => {
                  if (confirm('تأكيد استعادة بيانات المنظومة التجريبية بالكامل؟')) {
                    resetDemoData();
                  }
                }}
                className="py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold"
              >
                استعادة الضبط الأولي
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">تأكيد حذف العنصر التجريبي</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              هل أنت متأكد من رغبتك في حذف: <strong>«{itemToDelete.name}»</strong>؟ لن تتمكن من التراجع عن هذه الخطوة إلا بإعادة ضبط البيانات.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold"
              >
                تأكيد الحذف
              </button>
              <button
                onClick={() => setItemToDelete(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add News */}
      {isAddNewsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">إضافة خبر تجريبي جديد</h3>
              <button onClick={() => setIsAddNewsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNews} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">عنوان الخبر *</label>
                <input
                  type="text"
                  value={newNewsTitle}
                  onChange={(e) => setNewNewsTitle(e.target.value)}
                  placeholder="عنوان الخبر الصحفي"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">تصنيف الخبر</label>
                <select
                  value={newNewsCategory}
                  onChange={(e) => setNewNewsCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-purple-600"
                >
                  <option value="إعلانات خدمية">إعلانات خدمية</option>
                  <option value="تطوير ومشروعات">تطوير ومشروعات</option>
                  <option value="صحة">صحة</option>
                  <option value="تعليم">تعليم</option>
                  <option value="طوارئ وتنبيهات">طوارئ وتنبيهات</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">الموجز *</label>
                <textarea
                  rows={2}
                  value={newNewsSummary}
                  onChange={(e) => setNewNewsSummary(e.target.value)}
                  placeholder="ملخص قصير للخبر"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">نص الخبر الكامل</label>
                <textarea
                  rows={3}
                  value={newNewsContent}
                  onChange={(e) => setNewNewsContent(e.target.value)}
                  placeholder="تفاصيل الخبر الإرشادي"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-purple-900 hover:bg-purple-800 text-white rounded-xl font-bold"
                >
                  حفظ ونشر الخبر
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddNewsOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Directory Item */}
      {isAddDirOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">إضافة منشأة أو مرفق للدليل</h3>
              <button onClick={() => setIsAddDirOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDirectory} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">اسم المنشأة أو المرفق *</label>
                <input
                  type="text"
                  value={newDirName}
                  onChange={(e) => setNewDirName(e.target.value)}
                  placeholder="مثال: مستشفى تلا المركزي"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">التصنيف</label>
                  <select
                    value={newDirCat}
                    onChange={(e) => setNewDirCat(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="مستشفيات وصحة">مستشفيات وصحة</option>
                    <option value="تعليم وجامعات">تعليم وجامعات</option>
                    <option value="مكاتب بريد">مكاتب بريد</option>
                    <option value="مواقف ومواصلات">مواقف ومواصلات</option>
                    <option value="شهر عقاري ومحاكم">شهر عقاري ومحاكم</option>
                    <option value="مراكز شباب ورياضة">مراكز شباب ورياضة</option>
                    <option value="مكاتب تكنولوجية">مقار إدارية</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">المركز / المدينة</label>
                  <select
                    value={newDirCity}
                    onChange={(e) => setNewDirCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-purple-600"
                  >
                    {MENOUFIA_CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">العنوان التفصيلي</label>
                <input
                  type="text"
                  value={newDirAddress}
                  onChange={(e) => setNewDirAddress(e.target.value)}
                  placeholder="الشارع أو الحي"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-purple-900 hover:bg-purple-800 text-white rounded-xl font-bold"
                >
                  حفظ وإضافة للمنظومة
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddDirOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
