import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Clock,
  Phone,
  Search,
  Filter,
  ArrowRight,
  Building,
  School,
  HeartPulse,
  Mail,
  Car,
  Scale,
  Award,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DIRECTORY_ITEMS, MENOUFIA_CITIES } from '../data/mockData';
import { DirectoryItem } from '../types';

export const DirectoryPage: React.FC = () => {
  const { navigate, globalSearchQuery, setGlobalSearchQuery } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<DirectoryItem | null>(null);

  const categories: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'كافة المرافق', icon: <Compass className="w-4 h-4" /> },
    { id: 'مستشفيات وصحة', label: 'مستشفيات وصحة', icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'تعليم وجامعات', label: 'تعليم وجامعات', icon: <School className="w-4 h-4" /> },
    { id: 'مكاتب بريد', label: 'مكاتب بريد', icon: <Mail className="w-4 h-4" /> },
    { id: 'مواقف ومواصلات', label: 'مواقف ومواصلات', icon: <Car className="w-4 h-4" /> },
    { id: 'شهر عقاري ومحاكم', label: 'شهر عقاري ومحاكم', icon: <Scale className="w-4 h-4" /> },
    { id: 'مراكز شباب ورياضة', label: 'مراكز شباب ورياضة', icon: <Award className="w-4 h-4" /> },
    { id: 'مكاتب تكنولوجية', label: 'مقار إدارية وتكنولوجية', icon: <Building className="w-4 h-4" /> }
  ];

  const filteredItems = DIRECTORY_ITEMS.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchCity = selectedCity === 'all' || item.city === selectedCity;
    const query = globalSearchQuery.toLowerCase();
    const matchQuery =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.address.toLowerCase().includes(query) ||
      item.city.toLowerCase().includes(query);
    return matchCat && matchCity && matchQuery;
  });

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
        <span className="text-xs text-slate-400 font-mono">دليل المنوفية الموحد</span>
      </div>

      {/* Main Title Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
              دليل المؤسسات والمرافق
            </span>
            <span className="text-xs text-slate-400">· محافظة المنوفية</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            دليل الخدمات والمواقع العامة بالمنوفية
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ابحث عن المستشفيات، مكاتب البريد، مجمعات المحاكم، ومواقف السيارات بكافة المراكز
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
          <Compass className="w-6 h-6" />
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="grid sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <input
              type="text"
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم أو العنوان أو الكلمات الدلالية..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          <div className="sm:col-span-4 relative">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-9"
            >
              <option value="all">كافة مدن ومراكز المحافظة</option>
              {MENOUFIA_CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Categories Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between hover:border-emerald-300 hover:shadow transition-all cursor-pointer group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {item.category}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {item.city}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                {item.name}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2 text-xs text-slate-600 space-y-1">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-[11px]">{item.address}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11px] font-mono">{item.timing}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>عرض بطاقة المنشأة</span>
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                {selectedItem.category}
              </span>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-900">{selectedItem.name}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 text-xs space-y-2 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">المدينة / المركز:</span>
                <span className="font-bold text-slate-900">{selectedItem.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">العنوان:</span>
                <span className="text-slate-800">{selectedItem.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">مواعيد العمل:</span>
                <span className="font-mono text-slate-800">{selectedItem.timing}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">الهاتف الاسترشادي:</span>
                <span className="font-mono font-bold text-emerald-800 dir-ltr">{selectedItem.phone}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <a
                href={`tel:${selectedItem.phone}`}
                className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>اتصال بالمنشأة</span>
              </a>
              <button
                onClick={() => setSelectedItem(null)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
